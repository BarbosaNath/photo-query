export interface CategoryProps {
  categories: Array<{ name: string; id: string }>;
  searchValue: string;
  errorMessage: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCategory: (name: string) => void;
  handleRemoveCategory: (id: string) => void;
  handleEditCategory: (id: string) => void;
}

export interface CategoryRowProps {
  name: string;
  handleRemoveCategory: () => void;
  handleEditCategory: () => void;
}
