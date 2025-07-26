import { PropsWithChildren } from 'react';

export interface RowCardProps extends PropsWithChildren {
  title: string;
  onRemove?: () => void;
  onEdit?: () => void;
  onClick?: () => void;
}
