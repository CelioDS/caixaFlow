import style from "./Estoque.module.css";
import { FaBoxOpen, FaDumpster } from "react-icons/fa";
import { GiMetalBar } from "react-icons/gi";

export default function Estoque({ ferro, papelao, plastico }) {
  return (
    <header className={style.header}>
      <div>
        <h1>
          <GiMetalBar /> Ferro
        </h1>
        <span>
          <h1>{ferro} KG</h1>
        </span>
      </div>
      <div>
        <h1>
          <FaBoxOpen /> Papelão
        </h1>
        <span>
          <h1>{papelao} KG</h1>
        </span>
      </div>
      <div>
        <h1>
          <FaDumpster /> Plástico
        </h1>
        <span>
          <h1>{plastico} KG</h1>
        </span>
      </div>
    </header>
  );
}
