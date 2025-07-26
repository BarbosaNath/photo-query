import { CSSProperties, PropsWithChildren } from 'react';

export interface PrimaryButtonProps extends PropsWithChildren {
  primary: true;
  secondary?: never;
  onClick: () => void;
  fake?: never;
  type?: 'button';
  disabled?: boolean;
  link?: never;
  href?: never;
  target?: never;
  style?: CSSProperties;
}

export interface PrimaryFormButtonProps extends PropsWithChildren {
  primary: true;
  secondary?: never;
  onClick?: never;
  fake?: never;
  type: 'submit' | 'reset';
  disabled?: boolean;
  link?: never;
  href?: never;
  target?: never;
  style?: CSSProperties;
}

export interface SecondaryButtonProps extends PropsWithChildren {
  primary?: never;
  secondary: true;
  onClick: () => void;
  fake?: never;
  type?: 'button';
  disabled?: boolean;
  link?: never;
  href?: never;
  target?: never;
  style?: CSSProperties;
}

export interface SecondaryFormButtonProps extends PropsWithChildren {
  primary?: never;
  secondary: true;
  onClick?: never;
  fake?: never;
  type: 'submit' | 'reset';
  disabled?: boolean;
  link?: never;
  href?: never;
  target?: never;
  style?: CSSProperties;
}

interface LinkButtonOnClickProps extends PropsWithChildren {
  primary?: never;
  secondary?: never;
  link: true;
  onClick: () => void;
  fake?: never;
  type?: never;
  disabled?: never;
  href?: never;
  target?: '_blank' | '_self' | '_parent' | '_top';
  style?: CSSProperties;
}

interface LinkButtonHrefProps extends PropsWithChildren {
  primary?: never;
  secondary?: never;
  link: true;
  onClick: never;
  fake?: never;
  type?: never;
  disabled?: never;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  style?: CSSProperties;
}

export interface FakeButtonProps extends PropsWithChildren {
  primary?: boolean;
  secondary?: boolean;
  onClick?: never;
  fake: true;
  type?: never;
  disabled?: boolean;
  link?: boolean;
  href?: never;
  target?: never;
  style?: CSSProperties;
}

export type ButtonProps =
  | FakeButtonProps
  | LinkButtonOnClickProps
  | LinkButtonHrefProps
  | SecondaryFormButtonProps
  | SecondaryButtonProps
  | PrimaryFormButtonProps
  | PrimaryButtonProps;
