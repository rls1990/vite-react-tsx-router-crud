import React, { useEffect, useState } from "react";
import { Caballero, initialDataToEdit } from "./CrudAPI";
import { useNavigate } from "react-router-dom";

const InitialForm: Caballero = {
  id: null,
  name: "",
  constelation: "",
};

type CrudFormProps = {
  createData: (data: Caballero) => void;
  updateData: (data: Caballero) => void;
  dataToEdit: Caballero;
  setDataToEdit: (data: Caballero) => void;
};

export const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}: CrudFormProps) => {
  const [form, setForm] = useState(InitialForm);

  const navigate = useNavigate();

  useEffect(() => {
    if (dataToEdit.id !== null) {
      setForm(dataToEdit);
    } else setForm(InitialForm);
  }, [dataToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") setForm({ ...form, name: e.target.value });
    if (e.target.name === "constelation")
      setForm({ ...form, constelation: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.constelation) {
      alert("Datos incompletos.");
      return;
    }

    if (form.id === null && form.name != "") {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = () => {
    setForm(InitialForm);
    setDataToEdit(initialDataToEdit);
    navigate("/");
  };

  return (
    <div>
      <h3>{dataToEdit.id != null ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit} className="mysty">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="constelation"
          placeholder="Constelación"
          onChange={handleChange}
          value={form.constelation}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};
