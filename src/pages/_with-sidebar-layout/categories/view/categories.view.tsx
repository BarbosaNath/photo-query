import Button from "@components/button";
import CenterLayout from "@components/center-layout";
import Input from "@components/input";
import Stack from "@components/stack";
import { PlusIcon } from "lucide-react";
import CategoryRow from "../components/category-row";
import { CategoryProps } from "../types";
import Text from "@components/text";
import Modal from "@components/modal";
import Card from "@components/card";
import ButtonLayout from "@components/button-layout";

export default function Categories({
  categories,
  searchValue,
  errorMessage,
  isEditingCategory,
  handleChangeSearch,
  handleAddCategory,
  handleRemoveCategory,
  handleEditCategory,
  handleToggleEditCategory,
}: CategoryProps) {
  return (
    <>
      <Modal
        isOpen={isEditingCategory}
        onClose={() => handleToggleEditCategory()}
      >
        <Card>
          <Stack space="xl" align="stretch" fullWidth>
            <Text secondary size="lg" weight="bold">
              Editar Categoria
            </Text>

            <Input
              label="Novo nome da categoria"
              placeholder="Digite o novo nome"
              value={searchValue}
              onChange={handleChangeSearch}
            />

            <ButtonLayout
              fullWidth
              primaryButton={
                <Button primary onClick={() => handleEditCategory()}>
                  Salvar
                </Button>
              }
              secondaryButton={
                <Button secondary onClick={() => handleToggleEditCategory()}>
                  Fechar
                </Button>
              }
            />
          </Stack>
        </Card>
      </Modal>
      <CenterLayout title="Categorias" width={80} justify="start">
        <Stack fullWidth align="stretch" space="xxl">
          <Stack direction="row">
            <Input
              placeholder="Digite para buscar ou adicionar"
              value={searchValue}
              onChange={handleChangeSearch}
            />
            <Button primary onClick={() => handleAddCategory(searchValue)}>
              <PlusIcon size={12} strokeWidth={4} /> ADICIONAR
            </Button>
          </Stack>

          {Boolean(errorMessage) && (
            <Text error size="xs">
              {errorMessage}
            </Text>
          )}

          <Stack>
            {categories.map((category) => (
              <CategoryRow
                key={category.name}
                name={category.name}
                handleRemoveCategory={() => handleRemoveCategory(category.id)}
                handleEditCategory={() => handleToggleEditCategory(category.id)}
              />
            ))}
          </Stack>
        </Stack>
      </CenterLayout>
    </>
  );
}
