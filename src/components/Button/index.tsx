import React from "react";
import {
  StyledButton,
  LoadingContainer,
  HiddenText,
  LoadingSpinner,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
} from "./style";

// Definições de tipos do Radix para variantes e cores
type RadixVariant = "solid" | "soft" | "outline" | "ghost";
type RadixColor =
  | "ruby"
  | "blue"
  | "brown"
  | "crimson"
  | "cyan"
  | "gold"
  | "gray"
  | "green"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "plum"
  | "purple"
  | "red"
  | "teal"
  | "tomato"
  | "violet"
  | "yellow";

// Mapeamento de cores para valores do Radix
const colorMap: Record<ButtonColor, RadixColor> = {
  primary: "blue",
  secondary: "purple",
  success: "green",
  danger: "red",
  warning: "amber" as RadixColor, // Usando type assertion para "amber"
};

// Tipos para as propriedades do botão
export interface ButtonProps {
  // Texto do botão
  children: React.ReactNode;

  // Função de clique
  onClick?: () => void;

  // Variante do botão
  variant?: ButtonVariant;

  // Cor do botão
  color?: ButtonColor;

  // Tamanho do botão
  size?: ButtonSize;

  // Largura total
  fullWidth?: boolean;

  // Indicador de carregamento
  isLoading?: boolean;

  // Desabilitado
  disabled?: boolean;

  // Props adicionais
  [key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "solid",
  color = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  // Conversão da cor para o formato do Radix
  const radixColor = colorMap[color];

  return (
    <StyledButton
      onClick={onClick}
      variant={variant as RadixVariant}
      color={radixColor}
      disabled={disabled || isLoading}
      $fullWidth={fullWidth}
      $disabled={disabled || isLoading}
      $size={size}
      $customColor={radixColor}
      {...props}
    >
      {isLoading ? (
        <>
          <HiddenText>{children}</HiddenText>
          <LoadingContainer>
            <LoadingSpinner
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="30 60"
              />
            </LoadingSpinner>
          </LoadingContainer>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
