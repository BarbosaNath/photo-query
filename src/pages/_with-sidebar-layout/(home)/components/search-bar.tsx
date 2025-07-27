import Button from '@components/button';
import Input from '@components/input';
import Stack from '@components/stack';
import { SearchIcon } from 'lucide-react';
import { SearchBarProps } from '../types';

export default function SearchBar({
  searchValue,
  onChangeSearch: handleChangeSearch,
}: SearchBarProps) {
  return (
    <Stack direction="row">
      <Input
        placeholder="Digite para buscar"
        value={searchValue}
        onChange={handleChangeSearch}
      />
      <Button primary onClick={() => {}}>
        <SearchIcon size={12} strokeWidth={4} /> BUSCAR
      </Button>
    </Stack>
  );
}
