import cors from "cors";
import express, { Router } from "express";
import { createClient } from "@supabase/supabase-js";

export const DataRouter = Router();

DataRouter.use(express.json());
DataRouter.use(cors()); // For parsing application/json

const bucket = "phase-2-data";

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

DataRouter.post("/save", async (req, res) => {
  console.log("Saving data");
  const jsonData = req.body;
  const name = req.query.name as string;

  const filename = `${name}_results.json`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, JSON.stringify(jsonData));

  if (error) {
    res.status(500).send("Error");
    return;
  } else {
    res.status(200).send("Success");
    return;
  }
});

DataRouter.get("/annotation-data", async (req, res) => {
  console.log("Getting annotation data");
  const { name } = req.query;

  const filename = `${name}_data.json`;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);

  const response = await fetch(data.publicUrl, {
    method: "get",
  });

  if (response.ok) {
    const jsonData = await response.json();
    res.status(200).send(jsonData);
    return;
  } else {
    res.status(200).send(false);
    return;
  }
});

DataRouter.get("/current-progress", async (req, res) => {
  console.log("Getting current progress");
  const { name } = req.query;

  const filename = `${name}_results.json`;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);

  const response = await fetch(data.publicUrl, {
    method: "get",
  });

  if (response.ok) {
    const jsonData = await response.json();
    res.status(200).send(jsonData);
    return;
  } else {
    res.status(200).send();
    return;
  }
});
