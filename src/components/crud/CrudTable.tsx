/* eslint-disable @typescript-eslint/no-explicit-any */
import { Caballero } from "./CrudAPI";
import { CrudTableRow } from "./CrudTableRow";

type CrudTableProps = {
  data: Caballero[] | null;
  deleteData: any;
  setDataToEdit: React.Dispatch<React.SetStateAction<Caballero>>;
};

export const CrudTable = ({
  data,
  deleteData,
  setDataToEdit,
}: CrudTableProps) => {
  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Constelacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3}>Sin Datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
