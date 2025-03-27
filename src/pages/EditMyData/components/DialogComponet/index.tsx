import { Dialog, Flex } from "@radix-ui/themes";
import Button from "../../../../components/Button";
import { SubmitButtonWrapper } from "./style";

interface ReusableDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  title: string;
  children: React.ReactNode;
  showSaveButton?: boolean;
}

export default function DialogComponent({
  open,
  onClose,
  onSave,
  title,
  children,
  showSaveButton = true,
}: ReusableDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Flex direction="column" gap="3">
          {children}
        </Flex>
        <SubmitButtonWrapper>
          <Button variant="soft" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          {showSaveButton && <Button onClick={onSave}>Salvar</Button>}
        </SubmitButtonWrapper>
      </Dialog.Content>
    </Dialog.Root>
  );
}
