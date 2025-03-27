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
  const cpfResponsavel = searchParams.get("cpf"); // CPF de quem está criando (pode ser sub ou principal)
  const editParam = searchParams.get("edit");
  const navigate = useNavigate();

  // Funções para lidar com máscaras
  const handleCpfChange = (value: string) => {
    setCpf(formatCpf(value));
  };

  const handleTelefoneChange = (value: string) => {
    setTelefone(formatTelefone(value));
  };

  // Função para enviar o formulário
  const handleSubmit = async () => {
    if (!nome || !cpf || !telefone || !parentesco) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!cpfResponsavel) {
      toast.error("CPF do criador não encontrado na URL.");
      return;
    }

    // Remove máscaras do CPF e telefone do novo responsável
    const cpfLimpo = removeNonNumeric(cpf);
    const telefoneLimpo = removeNonNumeric(telefone);

    // Se você quiser manter a rota atual do backend, basta manter `responsavel_principal_cpf`
    // Se você estiver implementando a lógica de "criador_cpf" que encontra o principal real,
    // renomeie para criador_cpf, conforme exemplo abaixo:
    const cpfResponsavelLimpo = removeNonNumeric(cpfResponsavel);

    setIsLoading(true);

    try {
      // Ajuste o nome do campo aqui conforme seu endpoint no backend:
      // Se o backend espera "responsavel_principal_cpf", use esse nome.
      // Se o backend vai fazer a lógica de subir na hierarquia, use "criador_cpf".
      const response = await api.post("/responsible/sub", {
        nome,
        cpf: cpfLimpo,
        telefone: telefoneLimpo,
        parentesco,
        pode_fazer_checkin: podeCheckin ? 1 : 0,
        // Caso seu backend atual espere "responsavel_principal_cpf", use isso:
        // responsavel_principal_cpf: cpfResponsavelLimpo,

        // Caso você vá implementar a lógica de subir a hierarquia, use "criador_cpf":
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
          // Ajuste a rota conforme sua necessidade
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
