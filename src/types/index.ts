import React from 'react';

// Common Types
export interface Position {
  x: number;
  y: number;
}

export interface ScreenSize {
  width: number;
  height: number;
}

// Project Types
export interface ProjectImage {
  src: string;
  caption: string;
  type?: string; // Allow any string, not just literal types
  placeholder?: boolean;
}

export interface ProjectSection {
  title: string;
  content: string;
  images?: ProjectImage[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  highlights: string;
  image: string;
  technologies?: string[];
  sections?: ProjectSection[];
  duration?: string;
  status?: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  features?: string[];
  responsibilities?: string[];
  challenges?: Array<{
    problem: string;
    solution: string;
  }>;
}

// App/Window Types
export interface AppWindow {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  position: Position;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  width?: number;
  height?: number;
  componentProps?: any;
}

// Component Props Types
export interface XpWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isActive: boolean;
  isMaximized?: boolean;
  initialPosition?: Position;
  zIndex?: number;
  width?: number;
  height?: number;
}

export interface TaskbarProps {
  openApps: AppWindow[];
  activeApp: string | null;
  onAppClick: (appId: string) => void;
  onStartClick: () => void;
  startMenuOpen: boolean;
}

export interface XpStartMenuProps {
  userName: string;
  userIcon?: string;
  onAppClick: (appId: string) => void;
  onShutdown: () => void;
  onClose: () => void;
}

export interface XpSplashScreenProps {
  userName?: string;
  userIcon?: string;
  onLogin?: () => void;
  logoSrc?: string;
}

export interface CrtShutdownOverlayProps {
  onComplete?: () => void;
}

export interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

export interface ProjectDetailsProps {
  project: Project;
}

export interface ImageGalleryProps {
  images: ProjectImage[];
}

export type ViewType = 'login' | 'desktop';
export type StatusType = '' | 'sending' | 'success' | 'error';
export type Phase = 'shutdown' | 'black' | 'poweron' | 'complete';
