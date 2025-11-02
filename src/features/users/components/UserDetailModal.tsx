import { CloseIcon } from '@/components/icons';
import type { UserSummary } from '@/features/users/types/user';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './UserDetailModal.module.css';
import { UserDetailPanel } from './UserDetailPanel';

interface UserDetailModalProps {
  user: UserSummary;
  onClose: () => void;
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  }, [onClose]);

  useEffect(() => {
    // Save previous active element for focus restoration
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      // Focus trap: Tab key handling
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
  }, [handleClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={handleClose}
      onKeyDown={(e) => {
        // Close on Escape is handled in useEffect
        if (e.key === 'Escape') {
          handleClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={clsx(styles.modal, isClosing && styles.closing)}
        role="dialog"
        aria-modal="true"
        aria-describedby="user-profile-details"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <button
            ref={closeButtonRef}
            type="button"
            className={clsx('buttonGhost', styles.closeButton)}
            onClick={handleClose}
            aria-label="Close user details"
          >
            <CloseIcon width={20} height={20} />
            <span className="visuallyHidden">Close</span>
          </button>
        </div>
        <div className={styles.content}>
          <UserDetailPanel user={user} isLoading={false} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
