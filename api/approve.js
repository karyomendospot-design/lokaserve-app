module.exports = async function (req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const paymentId = body.paymentId || req.query.paymentId;

    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId kosong', keyAda: !!process.env.PI_API_KEY });
    }

    const r = await fetch(`https://minepi.com{paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
