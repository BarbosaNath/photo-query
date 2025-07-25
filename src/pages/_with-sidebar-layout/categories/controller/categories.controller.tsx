import Categories from "../view/categories.view";
import { Route } from "..";
import { useState } from "react";
import { Category } from "@utils/dtos";

export default function CategoriesController() {
  const categories = Route.useLoaderData();
  const redirect = Route.useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setSearchValue(event.target.value);
  };

  const handleAddCategory = async (name: string) => {
    if (!name.trim()) {
      setErrorMessage("Nome da categoria não pode ser vazio.");
      return;
    }

    const newCategory = await window.electronAPI.invoke<Category>(
      "add-category",
      {
        name: name.trim(),
      },
    );

    console.log("Categoria adicionada:", newCategory);
    setErrorMessage("");
    setSearchValue("");
    redirect({ to: "." });
  };

  const handleRemoveCategory = async (id: number) => {
    if (!id) {
      setErrorMessage("ID da categoria não pode ser vazio.");
      return;
    }

    try {
      await window.electronAPI.invoke("remove-category", { id });
      console.log(`Categoria com ID ${id} removida.`);
      setErrorMessage("");
      redirect({ to: "." });
    } catch (error) {
      setErrorMessage("Erro ao remover categoria.");

      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        (error as { message: string }).message.includes(
          "FOREIGN KEY constraint failed",
        )
      ) {
        setErrorMessage(
          "Não é possível remover uma categoria que possui produtos associados.",
        );
      }
      console.error("Erro ao remover categoria:", error);
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategoryId) {
      setErrorMessage("ID da categoria não pode ser vazio.");
      return;
    }

    if (!searchValue) {
      setErrorMessage("Nome da categoria não pode ser vazio.");
      return;
    }

    try {
      await window.electronAPI.invoke("update-category", {
        id: editingCategoryId,
        newName: searchValue,
      });
      console.log(
        `Categoria com ID ${editingCategoryId} editada para: ${searchValue}`,
      );
      setEditingCategoryId(null);
      setIsEditingCategory(false);
      setSearchValue("");
      setErrorMessage("");
      redirect({ to: "." });
    } catch (error) {
      setErrorMessage("Erro ao editar categoria.");
      console.error("Erro ao editar categoria:", error);
    }
  };

  return (
    <Categories
      categories={categories.filter((category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase()),
      )}
      searchValue={searchValue}
      errorMessage={errorMessage}
      isEditingCategory={isEditingCategory}
      handleChangeSearch={handleChangeSearch}
      handleAddCategory={handleAddCategory}
      handleRemoveCategory={handleRemoveCategory}
      handleEditCategory={handleEditCategory}
      handleToggleEditCategory={(id?: number) => {
        setIsEditingCategory(!!id);
        setEditingCategoryId(id ?? null);
      }}
    />
  );
}
