const express = require("express");
const axios = require("axios");
const { fdkExtension } = require("../fdk");

const router = express.Router();
const BASE_URL = "http://13.233.29.234:8000";

const createShipmentPayload = ({
  shipment,
  bag,
  item_details,
  original_bid_details,
  applied_bid_details,
  application,
}) => {
  const fulfilling_store = shipment?.fulfilling_store;
  // const bag = shipment?.bag[0];

  const payload = {
    shipments: [
      {
        priority: 0,
        external_shipment_id: shipment?.shipment_id,
        line_items: [
          {
            seller_identifier: item_details.seller_identifier,
            charges: [
              {
                amount: {
                  currency: "INR",
                  value: applied_bid_details?.amount,
                },
                type: "amount_paid",
                name: "amount_paid",
              },
              {
                amount: {
                  currency: "INR",
                  value: applied_bid_details?.amount,
                },
                type: "price_effective",
                name: "price_effective",
              },
              {
                amount: {
                  currency: "INR",
                  value: applied_bid_details?.amount,
                },
                type: "price_marked",
                name: "price_marked",
              },
              {
                amount: {
                  currency: "INR",
                  value: applied_bid_details?.amount,
                },
                type: "mrp",
                name: "mrp",
              },
              {
                amount: {
                  currency: "INR",
                  value: applied_bid_details?.amount,
                },
                type: "unit_price",
                name: "unit_price",
              },
              {
                amount: {
                  currency: "INR",
                  value: 0.0,
                },
                type: "delivery_charge",
                name: "delivery_charge",
              },
              {
                amount: {
                  currency: "INR",
                  value: 0.0,
                },
                type: "promotion_effective_discount",
                name: "promotion_effective_discount",
              },
            ],
            quantity: bag.quantity,
          },
        ],
        order_type: "HomeDelivery",
        location_id: item_details?.store?.uid,
      },
    ],
    payment_info: {
      payment_mode: "PP",
      primary_mode: "PP",
      payment_methods: [
        {
          name: "PP",
          mode: "PP",
          amount: applied_bid_details?.amount,
          collect_by: "seller",
          refund_by: "seller",
          meta: {
            merchant_code: "Reseller",
            payment_gateway: "Reseller",
            payment_identifier: shipment?.fynd_order_id,
          },
        },
      ],
    },
    application_id: application?._id,
    external_creation_date: shipment.created_at,
    billing_info: {
      // update
      first_name: fulfilling_store?.store_name,
      country: fulfilling_store?.country,
      city: fulfilling_store?.city,
      pincode: fulfilling_store?.pincode,
      last_name: "",
      primary_mobile_number: fulfilling_store?.phone, // update
      primary_email: fulfilling_store?.store_email, // update
      state: fulfilling_store?.state,
      address1: fulfilling_store?.address,
    },
    config: {
      optimal_shipment_creation: false,
      integration_type: "application",
      primary_indentifier: application?._id, // application id
      payment: {
        source: "ECOMM",
        mode_of_payment: "seller",
      },
      location_reassignment: false,
      dp_configuration: {
        shipping_by: "seller",
      },
    },
    ordering_channel: "ECOMM",
    shipping_by: "seller",
    shipping_info: {
      first_name: fulfilling_store?.store_name,
      country: fulfilling_store?.country,
      city: fulfilling_store?.city,
      pincode: fulfilling_store?.pincode,
      last_name: "",
      primary_mobile_number: fulfilling_store?.phone,
      primary_email: fulfilling_store?.store_email,
      customer_code: "",
      external_customer_code: "",
      state: fulfilling_store?.state,
      address1: fulfilling_store?.address,
    },
    dp_configuration: {
      shipping_by: "seller",
    },
    order_type: "NEW",
  };
  return payload;
};

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

    if (data?.success) {
      const result = await platformClient.order.postShipmentHistory({
        body: {
          activity_history: [
            {
              filters: [
                {
                  shipment_id: shipment_id,
                },
              ],
              data: {
                user_name: "FulFillNet",
                message: `Bid place successfully with Bid ID=${data?.bid_id}`,
              },
            },
          ],
        },
      });
    }

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
    const { platformClient, fdkSession, params, body } = req;
    const { bid_id } = params;
    const { winner_company_id, shipment_id } = body;
    const { company_id } = fdkSession;

    const platformClientExternal = await fdkExtension.getPlatformClient(
      winner_company_id
    );

    const shipment_details = await platformClient.order.getShipmentById({
      shipmentId: shipment_id,
    });
    const shipment = shipment_details?.shipments.find(
      (item) => item.shipment_id == shipment_id
    );
    if (!shipment) {
      throw new Error("No Shipment found");
    }

    const bag = shipment?.bags[0];
    const inventory_details =
      await platformClientExternal.catalog.getInventories({
        itemId: String(bag?.item?.id),
        size: bag?.item?.size,
      });
    const item_details = inventory_details?.items[0];
    if (!item_details) {
      throw new Error("Order cannot be placed, no inventory found");
    }

    // get bid details
    // const GET_BID_URL = `${BASE_URL}/bids/${bid_id}`;
    // const bid_result = await axios.get(GET_BID_URL);
    // const original_bid_details = bid_result?.data;

    // get applied bid details
    const GET_APPLIED_BID_URL = `${BASE_URL}/${winner_company_id}/bids/${bid_id}/applied`;
    const applied_bid = await axios.get(GET_APPLIED_BID_URL);
    if (Object.keys(applied_bid?.data).length <= 0) {
      throw new Error("No applied bid found");
    }
    const applied_bid_details = applied_bid?.data;

    // application list
    const { items: application_list } =
      await platformClient.configuration.getApplications();
    if (application_list.length <= 0) {
      throw new Error("No sales channel found to place the order");
    }

    const orderPaylaod = createShipmentPayload({
      shipment,
      bag,
      item_details,
      // original_bid_details,
      applied_bid_details,
      application: application_list[0],
    });

    const order_result = await platformClientExternal.order.createOrder({
      body: orderPaylaod,
    });

    const URL = `${BASE_URL}/${company_id}/bid/${bid_id}/winner?winner_company_id=${winner_company_id}&fynd_order_id=${order_result?.fynd_order_id}`;
    const result = await axios.post(URL);
    const { data } = result;
    if (data?.success) {
      const result = await platformClient.order.postShipmentHistory({
        body: {
          activity_history: [
            {
              filters: [
                {
                  shipment_id: shipment_id,
                },
              ],
              data: {
                user_name: "FulFillNet",
                message: `Bid order place with Fynd Order ID=${order_result?.fynd_order_id}`,
              },
            },
          ],
        },
      });
    }

    return res.send({
      success: true,
      data: { ...data },
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
      success: data?.success,
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

router.post("/:company_id/ledger/:ledger_id", async (req, res, next) => {
  const { ledger_id, company_id } = req.params;
  const { utr } = req.body;
  try {
    const URL = `${BASE_URL}/${company_id}/ledger/${ledger_id}`;

    const result = await axios.post(URL, { utr });
    const { data } = result;

    return res.send({
      success: true,
      message: data?.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:bid_is/details", async (req, res, next) => {
  const { bid_is } = req.params;
  const { utr } = req.body;
  try {
    const URL = `${BASE_URL}/bids/${bid_is}`;

    const result = await axios.get(URL);
    const { data } = result;

    return res.send({
      success: true,
      message: data?.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:company_id/ledger/list", async (req, res, next) => {
  const { pageNo = 1, pageSize = 10, filter = null } = req.query;
  const { company_id } = req.params;
  try {
    const { fdkSession, body } = req;

    const URL = `${BASE_URL}/${company_id}/ledger`;
    const result = await axios.get(URL, {
      params: {
        limit: pageSize,
        page: pageNo,
        filter,
      },
    });
    const { data } = result;

    return res.send({
      success: data?.success,
      item_total: data?.total,
      pageNo: data?.page,
      pageSize: data?.limit,
      data: data?.ledger,
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
