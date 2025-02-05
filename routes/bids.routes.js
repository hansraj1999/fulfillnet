const express = require("express");
const axios = require("axios");
const router = express.Router();
const BASE_URL = "http://13.233.29.234:8000";

router.post("/register/bid", async (req, res, next) => {
  try {
    const { platformClient, fdkSession, body } = req;
    const { company_id } = fdkSession;
    const { shipment_id, initial_bid_price } = body;

    const shipment_details = await platformClient.order.getShipmentById({
      company_id,
      shipmentId: shipment_id,
    });
    const shipment = shipment_details?.shipments.find(
      (item) => item.shipment_id == shipment_id
    );
    if (!shipment) {
      throw new Error("No Shipment found");
    }

    const bag = shipment?.bags[0];
    const payload = {
      initial_bid_price: initial_bid_price,
      quantity: bag?.quantity,
      item_image: bag?.item?.images[0],
      item_id: String(bag?.item?.id),
      brand_id: bag?.brand?.brand_name,
      fynd_order_id: shipment?.order?.fynd_order_id,
      article_details: bag?.article,
      article_id: bag?.article?.uid,
      shipment_id: shipment_id,
      // external_order_id: "string",
      // external_shipment_id: "string",
      delivery_details: shipment?.fulfilling_store,
    };
    console.log("payload >>>>>", payload);

    const URL = `${BASE_URL}/${company_id}/register/bid`;
    const { data } = await axios.post(URL, payload);

    return res.send({
      success: data?.success,
      message: data?.message,
    });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  //   logger.error("error in cart router", err);

  let status = err?.response?.status || err?.code || err?.status || 500;
  return res.status(status).json(
    err?.response?.data || {
      status: status,
      message: err?.details?.message || err?.message || "Internal Server Error",
    }
  );
});

module.exports = router;
