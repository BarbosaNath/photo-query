import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import Stack from '@components/stack';
import Text from '@components/text';
import { Characteristic } from '@utils/dtos';
import { useEffect, useState } from 'react';

export default function CharacteristicDetails({
  id,
  onClose: handleClose,
}: {
  id?: number;
  onClose: () => void;
}) {
  const [characteristic, setCharacteristic] = useState<Characteristic>({
    id: id || 0,
    name: '',
    created_at: '',
    updated_at: '',
  });

  const [subcharacteristics, setSubcharacteristics] = useState<
    { id: number; name: string; characteristic_id: number }[]
  >([]);

  useEffect(() => {
    const fetchCharacteristics = async () => {
      if (!id) return;

      const fetchedCharacteristic =
        await window.electronAPI.invoke<Characteristic>('get-characteristic', {
          id,
        });

      setCharacteristic(fetchedCharacteristic);
    };

    const fetchSubcharacteristics = async () => {
      if (!id) return;

      const fetchedSubcharacteristics = await window.electronAPI.invoke<
        { id: number; name: string; characteristic_id: number }[]
      >('get-subcharacteristics', { characteristicId: id });

      setSubcharacteristics(fetchedSubcharacteristics);
    };

    fetchCharacteristics();
    fetchSubcharacteristics();
  }, [id]);

  return (
    <Card>
      <Stack space="xl" align="stretch" fullWidth>
        <Stack space="xs">
          <Text secondary size="lg" weight="bold">
            {characteristic.name}
          </Text>

          <Text tertiary size="xs">
            Criada em: {characteristic.created_at}
          </Text>

          <Text tertiary size="xs">
            Atualizada em: {characteristic.updated_at}
          </Text>
        </Stack>

        <Stack space="sm">
          <Text secondary weight="bold">
            Subcaracterísticas:
          </Text>
          {subcharacteristics.length > 0 ? (
            subcharacteristics.map((sub) => (
              <Text key={sub.id}>• {sub.name}</Text>
            ))
          ) : (
            <Text size="md">Nenhuma subcaracterística encontrada.</Text>
          )}
        </Stack>

        <ButtonLayout
          fullWidth
          primaryButton={
            <Button primary onClick={() => {}}>
              Salvar
            </Button>
          }
          secondaryButton={
            <Button secondary onClick={() => handleClose()}>
              Fechar
            </Button>
          }
        />
      </Stack>
    </Card>
  );
}
