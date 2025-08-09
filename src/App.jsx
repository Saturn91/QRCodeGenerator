
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
    <>
    <div className="container">
      <h1>QR Code Generator</h1>
      
      <div style={{ marginTop: '32px', width: "100%" }}>
        {!link ?
          <div style={{ width: '100%' }}>
            <input
              type="text"
              placeholder="Enter a link..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ width: 'calc(100% - 32px)', padding: '8px 16px', display: "block", marginBottom: "12px", fontSize: '16px' }}
            />
                <button onClick={handleApply} style={{ width: '100%', padding: '8px 16px', fontSize: '16px', display: "block" }}>
              Generate
            </button>
          </div> : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <QRCodeSVG id="qr-svg" value={link} size={256} />
            <p style={{ color: 'black' }}>{link.length > 32 ? link.slice(0, 32) + '...' : link}</p>
            <button
              style={{ marginTop: '20px', padding: '8px 16px', fontSize: '16px', width: '100%', display: "inline-block" }}
              onClick={() => {
                const svg = document.getElementById('qr-svg');
                if (!svg) return;
                const serializer = new XMLSerializer();
                const svgStr = serializer.serializeToString(svg);
                const img = new Image();
                const svg64 = btoa(unescape(encodeURIComponent(svgStr)));
                img.src = 'data:image/svg+xml;base64,' + svg64;
                img.onload = function() {
                  const canvas = document.createElement('canvas');
                  canvas.width = 256;
                  canvas.height = 256;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  const jpgUrl = canvas.toDataURL('image/jpeg');
                  const a = document.createElement('a');
                  a.href = jpgUrl;
                  a.download = 'qr-code.jpg';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                };
              }}
            >
              Save QR as JPG
            </button>
            <button onClick={() => {
              setLink('');
              setInput('');
            }} style={{ marginTop: '20px', color: "black", padding: '8px 16px', fontSize: '16px', width: '100%', display: "inline-block", background: "#f0f0f0" }}>generate another Code</button>
          </div>
        )}
      </div>
    </div>
    <footer style={{ position: 'fixed', left: 0, bottom: 0, padding: '12px 24px', color: '#fff', fontSize: '14px', background: 'transparent', zIndex: 100 }}>
      &copy; saturn91.dev
    </footer>
    </>
  );
}

export default App;
