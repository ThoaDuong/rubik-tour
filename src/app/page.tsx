'use client';

import Link from 'next/link';

const quickStats = [
  { label: 'OLL Cases', value: '57', icon: '🟡', href: '/oll', colorClass: 'text-accent-blue', hoverBorder: 'hover:border-accent-blue' },
  { label: 'PLL Cases', value: '21', icon: '🔀', href: '/pll', colorClass: 'text-accent-purple', hoverBorder: 'hover:border-accent-purple' },
  { label: 'Ký hiệu', value: '16+', icon: '↔️', href: '/moves', colorClass: 'text-accent-cyan', hoverBorder: 'hover:border-accent-cyan' },
  { label: 'Đang học', value: '6', icon: '⭐', href: '/notes', colorClass: 'text-accent-orange', hoverBorder: 'hover:border-accent-orange' },
];

const cfopSteps = [
  {
    step: 'Cross',
    abbr: '✚',
    desc: 'Tạo dấu thập trắng ở mặt dưới',
    color: '#f1f5f9',
    badgeClass: 'bg-white/10 text-slate-100 border-white/20',
  },
  {
    step: 'F2L',
    abbr: 'F2L',
    desc: 'Điền 4 cặp slot dưới cùng',
    color: '#22c55e',
    badgeClass: 'bg-accent-green/10 text-accent-green border-accent-green/30',
  },
  {
    step: 'OLL',
    abbr: '🟡',
    desc: 'Làm vàng hoàn toàn mặt trên',
    color: '#fbbf24',
    badgeClass: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  },
  {
    step: 'PLL',
    abbr: '🔀',
    desc: 'Hoán vị các piece mặt trên',
    color: '#a855f7',
    badgeClass: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30',
  },
];

export default function HomePage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto animate-fade-in">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-block bg-accent-blue/15 text-accent-blue text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
          CFOP Method
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-[#e8eaf6] to-[#9095b0] bg-clip-text text-transparent mb-3">
          Rubik Hub
        </h1>
        <p className="text-text-secondary text-base max-w-lg leading-relaxed">
          Công thức OLL, PLL và ký hiệu chiều quay — tất cả trong một trang, với minh hoạ 3D tương tác.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {quickStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`bg-bg-card border border-border-subtle rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(79,90,255,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${stat.hoverBorder}`}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-extrabold tracking-tight ${stat.colorClass}`}>
              {stat.value}
            </div>
            <div className="text-xs text-text-secondary mt-1 font-medium">
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      {/* CFOP Steps */}
      <div className="mb-12">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
          Phương pháp CFOP
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cfopSteps.map((s, i) => (
            <div
              key={s.step}
              className={`border rounded-xl p-4 relative ${s.badgeClass}`}
            >
              {i < cfopSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-text-muted text-lg z-10">
                  →
                </div>
              )}
              <div className="text-xl mb-1.5 font-bold">{s.abbr}</div>
              <div className="text-sm font-bold">{s.step}</div>
              <div className="text-xs text-text-muted mt-1 leading-normal">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
          Bắt đầu nhanh
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/notes', label: '📝 Xem công thức đang học', primary: true },
            { href: '/oll', label: '🟡 Thư viện OLL' },
            { href: '/pll', label: '🔀 Thư viện PLL' },
            { href: '/moves', label: '↔️ Ký hiệu chiều quay' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                link.primary
                  ? 'bg-accent-blue hover:bg-indigo-600 text-white shadow-md shadow-accent-blue/20 hover:shadow-accent-blue/35'
                  : 'bg-bg-card hover:bg-bg-hover text-text-secondary hover:text-text-primary border border-border-subtle hover:border-border-active'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
