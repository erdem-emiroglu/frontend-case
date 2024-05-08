import {NoDataProps} from "@/components/NoData/NoData.types";
import styles from "@/components/NoData/NoData.module.scss";

const NoData = ({text = 'No data', variant = "md"}: NoDataProps) => {
    return <div className={styles[`noData--${variant}`]} data-cy="no-data">{text}</div>;
}

export default NoData;
