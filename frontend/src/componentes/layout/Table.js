import style from "./Table.module.css";
import Mobile from "../function/CheckMobile";
import { useCallback, useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa"; // Importe o ícone de download da biblioteca
import Loading from "./Loading";
import Estoque from "./Estoque";
import Header from "./Header";

export default function Table({ arrayDB, currentPage }) {
  const checkMobile = useCallback(Mobile, []);
  const isMobile = checkMobile();

  const [searchMonth, setSearchMonth] = useState("");
  // No início do componente, antes da função 'return'
  const [caixa, setCaixa] = useState(0);
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const [papelao, setPapelao] = useState(0);
  const [ferro, setFerro] = useState(0);
  const [plastico, setPlastico] = useState(0);
  const [funcionarios, setFuncionarios] = useState(0);
  const [gastosEmpresa, setGastosEmpresa] = useState(0);
  useEffect(() => {
    // Filtrar os dados do mês selecionado
    const filteredData = arrayDB.filter(({ dataNew }) => {
      if (!searchMonth) return true;
      const partMonth = dataNew.split("-");
      const month = partMonth[1];
      return month === searchMonth;
    });

    // Calcular os valores de caixa, entrada, saída, papelao, ferro e plastico com base nos dados filtrados
    const caixaValue = filteredData.reduce((total, data) => {
      return data.movimentacao === "Caixa" ? total + data.valor : total;
    }, 0);
    setCaixa(caixaValue);

    const entradaValue = filteredData.reduce((total, data) => {
      return data.movimentacao === "Entrada" ? total + data.valor : total;
    }, 0);
    setEntrada(entradaValue);

    const saidaValue = filteredData.reduce((total, data) => {
      return data.movimentacao === "Saida" ? total + data.valor : total;
    }, 0);
    setSaida(saidaValue);

    const papelaoValue = filteredData.reduce((total, data) => {
      if (data.descricao === "papelao") {
        return data.movimentacao === "Entrada"
          ? total + parseInt(data.quantidade)
          : total - parseInt(data.quantidade);
      }
      return total;
    }, 0);
    setPapelao(papelaoValue);

    const ferroValue = filteredData.reduce((total, data) => {
      if (data.descricao === "ferro") {
        return data.movimentacao === "Entrada"
          ? total + parseInt(data.quantidade)
          : total - parseInt(data.quantidade);
      }
      return total;
    }, 0);
    setFerro(ferroValue);

    const plasticoValue = filteredData.reduce((total, data) => {
      if (data.descricao === "plastico") {
        return data.movimentacao === "Entrada"
          ? total + parseInt(data.quantidade)
          : total - parseInt(data.quantidade);
      }
      return total;
    }, 0);
    setPlastico(plasticoValue);

    const custoFuncionario = filteredData.reduce((total, data) => {
      return data.descricao === "funcionarios" && data.movimentacao === "Saida"
        ? total + data.valor
        : total;
    }, 0);
    setFuncionarios(custoFuncionario);

    const gastosEmpresavalue = filteredData.reduce((total, data) => {
      return data.descricao === "gastosEmpresa" && data.movimentacao === "Saida"
        ? total + data.valor
        : total;
    }, 0);
    setGastosEmpresa(gastosEmpresavalue);
  }, [arrayDB, searchMonth]);

  function handleMonthChange(e) {
    setSearchMonth(e.target.value);
  }
  // Array com os nomes dos meses
  const months = [
    { value: "", label: "Todos" },
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];
  const isReportsPage = currentPage === "relatorios";

  function exportToCSV() {
    //aciona o nome ao arquivo
    const selectedMonth =
      months.find((month) => month.value === searchMonth)?.label || "Todos";
    const fileName = `${selectedMonth} relatorio.csv`;
    // Cabeçalho do CSV
    const header = [
      "ID",
      "Dia",
      "Movimentacao",
      "Descricao",
      "Quantidade(KG)",
      "Valor",
      "Preco por KG",
    ];

    // Dados do arrayDB filtrados pelo mês selecionado
    const filteredData = arrayDB.filter(({ dataNew }) => {
      if (!searchMonth) return true;
      const partMonth = dataNew.split("-");
      const month = partMonth[1];
      return month === searchMonth;
    });

    // Converter os dados para linhas CSV
    const csvRows = [header.join(";")];

    filteredData.forEach(
      ({ id, dataNew, descricao, quantidade, movimentacao, valor }) => {
        const formattedRow = [
          id + 1,
          dataNew,
          movimentacao,
          descricao,
          quantidade,
          valor,
          movimentacao !== "Caixa" ? (valor / quantidade).toFixed(2) : "-",
        ];

        // Sanitize the fields to handle semicolons and other special characters
        const sanitizedRow = formattedRow.map((field) => {
          // Check if the field contains semicolons or double quotes, then wrap it in double quotes
          if (/;|"/.test(field)) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        });

        csvRows.push(sanitizedRow.join(";"));
      }
    );

    // Criar o arquivo CSV
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  }

  return (
    <section>
      {isReportsPage && (
        <section className={style.overview}>
          <div className={style.plate}>
            <Estoque papelao={papelao} ferro={ferro} plastico={plastico} />
            <Header
              entrada={entrada}
              saida={saida}
              caixa={caixa}
              funcionarios={funcionarios}
              gastosEmpresa={gastosEmpresa}
            />
          </div>

          <div className={style.filter}>
            <div>
              <label htmlFor="monthFilter">Filtrar por mês: </label>
              <select
                id="monthFilter"
                value={searchMonth}
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>{" "}
            </div>
            <button onClick={exportToCSV}>
              <span>
                Baixar relatorio
                <FaDownload />
              </span>
            </button>
          </div>
        </section>
      )}
      <table className={style.table}>
        <thead>
          <tr>
            {!isMobile && <th>id </th>}
            {!isMobile && <th>data </th>}
            <th>movimentação</th>
            <th>descrição</th>
            <th>quantidade(KG)</th>
            <th>valor</th>
            {!isMobile && <th>preço por KG</th>}
          </tr>
        </thead>
        <tbody>
          {saida === 0 && caixa === 0 && entrada === 0 && (
            <tr>
              <td key={1} colSpan={7}>
                <h4>Sem cadastros!!!</h4>
                <Loading></Loading>
              </td>
            </tr>
          )}
          {arrayDB.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <Loading></Loading>
              </td>
            </tr>
          ) : (
            arrayDB
              .filter(({ dataNew }) => {
                /* filtar o mes */
                if (!searchMonth) return true;
                const partMonth = dataNew.split("-");
                const month = partMonth[1];
                return month === searchMonth;
              })
              .map(
                ({
                  id,
                  dataNew,
                  descricao,
                  quantidade,
                  movimentacao,
                  valor,
                }) => (
                  <tr key={id}>
                    {console.log()}

                    {!isMobile && (
                      <td
                        style={
                          movimentacao === "Entrada"
                            ? { color: "#008000" }
                            : movimentacao === "Saida"
                            ? { color: "#800303fb" }
                            : { color: "#0099ff" } // Terceiro valor para outra movimentação
                        }
                      >
                        {id + 1}
                      </td>
                    )}
                    {!isMobile && <td>{dataNew}</td>}
                    <td
                      style={
                        movimentacao === "Entrada"
                          ? { color: "#008000" }
                          : movimentacao === "Saida"
                          ? { color: "#800303fb" }
                          : { color: "#0099ff" } // Terceiro valor para outra movimentação
                      }
                    >
                      {movimentacao}
                    </td>
                    <td>{descricao}</td>
                    <td>{quantidade}</td>
                    <td
                      style={
                        movimentacao === "Entrada"
                          ? { color: "#008000", background: "#d9f0cf" }
                          : movimentacao === "Saida"
                          ? { color: "#800303fb", background: "#FFC0CB" }
                          : { color: "#0099ff", background: "#87CEEB" } // Terceiro valor para outra movimentação
                      }
                    >
                      {valor}
                    </td>
                    {!isMobile && (
                      <td>
                        {movimentacao === "Caixa" ||
                        descricao === "funcionarios" ||
                        descricao === "gastosEmpresa"
                          ? "-"
                          : parseFloat(valor / quantidade).toFixed(2)}
                      </td>
                    )}
                  </tr>
                )
              )
          )}
        </tbody>
      </table>
    </section>
  );
}
