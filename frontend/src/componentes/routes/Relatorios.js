import style from "./Relatorios.module.css";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

import Table from "../layout/Table";

export default function Relatorios() {
  const [arrayDB, setArrayDB] = useState([]);

  useEffect(() => {
    document.title = "Relatorios - fluxo de caixa";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);
      setArrayDB(res.data.reverse());
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    GetDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setArrayDB]);

  return (
    <main className={style.main}>
      <h1> Estoque</h1>
      <Table arrayDB={arrayDB} currentPage={"relatorios"} />
    </main>
  );
}
