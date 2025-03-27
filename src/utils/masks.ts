/**
 * Aplica máscara ao CPF no formato 000.000.000-00
 * @param value Valor a ser formatado
 * @returns CPF formatado
 */
export const formatCpf = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const cpfNumerico = value.replace(/\D/g, "");

  // Limita a 11 dígitos
  const cpfLimitado = cpfNumerico.slice(0, 11);

  // Aplica a máscara 000.000.000-00
  return cpfLimitado
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

/**
 * Aplica máscara ao telefone no formato (00) 00000-0000 ou (00) 0000-0000
 * @param value Valor a ser formatado
 * @returns Telefone formatado
 */
export const formatTelefone = (value: string): string => {
  // Remove todos os caracteres não numéricos
  const telNumerico = value.replace(/\D/g, "");

  // Limita a 11 dígitos (com DDD)
  const telLimitado = telNumerico.slice(0, 11);

  // Aplica a máscara (00) 00000-0000 ou (00) 0000-0000
  if (telLimitado.length <= 10) {
    return telLimitado
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    return telLimitado
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
};

/**
 * Remove todos os caracteres não numéricos de uma string
 * @param value Valor a ser limpo
 * @returns Apenas os números
 */
export const removeNonNumeric = (value: string): string => {
  return value.replace(/\D/g, "");
};
