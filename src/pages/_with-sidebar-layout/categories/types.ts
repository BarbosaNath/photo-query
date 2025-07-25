import { Category } from "@utils/dtos";

export interface CategoryProps {
  categories: Array<Category>;
  searchValue: string;
  errorMessage: string;
  isEditingCategory: boolean;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCategory: (name: string) => void;
  handleRemoveCategory: (id: number) => void;
  handleEditCategory: () => void;
  handleToggleEditCategory: (id?: number) => void;
}

export interface CategoryRowProps {
  name: string;
  handleRemoveCategory: () => void;
  handleEditCategory: () => void;
}
