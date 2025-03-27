import styled from "styled-components";
import { Flex, TextField, Select } from "@radix-ui/themes";

export const FormContainer = styled(Flex)`
  height: auto;
  position: relative;
`;

export const StyledInput = styled(TextField.Root)`
  width: 100%;
  height: 60px;
  font-size: 18px;
  margin-bottom: 1rem;
`;

export const DateInputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DateInputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-11, #333);
`;

export const DateSelects = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DateSelectTrigger = styled(Select.Trigger)`
  height: 60px;
  font-size: 16px;
  flex: 1;
`;

export const DateSelectItem = styled(Select.Item)`
  height: 40px;
  font-size: 16px;
  padding: 8px 16px;
`;

export const SubmitButtonWrapper = styled.div`
  /* margin-top: 20px; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
`;
