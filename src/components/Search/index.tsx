import clsx from 'clsx';

import { useSearch } from '@/components/Search/Search.hook';
import styles from '@/components/Search/Search.module.scss';
import { SearchProps } from '@/components/Search/Search.types';


const Search = ({ onSearch, withBorder = false }: SearchProps) => {
  const { inputValue, handleChange } = useSearch({ onSearch });
  return (
    <input
      id="search"
      data-cy="search"
      className={clsx({ [styles.search]: !withBorder })}
      type="text"
      placeholder="Search..."
      value={inputValue}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default Search;
