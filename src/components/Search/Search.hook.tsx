import _ from 'lodash';
import { useMemo, useState } from 'react';

import { SearchProps } from '@/components/Search/Search.types';

export const useSearch = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(() => _.debounce(onSearch, 300), [onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearch(newValue);
  };

  return {
    inputValue,
    handleChange,
  };
};
