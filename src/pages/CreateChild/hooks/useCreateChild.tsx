import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";

type Crianca = {
  nome: string;
  dia: number | "";
  mes: number | "";
  ano: number | "";
};

export const useCreateChild = () => {
  const [searchParams] = useSearchParams();
  const editParams = searchParams.get("edit");
  const responsavel_cpf = searchParams.get("cpf");
  const navigate = useNavigate();

  const [criancas, setCriancas] = useState<Crianca[]>([
    { nome: "", dia: "", mes: "", ano: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const adicionarCrianca = () => {
    setCriancas([...criancas, { nome: "", dia: "", mes: "", ano: "" }]);
  };

  const removerCrianca = (index: number) => {
    const novaLista = criancas.filter((_, i) => i !== index);
    setCriancas(novaLista);
  };

  const editarCrianca = (
    index: number,
    campo: keyof Crianca,
    valor: string | number
  ) => {
    const novaLista = [...criancas];
    novaLista[index][campo] = valor as never;
    setCriancas(novaLista);
  };

  const formatarDataParaAPI = (
    dia: number,
    mes: number,
    ano: number
  ): string => {
    const diaFormatado = String(dia).padStart(2, "0");
    const mesFormatado = String(mes).padStart(2, "0");
    return `${ano}-${mesFormatado}-${diaFormatado}`;
  };

  const validarData = (dia: number, mes: number, ano: number): boolean => {
    const data = new Date(ano, mes - 1, dia);
    return (
      data.getFullYear() === ano &&
      data.getMonth() === mes - 1 &&
      data.getDate() === dia &&
      data <= new Date()
    );
  };

  const handleSubmit = async () => {
    if (!responsavel_cpf) {
      toast.error("CPF do responsável não informado.");
      return navigate("/");
    }

    const payload = criancas.map((crianca) => {
      if (!crianca.nome || !crianca.dia || !crianca.mes || !crianca.ano) {
        toast.error("Preencha todos os campos antes de continuar.");
        throw new Error("Campos incompletos");
      }

      if (
        !validarData(
          Number(crianca.dia),
          Number(crianca.mes),
          Number(crianca.ano)
        )
      ) {
        toast.error("Data de nascimento inválida");
        throw new Error("Data inválida");
      }

      return {
        nome: crianca.nome,
        data_nascimento: formatarDataParaAPI(
          Number(crianca.dia),
          Number(crianca.mes),
          Number(crianca.ano)
        ),
        responsavel_cpf,
      };
    });

    try {
      setIsLoading(true);
      const response = await api.post("/children/batch", payload);
      toast.success("Crianças cadastradas com sucesso!");
      console.log("Resposta:", response.data);
      if (editParams) {
        setTimeout(
          () => navigate(`/edit-my-data?cpf=${responsavel_cpf}`),
          1500
        );
      } else {
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    criancas,
    isLoading,
    adicionarCrianca,
    removerCrianca,
    editarCrianca,
    handleSubmit,
    editParams,
    responsavel_cpf,
  };
};
