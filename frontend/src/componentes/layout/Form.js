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

  const listInput = [
    "dataNew",
    "movimentacao",
    "produto",
    "quantidade",
    "valor",
  ];

  useEffect(() => {
    const today = new Date();

    setCurrentDate(format(today, "yyyy-MM-dd"));
  }, [setCurrentDate]);

  useEffect(() => {
    if (EditCadastro) {
      const dadosForm = ref.current;

      dadosForm.listInput[1].value = EditCadastro.listInput[1];
      dadosForm.listInput[2].value = EditCadastro.listInput[2];
      dadosForm.listInput[3].value = EditCadastro.listInput[3];
      dadosForm.listInput[4].value = EditCadastro.listInput[4];
    }
  }, [EditCadastro]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída

    setIsSubmit(true); // Inicia o envio do formulário

    const dadosForm = ref.current;

    if (
      !dadosForm.listInput[0].value ||
      !dadosForm.listInput[1].value ||
      !dadosForm.listInput[2].value ||
      !dadosForm.listInput[3].value ||
      !dadosForm.listInput[4].value
    ) {
      setIsSubmit(false); // Reabilita o botão após o envio do formulário
      return toast.warn("Preencha todos os campos!!!");
    }
    if (EditCadastro) {
      await axios
        .put(process.env.REACT_APP_DB_API + EditCadastro.id, {
          movimentacao: dadosForm.listInput[1].value,
          produto: dadosForm.listInput[2].value,
          quantidade: dadosForm.listInput[3].value,
          valor: dadosForm.listInput[4].value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post(process.env.REACT_APP_DB_API, {
          dataNew: currentDate,
          movimentacao: dadosForm.listInput[1].value,
          produto: dadosForm.listInput[2].value,
          quantidade: dadosForm.listInput[3].value,
          valor: dadosForm.listInput[4].value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    dadosForm.listInput[0].value = "";
    dadosForm.listInput[1].value = "";
    dadosForm.listInput[2].value = "";
    dadosForm.listInput[3].value = "";
    dadosForm.listInput[4].value = "";

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
        <label>{listInput[1].toUpperCase()}</label>
        <select id={listInput[1]}>
          <option value="">Selecione</option>
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saida</option>
        </select>
      </div>

      <Input
        text={listInput[2].toUpperCase()}
        placeholder={`Digite a ${listInput[1]} aqui`}
        type="text"
        id={listInput[2]}
        name={listInput[2]}
        className={style.input}
      />
      <Input
        text={listInput[3].toUpperCase()}
        placeholder={`Digite a ${listInput[3]} aqui`}
        type="text"
        id={listInput[3]}
        name={listInput[3]}
        className={style.input}
      />
      <Input
        text={listInput[4].toUpperCase()}
        placeholder={`Digite a ${listInput[4]} aqui`}
        type="text"
        id={listInput[4]}
        min="0"
        name={listInput[4]}
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
