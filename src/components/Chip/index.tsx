import {BsX} from "@react-icons/all-files/bs/BsX";
import {ChipProps} from "@/components/Chip/Chip.types";
import styles from "@/components/Chip/Chip.module.scss";

const Chip = ({text, onDelete}: ChipProps) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete!();
    }
    return (
        <div className={styles.chip} data-cy="chip">
            {text}
            {onDelete && (
                <button className={styles.chipDeleteBtn} onClick={handleDelete} data-cy="delete-chip">
                    <BsX size={64} color="white"/>
                </button>
            )}
        </div>
    )
}

export default Chip;
