import clsx from 'clsx';

import styles from '@/components/NoData/NoData.module.scss';
import { NoDataProps } from '@/components/NoData/NoData.types';

const NoData = ({ text = 'No data', variant = 'md', className }: NoDataProps) => {
  return (
    <div className={clsx(styles[`noData--${variant}`], className)} data-cy="no-data">
      {text}
    </div>
  );
};

export default NoData;
