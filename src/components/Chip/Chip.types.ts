import { ReactNode } from 'react';

export type ChipProps = {
  text?: ReactNode;
  onDelete?: () => void;
};
