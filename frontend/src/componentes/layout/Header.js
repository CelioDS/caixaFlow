import style from "./Header.module.css";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";

export default function Header({ entrada, saida, caixa }) {
  return (
    <header className={style.header}>
      <section>
        <div>
          <h1>
            <BsArrowUp /> ENTRADA
          </h1>
          <span>
            <h1>R$ {entrada}</h1>
          </span>
        </div>
        <div>
          <h1>
            <BsArrowDown /> SAÍDA
          </h1>
          <span>
            <h1>R$ - {saida}</h1>
          </span>
        </div>
        <div>
          <h1>
            <FaMoneyBillAlt />
            CAIXA
          </h1>
          <span>
            <h1>R$ {caixa + entrada - saida}</h1>
          </span>
        </div>
      </section>
    </header>
  );
}
