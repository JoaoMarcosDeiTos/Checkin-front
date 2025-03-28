import { Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { HomeContainer, ButtonsContainer } from "./style";
import BackgroundGlobal from "../../components/BackgroundGlobal";
import CardComponent from "../../components/CardComponent";

export default function Home() {
  const navigate = useNavigate();

  return (
    <HomeContainer align="center" justify="center">
      <BackgroundGlobal />
      <CardComponent maxWidth="900px">
        <Text size="6" weight="bold">
          Bem-vindo ao Check-In Kids
        </Text>

        <ButtonsContainer>
          <Button
            size="xl"
            color="primary"
            fullWidth
            onClick={() => navigate("/create-responsible")}
          >
            Cadastrar novo responsável
          </Button>

          <Button
            size="xl"
            variant="soft"
            color="secondary"
            fullWidth
            onClick={() => navigate("/checkin-steps")}
          >
            Já tenho cadastro
          </Button>
        </ButtonsContainer>
      </CardComponent>
    </HomeContainer>
  );
}
