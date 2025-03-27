import { useEffect, useState } from "react";

export const useDateOfBirth = () => {
  const [anos, setAnos] = useState<number[]>([]);

  const meses = [
    { numero: 1, nome: "Janeiro" },
    { numero: 2, nome: "Fevereiro" },
    { numero: 3, nome: "Março" },
    { numero: 4, nome: "Abril" },
    { numero: 5, nome: "Maio" },
    { numero: 6, nome: "Junho" },
    { numero: 7, nome: "Julho" },
    { numero: 8, nome: "Agosto" },
    { numero: 9, nome: "Setembro" },
    { numero: 10, nome: "Outubro" },
    { numero: 11, nome: "Novembro" },
    { numero: 12, nome: "Dezembro" },
  ];

  useEffect(() => {
    const anoAtual = new Date().getFullYear();
    const listaAnos: number[] = [];
    for (let i = 2000; i <= anoAtual; i++) {
      listaAnos.push(i);
    }
    setAnos(listaAnos);
  }, []);

  const diasNoMes = (mes: number | "", ano: number | "") => {
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    if (!mes || typeof mes !== "number") return dias;

    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (
      mes === 2 &&
      typeof ano === "number" &&
      ano % 4 === 0 &&
      (ano % 100 !== 0 || ano % 400 === 0)
    ) {
      return dias.slice(0, 29);
    }
    return dias.slice(0, diasPorMes[mes - 1]);
  };

  return { anos, meses, diasNoMes };
};
