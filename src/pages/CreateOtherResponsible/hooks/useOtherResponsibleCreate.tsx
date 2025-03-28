import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import {
  formatCpf,
  formatTelefone,
  removeNonNumeric,
} from "../../../utils/masks";

interface ApiError {
  response?: {
    data?: {
      error?: string;
      criancas_vinculadas?: number[];
      criancas_sem_vinculo?: Array<{ id: number; motivo: string }>;
      total_vinculadas?: number;
      total_sem_vinculo?: number;
    };
    status?: number;
  };
  message: string;
}

export const useOtherResponsibleCreate = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [podeCheckin, setPodeCheckin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const cpfResponsavel = searchParams.get("cpf");
  const editParam = searchParams.get("edit");
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
      return;
    }

    if (!cpfResponsavel) {
      toast.error("CPF do criador não encontrado na URL.");
      return;
    }

    const cpfLimpo = removeNonNumeric(cpf);
    const telefoneLimpo = removeNonNumeric(telefone);

    const cpfResponsavelLimpo = removeNonNumeric(cpfResponsavel);

    setIsLoading(true);

    try {
      const response = await api.post("/responsible/sub", {
        nome,
        cpf: cpfLimpo,
        telefone: telefoneLimpo,
        parentesco,
        pode_fazer_checkin: podeCheckin ? 1 : 0,
        criador_cpf: cpfResponsavelLimpo,
      });

      const { total_vinculadas = 0, mensagem } = response.data;

      if (total_vinculadas > 0) {
        toast.success(
          `Sub-responsável cadastrado e vinculado a ${total_vinculadas} criança(s)!`
        );
      } else {
        toast.success("Sub-responsável cadastrado com sucesso!");
        toast.info(mensagem || "Nenhuma criança foi vinculada.");
      }

      console.log("Resposta do cadastro:", response.data);

      setTimeout(() => {
        if (editParam) {
          navigate(`/edit-my-data?cpf=${cpfResponsavelLimpo}`);
        } else {
          navigate(`/other-responsible?cpf=${cpfResponsavelLimpo}`);
        }
      }, 2000);

      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      let errorMessage = "Erro ao cadastrar responsável. Tente novamente.";

      if (apiError?.response?.status === 409) {
        if (apiError?.response?.data?.error?.includes("CPF já cadastrado")) {
          errorMessage = "Este CPF já está cadastrado para outro responsável.";
        } else if (
          apiError?.response?.data?.error?.includes("mais de um pai") ||
          apiError?.response?.data?.error?.includes("mais de uma mãe")
        ) {
          errorMessage = apiError.response.data.error;
        }
      } else if (apiError?.response?.status === 404) {
        errorMessage = "Responsável principal não encontrado.";
      } else if (apiError?.response?.data?.error) {
        errorMessage = apiError.response.data.error;
      }

      toast.error(errorMessage);
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nome,
    cpf,
    telefone,
    parentesco,
    podeCheckin,
    isLoading,
    handleSubmit,
    setNome,
    setCpf: handleCpfChange,
    setTelefone: handleTelefoneChange,
    setParentesco,
    setPodeCheckin,
    editParam,
    cpfResponsavel,
  };
};
