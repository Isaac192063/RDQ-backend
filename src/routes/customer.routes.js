const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const routerCustomer = Router();

routerCustomer.get("", customerController.getAllCustomer);

routerCustomer.post("", customerController.createCustomer);

routerCustomer.put("/:id", customerController.updateCustomer);

routerCustomer.get("/:id", customerController.getCustomerById);

routerCustomer.delete("/:id", customerController.deleteCustomer);


module.exports = routerCustomer;
