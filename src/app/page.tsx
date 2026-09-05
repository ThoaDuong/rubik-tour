'use client';

import Link from 'next/link';

const quickStats = [
  { label: 'OLL Cases', value: '57', icon: '🟡', href: '/oll', colorClass: 'text-blue-600', hoverBorder: 'hover:border-blue-500' },
  { label: 'PLL Cases', value: '21', icon: '🔀', href: '/pll', colorClass: 'text-purple-600', hoverBorder: 'hover:border-purple-500' },
  { label: 'Ký hiệu', value: '16+', icon: '↔️', href: '/moves', colorClass: 'text-sky-600', hoverBorder: 'hover:border-sky-500' },
  { label: 'Đang học', value: '6', icon: '⭐', href: '/notes', colorClass: 'text-amber-600', hoverBorder: 'hover:border-amber-500' },
];

const cfopSteps = [
  {
    step: 'Cross',
    abbr: '✚',
    desc: 'Tạo dấu thập trắng ở mặt dưới',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
  },
  {
    step: 'F2L',
    abbr: 'F2L',
    desc: 'Điền 4 cặp slot dưới cùng',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    step: 'OLL',
    abbr: '🟡',
    desc: 'Làm vàng hoàn toàn mặt trên',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    step: 'PLL',
    abbr: '🔀',
    desc: 'Hoán vị các piece mặt trên',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
  },
];

export default function HomePage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto animate-fade-in pb-16">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-block bg-accent-blue/10 text-accent-blue text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
          CFOP Method
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 mb-3">
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
            className={`bg-bg-card border border-border-subtle rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-xs ${stat.hoverBorder}`}
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
              className={`border rounded-xl p-4 relative shadow-xs ${s.badgeClass}`}
            >
              {i < cfopSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg z-10">
                  →
                </div>
              )}
              <div className="text-xl mb-1.5 font-bold">{s.abbr}</div>
              <div className="text-sm font-bold">{s.step}</div>
              <div className="text-xs opacity-80 mt-1 leading-normal">{s.desc}</div>
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
                  ? 'bg-accent-blue hover:bg-blue-700 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-border-subtle shadow-xs'
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
