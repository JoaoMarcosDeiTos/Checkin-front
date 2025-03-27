// src/pages/CreateChild/index.tsx
import { Select, Text } from "@radix-ui/themes";
import Button from "../../components/Button";
import {
  FormContainer,
  StyledInput,
  DateInputsContainer,
  DateInputLabel,
  DateSelects,
  DateSelectTrigger,
  DateSelectItem,
  SubmitButtonWrapper,
} from "./style";
import { useCreateChild } from "./hooks/useCreateChild";
import BackgroundGlobal from "../../components/BackgroundGlobal";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { useDateOfBirth } from "../../utils/dateOfBirth";
export default function CreateChild() {
  const navigate = useNavigate();
  const {
    criancas,
    isLoading,
    adicionarCrianca,
    removerCrianca,
    editarCrianca,
    handleSubmit,
    editParams,
    responsavel_cpf,
  } = useCreateChild();
  const { anos, meses, diasNoMes } = useDateOfBirth();

  return (
    <FormContainer align="center" justify="center">
      <BackgroundGlobal />
      <CardComponent>
        <Text size="6" weight="bold" align="center">
          Cadastro de Crianças
        </Text>

        {criancas.map((crianca, index) => (
          <div key={index} style={{ width: "100%", marginBottom: 32 }}>
            <StyledInput
              placeholder="Nome completo"
              value={crianca.nome}
              onChange={(e) => editarCrianca(index, "nome", e.target.value)}
            />

            <DateInputsContainer>
              <DateInputLabel>Data de Nascimento</DateInputLabel>
              <DateSelects>
                <Select.Root
                  value={crianca.dia ? String(crianca.dia) : undefined}
                  onValueChange={(val) =>
                    editarCrianca(index, "dia", val ? Number(val) : "")
                  }
                >
                  <DateSelectTrigger placeholder="Dia" />
                  <Select.Content>
                    {diasNoMes(crianca.mes, crianca.ano).map((d) => (
                      <DateSelectItem key={`dia-${d}`} value={String(d)}>
                        {d}
                      </DateSelectItem>
                    ))}
                  </Select.Content>
                </Select.Root>

                <Select.Root
                  value={crianca.mes ? String(crianca.mes) : undefined}
                  onValueChange={(val) =>
                    editarCrianca(index, "mes", val ? Number(val) : "")
                  }
                >
                  <DateSelectTrigger placeholder="Mês" />
                  <Select.Content>
                    {meses.map((m) => (
                      <DateSelectItem
                        key={`mes-${m.numero}`}
                        value={String(m.numero)}
                      >
                        {m.nome}
                      </DateSelectItem>
                    ))}
                  </Select.Content>
                </Select.Root>

                <Select.Root
                  value={crianca.ano ? String(crianca.ano) : undefined}
                  onValueChange={(val) =>
                    editarCrianca(index, "ano", val ? Number(val) : "")
                  }
                >
                  <DateSelectTrigger placeholder="Ano" />
                  <Select.Content>
                    {anos.map((a) => (
                      <DateSelectItem key={`ano-${a}`} value={String(a)}>
                        {a}
                      </DateSelectItem>
                    ))}
                  </Select.Content>
                </Select.Root>
              </DateSelects>
            </DateInputsContainer>

            {criancas.length > 1 && (
              <Button
                onClick={() => removerCrianca(index)}
                variant="soft"
                color="danger"
                size="sm"
                fullWidth
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <TrashIcon />
                Remover criança
              </Button>
            )}
          </div>
        ))}

        <SubmitButtonWrapper>
          <Button
            onClick={adicionarCrianca}
            style={{ flex: "none" }}
            fullWidth
            variant="ghost"
            size="lg"
          >
            <PlusIcon />
            Adicionar nova criança
          </Button>
        </SubmitButtonWrapper>

        <SubmitButtonWrapper>
          <Button
            size="lg"
            color="secondary"
            variant="soft"
            fullWidth
            onClick={() =>
              editParams
                ? navigate(`/edit-my-data?cpf=${responsavel_cpf}`)
                : navigate(-1)
            }
          >
            Voltar
          </Button>
          <Button
            size="lg"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Cadastrar crianças
          </Button>
        </SubmitButtonWrapper>
      </CardComponent>
    </FormContainer>
  );
}
