const { Router } = require("express");
const { sendError, sendResponseOk } = require("../others/response");
const prisma = require("../config/prisma");
const { newCustomer } = require("../service/customerService");
const customerController = require("../controllers/customer.controller");
const routerCustomer = Router();

routerCustomer.get("", customerController.getAllCustomer);

routerCustomer.post("", customerController.createCustomer);

routerCustomer.put("/:id", customerController.updateCustomer);

routerCustomer.get("/:id", customerController.getCustomerById);

routerCustomer.delete("/:id", customerController.deleteCustomer);

module.exports = routerCustomer;
