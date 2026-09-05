'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { moves, moveGroups } from '@/data/moves';
import overviewImg from '@/images/8.webp';

const MoveCard = dynamic(() => import('@/components/MoveCard'), { ssr: false });

export default function MovesPage() {
  const [activeGroup, setActiveGroup] = useState('basic');

  const filtered = moves.filter((m) => m.group === activeGroup);

  return (
    <div className="animate-fade-in pb-16">
      {/* Page Header */}
      <div className="p-6 md:p-10 pb-0">
        <div className="text-accent-blue text-[11px] font-bold tracking-widest uppercase mb-2">
          Tham khảo
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
      <div className="px-6 md:px-10 pt-5 flex items-center gap-2 flex-wrap">
        {moveGroups.map((g) => {
          const isActive = activeGroup === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 ${
                isActive
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
        {filtered.map((move) => (
          <MoveCard key={move.symbol} move={move} />
        ))}
      </div>
    </div>
  );
}
