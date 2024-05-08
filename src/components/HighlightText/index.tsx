import {HighlightTextProps} from "@/components/HighlightText/HighlightText.types";
import styles from "@/components/HighlightText/HighlightText.module.scss";
import clsx from "clsx";

const HighlightText = ({ text, highlight }: HighlightTextProps) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, index) => (
                <span key={index} className={clsx(part.toLowerCase() === highlight.toLowerCase() && styles.highlighted)} data-cy={part.toLowerCase() === highlight.toLowerCase() && 'highlighted'}>
                    {part}
                </span>
            ))}
        </span>
    )
}

export default HighlightText;
