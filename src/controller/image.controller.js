import express from "express";
import bodyParser from "body-parser";
import {
  createImage,
  deleteImage,
  getItem,
  searchImage,
} from "../service/image.service";
import { logger } from "../utils/logger"


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post(
  "/v2",
  async (req, res) => {
    try {
      if (req.body.file) {
        createImage(req.body.expected, req.body.current, req.body.file, req.socket.remoteAddress)
        return res.status(201).send();
      }

    } catch (err) {
      logger.error(String(err))
      return res
        .status(500)
        .send("There was a problem adding the information to the database.");
    }
  }
);

router.delete("/image", (req, res) => {
  deleteImage();
});

// GETS A SINGLE ITEM FROM THE DATABASE
router.get("/:id", async (req, res) => {
  try {
    const item = await getItem(req.params.id);
    if (!item) return res.status(404).send("No item found.");
    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the item.");
  }
});

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get("/", async (req, res) => {
  try {
    const searchString = req.query?.searchString
    let items
    if (searchString) {
      items = await searchImage(searchString)
    }
    else {
      items = await getItem();
    }
    if (!items) return res.status(404).send("No items found.");
    res.status(200).send(items);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the items.");
  }
});


export default router;
