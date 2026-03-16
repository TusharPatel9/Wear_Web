exports.addToCart = async (req, res) => {
  try {
    //fetch the userID and ProductId , size from req.body
    //fetch the prodcut using product id
    //create a cart
    //send a response
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
