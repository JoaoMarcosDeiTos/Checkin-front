import styled, { css, keyframes } from "styled-components";
import { Button as RadixButton } from "@radix-ui/themes";

// Tipos para variantes de botão
export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

// Interface para props do styled component
interface StyledButtonProps {
  $fullWidth?: boolean;
  $disabled?: boolean;
  $size: ButtonSize;
  $customColor: string;
}

// Mapeamento de tamanhos
const sizeConfig = {
  sm: {
    height: "40px",
    fontSize: "14px",
    padding: "0 12px",
  },
  md: {
    height: "48px",
    fontSize: "16px",
    padding: "0 16px",
  },
  lg: {
    height: "60px",
    fontSize: "18px",
    padding: "0 20px",
  },
  xl: {
    height: "80px",
    fontSize: "20px",
    padding: "0 24px",
  },
};

// Animação de rotação para o loading spinner
export const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Botão estilizado
export const StyledButton = styled(RadixButton)<StyledButtonProps>`
  ${({ $size, $fullWidth, $disabled }) => css`
    height: ${sizeConfig[$size].height};
    font-size: ${sizeConfig[$size].fontSize};
    padding: ${sizeConfig[$size].padding};
    width: ${$fullWidth ? "100%" : "auto"};
    cursor: ${$disabled ? "not-allowed" : "pointer"};
    opacity: ${$disabled ? 0.6 : 1};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  `}
`;

// Container para o spinner de loading
export const LoadingContainer = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Texto que fica invisível durante o loading
export const HiddenText = styled.span`
  visibility: hidden;
`;

// SVG do spinner de loading
export const LoadingSpinner = styled.svg`
  animation: ${spinAnimation} 1s linear infinite;
`;
