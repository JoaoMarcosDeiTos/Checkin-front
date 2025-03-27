import { Container, ButtonsContainer } from "./style";
import { Text } from "@radix-ui/themes";
import Button from "../../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackgroundGlobal from "../../components/BackgroundGlobal";
import CardComponent from "../../components/CardComponent";
export default function AfterAddResponsible() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cpfResponsavel = searchParams.get("cpf");

  const handleNavigateToNewResponsible = () => {
    // Verifica se existe um CPF na URL e o repassa
    if (cpfResponsavel) {
      navigate(`/create-other-responsible?cpf=${cpfResponsavel}`);
    } else {
      // Caso não exista (não deveria acontecer), navega sem parâmetros
      navigate("/create-other-responsible");
    }
  };

  const handleNavigateToChildRegistration = () => {
    // Também passa o CPF para o cadastro da criança, se estiver disponível
    if (cpfResponsavel) {
      navigate(`/create-child?cpf=${cpfResponsavel}`);
    } else {
      navigate("/create-child");
    }
  };

  return (
    <Container align="center" justify="center">
      <BackgroundGlobal />
      <CardComponent maxWidth="900px">
        <Text size="6" weight="bold">
          Deseja cadastrar mais responsáveis?
        </Text>

        <ButtonsContainer>
          <Button
            size="xl"
            color="primary"
            fullWidth
            onClick={handleNavigateToNewResponsible}
          >
            Cadastrar outro responsável
          </Button>

          <Button
            size="xl"
            variant="soft"
            color="secondary"
            fullWidth
            onClick={handleNavigateToChildRegistration}
          >
            Seguir para cadastro da criança
          </Button>
        </ButtonsContainer>
      </CardComponent>
    </Container>
  );
}
