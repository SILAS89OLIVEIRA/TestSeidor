import { userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { 
    entities } = useSelector((state) => state.users);


  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };



  return (
    <div className="container">
      <div className="row">
       <h1>Funcionários Cadastrados</h1>
      </div>
      <div className="row">
     
          <Link to="/add-user">
            <button className="btn btn-primary">Cadastrar Funcinário</button>
          </Link>
      
      </div>
      <div className="row esplinha">

          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cpf</th>
                <th>Salário</th>
                <th>Desconto</th>
                <th>Dependentes</th>
                <th>Salario Base Ir</th>
                <th>IRRF</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, name, cpf, salario, desconto, dependentes, salariobaseir,irrf}, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{cpf}</td>
                    <td>{salario}</td>
                    <td>{desconto}</td>
                    <td>{dependentes}</td>
                    <td>{salariobaseir}</td>
                    <td>{irrf}</td>
                    <td>
                      <button className="btn btn-primary esplateral" onClick={() => handleDelete(id)}>Deletar</button>
                      <Link to={`/edit-user/${id}`}>
                      
                      <button className="btn btn-primary esplateral">Editar</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
       
      </div>
    </div>
  );
}
