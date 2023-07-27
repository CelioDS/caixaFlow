export default function Error() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f1f1f1",
    },
    title: {
      fontSize: "48px",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title} >
        Error 404
      </h1>
      <a
        href="https://celiotech.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Criado e desenvolvido por <span>Célio</span>
      </a>
    </div>
  );
}
