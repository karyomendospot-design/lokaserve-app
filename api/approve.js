module.exports = async function (req, res) {
  const { paymentId } = req.body;
  const r = await fetch(`https://minepi.com{paymentId}/approve`, {
    method: 'POST',
    headers: { 'Authorization': `Key ${process.env.PI_API_KEY}` }
  });
  const data = await r.json();
  res.status(r.status).json(data);
};
