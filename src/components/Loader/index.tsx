import styles from '@/components/Loader/Loader.module.scss';
import {LoaderProps} from "@/components/Loader/Loader.types";

const Loader = ({text = "", size = "sm", withSpinner = true}: LoaderProps) => {
    return (
        <div className={styles[`loader--${size}`]} data-cy="loader">
            {withSpinner && <div className={styles[`spinner--${size}`]} data-cy="spinner"/>}
            {text && <span className={styles[`loaderText--${size}`]}>{text}</span>}
        </div>
    );
}

export default Loader;
