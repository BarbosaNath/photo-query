import IconButton from "@components/icon-button";
import IconLink from "@components/icon-link";
import Modal from "@components/modal";
import Stack from "@components/stack";
import { PlusIcon, HomeIcon, LayersIcon } from "lucide-react";
import { useCallback, useState } from "react";
import "./sidebar.css";
import Card from "@components/card";

export default function Sidebar() {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const baseClass = "lds--sidebar";

  const handleToggleAddTransaction = useCallback(() => {
    setIsAddTransactionOpen((previousIsOpen) => !previousIsOpen);
  }, []);

  return (
    <>
      <Modal isOpen={isAddTransactionOpen} onClose={handleToggleAddTransaction}>
        <Card />
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
            onClick={handleToggleAddTransaction}
          >
            Adicionar Transação
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
