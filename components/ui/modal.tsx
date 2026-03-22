'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect } from 'react';
import { cn } from '@/app/lib/utils';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnBackdrop?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  closeOnBackdrop = true,
}: ModalProps) {
  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={closeOnBackdrop ? onClose : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* MODAL */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'border-border bg-background relative z-10 w-full max-w-lg rounded-2xl border shadow-xl'
            )}
          >
            {/* HEADER */}
            <div className="border-border flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-base font-semibold">{title}</h2>

              <button
                onClick={onClose}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1 transition"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
