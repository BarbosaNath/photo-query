import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import Input from '@components/input';
import Stack from '@components/stack';
import Text from '@components/text';
import { Characteristic } from '@utils/dtos';
import { useEffect, useMemo, useState } from 'react';
import SubcharacteristicRow from './subcharacteristic-row';

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
  const [editingId, setEditingId] = useState<number | null>(null);
  const isEditing = useMemo(() => editingId !== null, [editingId]);
  const [newName, setNewName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSubcharacteristics = async () => {
    if (!id) return;

    const fetchedSubcharacteristics = await window.electronAPI.invoke<
      { id: number; name: string; characteristic_id: number }[]
    >('get-subcharacteristics', { characteristicId: id });

    setSubcharacteristics(fetchedSubcharacteristics);
  };

  useEffect(() => {
    const fetchCharacteristics = async () => {
      if (!id) return;

      const fetchedCharacteristic =
        await window.electronAPI.invoke<Characteristic>('get-characteristic', {
          id,
        });

      setCharacteristic(fetchedCharacteristic);
    };

    fetchCharacteristics();
    fetchSubcharacteristics();
  }, [id]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setNewName(event.target.value);
  };

  const handleEditSubcharacteristic = (subId: number) => {
    setEditingId(editingId === subId ? null : subId);
  };

  const handleSubmitEdition = async () => {
    setErrorMessage('');
    if (!newName.trim()) {
      setErrorMessage('Nome da subcaracterística não pode ser vazio.');
      return;
    }

    if (editingId) {
      await window.electronAPI.invoke('update-subcharacteristic', {
        id: editingId,
        name: newName,
        characteristicId: characteristic.id,
      });
    } else {
      await window.electronAPI.invoke('add-subcharacteristic', {
        name: newName,
        characteristicId: characteristic.id,
      });
    }

    fetchSubcharacteristics();
    setNewName('');
    setEditingId(null);
  };

  const handleRemoveSubcharacteristic = async (subId: number) => {
    setErrorMessage('');
    if (!subId) {
      setErrorMessage('ID da subcaracterística não pode ser vazio.');
      return;
    }

    try {
      await window.electronAPI.invoke('remove-subcharacteristic', {
        id: subId,
      });
      fetchSubcharacteristics();
    } catch (error) {
      console.error('Erro ao remover subcaracterística:', error);

      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        (error as { message: string }).message.includes(
          'FOREIGN KEY constraint failed',
        )
      ) {
        setErrorMessage(
          'Não é possível remover esta subcaracterística pois ela possui produtos associados.',
        );
      }
    }
  };

  return (
    <Card>
      <Stack space="xl" align="stretch" fullWidth>
        <Stack space="xs">
          <Text primary size="lg" weight="bold">
            {characteristic.name}
          </Text>

          <Text tertiary size="xs">
            Criada em: {characteristic.created_at}
          </Text>

          <Text tertiary size="xs">
            Atualizada em: {characteristic.updated_at}
          </Text>
        </Stack>

        <Stack space="md">
          <Text>Subcaracterísticas:</Text>

          {subcharacteristics.length > 0 ? (
            subcharacteristics.map((sub) => (
              <SubcharacteristicRow
                key={sub.id}
                name={sub.name}
                isEditing={isEditing}
                isEditingCurrent={editingId === sub.id}
                onEdit={() => handleEditSubcharacteristic(sub.id)}
                onRemove={() => handleRemoveSubcharacteristic(sub.id)}
              />
            ))
          ) : (
            <Text secondary size="sm">
              Nenhuma subcaracterística encontrada.
            </Text>
          )}

          <Stack space="xs">
            <ButtonLayout
              fullWidth
              primaryButton={
                <Input
                  value={newName}
                  onChange={handleChangeName}
                  placeholder={
                    isEditing
                      ? `Editar "${subcharacteristics.find((s) => s.id === editingId)?.name}"`
                      : 'Nova Subcaracterística'
                  }
                />
              }
              secondaryButton={
                <Button
                  primary
                  onClick={handleSubmitEdition}
                  style={{ width: '100px' }}
                >
                  {isEditing ? 'Salvar' : 'Adicionar'}
                </Button>
              }
            />

            {Boolean(errorMessage) && (
              <Text size="xs" error>
                {errorMessage}
              </Text>
            )}
          </Stack>
        </Stack>

        <ButtonLayout
          fullWidth
          primaryButton={
            <Button secondary onClick={() => handleClose()}>
              Fechar
            </Button>
          }
        />
      </Stack>
    </Card>
  );
}
