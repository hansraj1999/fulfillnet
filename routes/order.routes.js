const express = require("express");
const axios = require("axios");
const { fdkExtension } = require("../fdk");
const router = express.Router();
const BASE_URL = "http://13.233.29.234:8000";

router.get(
  "/:fynd_order_id/winning_company_id/:winning_company_id",
  async (req, res, next) => {
    const { fynd_order_id, winning_company_id } = req.params;
    try {
      // const { platformClient } = req;
      const platformClient = await fdkExtension.getPlatformClient(Number(winning_company_id));

      const order_data = await platformClient.order.getOrderById({
        orderId: fynd_order_id,
      });

      if (order_data) {
        return res.send({
          success: true,
          data: order_data,
        });
      } else {
        return res.send({
          success: false,
          data: null,
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
