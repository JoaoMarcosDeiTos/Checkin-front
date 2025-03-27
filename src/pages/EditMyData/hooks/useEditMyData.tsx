// src/pages/EditMyData/hooks/useEditMyData.ts
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { childrenProps, ResponsibleProps } from "../../../types";

export const useEditMyData = () => {
  const [searchParams] = useSearchParams();
  const cpfParam = searchParams.get("cpf");
  const [activeTab, setActiveTab] = useState("responsavel");
  const [responsaveis, setResponsaveis] = useState<ResponsibleProps[]>([]);
  const [criancas, setCriancas] = useState<childrenProps[]>([]);
  const [selectedResponsavel, setSelectedResponsavel] =
    useState<ResponsibleProps | null>(null);
  const [selectedChild, setSelectedChild] = useState<childrenProps | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false); // para responsáveis
  const [isChildDialogOpen, setIsChildDialogOpen] = useState(false); // para crianças
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [parentesco, setParentesco] = useState("");

  // Estados para edição da criança
  const [childNome, setChildNome] = useState("");
  const [childDia, setChildDia] = useState("");
  const [childMes, setChildMes] = useState("");
  const [childAno, setChildAno] = useState("");

  // Estado para armazenar o item a ser excluído (para alert dialog)
  const [deleteItem, setDeleteItem] = useState<{
    type: "responsavel" | "crianca";
    id: number;
  } | null>(null);

  // Formata a data no padrão YYYY-MM-DD a partir de dia, mês e ano (como strings)
  const formatarDataParaAPI = (
    dia: string,
    mes: string,
    ano: string
  ): string => {
    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");
    return `${ano}-${mesFormatado}-${diaFormatado}`;
  };

  // Quando um responsável é selecionado, popula os estados para edição
  useEffect(() => {
    if (selectedResponsavel) {
      setNome(selectedResponsavel.nome);
      setCpf(selectedResponsavel.cpf);
      setTelefone(selectedResponsavel.telefone);
      setParentesco(selectedResponsavel.parentesco);
    }
  }, [selectedResponsavel]);

  // Ao selecionar uma criança para edição, converte a data de nascimento (assumindo o formato "YYYY-MM-DD")
  useEffect(() => {
    if (selectedChild) {
      setChildNome(selectedChild.nome);
      // Para evitar problemas de fuso horário, fazemos o split da string
      const parts = selectedChild.data_nascimento.split("-");
      if (parts.length === 3) {
        // Converter para número e depois para string remove os zeros à esquerda
        setChildAno(String(Number(parts[0])));
        setChildMes(String(Number(parts[1])));
        setChildDia(String(Number(parts[2])));
      }
    }
  }, [selectedChild]);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      if (!cpfParam) {
        toast.error("CPF não informado na URL.");
        return;
      }
      setLoading(true);
      try {
        const response = await api.get(`/responsible/all?cpf=${cpfParam}`);
        setResponsaveis(response.data);
      } catch (error: unknown) {
        const apiError = error as { response?: { data?: { error?: string } } };
        const message =
          apiError?.response?.data?.error ||
          "Erro ao carregar responsáveis. Tente novamente.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCriancas = async () => {
      if (!cpfParam) return;
      setLoading(true);
      try {
        const response = await api.get(`/children?cpf_responsavel=${cpfParam}`);
        setCriancas(response.data);
      } catch (error: unknown) {
        const apiError = error as { response?: { data?: { error?: string } } };
        const message =
          apiError?.response?.data?.error ||
          "Erro ao carregar crianças. Tente novamente.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponsaveis();
    fetchCriancas();
  }, [cpfParam]);

  const openEditDialog = (responsavel: ResponsibleProps) => {
    setSelectedResponsavel(responsavel);
    setIsDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedResponsavel(null);
    setIsDialogOpen(false);
  };

  const saveResponsavel = async () => {
    if (selectedResponsavel) {
      try {
        // Remove os caracteres não numéricos do CPF antes de enviar
        const cpfSemMascara = cpf.replace(/\D/g, "");
        const data = {
          ...selectedResponsavel,
          nome,
          cpf: cpfSemMascara,
          telefone,
          parentesco,
        };
        await api.put(`/responsible/${data.id}`, data);
        toast.success("Dados atualizados com sucesso.");
        closeEditDialog();
        setResponsaveis((prev) =>
          prev.map((resp) => (resp.id === data.id ? data : resp))
        );
      } catch (error: unknown) {
        const apiError = error as { response?: { data?: { error?: string } } };
        const message =
          apiError?.response?.data?.error ||
          "Erro ao atualizar dados. Tente novamente.";
        toast.error(message);
      }
    }
  };

  const openChildEditDialog = (child: childrenProps) => {
    setSelectedChild(child);
    setIsChildDialogOpen(true);
  };

  const closeChildEditDialog = () => {
    setSelectedChild(null);
    setIsChildDialogOpen(false);
  };

  const saveChild = async () => {
    if (selectedChild) {
      try {
        const data = {
          ...selectedChild,
          nome: childNome,
          data_nascimento: formatarDataParaAPI(childDia, childMes, childAno),
        };
        await api.put(`/children/${data.id}`, data);
        toast.success("Dados da criança atualizados com sucesso.");
        setCriancas((prev) => prev.map((c) => (c.id === data.id ? data : c)));
        closeChildEditDialog();
      } catch (error: unknown) {
        const apiError = error as { response?: { data?: { error?: string } } };
        const message =
          apiError?.response?.data?.error ||
          "Erro ao atualizar dados da criança. Tente novamente.";
        toast.error(message);
      }
    }
  };

  const handleDeleteResponsible = async (id: number) => {
    try {
      await api.delete(`/responsible/${id}`);
      toast.success("Responsável deletado com sucesso.");
      setResponsaveis((prev) => prev.filter((resp) => resp.id !== id));
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { error?: string } } };
      const message =
        apiError?.response?.data?.error || "Erro ao deletar responsável.";
      toast.error(message);
    }
  };

  const handleDeleteChild = async (id: number) => {
    try {
      await api.delete(`/children/${id}`);
      toast.success("Criança deletada com sucesso.");
      setCriancas((prev) => prev.filter((child) => child.id !== id));
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { error?: string } } };
      const message =
        apiError?.response?.data?.error || "Erro ao deletar criança.";
      toast.error(message);
    }
  };

  const handleNavigateToNewResponsible = () => {
    if (cpfParam) {
      navigate(`/create-other-responsible?cpf=${cpfParam}&edit=true`);
    } else {
      navigate("/create-other-responsible");
    }
  };

  const handleNavigateToChildRegistration = () => {
    if (cpfParam) {
      navigate(`/create-child?cpf=${cpfParam}&edit=true`);
    } else {
      navigate("/create-child");
    }
  };

  return {
    cpf,
    nome,
    loading,
    criancas,
    cpfParam,
    telefone,
    activeTab,
    parentesco,
    responsaveis,
    isDialogOpen,
    selectedResponsavel,
    setCpf,
    setNome,
    navigate,
    setTelefone,
    setActiveTab,
    setParentesco,
    openEditDialog,
    closeEditDialog,
    saveResponsavel,
    handleNavigateToNewResponsible,
    handleNavigateToChildRegistration,
    // Estados e funções para edição da criança
    selectedChild,
    isChildDialogOpen,
    childNome,
    childDia,
    childMes,
    childAno,
    setChildNome,
    setChildDia,
    setChildMes,
    setChildAno,
    openChildEditDialog,
    closeChildEditDialog,
    saveChild,
    handleDeleteResponsible,
    handleDeleteChild,
    // Estado e função para controle do Alert Dialog de exclusão
    deleteItem,
    setDeleteItem,
    // Também retornamos a função de atualização de listas se necessário (opcional)
  };
};
