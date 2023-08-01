import "./App.css";
import NavBar from "./componentes/layout/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//2 Reproveitamento de estrutura
import { Outlet } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { BsClipboardCheck } from "react-icons/bs";
import CheckMobile from "./componentes/function/CheckMobile";

// 4- nagegando entre paginas
function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "Celio");
  const [pass, setPass] = useState(
    localStorage.getItem("pass") || "*celio123*"
  );
  const [permission, setPermission] = useState(false);
  const [erro, seterro] = useState(false);
  const checkMobile = useCallback(CheckMobile, []);
  const isMobile = checkMobile();

  const textCopy = isMobile ? "Copiou" : "Copiar";
  const [copy, setCopy] = useState(textCopy);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopy("Copiando...");
    setTimeout(() => {
      setCopy(textCopy);
    }, 500);
  };
  const [zoomPage, setZoomPage] = useState(
    localStorage.getItem("FontSize") || 1
  );
  useState(() => {
    setZoomPage(localStorage.getItem("FontSize"));
  }, [zoomPage]);

  useEffect(() => {
    if (
      user === process.env.REACT_APP_USER &&
      pass === process.env.REACT_APP_PASS
    ) {
      setTimeout(() => {
        setPermission(true);
      }, 0);

      localStorage.setItem("user", process.env.REACT_APP_USER);
      localStorage.setItem("pass", process.env.REACT_APP_PASS);
    }
  }, [pass, user]);

  function handleLogin(e) {
    e.preventDefault();

    if (
      user === process.env.REACT_APP_USER &&
      pass === process.env.REACT_APP_PASS
    ) {
      setTimeout(() => {
        setPermission(true);
      }, 1000);
      localStorage.setItem("user", process.env.REACT_APP_USER);
      localStorage.setItem("pass", process.env.REACT_APP_PASS);
    } else {
      seterro(true);
      setTimeout(() => {
        seterro(false);
      }, 3000);

      toast.error("Credencias invalida!!!");
    }
  }
  return (
    <div className="App" style={{ zoom: zoomPage }}>
      {permission && <NavBar />}
      {permission && <Outlet />}
      {!permission && (
        <div className={"credencial"}>
          <div>
            <span>
              usuario: <strong>Celio</strong>
            </span>
            <button className={"btnCopy"} onClick={() => handleCopy("Celio")}>
              <p className={"copy"}>{copy}</p>
              <BsClipboardCheck />
            </button>
          </div>

          <div>
            <span>
              senha: <strong>*celio123*</strong>
            </span>
            <button
              className={"btnCopy"}
              onClick={() => handleCopy("*celio123*")}
            >
              <p className={"copy"}>{copy}</p>
              <BsClipboardCheck />
            </button>
          </div>
        </div>
      )}

      {!permission && (
        <form className={`login-form ${erro === true ? "erro" : ""}`}>
          <h2>Login</h2>
          <br />

          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={`login-input ${erro === true ? "erro" : ""}`}
          />
          <input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`login-input ${erro === true ? "erro" : ""}`}
          />
          <button
            onClick={handleLogin}
            onChange={handleLogin}
            className="login-button"
          >
            Entrar
          </button>
          {erro && <h6>Nâo é um terremoto e o Usuario/Senha errada!</h6>}
        </form>
      )}
      <ToastContainer
        pauseOnHover={false}
        autoClose={3000}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
}

export default App;
