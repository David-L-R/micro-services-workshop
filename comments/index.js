import express from "express";
import { randomBytes } from "crypto";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(comments[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { message } = req.body;
  const { id } = req.params;
  comments[id] = [
    ...(comments[id] || []),
    {
      id: commentId,
      message,
    },
  ];
  res.status(201).send(comments[id]);
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
