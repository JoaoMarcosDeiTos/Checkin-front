import { Text, Select, Checkbox } from "@radix-ui/themes";
import Button from "../../components/Button";
import {
  FormContainer,
  StyledInput,
  StyledSelectTrigger,
  StyledSelectItem,
  CheckboxWrapper,
  SubmitButtonWrapper,
} from "./style";
import { useOtherResponsibleCreate } from "./hooks/useOtherResponsibleCreate";
import BackgroundGlobal from "../../components/BackgroundGlobal";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";

export default function CreateOtherResponsible() {
  const navigate = useNavigate();
  const {
    nome,
    cpf,
    telefone,
    parentesco,
    podeCheckin,
    isLoading,
    handleSubmit,
    setNome,
    setCpf,
    setTelefone,
    setParentesco,
    setPodeCheckin,
    editParam,
    cpfResponsavel,
  } = useOtherResponsibleCreate();

  return (
    <FormContainer align="center" justify="center">
      <BackgroundGlobal />
      <CardComponent>
        <Text size="6" weight="bold" align="center">
          Cadastro de Responsável Adicional
        </Text>

        <StyledInput
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <StyledInput
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <StyledInput
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <Select.Root value={parentesco} onValueChange={setParentesco}>
          <StyledSelectTrigger placeholder="Grau de parentesco" />
          <Select.Content>
            <StyledSelectItem value="father">Pai</StyledSelectItem>
            <StyledSelectItem value="mother">Mãe</StyledSelectItem>
            <StyledSelectItem value="grandfather">Avô</StyledSelectItem>
            <StyledSelectItem value="grandmother">Avó</StyledSelectItem>
          </Select.Content>
        </Select.Root>

        <CheckboxWrapper>
          <Checkbox
            checked={podeCheckin}
            onCheckedChange={(checked) => setPodeCheckin(!!checked)}
          />
          <Text>Pode realizar checkin</Text>
        </CheckboxWrapper>

        <SubmitButtonWrapper>
          <Button
            size="lg"
            color="secondary"
            variant="soft"
            fullWidth
            onClick={() =>
              editParam
                ? navigate(`/edit-my-data?cpf=${cpfResponsavel}`)
                : navigate("/")
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
            Cadastrar
          </Button>
        </SubmitButtonWrapper>
      </CardComponent>
    </FormContainer>
  );
}
