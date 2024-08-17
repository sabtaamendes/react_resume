import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Constant";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    //update state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch(`${BASE_URL}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      
      }).then((response) => response.json());
      
      if (response) {
        toast.success("Login realizado!");
        // console.log("response:", response);
    
        //store token in localStorage
        localStorage.setItem("token", response.token);
        
        //redirect to all candidates page after loggin in
        navigate("/resumes");
      }

      if (!response) {
        if (response.status === 401) {
          toast.error("Não autorizado.");
          return;
        }
        toast.error("Erro ao realizar login. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro");
      console.error(error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className={`container ${styles.login}`}>
      <h2 className="title">Login</h2>
      <form
        className={styles.form_container}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={50}
        />

        <label htmlFor="email">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          maxLength={50}
        />

        <button type="submit" className={styles.send_btn}>
          Entrar
        </button>
        <span>
          <p>Não possui conta?</p>
          <a href="/registrar">Cadastre-se!</a>
        </span>
      </form>
    </div>
  );
};
export default LoginPage;
