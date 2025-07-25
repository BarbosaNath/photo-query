import IconButton from "@components/icon-button";
import IconLink from "@components/icon-link";
import Modal from "@components/modal";
import Stack from "@components/stack";
import { PlusIcon, HomeIcon, LayersIcon } from "lucide-react";
import { useCallback, useState } from "react";
import "./sidebar.css";
import AddProductForm from "@components/add-product-form";

export default function Sidebar() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const baseClass = "lds--sidebar";

  const handleToggleAddProduct = useCallback(() => {
    setIsAddProductOpen((previousIsOpen) => !previousIsOpen);
  }, []);

  return (
    <>
      <Modal isOpen={isAddProductOpen} onClose={handleToggleAddProduct}>
        <AddProductForm onClose={handleToggleAddProduct} />
      </Modal>

      <Stack
        as="aside"
        justify="between"
        paddingInline="md"
        paddingBlock="lg"
        className={baseClass}
      >
        <Stack space="sm" className={`${baseClass}__main-items`}>
          <IconButton
            primary
            icon={<PlusIcon />}
            onClick={handleToggleAddProduct}
          >
            Adicionar Produto
          </IconButton>

          <IconLink icon={<HomeIcon />} to="/">
            Home
          </IconLink>

          <IconLink icon={<LayersIcon />} to="/categories">
            Categorias
          </IconLink>
        </Stack>
      </Stack>
    </>
  );
}
