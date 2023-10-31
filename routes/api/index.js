const express = require("express");
const routes = express.Router();
const authApi = require("./auth");
const docApi = require("./document");
const jwtVerify = require("../../Midlewares/Auth");

routes.use("/auth", authApi);
// routes.use(jwtVerify)
routes.use("/document", docApi);

module.exports = routes;
