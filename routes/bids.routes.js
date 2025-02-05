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
      item_details: bag?.item,
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

router.post("/:bid_id/approve", async (req, res, next) => {
  try {
    const { fdkSession, params, body } = req;
    const { bid_id } = params;
    const { winner_company_id } = body;
    const { company_id } = fdkSession;

    const URL = `${BASE_URL}/${company_id}/bid/${bid_id}/winner?winner_company_id=${winner_company_id}`;
    const result = await axios.post(URL);
    const { data } = result;

    return res.send({
      success: true,
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

// bid list for other channels
router.get("/global/list", async (req, res, next) => {
  const { pageNo = 1, pageSize = 10, filter_type = "active" } = req.query;
  try {
    const { fdkSession, body } = req;
    const { company_id } = fdkSession;

    const URL = `${BASE_URL}/bids`;
    const result = await axios.get(URL, {
      params: {
        limit: pageSize,
        page: pageNo,
        ...(filter_type && { filter_type: filter_type }),
        exclude_company_id: company_id,
      },
    });
    const { data } = result;
    console.log(result);

    return res.send({
      success: data?.success,
      item_total: data?.total,
      pageNo: data?.page,
      pageSize: data?.limit,
      data: data?.bids,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:company_id/list", async (req, res, next) => {
  const { pageNo = 1, pageSize = 10, filter_type = null } = req.query;
  try {
    const { fdkSession, body } = req;
    const { company_id } = fdkSession;

    const URL = `${BASE_URL}/${company_id}/bids`;
    const result = await axios.get(URL, {
      params: {
        limit: pageSize,
        page: pageNo,
        filter_type,
      },
    });
    const { data } = result;
    console.log(result);

    return res.send({
      success: data?.success,
      item_total: data?.total,
      pageNo: data?.page,
      pageSize: data?.limit,
      data: data?.bids,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:company_id/list", async (req, res, next) => {
  const { pageNo = 1, pageSize = 10, filter_type = null } = req.query;
  try {
    const { fdkSession, body } = req;
    const { company_id } = fdkSession;

    const URL = `${BASE_URL}/${company_id}/bids`;
    const result = await axios.get(URL, {
      params: {
        limit: pageSize,
        page: pageNo,
        ...(filter_type && { filter_type: filter_type }),
      },
    });
    const { data } = result;
    console.log(result);

    return res.send({
      success: data?.success,
      item_total: data?.total,
      pageNo: data?.page,
      pageSize: data?.limit,
      data: data?.bids,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:bid_id/apply", async (req, res, next) => {
  try {
    const { fdkSession, body, params } = req;
    const { bid_id } = params;
    const { company_id } = fdkSession;

    const URL = `${BASE_URL}/${company_id}/bid/${bid_id}`;
    const result = await axios.post(URL, body);
    const { data } = result;
    console.log(result);

    return res.send({
      success: true,
      message: data?.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:bid_id/applied/list", async (req, res, next) => {
  const { pageNo = 1, pageSize = 10, filter_type = null } = req.query;
  try {
    const { params } = req;
    const { bid_id } = params;

    const URL = `${BASE_URL}/bids/${bid_id}/applied_bids`;
    const result = await axios.get(URL);
    const { data } = result;

    return res.send({
      success: true,
      data: data,
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
