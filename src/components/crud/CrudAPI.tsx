/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { ErrorReq, helpHttp } from "../../helpers/helpHttp";
import { Loader } from "../loader/Loader";
import { Message } from "../message/Message";
import { HashRouter, NavLink, Route, Routes, Navigate } from "react-router-dom";
import { Error404 } from "../error/Error404";

export type Caballero = {
  id: number | null | string;
  name: string;
  constelation: string;
};

//const initialDB: Caballero[] = [];

// eslint-disable-next-line react-refresh/only-export-components
export const initialDataToEdit: Caballero = {
  id: null,
  constelation: "",
  name: "",
};

export const CrudAPI = () => {
  const [db, setDb] = useState<Caballero[] | null>(null);
  const [dataToEdit, setDataToEdit] = useState(initialDataToEdit);

  const [error, setError] = useState<null | ErrorReq>(null);
  const [loading, setLoading] = useState(false);

  const { get, post, put, del } = helpHttp();
  const url = "http://localhost:5000/caballeros";

  useEffect(() => {
    setLoading(true);
    //get(url).then((res) => !res.err && setDb(res));
    get(url).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
        console.log(res);
      }

      setLoading(false);
    });
  }, [url]);

  const createDate = (data: Caballero) => {
    data.id = Date.now() + "";

    const dataBI = JSON.stringify(data);

    const options: RequestInit = {
      body: dataBI,
      headers: { "content-type": "application/json" },
    };

    post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        if (db != null) setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateDate = (data: Caballero) => {
    if (db !== null) {
      const endpoint = `${url}/${data.id}`;

      const dataBI = JSON.stringify(data);

      const options: RequestInit = {
        body: dataBI,
        headers: { "content-type": "application/json" },
      };

      put(endpoint, options).then((res) => {
        console.log(res);
        if (!res.err) {
          const newData: Caballero[] = db.map((el) =>
            el.id === data.id ? data : el
          );
          setDb(newData);
        } else {
          setError(res);
        }
      });
    }
  };

  const deleteData = (id: number) => {
    if (db !== null) {
      const isDelete = confirm(
        `¿Está seguro de eliminar el registro con el id ${id}?`
      );

      if (isDelete) {
        const endpoint = `${url}/${id}`;

        const options: RequestInit = {
          headers: { "content-type": "application/json" },
        };

        del(endpoint, options).then((res) => {
          console.log(res);
          if (!res.err) {
            const newData = db.filter((el) => el.id != id);
            setDb(newData);
          } else {
            setError(res);
          }
        });
      } else return;
    }
  };

  return (
    <>
      <HashRouter>
        <header>
          <h2>Crud Api con Rutas</h2>
          <nav>
            <NavLink to="/">Caballeros</NavLink>
            <NavLink to="/agregar">Agregar</NavLink>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Table
                db={db}
                error={error}
                loading={loading}
                deleteData={deleteData}
                setDataToEdit={setDataToEdit}
              />
            }
          />

          <Route
            path="/agregar"
            element={
              <CrudForm
                createData={createDate}
                updateData={updateDate}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            }
          />

          <Route
            path="/editar/:id"
            element={
              <CrudForm
                createData={createDate}
                updateData={updateDate}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            }
          />

          <Route path="*" Component={Error404} />
        </Routes>
      </HashRouter>
    </>
  );
};

interface TableProp {
  loading: any;
  error: any;
  db: any;
  setDataToEdit: any;
  deleteData: any;
}

const Table = ({
  db,
  deleteData,
  error,
  loading,
  setDataToEdit,
}: TableProp) => {
  return (
    <>
      {loading && <Loader />}
      {error && <Message msg={`Error ${error.statustext}`} bgColor="#dc3545" />}
      {db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      )}
    </>
  );
};
