import Input from '@components/input';
import Stack from '@components/stack';
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
    </Stack>
  );
}
