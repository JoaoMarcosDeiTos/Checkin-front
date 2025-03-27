export interface ResponsibleProps {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  parentesco: string;
  pode_fazer_checkin: number;
  data_cadastro: string;
}

export type childrenProps = {
  id: number;
  nome: string;
  data_nascimento: string;
  idade: number;
};
