import CardComponent from "../../components/CardComponent";
import BackgroundGlobal from "../../components/BackgroundGlobal";
import {
  CardResp,
  Container,
  ContainerResp,
  DateInputLabel,
  DateInputsContainer,
  DateSelects,
  DateSelectItem,
  DateSelectTrigger,
  StyledInput,
  StyledSelectItem,
  StyledSelectTrigger,
  SubmitButtonWrapper,
  TabsContainer,
  TabsTrigger,
} from "./style";
import { useEditMyData } from "./hooks/useEditMyData";
import { Box, Text, Select, IconButton } from "@radix-ui/themes";
import { formatCpf } from "../../utils/masks";
import { formatTelefone } from "../../utils/masks";
import DialogComponent from "./components/DialogComponet";
import Button from "../../components/Button";
import { useDateOfBirth } from "../../utils/dateOfBirth";
import { TrashIcon } from "@radix-ui/react-icons";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";

export default function EditMyData() {
  const {
    activeTab,
    setActiveTab,
    responsaveis,
    loading,
    selectedResponsavel,
    isDialogOpen,
    openEditDialog,
    closeEditDialog,
    nome,
    setNome,
    cpf,
    setCpf,
    telefone,
    setTelefone,
    parentesco,
    setParentesco,
    saveResponsavel,
    cpfParam,
    criancas,
    handleNavigateToNewResponsible,
    handleNavigateToChildRegistration,
    navigate,
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
    deleteItem,
    setDeleteItem,
  } = useEditMyData();

  const { anos, meses, diasNoMes } = useDateOfBirth();

  return (
    <Container>
      <BackgroundGlobal />
      <CardComponent maxWidth="700px">
        <TabsContainer
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          radius="large"
          mb="3"
          variant="surface"
          style={{ width: "100%", height: "auto" }}
        >
          <TabsTrigger
            value="responsavel"
            style={{ height: "60px", fontSize: "20px" }}
          >
            Responsável
          </TabsTrigger>
          <TabsTrigger
            value="criancas"
            style={{ height: "60px", fontSize: "20px" }}
          >
            Crianças
          </TabsTrigger>
        </TabsContainer>

        <Text size="3">Selecione o responsável que deseja editar</Text>

        {activeTab === "responsavel" && (
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {loading ? (
              <Text>Carregando...</Text>
            ) : (
              responsaveis.map((resp) => (
                <CardResp
                  key={resp.id}
                  style={{ position: "relative" }}
                  onClick={() => openEditDialog(resp)}
                >
                  <IconButton
                    variant="ghost"
                    size="4"
                    radius="full"
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteItem({
                        type: "responsavel",
                        id: resp.id,
                        cpfResponsavel: resp.cpf ?? undefined,
                      });
                    }}
                    style={{
                      position: "absolute",
                      top: 30,
                      right: 30,
                      cursor: "pointer",
                    }}
                  >
                    <TrashIcon width="30" height="30" />
                  </IconButton>
                  <ContainerResp>
                    <Text size="4" weight="bold">
                      {resp.nome}
                    </Text>
                    <Text size="3">
                      CPF:
                      <br />
                      {formatCpf(resp.cpf)}
                    </Text>
                    <Text size="3">
                      Telefone:
                      <br />
                      {formatTelefone(resp.telefone)}
                    </Text>
                    <Text size="3">
                      Parentesco:
                      <br />
                      {resp.parentesco === "father"
                        ? "Pai"
                        : resp.parentesco === "mother"
                        ? "Mãe"
                        : resp.parentesco === "grandfather"
                        ? "Avô"
                        : "Avó"}
                    </Text>
                  </ContainerResp>
                </CardResp>
              ))
            )}

            <SubmitButtonWrapper>
              <Button
                size="xl"
                color="secondary"
                variant="soft"
                fullWidth
                onClick={handleNavigateToNewResponsible}
              >
                Adicionar novo responsável
              </Button>
              <Button
                size="xl"
                color="primary"
                fullWidth
                onClick={() => navigate(`/checkin-steps?cpf=${cpfParam}`)}
              >
                Finalizar edição
              </Button>
            </SubmitButtonWrapper>
          </Box>
        )}

        {activeTab === "criancas" && (
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {loading ? (
              <Text>Carregando...</Text>
            ) : criancas.length > 0 ? (
              criancas.map((crianca) => (
                <CardResp
                  key={crianca.id}
                  style={{ position: "relative" }}
                  onClick={() => openChildEditDialog(crianca)}
                >
                  <IconButton
                    variant="ghost"
                    size="4"
                    radius="full"
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteItem({ type: "crianca", id: crianca.id });
                    }}
                    style={{
                      position: "absolute",
                      top: 30,
                      right: 30,
                      cursor: "pointer",
                    }}
                  >
                    <TrashIcon width="30" height="30" />
                  </IconButton>
                  <ContainerResp>
                    <Text size="4" weight="bold">
                      {crianca.nome}
                    </Text>
                    <Text size="3">
                      Data de nascimento:
                      <br />
                      {(() => {
                        const data = new Date(crianca.data_nascimento);
                        return isNaN(data.getTime())
                          ? "Data inválida"
                          : data.toLocaleDateString("pt-BR", {
                              timeZone: "UTC",
                            });
                      })()}
                    </Text>
                  </ContainerResp>
                </CardResp>
              ))
            ) : (
              <Text>Nenhuma criança encontrada.</Text>
            )}
            <SubmitButtonWrapper>
              <Button
                size="xl"
                color="secondary"
                variant="soft"
                fullWidth
                onClick={handleNavigateToChildRegistration}
              >
                Adicionar nova criança
              </Button>
              <Button
                size="xl"
                color="primary"
                fullWidth
                onClick={() => navigate(`/checkin-steps?cpf=${cpfParam}`)}
              >
                Finalizar edição
              </Button>
            </SubmitButtonWrapper>
          </Box>
        )}

        {selectedResponsavel && (
          <DialogComponent
            open={isDialogOpen}
            onClose={closeEditDialog}
            onSave={saveResponsavel}
            title="Editar Responsável"
          >
            <StyledInput
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <StyledInput
              placeholder="CPF"
              value={formatCpf(cpf)}
              onChange={(e) => setCpf(e.target.value)}
            />
            <StyledInput
              placeholder="Telefone"
              value={formatTelefone(telefone)}
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
          </DialogComponent>
        )}

        {selectedChild && (
          <DialogComponent
            open={isChildDialogOpen}
            onClose={closeChildEditDialog}
            onSave={saveChild}
            title="Editar Criança"
          >
            <StyledInput
              placeholder="Nome da criança"
              value={childNome}
              onChange={(e) => setChildNome(e.target.value)}
            />
            <DateInputsContainer>
              <DateInputLabel>Data de Nascimento</DateInputLabel>
              <DateSelects>
                <Select.Root
                  value={childDia ? String(childDia) : undefined}
                  onValueChange={(val) => setChildDia(val)}
                >
                  <DateSelectTrigger placeholder="Dia" />
                  <Select.Content>
                    {diasNoMes(Number(childMes), Number(childAno)).map((d) => (
                      <DateSelectItem key={`dia-${d}`} value={String(d)}>
                        {d}
                      </DateSelectItem>
                    ))}
                  </Select.Content>
                </Select.Root>
                <Select.Root
                  value={childMes ? String(childMes) : undefined}
                  onValueChange={(val) => setChildMes(val)}
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
                  value={childAno ? String(childAno) : undefined}
                  onValueChange={(val) => setChildAno(val)}
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
          </DialogComponent>
        )}

        <ConfirmDeleteDialog
          open={!!deleteItem}
          onOpenChange={(open) => {
            if (!open) setDeleteItem(null);
          }}
          confirmText="Excluir"
          onConfirm={() => {
            if (deleteItem) {
              if (deleteItem.type === "responsavel") {
                handleDeleteResponsible(
                  deleteItem.id,
                  deleteItem.cpfResponsavel ?? ""
                );
              } else {
                handleDeleteChild(deleteItem.id);
              }
              setDeleteItem(null);
            }
          }}
          description={
            deleteItem?.type === "responsavel"
              ? "Tem certeza que deseja excluir este responsável?"
              : "Tem certeza que deseja excluir esta criança?"
          }
        />
      </CardComponent>
    </Container>
  );
}
