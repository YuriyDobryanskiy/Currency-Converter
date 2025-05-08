// src/App.jsx
import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Currency Converter
        </h1>
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;