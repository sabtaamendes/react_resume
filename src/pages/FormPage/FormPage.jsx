import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./FormPage.module.scss";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    desired_position: "",
    curriculum: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    //checking if text input has only letters
    if (e.target.name === "name") {
      const regMatch = /^[a-zA-Z ]*$/.test(e.target.value);
      if (!regMatch) {
        return;
      }
    }

    //checking if input has only numbers
    if (e.target.name === "phone") {
      const regMatch = /^[0-9]*$/.test(e.target.value);
      if (!regMatch) {
        return;
      }
    }

    //2MB pdf file size limit
    if (name === "curriculum") {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("Tamanho do arquivo maior que 2MB.");
        return;
      }
      if (file && file.type !== "application/pdf") {
        toast.error("Arquivo deve estar em formato PDF.");
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "curriculum" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.curriculum == null) {
      toast.error("Arquivo com formato incorreto.");
      return;
    }

    //Check file size (limit 2Mb)
    if (formData.curriculum && formData.curriculum.size > 2 * 1024 * 1024) {
      toast.error("Arquivo excede o limite de 2Mb");
      return;
    }

    //Check format of file (pdf)
    if (formData.curriculum && formData.curriculum.type !== "application/pdf") {
      toast.error("Arquivo deve estar em formato PDF.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("desired_position", formData.desired_position);
    formDataToSend.append("file", formData.curriculum);

    // console.log("data to send:", formDataToSend);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formDataToSend,
      });
      
      if (response.ok) {
        toast.success("Currículo enviado!");
        // console.log("response:", response);
      }
    } catch (error) {
      toast.error("Erro ao enviar currículo. Tente novamente.");
      console.error(error);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      desired_position: "",
      curriculum: null,
    });
  };

  return (
    <div className={styles.form}>
      <h2 className="title">Envie seu Currículo</h2>
      <form
        className={styles.form_container}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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

        <label htmlFor="phone">Telefone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={11}
        />

        <label htmlFor="desired_position">Posição Desejada:</label>

        <select
          id="desired_position"
          name="desired_position"
          value={formData.desired_position}
          onChange={handleChange}
          required
        >
          <option value="">Selecione cargo</option>
          <option value="Assistente-administrativo">
            Assistente Administrativo
          </option>
          <option value="Assistente-compras">Assistente de Compras</option>
          <option value="Assistente-marketing">Assistente de Marketing</option>
          <option value="Assistente-rh">Assistente de RH</option>
          <option value="Cozinheiro">Cozinheiro(a)</option>
          <option value="Desenvolvedor">Desenvolvedor(a)</option>
          <option value="Motorista">Motorista</option>
          <option value="Nutricionista">Nutricionista</option>
          <option value="Recepcionista">Recepcionista</option>
          <option value="Servicos-gerais">Serviços Gerais</option>
          <option value="TI">Técnico(a) de Informática</option>
        </select>

        <div>
          <label className={styles.curriculo_label} htmlFor="curriculum">
            Currículo:
          </label>

          <input
            type="file"
            name="curriculum"
            id="curriculum"
            accept=".pdf"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.send_btn}>
          Enviar
        </button>
      </form>
    </div>
  );
};
export default Form;
