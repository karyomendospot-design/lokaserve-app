module.exports = async function (req, res) {
  const { paymentId, txid } = req.body;
  const r = await fetch(`https://minepi.com{paymentId}/complete`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${process.env.PI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ txid })
  });
  const data = await r.json();
  res.status(r.status).json(data);
};
