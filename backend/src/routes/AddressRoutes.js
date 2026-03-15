const addressRouter = require("express").Router();

const {
  addAddress,
  deleteAddress,
  getAddressByUserId,
  updateAddress,
} = require("../controllers/AddressController");

addressRouter.post("/add-address", addAddress);
addressRouter.get("/get-address/:userId", getAddressByUserId);
addressRouter.put("/update-address/:addressId", updateAddress);
addressRouter.delete("/delete-address", deleteAddress);

module.exports = addressRouter;
