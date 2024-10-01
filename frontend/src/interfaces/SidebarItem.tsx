import React from "react";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  onClick: () => void;
  badge?: string
}

