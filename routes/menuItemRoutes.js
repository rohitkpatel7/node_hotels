const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

//post method for menu router

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming req.body contains the MenuItem data

    //create a new MenuItem document using the mongoose model
    const newMenu = new MenuItem(data);

    //save the new MenuItem document to the database
    const response = await newMenu.save();

    console.log("data saved");
    res.status(201).json(response);
  } catch (error) {
    console.log("Error saving MenuItem:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

//get method to get all MenuItems
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste; //extract work type from url parameter
    if (
      taste == "sour" ||
      taste == "spicy" ||
      taste == "sweet" ||
      taste == "bitter" ||
      taste == "salty"
    ) {
      const response = await MenuItem.find({ taste: taste });
      console.log("data fetched for taste");
      res.status(200).json(response);
    }
    res.status(400).json({ error: "Invalid taste type" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//update method for menu

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updaatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuId,
      updaatedMenuData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Menu Not found" });
    }
    console.log("Menu data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});


//delete operation

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    
    const response = await MenuItem.findByIdAndDelete(menuId);

if(!response){
  return res.status(404).json({error: "Menu Not found"});
}
       console.log("Menu data deleted");
        res.status(200).json({massage: 'Menu deleted SUccessfully'});
  } catch (err) {
     console.log(err);
        res.status(500).json({error:"internal server error"});
  }
})

module.exports = router;
