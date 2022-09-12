import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors"

import itemContrller from "./controller/item.controller";
import config from "./config";

const app = express();

// TODO: Use a whitelist
app.use(cors());
app.options('*', cors());

mongoose.connect(config.mLabURI);

app.use(express.static("public"));

app.use("/api/items", itemContrller);

app.use(express.static(path.join(__dirname, '..', '..', "client", "build")));
app.use("/public", express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
