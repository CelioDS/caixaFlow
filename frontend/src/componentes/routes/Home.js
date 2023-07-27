import style from "./Home.module.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

import Form from "../layout/Form";
import Header from "../layout/Header";
import Table from "../layout/Table";

import BarChart from "../graficos/BarChart";

export default function Home() {
  const [caixa, setCaixa] = useState([]);
  const [entrada, setEntrada] = useState([]);
  const [saida, setSaida] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [gastosEmpresa, setgastosEmpresa] = useState([]);
  const [arrayDB, setArrayDB] = useState([]);

  function filterByCurrentMonth(dataArray) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Os meses em JavaScript são indexados em zero (janeiro é 0), por isso adicionamos 1 ao mês atual.

    return dataArray.filter((data) => {
      const dataParts = data.dataNew.split("-");
      const dataMonth = parseInt(dataParts[1]);

      return dataMonth === currentMonth;
    });
  }
  useEffect(() => {
    document.title = "Inicio - fluxo de caixa";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);
      const filteredData = filterByCurrentMonth(res.data.reverse());
      setArrayDB(filteredData);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    GetDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setArrayDB]);

  useEffect(() => {
    setCaixa(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Caixa") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setEntrada(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Entrada") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );
    setSaida(
      arrayDB.reduce((acumulador, data) => {
        if (data.movimentacao === "Saida") {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );

    setgastosEmpresa(
      arrayDB.reduce((acumulador, data) => {
        if (
          data.movimentacao === "Saida" &&
          data.descricao === "gastosEmpresa"
        ) {
          return acumulador + data.valor;
        } else {
          return acumulador;
        }
      }, 0)
    );

    const custoFuncionario = arrayDB.reduce((total, data) => {
      return data.descricao === "funcionarios" && data.movimentacao === "Saida"
        ? total + data.valor
        : total;
    }, 0);
    setFuncionarios(custoFuncionario);
  }, [arrayDB]);

  return (
    <main className={style.main}>
      <h1>Fluxo de caixa</h1>
      <div>
        <BarChart entrada={entrada} saida={saida} caixa={caixa + entrada - saida} />
      </div>

      <Header
        entrada={entrada}
        saida={saida}
        caixa={caixa}
        funcionarios={funcionarios}
        gastosEmpresa={gastosEmpresa}
      />
      <Form GetDB={GetDB} />
      <Table arrayDB={arrayDB} />
    </main>
  );
}
