import express from "express";
import { randomBytes } from "crypto";
import { errorHandler } from "../utils/errorHandler.js";
import axios from "axios";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };

    console.log("POSTS", posts);

    axios.post("http://localhost:5003/events", {
      type: "PostCreated",
      data: { id, title },
    });

    res.status(201).send(posts[id]);
  } catch (err) {
    console.log(err);
    errorHandler(err, res);
  }
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
