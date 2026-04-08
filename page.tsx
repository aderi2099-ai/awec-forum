import React from 'react';

export default function ForumPage() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#fbbf24' }}>AWEC FORUM</div>
        <button style={{ backgroundColor: '#fbbf24', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>报名参加</button>
      </nav>
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ color: '#fbbf24', marginBottom: '20px', fontSize: '14px' }}>● 2026年6月10日 | 中国·深圳</div>
        <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.2' }}>
          全球 AI 创始人大赛论坛<br/>
          <span style={{ color: '#fbbf24' }}>暨亚洲 WEB3 精英俱乐部成立仪式</span>
        </h1>
        <p style={{ color: '#888', fontSize: '20px', marginTop: '20px' }}>连接数字经济 · 重构产业新局</p>
        <div style={{ marginTop: '40px' }}>
          <button style={{ backgroundColor: '#fbbf24', padding: '15px 30px', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>立即报名参会</button>
        </div>
      </div>
    </div>
  );
}
