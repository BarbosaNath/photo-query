import { ReactNode } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';

export interface PillProps extends PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  hoverColor?: 'success' | 'error' | 'warning' | 'default';
  hoverComponent?: ReactNode;
  onClick?: () => void;
}
