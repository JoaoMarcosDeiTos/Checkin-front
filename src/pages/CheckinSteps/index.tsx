import { Text } from "@radix-ui/themes";
import { useCheckinSteps } from "./hooks/useCheckinSteps";
import Button from "../../components/Button";
import {
  Container,
  StyledInput,
  ButtonGroup,
  ChildList,
  ChildCard,
  CheckboxContainer,
  ChildInfo,
  ChildName,
  ChildAge,
  StatusMessage,
  StepIndicator,
  StepDot,
} from "./style";
import BackgroundGlobal from "../../components/BackgroundGlobal";
import { Pencil1Icon } from "@radix-ui/react-icons";
import CardComponent from "../../components/CardComponent";

export default function CheckinSteps() {
  const {
    step,
    cpf,
    isLoading,
    isValidatingCpf,
    responsavelEncontrado,
    children,
    selectedChildren,
    // checkinSuccess,
    handleCpfChange,
    validarCpf,
    voltarHome,
    toggleChildSelection,
    realizarCheckin,
    voltarEtapa,
    finalizarCheckin,
    editarResponsavel,
    // tipoResponsavel,
  } = useCheckinSteps();

  // Renderiza o indicador de etapas
  const renderStepIndicator = () => (
    <StepIndicator>
      <StepDot active={step === 1} completed={step > 1} />
      <StepDot active={step === 2} completed={step > 2} />
      <StepDot active={step === 3} completed={false} />
    </StepIndicator>
  );

  // Renderiza a primeira etapa - Validação de CPF
  const renderStep1 = () => (
    <>
      <Text size="6" weight="bold" align="center">
        Checkin
      </Text>

      <Text size="3" align="center" color="gray">
        Insira o CPF do responsável para continuar
      </Text>

      <StyledInput
        placeholder="CPF"
        value={cpf}
        onChange={(e) => handleCpfChange(e.target.value)}
      />
      <ButtonGroup direction={{ initial: "column", sm: "row" }}>
        <Button
          size="lg"
          color="primary"
          variant="ghost"
          fullWidth
          onClick={editarResponsavel}
        >
          <Pencil1Icon />
          Editar meus dados
        </Button>
      </ButtonGroup>

      <ButtonGroup direction={{ initial: "column", sm: "row" }}>
        <Button
          size="lg"
          color="secondary"
          variant="soft"
          fullWidth
          onClick={voltarHome}
        >
          Cancelar
        </Button>

        <Button
          size="lg"
          color="primary"
          fullWidth
          onClick={validarCpf}
          isLoading={isValidatingCpf}
        >
          Continuar
        </Button>
      </ButtonGroup>
    </>
  );

  // Renderiza a segunda etapa - Seleção de crianças
  const renderStep2 = () => (
    <>
      <Text size="6" weight="bold" align="center">
        Selecione as crianças
      </Text>

      {responsavelEncontrado && (
        <StatusMessage type="info">
          Responsável: {responsavelEncontrado.nome}
          {/* {tipoResponsavel === "sub_responsavel" && (
            <span> (Sub-responsável)</span>
          )} */}
        </StatusMessage>
      )}

      <Text size="3" align="center" color="gray">
        Selecione as crianças para realizar o checkin
      </Text>

      <ChildList>
        {children.map((child) => (
          <ChildCard
            key={child.id}
            isSelected={selectedChildren.includes(child.id)}
            onClick={() => toggleChildSelection(child.id)}
          >
            <CheckboxContainer>
              <input
                type="checkbox"
                checked={selectedChildren.includes(child.id)}
                onChange={() => {}} // Controlado pelo onClick do ChildCard
                style={{ width: 20, height: 20 }}
              />
            </CheckboxContainer>

            <ChildInfo>
              <ChildName>{child.nome}</ChildName>
              <ChildAge>
                {child.idade === 1 ? "1 ano" : `${child.idade} anos`}
              </ChildAge>
            </ChildInfo>
          </ChildCard>
        ))}
      </ChildList>

      <ButtonGroup direction={{ initial: "column", sm: "row" }}>
        <Button
          size="lg"
          color="secondary"
          variant="soft"
          fullWidth
          onClick={voltarEtapa}
        >
          Voltar
        </Button>

        <Button
          size="lg"
          color="primary"
          fullWidth
          onClick={realizarCheckin}
          isLoading={isLoading}
          disabled={selectedChildren.length === 0}
        >
          Realizar Checkin
        </Button>
      </ButtonGroup>
    </>
  );

  // Renderiza a terceira etapa - Confirmação
  const renderStep3 = () => (
    <>
      <Text size="6" weight="bold" align="center">
        Checkin Realizado
      </Text>

      <StatusMessage type="success">
        Checkin realizado com sucesso para {selectedChildren.length} criança
        {selectedChildren.length > 1 ? "s" : ""}!
      </StatusMessage>

      <ChildList>
        {children
          .filter((child) => selectedChildren.includes(child.id))
          .map((child) => (
            <ChildCard key={child.id} isSelected={true}>
              <ChildInfo>
                <ChildName>{child.nome}</ChildName>
                <ChildAge>
                  {child.idade === 1 ? "1 ano" : `${child.idade} anos`}
                </ChildAge>
              </ChildInfo>
            </ChildCard>
          ))}
      </ChildList>

      <Text size="3" align="center" color="gray">
        {selectedChildren.length > 1
          ? `As crianças selecionadas foram registradas, aguarde as etiquetas serem impressas, cole nas crianças e façam um ótimo culto!`
          : `A criança selecionada foi registrada, aguarde a etiqueta ser impressa, cole na criança e faça um ótimo culto!`}
      </Text>

      <Button
        size="lg"
        color="primary"
        fullWidth
        style={{ flex: "none" }}
        onClick={finalizarCheckin}
      >
        Concluir
      </Button>
    </>
  );

  // Renderiza a etapa atual
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <Container align="center" justify="center">
      <BackgroundGlobal />
      <CardComponent>
        {renderStepIndicator()}
        {renderCurrentStep()}
      </CardComponent>
    </Container>
  );
}
