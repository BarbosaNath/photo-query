import Button from "@components/button";
import CenterLayout from "@components/center-layout";
import Input from "@components/input";
import Stack from "@components/stack";
import { PlusIcon } from "lucide-react";
import Text from "@components/text";
import Modal from "@components/modal";
import Card from "@components/card";
import ButtonLayout from "@components/button-layout";
import RowCard from "@components/row";
import { CharacteristicProps } from "../types";

export default function Categories({
  characteristics,
  searchValue,
  errorMessage,
  isEditingCharacteristic,
  handleChangeSearch,
  handleAddCharacteristic,
  handleRemoveCharacteristic,
  handleEditCharacteristic,
  handleToggleEditCharacteristic,
}: CharacteristicProps) {
  return (
    <>
      <Modal
        isOpen={isEditingCharacteristic}
        onClose={() => handleToggleEditCharacteristic()}
      >
        <Card>
          <Stack space="xl" align="stretch" fullWidth>
            <Text secondary size="lg" weight="bold">
              Editar Característica
            </Text>

            <Input
              label="Novo nome da característica"
              placeholder="Digite o novo nome"
              value={searchValue}
              onChange={handleChangeSearch}
            />

            <ButtonLayout
              fullWidth
              primaryButton={
                <Button primary onClick={() => handleEditCharacteristic()}>
                  Salvar
                </Button>
              }
              secondaryButton={
                <Button
                  secondary
                  onClick={() => handleToggleEditCharacteristic()}
                >
                  Fechar
                </Button>
              }
            />
          </Stack>
        </Card>
      </Modal>
      <CenterLayout title="Características" width={80} justify="start">
        <Stack fullWidth align="stretch" space="xxl">
          <Stack direction="row">
            <Input
              placeholder="Digite para buscar ou adicionar"
              value={searchValue}
              onChange={handleChangeSearch}
            />
            <Button
              primary
              onClick={() => handleAddCharacteristic(searchValue)}
            >
              <PlusIcon size={12} strokeWidth={4} /> ADICIONAR
            </Button>
          </Stack>

          {Boolean(errorMessage) && (
            <Text error size="xs">
              {errorMessage}
            </Text>
          )}

          <Stack>
            {characteristics.map((characteristic) => (
              <RowCard
                key={characteristic.name}
                title={characteristic.name}
                handleRemove={() =>
                  handleRemoveCharacteristic(characteristic.id)
                }
                handleEdit={() =>
                  handleToggleEditCharacteristic(characteristic.id)
                }
              />
            ))}
          </Stack>
        </Stack>
      </CenterLayout>
    </>
  );
}
