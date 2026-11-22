module.exports = async function (req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { paymentId, txid } = body;

    const r = await fetch(`https://minepi.com{paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
