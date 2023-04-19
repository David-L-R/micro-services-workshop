export const errorHandler = (err, res) => {
  console.log("errorHandler", err);
  const statuscode = err.response ? err.response.status : 500;
  const message = err.response ? err.response.data : err.message;
  res.status(statuscode).json({ error: message });
};
