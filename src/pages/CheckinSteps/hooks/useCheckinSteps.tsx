import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { formatCpf, removeNonNumeric } from "../../../utils/masks";
import { childrenProps, ResponsibleProps } from "../../../types";

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
    status?: number;
  };
  message: string;
}

interface ResponsavelCriancasResponse {
  responsavel: ResponsibleProps;
  criancas: childrenProps[];
  responsaveis_principais?: Array<{ id: number; nome: string; cpf: string }>;
  total: number;
  tipo: "direto" | "sub_responsavel";
}

export const useCheckinSteps = () => {
  const [searchParams] = useSearchParams();
  const cpfParam = searchParams.get("cpf");
  const [step, setStep] = useState(1);
  const [cpf, setCpf] = useState(formatCpf(cpfParam || "") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingCpf, setIsValidatingCpf] = useState(false);
  const [responsavelEncontrado, setResponsavelEncontrado] =
    useState<ResponsibleProps | null>(null);
  const [children, setChildren] = useState<childrenProps[]>([]);
  const [selectedChildren, setSelectedChildren] = useState<number[]>([]);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [tipoResponsavel, setTipoResponsavel] = useState<
    "direto" | "sub_responsavel" | null
  >(null);

  const navigate = useNavigate();

  const handleCpfChange = (value: string) => {
    const cpfNumerico = value.replace(/\D/g, "");
    const cpfLimitado = cpfNumerico.slice(0, 11);

    const formattedCpf = cpfLimitado
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(formattedCpf);
  };

  const editarResponsavel = () => {
    const cpfLimpo = removeNonNumeric(cpf);
    if (cpfLimpo.length !== 11) {
      toast.error("CPF inválido para edição.");
      return;
    }

    navigate(`/edit-my-data?cpf=${cpfLimpo}`);
  };

  const validarCpf = async () => {
    const cpfLimpo = removeNonNumeric(cpf);
    if (cpfLimpo.length !== 11) {
      toast.error("CPF inválido. Digite o CPF completo.");
      return;
    }

    setIsValidatingCpf(true);

    try {
      const cpfLimpo = removeNonNumeric(cpf);
      console.log("CPF limpo para consulta:", cpfLimpo);

      try {
        const response = await api.get<ResponsavelCriancasResponse>(
          `/responsible/children-by-cpf/${cpfLimpo}`
        );

        console.log("Resposta da API:", response.data);

        if (response.data && response.data.responsavel) {
          setResponsavelEncontrado(response.data.responsavel);

          setTipoResponsavel(response.data.tipo);

          if (response.data.criancas && response.data.criancas.length > 0) {
            setChildren(response.data.criancas);
            setStep(2);
          } else {
            toast.warning(
              "Não foram encontradas crianças associadas a este responsável."
            );
          }
        } else {
          toast.error("Dados do responsável incompletos ou inválidos.");
        }
      } catch (error: unknown) {
        const apiError = error as ApiError;

        console.error("Erro ao buscar responsável e crianças:", error);

        if (apiError.response && apiError.response.status === 404) {
          toast.error("CPF não encontrado no sistema.");
        } else {
          const errorMessage =
            apiError.response?.data?.error ||
            "Erro ao verificar o CPF. Tente novamente.";
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      toast.error("Erro ao processar a solicitação. Tente novamente.");
      console.error("Erro geral:", error);
    } finally {
      setIsValidatingCpf(false);
    }
  };

  const voltarHome = () => {
    navigate("/");
  };

  const toggleChildSelection = (childId: number) => {
    setSelectedChildren((prev) => {
      if (prev.includes(childId)) {
        return prev.filter((id) => id !== childId);
      } else {
        return [...prev, childId];
      }
    });
  };

  const realizarCheckin = async () => {
    if (selectedChildren.length === 0) {
      toast.warning(
        "Selecione pelo menos uma criança para realizar o checkin."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/checkin", {
        responsavel_cpf: removeNonNumeric(cpf),
        responsavel_id: responsavelEncontrado?.id,
        criancas_ids: selectedChildren,
        data_hora: new Date().toISOString(),
        tipo_responsavel: tipoResponsavel,
      });

      if (response.data) {
        setCheckinSuccess(true);
        toast.success("Checkin realizado com sucesso!");
        setStep(3);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.error ||
        "Erro ao realizar checkin. Tente novamente.";

      toast.error(errorMessage);
      console.error("Erro no checkin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const voltarEtapa = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const finalizarCheckin = () => {
    navigate("/");
  };

  return {
    step,
    cpf,
    isLoading,
    isValidatingCpf,
    responsavelEncontrado,
    children,
    selectedChildren,
    checkinSuccess,
    tipoResponsavel,
    handleCpfChange,
    validarCpf,
    voltarHome,
    toggleChildSelection,
    realizarCheckin,
    voltarEtapa,
    finalizarCheckin,
    editarResponsavel,
  };
};
