import { BsX } from '@react-icons/all-files/bs/BsX';

import styles from '@/components/Chip/Chip.module.scss';
import { ChipProps } from '@/components/Chip/Chip.types';

const Chip = ({ text, onDelete }: ChipProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete!();
  };
  return (
    <div className={styles.chip} data-cy="chip">
      {text}
      {onDelete && (
        <button className={styles.chipDeleteBtn} onClick={handleDelete} data-cy="delete-chip">
          <BsX size={64} color="white" />
        </button>
      )}
    </div>
  );
};

export default Chip;
