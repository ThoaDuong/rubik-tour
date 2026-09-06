'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { moves, moveGroups } from '@/data/moves';
import overviewImg from '@/images/8.webp';
import {
  PlusIcon,
  Squares2X2Icon,
  SunIcon,
  ArrowsRightLeftIcon,
  ArrowRightIcon,
} from '@/components/Icons';

const MoveCard = dynamic(() => import('@/components/MoveCard'), { ssr: false });

const cfopSteps = [
  {
    step: 'Cross',
    Icon: PlusIcon,
    desc: 'Tạo dấu thập trắng ở mặt dưới',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    iconColor: 'text-slate-700',
  },
  {
    step: 'F2L',
    Icon: Squares2X2Icon,
    desc: 'Điền 4 cặp slot dưới cùng',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconColor: 'text-emerald-700',
  },
  {
    step: 'OLL',
    Icon: SunIcon,
    desc: 'Làm vàng hoàn toàn mặt trên (57 cases)',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    iconColor: 'text-amber-600',
  },
  {
    step: 'PLL',
    Icon: ArrowsRightLeftIcon,
    desc: 'Hoán vị các piece mặt trên (21 cases)',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
    iconColor: 'text-purple-700',
  },
];

export default function HomePage() {
  const [activeGroup, setActiveGroup] = useState('basic');

  const filteredMoves = moves.filter((m) => m.group === activeGroup);

  return (
    <div className="animate-fade-in pb-16">
      {/* Header & Section Phương pháp CFOP */}
      <div className="p-6 md:p-10 pb-0">
        <div className="inline-block bg-accent-blue/10 text-accent-blue text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
          Tổng quan phương pháp
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-2">
          Phương pháp CFOP
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl leading-relaxed mb-6">
          Phương pháp giải Rubik 3x3 nâng cao phổ biến nhất thế giới: Cross → F2L → OLL → PLL.
        </p>

        {/* 4 bước CFOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cfopSteps.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div
                key={s.step}
                className={`border rounded-xl p-4 relative shadow-xs ${s.badgeClass}`}
              >
                {i < cfopSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-border-subtle items-center justify-center shadow-xs">
                    <ArrowRightIcon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                )}
                <div className="mb-2">
                  <Icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <div className="text-sm font-bold">{s.step}</div>
                <div className="text-xs opacity-80 mt-1 leading-normal">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border-subtle mx-6 md:mx-10 my-2" />

      {/* Section Ký hiệu & Chiều quay */}
      <div id="moves" className="pt-4">
        <div className="px-6 md:px-10">
          <div className="text-accent-blue text-[11px] font-bold tracking-widest uppercase mb-1">
            Quy ước
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            Ký hiệu & Chiều quay
          </h2>
          <p className="text-text-secondary text-sm mt-1.5 max-w-xl">
            Các ký hiệu tiêu chuẩn trong công thức Rubik — xem chiều quay bằng sơ đồ ảnh 2D và minh hoạ 3D tương tác.
          </p>
        </div>

        {/* Sơ đồ tổng quan toàn bộ ký hiệu (Image 8.webp) */}
        <div className="px-6 md:px-10 pt-6">
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Sơ đồ tổng quan tất cả ký hiệu & chiều quay
                </h3>
              </div>
              <span className="text-[11px] text-text-muted font-medium">
                6 mặt cơ bản • 2 tầng (wide) • Xoay khối (x, y, z) • Lớp giữa (M, E, S)
              </span>
            </div>

            <div className="bg-slate-50/90 rounded-xl p-4 border border-border-subtle flex justify-center items-center overflow-hidden">
              <Image
                src={overviewImg}
                alt="Tổng hợp các ký hiệu Rubik và quy ước chiều quay"
                priority
                className="w-full max-w-2xl h-auto object-contain rounded-lg shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="px-6 md:px-10 pt-6 flex items-center gap-2 flex-wrap">
          {moveGroups.map((g) => {
            const isActive = activeGroup === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 ${isActive
                    ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan shadow-xs'
                    : 'bg-white border-border-subtle text-text-secondary hover:border-accent-cyan hover:text-text-primary'
                  }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Move grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 md:p-10 pt-6">
          {filteredMoves.map((move) => (
            <MoveCard key={move.symbol} move={move} />
          ))}
        </div>
      </div>
    </div>
  );
}
