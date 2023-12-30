import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [url, setUrl] = useState('');
    const [logo, setLogo] = useState('');
    const [qrCode, setQrCode] = useState('');

    const generateQRCode = async () => {
        try {
            const response = await axios.post('https://qr-code-backend-w1k7-fzimx4zna-sooraja98.vercel.app/generate-qr', { url, logo });
            setQrCode(response.data.src);
        } catch (error) {
            console.error("Error generating QR Code:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-700 mb-6">QR Code Generator with Logo</h1>
            <div className="flex flex-col items-center w-full max-w-md">
                <input 
                    type="text" 
                    placeholder="Enter URL" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)}
                    className="px-4 py-2 mb-4 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input 
                    type="text" 
                    placeholder="Enter Logo URL" 
                    value={logo} 
                    onChange={(e) => setLogo(e.target.value)}
                    className="px-4 py-2 mb-4 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button 
                    onClick={generateQRCode}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
                >
                    Generate QR Code
                </button>
            </div>
            {qrCode && <img src={qrCode} alt="QR Code" className="mt-6 max-w-xs w-full rounded-md" />}
        </div>
    );
}

export default App;
