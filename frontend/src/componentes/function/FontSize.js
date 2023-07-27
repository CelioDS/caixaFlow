import { useState, useEffect } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function FontSize() {
  const [fontSize, setFontSize] = useState(
    parseFloat(localStorage.getItem("FontSize")) || 1
  );

  useEffect(() => {
    localStorage.setItem("FontSize", fontSize.toString());
  }, [fontSize]);

  function aumentarfont() {
    if (fontSize <= 2) {
      setFontSize((prevFont) => parseFloat((prevFont + 0.1).toFixed(2)));
      window.location.reload();
    }
  }
  function diminuirfont() {
    if (fontSize > 1) {
      setFontSize((prevFont) => parseFloat((prevFont - 0.1).toFixed(2)));
      window.location.reload();
    }
  }

  const div = {
    fontSize: "16px",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
    width: "150px",
    maxWidth: "100",
    margin: "0 auto",
    left: "10px",
    bottom: "10px",
    border: "1px solid #ccc",
  };
  const h2 = {
    border: "none",
    width: "100%",
    color: "#727272",
    marginBottom: "15px",
  };
  const button = {
    background: "#727272 ",
    border: "none",
    fontWeight: "bolder",
    textAlignt: "center,",
    cursor: "pointer",
  };

  return (
    <>
      <h2 style={h2}>ajuste o zoom </h2>
      {
        <div style={div}>
          <button style={button} onClick={diminuirfont}>
            <BiMinus fontSize={"18px"} />
          </button>
          <span> {fontSize.toFixed(2)} </span>
          <button style={button} onClick={aumentarfont}>
            <BiPlus fontSize={"18px"} />
          </button>
        </div>
      }
    </>
  );
}
