import Stack from '@components/stack';
import Text from '@components/text';
import { Product } from '@utils/dtos';

export default function CharacteristicsList({
  characteristics,
}: {
  characteristics: Product['characteristics'];
}) {
  return (
    <Stack direction="row" space="sm" fullWidth>
      {characteristics!.map((characteristic, index) => (
        <Text tertiary size="xs" key={characteristic.characteristicId}>
          {characteristic.characteristicName}

          {characteristic.subcharacteristicName
            ? `: ${characteristic.subcharacteristicName}`
            : ''}

          {index < characteristics!.length - 1 ? ', ' : ''}
        </Text>
      ))}
    </Stack>
  );
}
