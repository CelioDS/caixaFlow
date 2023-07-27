import styles from "./NavBar.module.css";

import { BsGear, BsList, BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import LinkButton from "../layout/LinkButton";
import CheckMobile from "../function/CheckMobile";

export default function NavBar() {
  const checkMobile = useCallback(CheckMobile, []);
  const isMobile = checkMobile();

  const sizeBtn = 36;
  const colorBtn = "white";

  const [iconMenu, setIconMenu] = useState();

  const [menuUp, setMenuUp] = useState(false);
  const [menuDown, setMenuDown] = useState(null);
  const [MenuOpen, setMenuOpen] = useState(false);
  const [linkActive, setlinkActive] = useState("inicio");

  function openMenu(linkclick) {
    // Inverte o valor de MenuOpen
    setMenuOpen((prevState) => !prevState);

    setMenuUp(!menuUp);

    if (menuDown !== null) {
      // Inverte o valor de menuDown
      setMenuDown((prevState) => !prevState);
    } else {
      setMenuDown(false);
    }

    setlinkActive(linkclick);
  }
  useEffect(() => {
    // Criando o MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "childList" &&
          mutation.target === document.querySelector("title")
        ) {
          setlinkActive(mutation.target.textContent.split(" ")[0]);
        }
      }
    });

    // Observando mudanças no nó do título
    observer.observe(document.querySelector("title"), {
      subtree: true,
      characterData: true,
      childList: true,
    });

    // Função de limpeza para desconectar o MutationObserver ao desmontar o componente
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!MenuOpen) {
      setIconMenu(<BsList color={colorBtn} size={sizeBtn} />);
    } else {
      setIconMenu(<BsXLg color={colorBtn} size={sizeBtn} />);
    }
  }, [MenuOpen]);

  // Sempre que isMobile mudar, reajusta o estado
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
      setMenuUp(null);
      setMenuDown(null);
    }
  }, [isMobile]);

  return (
    <div className={styles.div}>
      <main>
        <nav>
          <LinkButton
            to="/"
            text="FLUXO DE CAIXA"
            className={styles.logo}
          />

          {/*ativa o MenuMobile*/}
          {isMobile && (
            <button
              className={`${styles.MenuBtn}
               ${menuUp ? styles.actives : ""} 
               ${menuUp ? "" : styles.activesInverso}`}
              onClick={() => openMenu(linkActive)}
            >
              {iconMenu}
            </button>
          )}

          <ul
            className={`
               ${styles.menuH}
               ${menuUp ? styles.expandir : null}
               ${!menuDown ? null : styles.expandirInverso}
           `}
          >
            <Link
              style={linkActive === "Inicio" ? { color: "#00c3ff" } : {}}
              onClick={openMenu}
              className="btn"
              to="/"
            >
              Inicio
            </Link>
            <Link
              style={linkActive === "Relatorios" ? { color: "#00c3ff" } : {}}
              onClick={openMenu}
              className="btn"
              to="/Relatorios"
            >
              Relatorios
            </Link>
            <Link
              style={linkActive === "Configuracao" ? { color: "#00c3ff" } : {}}
              onClick={openMenu}
              className="btn"
              to="/Configuracao"
            >
              <BsGear />
            </Link>
          </ul>
        </nav>
      </main>
    </div>
  );
}
