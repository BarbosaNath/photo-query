import Input from '@components/input';
import Stack from '@components/stack';
import { SearchBarProps } from '../types';
import Button from '@components/button';
import { Share2Icon } from 'lucide-react';

export default function SearchBar({
  searchValue,
  onChangeSearch: handleChangeSearch,
  onShare: handleShare,
}: SearchBarProps) {
  return (
    <Stack direction="row">
      <Input
        placeholder="Digite para buscar"
        value={searchValue}
        onChange={handleChangeSearch}
      />
      <Button primary onClick={handleShare}>
        <Share2Icon size={12} /> Compartilhar
      </Button>
    </Stack>
  );
}
