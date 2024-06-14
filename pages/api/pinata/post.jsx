// just a refference of post api

const storImage = (req, res) => {
  if (req.method !== "POST") {
    console.log(req);
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  return res.status(200).json({
    status: "ok",
    posted: req.message,
  });
};

export default storImage;
