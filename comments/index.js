import express from "express";
import { randomBytes } from "crypto";
import { errorHandler } from "../utils/errorHandler.js";
import axios from "axios";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const comments = {};

app.post("/events", (req, res) => {
  console.log("Event Received on Query: ", req.body.type);
  const { type, data, postId } = req.body;

  if (type === "CommentModerated") {
    const { id } = data;

    if (!comments[postId]) return;

    const comment = comments[postId].find((comment) => comment.id === id);

    if (!comment) {
      return;
    }

    comment = { ...comment, ...data };

    axios.post("http://localhost:5003/events", {
      type: "CommentUpdated",
      data: comment,
    });
  }
});

// app.get("/posts/:id/comments", (req, res) => {
//   const { id } = req.params;
//   res.send(comments[id] || []);
// });

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { message } = req.body;
    const { id } = req.params;
    comments[id] = [
      ...(comments[id] || []),
      {
        id: commentId,
        message,
        status: "pending",
      },
    ];
    axios.post("http://localhost:5003/events", {
      type: "CommentCreated",
      data: { id: commentId, message, postId: id },
    });
    res.status(201).send(comments[id]);
  } catch (err) {
    errorHandler(err, res);
  }
});

app.listen(5001, () => {
  console.log("Listening on 5001");
});
