const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// POST - create menu item
router.post("/", async (req, res) => {
  try {
    const newMenu = new MenuItem(req.body);
    const savedMenu = await newMenu.save();

    console.log("menu saved");
    return res.status(201).json(savedMenu);
  } catch (error) {
    console.log("Error saving MenuItem:", error);
    return res.status(500).json({ error: "internal server error" });
  }
});

// GET - all menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menu fetched");
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

// GET - menu by taste (OPTIONAL but correct)
router.get("/taste/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;

    const response = await MenuItem.find({ taste: tasteType });
    console.log("menu fetched by taste");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

// PUT - update menu item
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndUpdate(
      menuId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("menu updated");
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

// DELETE - remove menu item
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("menu deleted");
    return res.status(200).json({ message: "Menu deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
