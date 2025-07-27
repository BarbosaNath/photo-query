import { PropsWithChildren } from 'react';

export interface PillProps extends PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
