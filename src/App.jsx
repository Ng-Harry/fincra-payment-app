import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    currency: 'NGN',
  });

  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentLink('');

    try {
      const res = await axios.post('https://fincra-backend.onrender.com/api/initiate-payment', formData);
      setPaymentLink(res.data.paymentLink);
    } catch (err) {
      console.log(err)
      alert('Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Fincra Payment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            required
            placeholder="Amount"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.amount}
            onChange={handleChange}
          />
          <select
            name="currency"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>

        {paymentLink && (
          <div className="mt-6 text-center">
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold underline"
            >
              Complete your payment
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
