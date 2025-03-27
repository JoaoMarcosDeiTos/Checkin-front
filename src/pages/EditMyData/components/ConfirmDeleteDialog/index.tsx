// src/components/ConfirmDeleteDialog.tsx

import { AlertDialog } from "@radix-ui/themes";
import React from "react";
import Button from "../../../../components/Button";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirmação de exclusão",
  description = "Tem certeza que deseja excluir este item?",
  cancelText = "Cancelar",
  confirmText = "Confirmar",
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content>
        <AlertDialog.Title style={{ fontSize: 18, fontWeight: "bold" }}>
          {title}
        </AlertDialog.Title>
        <AlertDialog.Description style={{ marginTop: 10, fontSize: 15 }}>
          {description}
        </AlertDialog.Description>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 20,
          }}
        >
          <AlertDialog.Cancel>
            <Button size="lg" variant="soft" color="secondary">
              {cancelText}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={onConfirm}>
            <Button size="lg" color="danger" variant="solid">
              {confirmText}
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ConfirmDeleteDialog;
