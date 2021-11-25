const express = require("express");

const router = express.Router();

router.get("/soda-machines", (req, res) => {
  res.send("Hello from the soda machines list.");
});

router.get("/soda-machines/:id", (req, res) => {
  res.send("Hello from a specific soda machine.");
});

router.post("/soda-machines", (req, res) => {});

router.put("/soda-machines/:id", (req, res) => {
  // Here is the middleware for updating the backend information
  // about a specific soda machine.
});

router.delete("/soda-machines/:id", (req, res) => {
  // If a machine will be deleted from the backend
  // it all happens here.
});

module.exports = router;
