'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoImg from '@/images/t-rubik.png';
import { HomeIcon, SunIcon, ArrowsRightLeftIcon } from '@/components/Icons';

interface NavLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
}

interface NavSection {
  section: string;
  links: NavLink[];
}

const navItems: NavSection[] = [
  {
    section: 'Chính',
    links: [
      { href: '/', icon: HomeIcon, label: 'Ký hiệu' },
    ],
  },
  {
    section: 'Thư viện',
    links: [
      { href: '/oll', icon: SunIcon, label: 'OLL', badge: '57' },
      { href: '/pll', icon: ArrowsRightLeftIcon, label: 'PLL', badge: '21' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Navigation */}
      <header className="md:hidden sticky top-0 z-40 bg-bg-secondary/95 backdrop-blur border-b border-border-subtle px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logoImg}
            alt="T-Rubik Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg object-cover shadow-xs ring-1 ring-border-subtle"
            priority
          />
          <div>
            <span className="text-sm font-bold text-text-primary tracking-tight block leading-tight">
              T-Rubik
            </span>
            <span className="text-[10px] text-text-muted block leading-tight">
              CFOP Hub
            </span>
          </div>
        </Link>

        {/* Mobile Navigation Links */}
        <nav className="flex items-center gap-1">
          {navItems.flatMap((g) => g.links).map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActive
                  ? 'bg-accent-blue/15 text-accent-blue shadow-xs'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 w-60 h-screen bg-bg-secondary border-r border-border-subtle z-50 flex-col overflow-y-auto">
        {/* Logo */}
        <Link href="/" className="p-5 pb-4 border-b border-border-subtle flex items-center gap-3 group">
          <Image
            src={logoImg}
            alt="T-Rubik Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded object-cover shadow-md ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-200"
            priority
          />
          <div>
            <h1 className="text-base font-extrabold text-text-primary tracking-tight leading-tight group-hover:text-accent-blue transition-colors">
              T-Rubik
            </h1>
            <p className="text-[11px] text-text-muted mt-0.5 leading-tight">Công thức & Kỹ thuật</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="p-3 flex-1">
          {navItems.map((group) => (
            <div key={group.section} className="mb-3">
              <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-2 pt-2 pb-1">
                {group.section}
              </div>
              {group.links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 ${isActive
                      ? 'bg-accent-blue/15 text-accent-blue font-semibold shadow-xs'
                      : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                      }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{link.label}</span>
                    {link.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isActive
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
    </>
  );
}
