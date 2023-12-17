import style from "./Home.module.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

import Form from "../layout/Form";
import Header from "../layout/Header";
import Table from "../layout/Table";

export default function Home() {
  const [entrada, setEntrada] = useState([]);
  const [saida, setSaida] = useState([]);
  const [EditCadastro, setEditCadastro] = useState(null);
  const [arrayDB, setArrayDB] = useState([]);
  const [listProdutos, setListProdutos] = useState([]);
  const [listProdutosValues, setListProdutosValues] = useState([]);

  function filterByCurrentMonth(dataArray) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Os meses em JavaScript são indexados em zero (janeiro é 0), por isso adicionamos 1 ao mês atual.
    return dataArray.filter((data) => {
      const dataParts = data.dataNew.split("-");
      const dataMonth = parseInt(dataParts[1]);
      return dataMonth === currentMonth;
    });
  }
  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);
      const filteredData = filterByCurrentMonth(res.data.reverse());
      setArrayDB(filteredData);
    } catch (error) {
      toast.error(error);
    }
  }

  const extractUniqueProductNames = () => {
    const uniqueProductNames = new Set();
    arrayDB.forEach((data) => {
      uniqueProductNames.add(data.produto);
    });

    // Converta o Set em um array
    const productList = Array.from(uniqueProductNames);
    setListProdutos(productList);
  };

  // Chame a função para extrair os nomes dos produtos quando necessário
  useEffect(() => {
    extractUniqueProductNames();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayDB]);

  useEffect(() => {
    document.title = "Inicio - fluxo de caixa";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setArrayDB]);

  useEffect(() => {
    function sumValues() {
      const totals = listProdutos.map((produto) => {
        const filteredData = arrayDB.filter((data) => data.produto === produto);
        const totalSum = filteredData.reduce((accumulator, data) => {
          if (data.movimentacao === "Entrada") {
            return accumulator + data.total;
          } else if (data.movimentacao === "Saida") {
            return accumulator - data.total;
          }
          return accumulator;
        }, 0);

        // Calculate the total quantity separately for "Entrada" and "Saida"
        const entradaData = filteredData.filter(
          (data) => data.movimentacao === "Entrada"
        );
        const saidaData = filteredData.filter(
          (data) => data.movimentacao === "Saida"
        );
        const quantidadeEntrada = entradaData.reduce(
          (acc, data) => acc + data.quantidade,
          0
        );
        const quantidadeSaida = saidaData.reduce(
          (acc, data) => acc + data.quantidade,
          0
        );

        // Calculate the final quantity by subtracting the "Saida" quantity from the "Entrada" quantity
        const quantidadeTotal = quantidadeEntrada - quantidadeSaida;

        return { produto, total: totalSum, quantidade: quantidadeTotal };
      });
      setListProdutosValues(totals);
    }

    sumValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayDB, listProdutos]);

  useEffect(() => {
    setEntrada(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Entrada") {
          return acumulador + data.total;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setSaida(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Saida") {
          return acumulador + data.total;
        } else {
          return acumulador;
        }
      }, 0)
    );
  }, [arrayDB]);

  return (
    <main className={style.main}>
      <h1>Controle financeiro do mês atual</h1>
      <div className={style.graficos}></div>

      <Form
        GetDB={GetDB}
        EditCadastro={EditCadastro}
        setEditCadastro={setEditCadastro}
        setArrayDB={setArrayDB}
      />
      <ul>
        {listProdutosValues.map((item, index) => (
          <li key={index}>
            {item.produto}, {item.total}, {item.quantidade}
          </li>
        ))}
      </ul>

      <Header entrada={entrada} saida={saida} caixa={entrada - saida} />
      <Table
        setEditCadastro={setEditCadastro}
        arrayDB={arrayDB}
        setArrayDB={setArrayDB}
      />
    </main>
  );
}
