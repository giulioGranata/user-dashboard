import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { UserDetailPanel } from './UserDetailPanel';
import type { UserSummary } from '../types/user';
import styles from './UserDetailModal.module.css';

interface UserDetailModalProps {
  user: UserSummary;
  onClose: () => void;
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Save previous active element for focus restoration
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: Tab key handling
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    // Focus the close button on mount
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Restore focus to previous active element
      previousActiveElementRef.current?.focus();
    };
  }, [onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div 
      className={styles.backdrop} 
      role="presentation" 
      onClick={onClose}
      onKeyDown={(e) => {
        // Close on Escape is handled in useEffect
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-profile-title"
        aria-describedby="user-profile-details"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 id="user-profile-title" className={styles.title}>
            {user.fullName}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close user details"
          >
            <span aria-hidden="true">✕</span>
            <span className="visuallyHidden">Close</span>
          </button>
        </div>
        <UserDetailPanel user={user} isLoading={false} />
      </div>
    </div>,
    document.body
  );
}
