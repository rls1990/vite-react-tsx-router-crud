import { useNavigate } from "react-router-dom";
import { Caballero } from "./CrudAPI";

type CrudTableRowProps = {
  el: Caballero;
  setDataToEdit: React.Dispatch<React.SetStateAction<Caballero>>;
  deleteData: (id: string | number | null) => void;
};

export const CrudTableRow = ({
  el,
  setDataToEdit,
  deleteData,
}: CrudTableRowProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    setDataToEdit(el);
    navigate(`/editar/${el.id}`);
  };

  return (
    <tr>
      <td>{el.name}</td>
      <td>{el.constelation}</td>
      <td className="mysty">
        <button onClick={handleEdit}>Editar</button>
        <button onClick={() => deleteData(el.id)}>Eliminar</button>
      </td>
    </tr>
  );
};
