const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

//use todays asunc await

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming req.body contains the person data

    //create a new person document using the mongoose model
    const response = new Person(data);

    //save the new person document to the database
    const savedPerson = await response.save();

    console.log("data saved");
    res.status(201).json(response);
  } catch (error) {
    console.log("Error saving person:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

//get method to get all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract work type from url parameter
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("data fetched for work");
      res.status(200).json(response);
    }
    res.status(400).json({ error: "Invalid work type" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//update method

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Person data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete methode

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ massage: "Person deleted SUccessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
