
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [link, setLink] = useState('');

  const handleApply = () => {
    setLink(input.trim());
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter a link..."
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '300px', padding: '8px', fontSize: '16px' }}
      />
      <button onClick={handleApply} style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}>
        Apply
      </button>
      <div style={{ marginTop: '32px' }}>
        {link && (
          <QRCodeSVG value={link} size={256} />
        )}
      </div>
    </div>
  );
}

export default App;
