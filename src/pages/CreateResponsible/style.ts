import styled from "styled-components";
import { Flex, TextField, Select } from "@radix-ui/themes";

export const FormContainer = styled(Flex)`
  height: 100vh;
  background: #f7f7f7;
  position: relative;
`;

export const StyledInput = styled(TextField.Root)`
  width: 100%;
  height: 60px;
  font-size: 18px;
`;

export const StyledSelectTrigger = styled(Select.Trigger)`
  width: 100%;
  height: 60px;
  font-size: 18px;
`;

export const StyledSelectItem = styled(Select.Item)`
  width: 100%;
  padding: 16px;
  font-size: 18px;
  height: 60px;
`;

export const SubmitButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
`;
