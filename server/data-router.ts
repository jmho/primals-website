import cors from "cors";
import express, { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

export const DataRouter = Router();

DataRouter.use(express.json());
DataRouter.use(cors()); // For parsing application/json

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

DataRouter.post("/save", (req, res) => {
  const jsonData = req.body;

  try {
    let existingData = []; // Initialize as an empty array

    // Check if data.json exists and read its content. If not, use an empty array
    if (fs.existsSync("data.json")) {
      const fileContent = fs.readFileSync("data.json", "utf8");
      existingData = JSON.parse(fileContent);
    }

    if (!Array.isArray(existingData)) {
      // Make sure it's an array
      console.warn(
        "Existing data.json is not an array, initializing to an empty array."
      );
      existingData = [];
    }

    // Find the index of the existing entry for the current page
    const existingIndex = existingData.findIndex(
      //@ts-ignore
      (entry) => entry.page === jsonData.page
    );

    if (existingIndex !== -1) {
      // Update the existing entry
      //@ts-ignore
      existingData[existingIndex] = jsonData;
    } else {
      // Add a new entry
      //@ts-ignore
      existingData.push(jsonData);
    }

    // Write the updated array back to data.json
    fs.writeFileSync("data.json", JSON.stringify(existingData, null, 2));

    console.log("Data saved successfully:", jsonData);
    res.send("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});

// Route to retrieve JSON data
DataRouter.get("/data", (req, res) => {
  try {
    // Read JSON data from the file
    //@ts-ignore
    const jsonData = JSON.parse(fs.readFileSync("data.json"));
    res.json(jsonData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data");
  }
});

// Route to retrieve data by ID (pageID)
DataRouter.get("/getByID/:pageID", (req, res) => {
  const pageID = parseInt(req.params.pageID);
  try {
    //@ts-ignore
    const jsonData = JSON.parse(fs.readFileSync("data.json"));
    const dataByID = jsonData.find((entry) => entry.page === pageID);
    if (dataByID) {
      res.json(dataByID);
    } else {
      res.status(404).send("Data not found for the specified ID");
    }
    console.log(res);
  } catch (error) {
    console.error("Error retrieving data by ID:", error);
    res.status(500).send("Error retrieving data by ID");
  }
});
