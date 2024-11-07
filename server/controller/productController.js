import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProducts:", error.message, "Request:", req.body);
    res.status(404).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      res.status(200).json(JSON.parse(featuredProducts));
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts)
      return res.status(404).json({ message: "No featured products found" });

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.status(200).json({ products: featuredProducts });
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error.message, "Request:", req.body);
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json({ product });
  } catch (error) {
    console.error("Error in createProduct:", error.message, "Request:", req.body);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`publicId/${publicId}`);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.error("Error in deleting image from Cloudinary:", error.message);
        res.status(500).json({ message: error.message });
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message, "Request:", req.params);
    res.status(500).json({ message: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => { 
  try {
    const product = await Product.aggregate([
      {
        $sample: {
          size: 3
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1
        }
      }
    ]);

    res.status(200).json({ products: product });
  } catch (error) {
    console.error("Error in getRecommendedProducts:", error.message, "Request:", req.body);
    res.status(500).json({ message: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getProductByCategory:", error.message, "Request:", req.params);
    res.status(500).json({ message: error.message });
  }
};

export const toggleFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (products) {
      products.isFeatured = !products.isFeatured;
      const updatedProduct = await products.save();
      await updateFeaturedProductsCache();
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in toggleFeaturedProducts:", error.message, "Request:", req.params);
    res.status(500).json({ message: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Error in updateFeaturedProductsCache:", error.message);
    res.status(500).json({ message: error.message });
  }
}
