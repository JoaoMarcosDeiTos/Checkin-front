import styled from "styled-components";
import { Flex, Card } from "@radix-ui/themes";

export const Container = styled(Flex)`
  height: 100vh;
  background: #f7f7f7;
`;

export const ContainerCard = styled(Card)`
  padding: 40px;
  width: 100%;
  max-width: 1000px;
`;

export const CardContent = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const ButtonsContainer = styled(Flex)`
  flex-direction: row;
  gap: 16px;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;
