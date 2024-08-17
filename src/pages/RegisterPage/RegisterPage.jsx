import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./RegisterPage.module.scss";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../Constant/Constant";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const { username, email, password, confirmPassword } = formData;
    console.log(username, email, password, confirmPassword);
    if(password !== confirmPassword) {
      return toast.error("As senhas precisam ser iguais");
    }

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        toast.success("Cadastro realizado!");
        // console.log("response:", response);

        //redirect to all candidates page after loggin in
        navigate("/resumes");
      }

      if (!response.ok) {
        toast.error("Erro ao realizar cadastro. Tente novamente.");
      }

      console.log("response:", response);
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
      console.error(error);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={`container ${styles.login}`}>
      <h2 className="title">Cadastro</h2>
      <form
        className={styles.form_container}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label htmlFor="name">Nome de Usuário:</label>
        <input
          type="text"
          id="name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          maxLength={100}
        />
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

       <label htmlFor="email">Confirme sua senha:</label>
        <input
          type="password"
          id="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          maxLength={50}
        />

        <button type="submit" className={styles.send_btn}>
          Cadastrar
        </button>

        <span>
          <p>Já possui conta?</p>
          <a href="/login">Faça login!</a>
        </span>
      </form>
    </div>
  );
};
export default RegisterPage;
