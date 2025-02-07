const express = require("express");
const axios = require("axios");
const router = express.Router();
const BASE_URL = "http://13.233.29.234:8000";

router.post("/register", async (req, res, next) => {
  const { company_id } = req.body;
  const URL = `${BASE_URL}/register/${company_id}`;
  try {
    const { platformClient } = req;

    const company_data = await platformClient.companyProfile.cbsOnboardGet();

    const payload = { name: company_data?.name, mobile_number: "7758005274" };
    console.log("payload >>>>>", payload);
    const { data } = await axios.post(URL, payload);

    return res.send({
      success: data?.success,
      message: data?.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/add-account-details", async (req, res, next) => {
  try {
    const { fdkSession, body } = req;
    const { company_id } = fdkSession;

    console.log("payload >>>>>", body);
    const URL = `${BASE_URL}/register/${company_id}/banking`;
    const { data } = await axios.post(URL, body);

    if (data) {
      return res.send({
        success: true,
        message: "Account details saved successfully",
      });
    } else {
      throw new Error("Interval Server Error");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:company_id/profile-details", async (req, res, next) => {
  try {
    const { company_id } = req.params;

    const URL = `${BASE_URL}/${company_id}/details`;
    const { data } = await axios.get(URL);
    const profile = data?.data;

    return res.send({
      success: data?.success,
      data: data?.success ? profile : null,
      message: data?.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/profile-details", async (req, res, next) => {
  try {
    const { fdkSession } = req;
    const { company_id } = fdkSession;

    const URL = `${BASE_URL}/${company_id}/details`;
    const { data } = await axios.get(URL);
    const profile = data?.data;

    return res.send({
      success: data?.success,
      data: data?.success ? profile : null,
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
