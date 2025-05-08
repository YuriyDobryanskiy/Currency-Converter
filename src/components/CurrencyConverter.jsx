// src/components/CurrencyConverter.jsx
import React, { useState, useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import { formatCurrency, convertCurrency } from '../utils/utils';

const CURRENCIES = [
  { country: 'Ethiopia', code: 'ETB', name: 'Ethiopian Birr' },
  { country: 'Zambia', code: 'ZMW', name: 'Zambian Kwacha' },
  { country: 'Kenya', code: 'KES', name: 'Kenyan Shilling' },
  { country: 'West Africa', code: 'XOF', name: 'CFA Franc BCEAO' },
  { country: 'Central Africa', code: 'XAF', name: 'CFA Franc BEAC' },
  { country: 'Congo', code: 'CDF', name: 'Congolese Franc' },
  { country: 'Burundi', code: 'BIF', name: 'Burundi Franc' }
];

function CurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [euroAmount, setEuroAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rates:', error);
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  const handleEuroChange = (value) => {
    setEuroAmount(value);
  };

  const handleUsdChange = (value) => {
    setUsdAmount(value);
  };

  if (loading) {
    return <div className="text-center">Loading exchange rates...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CurrencyInput
          label="EUR Amount"
          value={euroAmount}
          onChange={handleEuroChange}
          placeholder="Enter EUR amount"
        />
        <CurrencyInput
          label="USD Amount"
          value={usdAmount}
          onChange={handleUsdChange}
          placeholder="Enter USD amount"
        />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="text-lg font-semibold col-span-full mb-2">EUR Conversions:</h3>
          {CURRENCIES.map((currency) => (
            <div key={`eur-${currency.code}`} className="bg-gray-50 p-4 rounded">
              <div className="font-medium text-gray-700">{currency.country}</div>
              <div className="text-xl">
                {euroAmount
                  ? formatCurrency(convertCurrency(parseFloat(euroAmount), rates['EUR'], rates[currency.code]), currency.code)
                  : `0 ${currency.code}`}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="text-lg font-semibold col-span-full mb-2">USD Conversions:</h3>
          {CURRENCIES.map((currency) => (
            <div key={`usd-${currency.code}`} className="bg-gray-50 p-4 rounded">
              <div className="font-medium text-gray-700">{currency.country}</div>
              <div className="text-xl">
                {usdAmount
                  ? formatCurrency(convertCurrency(parseFloat(usdAmount), rates['USD'], rates[currency.code]), currency.code)
                  : `0 ${currency.code}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;