"use client";

import {Character, useGetCharactersQuery} from "@/graphql/generated";
import Select from "@/components/Select/base";
import {useCallback, useState} from "react";
import Image from "next/image";
import styles from "@/components/Select/RickAndMortySelect/RickAndMortySelect.module.scss";
import HighlightText from "@/components/HighlightText";

const RickAndMortySelect = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    const {data, loading, refetch: getCharacters, fetchMore, error} = useGetCharactersQuery({
        notifyOnNetworkStatusChange: true,
    });

    const fetchMoreData = async () => {
        if (!data?.characters?.info?.next) return;
        await fetchMore({
            variables: {
                page: data?.characters?.info?.next,
            }
        })
    }

    const onSearch = async (characterName: string) => {
        await getCharacters({
            filter: {
                name: characterName
            }

        })
    }

    const findIsChecked = useCallback((option: Character) => {
        return !!characters.find((val) => val.id === option.id);
    },[characters]);

    return (
        <Select
            options={data?.characters?.results as Character[]}
            value={characters}
            onChange={(val) => setCharacters(val)}
            accessor="name"
            onSearch={onSearch}
            loading={loading}
            onScrollBottom={fetchMoreData}
            multiple
        >
            {({option, search}) => (
                <div className={styles.characterContainer}>
                    <input type="checkbox" checked={findIsChecked(option)}/>
                    <Image
                        className={styles.characterImage}
                        src={option.image as string}
                        alt={option.name as string} width={50}
                        height={50}
                    />
                    <div className={styles.characterContent}>
                            <span className={styles.characterName}>
                                <HighlightText text={option.name as string} highlight={search}/>
                            </span>
                        <span className={styles.characterEpisode}>
                            {`${option.episode.length} episodes`}
                            </span>
                    </div>
                </div>
            )}
        </Select>
    )
}

export default RickAndMortySelect;
