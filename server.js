const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const serveStatic = require("serve-static");
const { readFileSync } = require("fs");

const productRouter = express.Router();
const companyRoutes = require("./routes/company.routes");
const bidsRoutes = require("./routes/bids.routes");
const orderRoutes = require("./routes/order.routes");
const { fdkExtension } = require("./fdk");

require("dotenv").config();

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), "frontend", "public", "dist")
    : path.join(process.cwd(), "frontend");

const app = express();
const platformApiRoutes = fdkExtension.platformApiRoutes;

// Middleware to parse cookies with a secret key
app.use(cookieParser("ext.session"));

// Middleware to parse JSON bodies with a size limit of 2mb
app.use(
  bodyParser.json({
    limit: "2mb",
  })
);

// Serve static files from the React dist directory
app.use(serveStatic(STATIC_PATH, { index: false }));

// FDK extension handler and API routes (extension launch routes)
app.use("/", fdkExtension.fdkHandler);

// Route to handle webhook events and process it.
app.post("/api/webhook-events", async function (req, res) {
  try {
    console.log(`Webhook Event: ${req.body.event} received`);
    await fdkExtension.webhookRegistry.processWebhook(req);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(`Error Processing ${req.body.event} Webhook`);
    return res.status(500).json({ success: false });
  }
});

productRouter.get("/", async function view(req, res, next) {
  try {
    const { platformClient } = req;
    const data = await platformClient.catalog.getProducts();
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

// Get products list for application
productRouter.get(
  "/application/:application_id",
  async function view(req, res, next) {
    try {
      const { platformClient } = req;
      const { application_id } = req.params;
      const data = await platformClient
        .application(application_id)
        .catalog.getAppProducts();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

// FDK extension api route which has auth middleware and FDK client instance attached to it.
platformApiRoutes.use("/products", productRouter);
platformApiRoutes.use("/company", companyRoutes);
platformApiRoutes.use("/bids", bidsRoutes);
platformApiRoutes.use("/orders", orderRoutes);

// If you are adding routes outside of the /api path,
// remember to also add a proxy rule for them in /frontend/vite.config.js
app.use("/api", platformApiRoutes);

// Serve the React app for all other routes
app.get("*", (req, res) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(path.join(STATIC_PATH, "index.html")));
});

module.exports = app;
