'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ModalContent {
  id: string;
  title: string;
  component: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

interface ModalContextType {
  isOpen: boolean;
  content: ModalContent | null;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ModalContent | null>(null);

  const openModal = (newContent: ModalContent) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setContent(null), 300); // Wait for animation
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}
