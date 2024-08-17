import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={`container ${styles.not_found}`}>
      <h2 className="title">Error 404</h2>
      <p className="title">Página não encontrada...</p>
      <button className={styles.back_btn}>
        <Link to="/">&larr; Voltar para formulário</Link>
      </button>
    </div>
  );
};
export default NotFound;
