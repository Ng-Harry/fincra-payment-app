import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, amount, currency } = req.body;
  const FINCRA_SECRET_KEY = process.env.FINCRA_SECRET_KEY;

  try {
    const response = await axios.post(
      'https://sandboxapi.fincra.com/checkout/payments',
      {
        amount,
        currency,
        customer: { name, email },
        redirectUrl: 'https://your-vercel-app.vercel.app/payment-success',
      },
      {
        headers: {
          Authorization: `Bearer ${FINCRA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ paymentLink: response.data?.data?.link });
  } catch (error) {
    console.error('Fincra error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
}
