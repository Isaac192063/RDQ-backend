const { sendResponseOk, sendError } = require("../others/response");
const {
  getAllCustomers,
  getCustomerByid,
  newCustomer,
  updateCustomer,
  deleteCustomer
} = require("../service/customerService");

module.exports = {
  async createCustomer(req, res) {
    try {
        const customerBody = req.body;
        const customers = await newCustomer(customerBody);
        return sendResponseOk(res, customers);
      } catch (error) {
        return sendError(res, error.message, error.statusCode);
      }
  },
  async getAllCustomer(req, res) {
    try {
      const customers = await getAllCustomers();
      sendResponseOk(res, customers);
    } catch (error) {
      sendError(res, error.message, error.statusCode);
    }
  },
  async deleteCustomer(req, res) {
    try {
      const id = req.params.id;
      const customerDelete = await deleteCustomer(id);
      sendResponseOk(res, customerDelete);
    } catch (error) {
      sendError(res, error.message, error.statusCode);
    }
  },
  async getCustomerById(req, res) {
    try {
      const id = req.params.id;

      const customers = await getCustomerByid(id);

      return sendResponseOk(res, customers);
    } catch (error) {
      sendError(res, error.message, error.statusCode);
    }
},
async updateCustomer(req, res){
    try {
        const customer = req.body;
        const id = req.params.id;
        
        const ctrUpdate = await updateCustomer(id, customer);

        return sendResponseOk(res, ctrUpdate);
        
        
    } catch (error) {
      sendError(res, error.message, error.statusCode);
    }
  },
  async getCustomerbyName(req, res) {},

};
