import React from 'react';

export default function Web3Forum() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#fbbf24', fontSize: '48px', marginBottom: '10px' }}>亚洲数字经济论坛</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>暨亚洲WEB3精英俱乐部成立仪式</h2>
      <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '15px', display: 'inline-block' }}>
        <p style={{ color: '#fbbf24', fontWeight: 'bold' }}>📍 中国 · 深圳 | 2026年6月10日</p>
        <p style={{ color: '#888' }}>连接数字经济 · 重构产业新局</p>
      </div>
      <div style={{ marginTop: '40px' }}>
        <button style={{ backgroundColor: '#fbbf24', color: '#000', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
          立即报名 Register Now
        </button>
      </div>
    </div>
  );
}
