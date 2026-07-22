const Product = require("../models/Product");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    console.log("Products fetched:", products);

    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

// Add Product 
const addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};