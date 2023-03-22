import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

app.post("/events", (req, res) => {
  console.log("Event Received on Query: ", req.body.type);
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, postId, message } = data;
    const post = posts[postId];
    post.comments.push({ id, message });
  }

  console.log(posts);
});

app.get("/query", (req, res) => {
  res.send(posts);
});

app.listen(5002, () => {
  console.log("Listening on 5002");
});
