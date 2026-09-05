'use client';

import { useState, useEffect, useCallback } from 'react';

export type CaseStatus = 'none' | 'learning' | 'learned';

const STORAGE_KEY = 'rubik_case_status';
const EVENT_NAME = 'rubik_status_change';

// In-memory cache for immediate sync across components in the same tab
let memoryCache: Record<string, CaseStatus> | null = null;

function getStoredStatuses(): Record<string, CaseStatus> {
  if (typeof window === 'undefined') return {};
  if (memoryCache !== null) return memoryCache;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    memoryCache = data ? JSON.parse(data) : {};
    return memoryCache || {};
  } catch {
    return {};
  }
}

function saveStoredStatuses(statuses: Record<string, CaseStatus>) {
  memoryCache = statuses;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (e) {
    console.error('Error saving learning status to localStorage:', e);
  }
}

export function useLearningStatus() {
  const [statuses, setStatuses] = useState<Record<string, CaseStatus>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setStatuses(getStoredStatuses());

    const handleChange = () => {
      setStatuses({ ...getStoredStatuses() });
    };

    window.addEventListener(EVENT_NAME, handleChange);
    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener(EVENT_NAME, handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  const getStatus = useCallback(
    (caseId: string): CaseStatus => {
      if (!isMounted) return 'none';
      return statuses[caseId] || 'none';
    },
    [statuses, isMounted]
  );

  const setStatus = useCallback((caseId: string, status: CaseStatus) => {
    const current = { ...getStoredStatuses() };
    if (status === 'none') {
      delete current[caseId];
    } else {
      current[caseId] = status;
    }
    saveStoredStatuses(current);
  }, []);

  const toggleLearning = useCallback(
    (caseId: string) => {
      const current = getStoredStatuses()[caseId] || 'none';
      const next: CaseStatus = current === 'learning' ? 'none' : 'learning';
      setStatus(caseId, next);
    },
    [setStatus]
  );

  const toggleLearned = useCallback(
    (caseId: string) => {
      const current = getStoredStatuses()[caseId] || 'none';
      const next: CaseStatus = current === 'learned' ? 'none' : 'learned';
      setStatus(caseId, next);
    },
    [setStatus]
  );

  return {
    isMounted,
    statuses,
    getStatus,
    setStatus,
    toggleLearning,
    toggleLearned,
  };
}
