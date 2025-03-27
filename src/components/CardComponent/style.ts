import { Card, Flex } from "@radix-ui/themes";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  padding: 40px;
  width: 100%;
  max-width: 1000px;
  margin: 100px auto;
  height: auto;
`;

export const CardContent = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
