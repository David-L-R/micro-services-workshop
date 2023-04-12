import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const POST_SERVER = "http://localhost:5000";
const COMMENT_SERVER = "http://localhost:5001";
const QUERY_SERVER = "http://localhost:5002";

app.post("/events", (req, res) => {
  console.log("Event Received on Query: ", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { message } = data;

    data.status = "approved";

    if (message.includes("orange")) {
      data.status = "rejected";
    }

    axios.post("http://localhost:5003/events", {
      type: "CommentModerated",
      data,
    });
  }
});

app.listen(5004, () => {
  console.log("Listening on 5004");
});
