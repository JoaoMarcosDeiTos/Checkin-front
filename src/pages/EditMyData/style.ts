import styled from "styled-components";
import {
  Card,
  Flex,
  SegmentedControl,
  Select,
  TextField,
} from "@radix-ui/themes";

export const Container = styled(Flex)`
  position: relative;
`;

export const TabsContainer = styled(SegmentedControl.Root)`
  width: 100%;
`;

export const TabsTrigger = styled(SegmentedControl.Item)`
  width: 100%;
  flex: 1;
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

export const CardResp = styled(Card)`
  width: 100%;
  height: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export const ContainerResp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
