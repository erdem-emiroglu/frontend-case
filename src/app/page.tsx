import RickAndMortySelect from "@/components/Select/RickAndMortySelect";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main>
            <div className={styles.page}>
                <RickAndMortySelect />
            </div>
        </main>
    );
}
