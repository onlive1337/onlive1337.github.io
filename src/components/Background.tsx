"use client"
import { memo } from 'react';

export const Background = memo(function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-md-background contain-[paint]"
    >
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
    </div>
  );
});
