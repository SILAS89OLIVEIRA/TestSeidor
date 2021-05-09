import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "./usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [salario, setSalbruto] = useState(user.salario);
  const [desconto, setDescontoprev] = useState(user.desconto);
  const [dependentes, setNumdep] = useState(user.dependentes);
  const [salariobaseir, setSalariobaseir] = useState(user.salariobaseir);
  const [irrf, setIrrf] = useState(user.irrf);
  const [error, setError] = useState(null);


  const handleName = (e) => setName(e.target.value);
  const handleCpf = (e) => setCpf(e.target.value);
  const handleSalBruto = (e) => setSalbruto(e.target.value);
  const handleDescontoprev = (e) => setDescontoprev(e.target.value);
  const handleNumdep = (e) => setNumdep(e.target.value);
  const handleSalariobaseir = (e) => setSalariobaseir(e.target.value);
  const handleIrrf = (e) => setIrrf(e.target.value);

  const calcsalbase = () => {
    let deducaodep = 164.56 * dependentes
    return document.getElementById('idsalbr').value = salario - desconto - deducaodep
        };

  const calcIr = () => {
    if (salariobaseir < 1903.98) document.getElementById('idirrf').value = 'ISENTO'
    else if (salariobaseir >= 1903.99 && salariobaseir <=2826.65) document.getElementById('idirrf').value = (salariobaseir*7.5/100)-142.80
    else if (salariobaseir >= 2826.66 && salariobaseir <=3751.05) document.getElementById('idirrf').value = (salariobaseir*15/100)-354.80
    else if (salariobaseir >= 3751.06 && salariobaseir <=4664.68) document.getElementById('idirrf').value = (salariobaseir*22.5/100)-636.13
    else if (salariobaseir > 4664.68) document.getElementById('idirrf').value = (salariobaseir*27.5/100)-869.36
    };



  const handleClick = () => {
    if (name && cpf && salario && desconto && dependentes && salariobaseir && irrf) {
      dispatch(
        userUpdated({
          id: userId,
          name,
          cpf,
          salario,
          desconto,
          dependentes,
          salariobaseir,
          irrf
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Preencha todos os campos");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Editar Funcionário</h1>
      </div>
      <div className="row">
      <div className="col-6">
          <label htmlFor="nameInput"  className="form-label">Nome</label>
          <input 
          className="form-control"
            type="text"
            placeholder="Nome Completo"
            id="nameInput"
            onChange={handleName}
            value={name}
          /></div>
<div className="col-4">
          <label htmlFor="cpfInput" className="form-label">Cpf</label>
          <input
            className="form-control"
            type="text"
            placeholder="Cpf"
            id="emailInput"
            onChange={handleCpf}
            value={cpf}
          /></div></div>
          <div className="row">
<div class="col-4">
          <label htmlFor="salbInput" className="form-label">Salário Bruto</label>
          <input
           className="form-control"
            type="text"
            placeholder="Salario Bruto"
            id="emailInput"
            onChange={handleSalBruto}
            value={salario}
          /></div>
<div class="col-4">
<label htmlFor="descInput"className="form-label">Desconto Previdencia</label>
          <input
          className="form-control"
            type="text"
            placeholder="Desconto Previdencia"
            id="emailInput"
            onChange={handleDescontoprev}
            value={desconto}
          /></div>

<div class="col-4">
<label htmlFor="numdepInput"className="form-label">Num. Dependentes</label>
          <input
            className="form-control"
            type="text"
            placeholder="Numero de Dependentes"
            id="emailInput"
            onChange={handleNumdep}
            value={dependentes}
          /></div></div>

<div className="row">
<div class="col-6">
<label htmlFor="salirInput" className="form-label">Salário Base Ir</label>
          <input
            className="form-control"
            type="text"
            placeholder="Click para calcular"
            id="idsalbr"
            onClick={ calcsalbase}
            onMouseOut={handleSalariobaseir}
            /></div>

<div class="col-6">
<label htmlFor="irpfInput" className="form-label">IRPF</label>
          <input
           className="form-control"
            type="text"
            placeholder="Click para calcular"
            id="idirrf"
            onClick={ calcIr}
            onMouseOut={handleIrrf}
            />
</div></div>
          {error && error}
          <button onClick={handleClick} className="btn btn-primary esplinha">
            Salvar Edição
          </button>
        </div>
 
  );
}
