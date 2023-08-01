import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../item-layout/Input";
import { format } from "date-fns";
import style from "./Form.module.css";

export default function Form({ GetDB, EditCadastro, setEditCadastro }) {
  const ref = useRef();
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentDate, setCurrentDate] = useState("yyyy-MM-dd");

  useEffect(() => {
    const today = new Date();

    setCurrentDate(format(today, "yyyy-MM-dd"));
  }, [setCurrentDate]);

  useEffect(() => {
    if (EditCadastro) {
      const dadosForm = ref.current;

      dadosForm.movimentacao.value = EditCadastro.movimentacao;
      dadosForm.produto.value = EditCadastro.produto;
      dadosForm.quantidade.value = EditCadastro.quantidade;
      dadosForm.valor.value = EditCadastro.valor;
    }
  }, [EditCadastro]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída

    setIsSubmit(true); // Inicia o envio do formulário

    const dadosForm = ref.current;

    if (
      !dadosForm.dataNew.value ||
      !dadosForm.movimentacao.value ||
      !dadosForm.produto.value ||
      !dadosForm.quantidade.value ||
      !dadosForm.valor.value
    ) {
      setIsSubmit(false); // Reabilita o botão após o envio do formulário
      return toast.warn("Preencha todos os campos!!!");
    }
    if (EditCadastro) {
      await axios
        .put(process.env.REACT_APP_DB_API + EditCadastro.id, {
          movimentacao: dadosForm.movimentacao.value,
          produto: dadosForm.produto.value,
          quantidade: dadosForm.quantidade.value,
          valor: dadosForm.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post(process.env.REACT_APP_DB_API, {
          dataNew: currentDate,
          movimentacao: dadosForm.movimentacao.value,
          produto: dadosForm.produto.value,
          quantidade: dadosForm.quantidade.value,
          valor: dadosForm.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    dadosForm.dataNew.value = "";
    dadosForm.movimentacao.value = "";
    dadosForm.produto.value = "";
    dadosForm.quantidade.value = "";
    dadosForm.valor.value = "";

    GetDB();
    setEditCadastro(null);
    setIsSubmit(false); // Reabilita o botão após o envio do formulário
  }
  function handleNumber(e) {
    const inputValue = e.target.value;
    const floatValue = parseFloat(inputValue);
    if (isNaN(floatValue) || floatValue < 0) {
      e.target.value = ""; // Limpa o valor do input se não for um número de ponto flutuante válido ou se for negativo
    }
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className={style.form}>
      <div style={{ display: "none" }}>
        <Input
          text="DATA"
          placeholder="data"
          type="date"
          id="dataNew"
          name="dataNew"
          className={style.input}
          value={currentDate} // Usar o estado currentDate como valor do campo de data
          onChange={(e) => setCurrentDate(e.target.value)} // Atualizar o estado currentDate quando o valor do campo mudar
        />
      </div>

      <div className={style.selectInput}>
        <label>MOVIMENTAÇÃO</label>
        <select id="movimentacao">
          <option value="">Selecione</option>
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saida</option>
        </select>
      </div>

      <Input
        text="PRODUTO"
        placeholder="Digite a movimentacao aqui"
        type="text"
        id="produto"
        name="produto"
        className={style.input}
      />
      <Input
        text="QUANTIDADE"
        placeholder="Digite a quantidade aqui"
        type="text"
        id="quantidade"
        name="quantidade"
        className={style.input}
      />
      <Input
        text="VALOR"
        placeholder="Digite a valor aqui`}"
        type="text"
        id="valor"
        min="0"
        name="valor"
        onChange={handleNumber}
        className={style.input}
      />

      <div>
        <button disabled={isSubmit} type="submit">
          {isSubmit ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </form>
  );
}
