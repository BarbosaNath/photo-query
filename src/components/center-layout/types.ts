import { PropsWithChildren } from "react";

export interface CenterLayoutProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}
