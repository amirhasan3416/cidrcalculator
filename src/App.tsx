import React, { useState } from 'react';
import { Network, Calculator } from 'lucide-react';
import { calculateCIDR, isValidIP } from './utils/cidrCalculator';

function App() {
  const [ip, setIp] = useState('192.168.1.0');
  const [prefix, setPrefix] = useState(24);
  const [result, setResult] = useState(calculateCIDR(ip, prefix));
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!isValidIP(ip)) {
      setError('Please enter a valid IP address');
      setResult(null);
      return;
    }
    if (prefix < 0 || prefix > 32) {
      setError('CIDR must be between 0 and 32');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateCIDR(ip, prefix));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">CIDR Calculator</h1>
          </div>
          <p className="text-gray-600">Calculate subnet information from IP address and CIDR notation</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="ip" className="block text-sm font-medium text-gray-700 mb-1">
                IP Address
              </label>
              <input
                type="text"
                id="ip"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 192.168.1.0"
              />
            </div>
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-gray-700 mb-1">
                Subnet Mask / CIDR
              </label>
              <input
                type="number"
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(Number(e.target.value))}
                min="0"
                max="32"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 24"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Network className="w-5 h-5" />
            Calculate
          </button>
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Valid IP Range</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.ipRange}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of Subnets</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.numSubnets.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Valid IPs per Subnet</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.ipsPerSubnet.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Network IP</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.networkIP}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Broadcast IP</h3>
                  <p className="text-lg font-semibold text-gray-800">{result.broadcastIP}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;