import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import {
  formatCpf,
  formatTelefone,
  removeNonNumeric,
} from "../../../utils/masks";

export const useResponsibleCreate = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCpfChange = (value: string) => {
    setCpf(formatCpf(value));
  };

  const handleTelefoneChange = (value: string) => {
    setTelefone(formatTelefone(value));
  };

  const handleSubmit = async () => {
    if (!nome || !cpf || !telefone || !parentesco) {
      toast.error("Preencha todos os campos.");
      throw new Error("Preencha todos os campos.");
    }

    const cpfLimpo = removeNonNumeric(cpf);
    const telefoneLimpo = removeNonNumeric(telefone);

    setIsLoading(true);

    try {
      const response = await api.post("/responsible", {
        nome,
        cpf: cpfLimpo,
        telefone: telefoneLimpo,
        parentesco,
      });

      toast.success("Responsável cadastrado com sucesso!");
      console.log("Responsável cadastrado:", response.data);

      setTimeout(() => {
        navigate(`/other-responsible?cpf=${cpfLimpo}`);
      }, 2000);

      return response.data;
    } catch (error: unknown) {
      const apiError = error as {
        response?: {
          data?: {
            error?: string;
          };
        };
      };

      const message =
        apiError?.response?.data?.error ||
        "Erro ao cadastrar responsável. Tente novamente.";
      toast.error(message);
      console.error("Erro no cadastro:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nome,
    cpf,
    telefone,
    parentesco,
    isLoading,
    handleSubmit,
    setNome,
    setCpf: handleCpfChange,
    setTelefone: handleTelefoneChange,
    setParentesco,
  };
};
