'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    section: 'Chính',
    links: [
      { href: '/', icon: '🏠', label: 'Dashboard' },
      { href: '/notes', icon: '📝', label: 'Ghi chú', badge: 'Đang học' },
    ],
  },
  {
    section: 'Thư viện',
    links: [
      { href: '/moves', icon: '↔️', label: 'Ký hiệu & Chiều quay' },
      { href: '/oll', icon: '🟡', label: 'OLL', badge: '57' },
      { href: '/pll', icon: '🔀', label: 'PLL', badge: '21' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed top-0 left-0 w-60 h-screen bg-bg-secondary border-r border-border-subtle z-50 flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-5 pb-4 border-b border-border-subtle">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-lg mb-2.5 shadow-md">
          🎲
        </div>
        <h1 className="text-sm font-bold text-text-primary tracking-tight">Rubik Hub</h1>
        <p className="text-[11px] text-text-muted mt-0.5">Công thức & Kỹ thuật</p>
      </div>

      {/* Navigation */}
      <nav className="p-3 flex-1">
        {navItems.map((group) => (
          <div key={group.section} className="mb-3">
            <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-2 pt-2 pb-1">
              {group.section}
            </div>
            {group.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 ${
                    isActive
                      ? 'bg-accent-blue/15 text-accent-blue font-semibold shadow-sm'
                      : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                  }`}
                >
                  <span className="text-base w-5 text-center">{link.icon}</span>
                  <span className="flex-1">{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-accent-blue/20 text-accent-blue'
                          : 'bg-bg-tertiary text-text-muted'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border-subtle text-[11px] text-text-muted leading-relaxed">
        <div className="font-semibold mb-1 text-text-secondary">
          CFOP Method
        </div>
        Cross → F2L → OLL → PLL
      </div>
    </aside>
  );
}
