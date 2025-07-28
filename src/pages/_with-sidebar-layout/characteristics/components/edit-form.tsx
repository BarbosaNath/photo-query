import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import Input from '@components/input';
import Stack from '@components/stack';
import Text from '@components/text';
import { useState } from 'react';

export default function EditForm({
  onClose: handleClose,
  onEditCharacteristic: handleEditCharacteristic,
}: {
  onClose: () => void;
  onEditCharacteristic: (newName: string) => void;
}) {
  const [newName, setNewName] = useState('');

  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <Card>
      <Stack space="xl" align="stretch" fullWidth>
        <Text secondary size="lg" weight="bold">
          Editar Característica
        </Text>

        <Input
          label="Novo nome da característica"
          placeholder="Digite o novo nome"
          value={newName}
          onChange={handleNewName}
        />

        <ButtonLayout
          fullWidth
          primaryButton={
            <Button primary onClick={() => handleEditCharacteristic(newName)}>
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
