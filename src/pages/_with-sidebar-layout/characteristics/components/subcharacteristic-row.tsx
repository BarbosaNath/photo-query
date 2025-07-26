import Stack from '@components/stack';
import Text from '@components/text';
import { PencilOffIcon, TrashIcon, PencilIcon } from 'lucide-react';

export default function SubcharacteristicRow({
  name,
  isEditing,
  isEditingCurrent,
  onEdit: handleEdit,
  onRemove: handleRemove,
}: {
  name: string;
  isEditing: boolean;
  isEditingCurrent: boolean;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <Stack direction="row" justify="between" fullWidth>
      <Text tertiary={isEditing && !isEditingCurrent} size="sm">
        • {name}
      </Text>
      <Stack direction="row">
        {isEditing && isEditingCurrent ? (
          <PencilOffIcon
            size={12}
            strokeWidth={2.25}
            style={{ cursor: 'pointer' }}
            onClick={handleEdit}
          />
        ) : (
          <>
            <TrashIcon
              size={12}
              strokeWidth={2.25}
              style={{ cursor: 'pointer' }}
              onClick={handleRemove}
            />

            <PencilIcon
              size={12}
              strokeWidth={2.25}
              style={{ cursor: 'pointer' }}
              onClick={handleEdit}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
