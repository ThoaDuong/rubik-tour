'use client';

import Link from 'next/link';

const quickStats = [
  { label: 'OLL Cases', value: '57', icon: '🟡', href: '/oll', color: 'var(--accent-blue)' },
  { label: 'PLL Cases', value: '21', icon: '🔀', href: '/pll', color: 'var(--accent-purple)' },
  { label: 'Ký hiệu', value: '16+', icon: '↔️', href: '/moves', color: 'var(--accent-cyan)' },
  { label: 'Đang học', value: '6', icon: '⭐', href: '/notes', color: 'var(--accent-orange)' },
];

const cfopSteps = [
  {
    step: 'Cross',
    abbr: '✚',
    desc: 'Tạo dấu thập trắng ở mặt dưới',
    color: '#f1f5f9',
    bg: 'rgba(241,245,249,0.1)',
  },
  {
    step: 'F2L',
    abbr: 'F2L',
    desc: 'Điền 4 cặp slot dưới cùng',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
  },
  {
    step: 'OLL',
    abbr: '🟡',
    desc: 'Làm vàng hoàn toàn mặt trên',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
  },
  {
    step: 'PLL',
    abbr: '🔀',
    desc: 'Hoán vị các piece mặt trên',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.1)',
  },
];

export default function HomePage() {
  return (
    <div style={{ padding: '40px', maxWidth: 1000 }}>
      {/* Hero */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--accent-blue-dim)',
          color: 'var(--accent-blue)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '4px 12px',
          borderRadius: 20,
          marginBottom: 16,
        }}>
          CFOP Method
        </div>
        <h1 style={{
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.2,
          background: 'linear-gradient(135deg, #e8eaf6 0%, #9095b0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 12,
        }}>
          Rubik Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500 }}>
          Công thức OLL, PLL và ký hiệu chiều quay — tất cả trong một trang, với minh hoạ 3D tương tác.
        </p>
      </div>

      {/* Quick stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        marginBottom: 48,
      }}>
        {quickStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = stat.color;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, letterSpacing: '-0.03em' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CFOP Steps */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          Phương pháp CFOP
        </h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {cfopSteps.map((s, i) => (
            <div
              key={s.step}
              style={{
                flex: 1,
                background: s.bg,
                border: `1px solid ${s.color}33`,
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                position: 'relative',
              }}
            >
              {i < cfopSteps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: -18,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: 20,
                  zIndex: 2,
                }}>
                  →
                </div>
              )}
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.abbr}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.step}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          Bắt đầu nhanh
        </h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { href: '/notes', label: '📝 Xem công thức đang học', primary: true },
            { href: '/oll', label: '🟡 Thư viện OLL' },
            { href: '/pll', label: '🔀 Thư viện PLL' },
            { href: '/moves', label: '↔️ Ký hiệu chiều quay' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                background: link.primary ? 'var(--accent-blue)' : 'var(--bg-card)',
                color: link.primary ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${link.primary ? 'transparent' : 'var(--border-color)'}`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
