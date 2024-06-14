export default function cmd(req, res) {
  const encodedString = Buffer.from(JSON.stringify(req.body)).toString('base64');
  res.status(200).json({ output: encodedString });
}
