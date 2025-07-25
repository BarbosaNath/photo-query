import Card from '@components/card';
import Text from '@components/text';
import Stack from '@components/stack';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { RowCardProps } from './types';

export default function RowCard({
  title,
  handleRemove,
  handleEdit,
}: RowCardProps) {
  return (
    <Stack direction="row" align="stretch" fullWidth space="sm">
      <Card
        padding="lg"
        radius="md"
        fullWidth
        style={{ userSelect: 'none', cursor: 'default' }}
      >
        <Text weight="medium" size="md">
          {title}
        </Text>
      </Card>

      {handleRemove && (
        <Card
          padding="lg"
          radius="md"
          onClick={handleRemove}
          style={{ userSelect: 'none', cursor: 'pointer' }}
        >
          <TrashIcon size={16} />
        </Card>
      )}

      {handleEdit && (
        <Card
          padding="lg"
          radius="md"
          onClick={handleEdit}
          style={{ userSelect: 'none', cursor: 'pointer' }}
        >
          <PencilIcon size={16} />
        </Card>
      )}
    </Stack>
  );
}
