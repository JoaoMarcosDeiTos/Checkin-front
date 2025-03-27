import styled from "styled-components";
import { Flex, TextField, Text } from "@radix-ui/themes";

export const Container = styled(Flex)`
  position: relative;
`;

export const StyledInput = styled(TextField.Root)`
  width: 100%;
  height: 60px;
  font-size: 18px;
  margin-bottom: 1rem;
`;

export const ButtonGroup = styled(Flex)`
  width: 100%;
  gap: 16px;
  width: 100%;
`;

export const ChildList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

export const ChildCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.isSelected ? "#e6f2ff" : "white")};
  border: 1px solid ${(props) => (props.isSelected ? "#3b82f6" : "#e5e5e5")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const CheckboxContainer = styled.div`
  margin-right: 16px;
`;

export const ChildInfo = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChildName = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 1em;
`;

export const ChildAge = styled(Text)`
  color: #666;
  font-size: 14px;
`;

export const StatusMessage = styled(Text)<{
  type: "success" | "error" | "info";
}>`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  background-color: ${(props) => {
    switch (props.type) {
      case "success":
        return "#e6f7e6";
      case "error":
        return "#ffeded";
      case "info":
        return "#e6f2ff";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "success":
        return "#2e7d32";
      case "error":
        return "#d32f2f";
      case "info":
        return "#1976d2";
      default:
        return "#333333";
    }
  }};
  font-size: 16px;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: ${(props) => {
    if (props.completed) return "#3b82f6";
    if (props.active) return "#90caf9";
    return "#e0e0e0";
  }};
  transition: background-color 0.3s ease;
`;
