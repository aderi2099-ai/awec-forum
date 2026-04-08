import React from 'react';

// 这是一个纯净的单页代码，直接替换你 app/page.tsx 的内容
export default function ForumPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 顶部导航 */}
      <nav className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">A</div>
          <span className="font-bold text-lg tracking-tight">AWEC FORUM</span>
        </div>
        <button className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-bold">
          报名参加 Register
        </button>
      </nav>

      {/* 主视觉区域 */}
      <main className="relative">
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          {/* 这里建议替换为你喜欢的背景图地址 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519810753478-b9dfbd3a711b?q=80&w=2000')] bg-cover bg-center opacity-60" />
          
          <div className="relative z-20 text-center px-4">
            <div className="inline-block bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full text-xs font-bold mb-4">
              ● 2026年6月25日 | 中国·香港
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              亚洲数字经济论坛<br/>
              <span className="text-yellow-500">暨亚洲WEB3精英<br/>俱乐部成立仪式</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              连接数字亚洲 · 重构产业新局
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105">
                立即报名参会 Register Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all">
                查看议程 Agenda
              </button>
            </div>
          </div>
        </div>

        {/* 论坛简介 */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-yellow-500 pl-4">关于论坛 ABOUT</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            本次论坛旨在汇聚亚洲最具影响力的 WEB3 创始人、投资者和技术先锋，共同探讨资产证券化 (RWA)、AI 安全及区块链技术在传统行业中的数字转型。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: '演讲嘉宾', value: '30+' },
              { label: '参会企业', value: '500+' },
              { label: '覆盖国家', value: '10+' },
              { label: '行业媒体', value: '100+' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-gray-900 rounded-2xl border border-gray-800">
                <div className="text-2xl font-black text-yellow-500">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-gray-900 text-center text-gray-600 text-sm">
        © 2026 ASIA WEB3 ELITE CLUB. All Rights Reserved.
      </footer>
    </div>
  );
}
