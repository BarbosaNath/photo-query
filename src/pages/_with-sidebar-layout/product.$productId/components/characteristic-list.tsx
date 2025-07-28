import Stack from '@components/stack';
import Text from '@components/text';
import Pill from '@components/pill';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { CharacteristicListProps } from '../types';

export default function CharacteristicList({
  characteristics,
  onAddCharacteristic: handleAddCharacteristic,
  onRemoveCharacteristic: handleRemoveCharacteristic,
}: CharacteristicListProps) {
  return (
    <Stack space="xs" direction="row" align="center" fullWidth wrap>
      <Text>Caracteristicas: </Text>

      {characteristics!.map((c) => (
        <Pill
          key={c.characteristicId}
          hoverColor="error"
          hoverComponent={
            <>
              {c.characteristicName}
              {c.subcharacteristicName
                ? `: ${c.subcharacteristicName}`
                : ''}{' '}
              <TrashIcon size={10} strokeWidth={2.5} />
            </>
          }
          onClick={() =>
            handleRemoveCharacteristic(
              c.characteristicId,
              c.subcharacteristicId,
            )
          }
        >
          {c.characteristicName}
          {c.subcharacteristicName ? `: ${c.subcharacteristicName}` : ''}
        </Pill>
      ))}

      <Pill hoverColor="success" onClick={handleAddCharacteristic}>
        <PlusIcon size={12} />
      </Pill>
    </Stack>
  );
}
