import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const POST_SERVER = "http://localhost:5000";
const COMMENT_SERVER = "http://localhost:5001";
const QUERY_SERVER = "http://localhost:5002";
const EVENT_SERVER_PORT = 5003;
const MODERATION_SERVER = "http://localhost:5004";

app.post("/events", (req, res) => {
  console.log("Event Received: ", req.body.type);

  axios.post(`${POST_SERVER}/events`, req.body).catch((err) => {
    res.send(err.message);
  });
  axios.post(`${COMMENT_SERVER}/events`, req.body).catch((err) => {
    res.send(err.message);
  });
  axios.post(`${QUERY_SERVER}/events`, req.body).catch((err) => {
    res.send(err.message);
  });

  axios.post(`${MODERATION_SERVER}/events`, req.body).catch((err) => {
    res.send(err.message);
  });
});

app.listen(EVENT_SERVER_PORT, () => {
  console.log("Listening on 5003");
});
