import { Link, NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

//grupofacilitti logo
import grupoFacilittiLogo from "../../../src/assets/gf-logo.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className={styles.nav_container}>
        <Link to="/">
          <img className={styles.logo} src={grupoFacilittiLogo} alt="" />
        </Link>
        <div className={styles.nav_links}>
          <NavLink to="/">Formulário</NavLink>
          <NavLink to="/resumes">Candidatos</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Header;
