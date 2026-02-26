import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Pymes Platform</h2>

      <div>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Registrarse</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1e293b",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  }
};

export default Navbar;