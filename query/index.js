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

    if (!post) return;

    post.comments.push({ id, message });
  }

  if (type === "CommentUpdated") {
    const { id, postId } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment = { ...comment, ...data };
  }

  console.log(
    Object.entries(posts).forEach((post) => {
      console.log({
        id: post.id,
        title: post.title,
        comments: post.comments,
      });
      post.comments.forEach((comment, index) => {
        console.log(`comment ${index}`, {
          id: comment.id,
          message: comment.message,
          status: comment.status,
        });
      });
    })
  );
});

app.get("/query", (req, res) => {
  res.send(posts);
});

app.listen(5002, () => {
  console.log("Listening on 5002");
});
