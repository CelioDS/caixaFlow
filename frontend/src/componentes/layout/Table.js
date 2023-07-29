import style from "./Table.module.css";
import Mobile from "../function/CheckMobile";
import { useCallback, useState, useEffect } from "react";
import { FaDownload, FaTrash, FaPen } from "react-icons/fa";

import axios from "axios";
import { toast } from "react-toastify";

import Loading from "./Loading";
import Header from "./Header";

export default function Table({
  currentPage,
  arrayDB,
  setEditCadastro,
  setArrayDB,
}) {
  const checkMobile = useCallback(Mobile, []);
  const isMobile = checkMobile();

  const [searchMonth, setSearchMonth] = useState("");
  // No início do componente, antes da função 'return'
  const [caixa, setCaixa] = useState(0);
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const isReportsPage = currentPage === "relatorios";

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

  function exportToCSV() {
    //aciona o nome ao arquivo
    const selectedMonth =
      months.find((month) => month.value === searchMonth)?.label || "Todos";
    const fileName = `${selectedMonth} relatorio.csv`;
    // Cabeçalho do CSV
    const header = [
      "Dia",
      "Movimentacao",
      "Descricao",
      "especifique(KG)",
      "Valor",
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
      ({ dataNew, descricao, especifique, movimentacao, valor }) => {
        const formattedRow = [
          dataNew,
          movimentacao,
          descricao,
          especifique,
          valor,
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

  async function handleExcluir(id) {
    await axios
      .delete(process.env.REACT_APP_DB_API + id)
      .then(({ data }) => {
        const newDB = arrayDB.filter((cadastro) => cadastro.id !== id);
        setArrayDB(newDB);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setEditCadastro(null);
  }

  async function handleEditar(cadastro) {
    setEditCadastro(cadastro);
  }

  return (
    <section>
      {isReportsPage && (
        <section className={style.overview}>
          <div className={style.plate}>
            <Header entrada={entrada} saida={saida} caixa={entrada - saida} />
          </div>
        </section>
      )}
      {isReportsPage && (
        <section className={style.overview}>
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
              </select>
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
            {!isMobile && <th>data </th>}
            <th>movimentação</th>
            <th>descrição</th>
            <th>Especifique</th>
            <th>valor</th>
            {!isReportsPage && (
              <>
                <th>Editar</th>
                <th>Excluir</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {isReportsPage && saida === 0 && caixa === 0 && entrada === 0 && (
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
                <h4>Sem cadastros!!!</h4>
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
              .map((cadastro, key) => (
                <tr key={key}>
                  {!isMobile && <td>{cadastro.dataNew}</td>}
                  <td
                    style={
                      cadastro.movimentacao === "Entrada"
                        ? { color: "#008000" }
                        : cadastro.movimentacao === "Saida"
                        ? { color: "#800303fb" }
                        : { color: "#0099ff" } // Terceiro valor para outra movimentação
                    }
                  >
                    {cadastro.movimentacao}
                  </td>
                  <td>{cadastro.descricao}</td>
                  <td>{cadastro.especifique}</td>
                  <td
                    style={
                      cadastro.movimentacao === "Entrada"
                        ? { color: "#008000", background: "#d9f0cf" }
                        : cadastro.movimentacao === "Saida"
                        ? { color: "#800303fb", background: "#FFC0CB" }
                        : { color: "#0099ff", background: "#87CEEB" } // Terceiro valor para outra movimentação
                    }
                  >
                    {cadastro.valor}
                  </td>

                  {!isReportsPage && (
                    <>
                      <td>
                        <button
                          onClick={() => {
                            handleEditar(cadastro);
                          }}
                        >
                          <FaPen />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleExcluir(cadastro.id);
                          }}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
          )}
        </tbody>
      </table>
    </section>
  );
}
