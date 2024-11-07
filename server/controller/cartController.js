export const getAllCart = async (req, res) => {
  try {
    const products = await Product.find({_id:{$in:req.user.cartItems}});
    // add quantity to each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(cartItems => cartItems.id === product.id);
      return {...product.toJSON(), quantity: item?.quantity || 0}
    })
    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Erroor getAllCart", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addTocart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id == productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.status(201).json(user.cartItems);
  } catch (error) {
    console.log("Erro inb addTocart", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item != productId);
    }
    await user.save();
    res.status(201).json(user.cartItems);
  } catch (error) {
    console.log("Erroor removeAllFromCart", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const upadeteQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id == productId);
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item != productId);
        await user.save();
        return res.status(201).json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.status(201).json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Erroor removeAllFromCart", error.message);
    res.status(500).json({ message: error.message });
  }
};
