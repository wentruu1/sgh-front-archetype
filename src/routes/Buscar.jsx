import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { Link } from "react-router-dom";
const BuscarCupos = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [cuposTomados, setCuposTomados] = useState([]);

  const handleDayChange = (date) => {
    setSelectedDay(date);
  };

  const handleBlockChange = (e) => {
    setSelectedBlock(e.target.value);
  };
  
  const getBloque = (horario) => {
    let bloque;
    switch(horario){
      case "08:15": bloque = 1; break;
      case "09:25": bloque = 2; break;
      case "10:35": bloque = 3; break;
      case "11:45": bloque = 4; break;
      case "12:55": bloque = 5; break;
      case "14:05": bloque = 6; break;
      case "15:15": bloque = 7; break;
      case "16:25": bloque = 8; break;
      default: break;
    }
    return bloque;
  };

  const handleBuscarCupos = async () => {
    if (selectedDay && selectedBlock) {
      const dia = new Date(selectedDay)
      let mes;
      if(dia.getMonth() + 1 < 10){
        mes = `0${dia.getMonth() + 1}`
      }
      const dayString = `${dia.getFullYear()}-${mes}-${dia.getDate()}`;
      const form = {
        date: dayString,
        slotId: getBloque(selectedBlock)
      }
      const response = await axios.post('http://localhost:3000/schedules/slotUsers', form, { headers: {
        "Access-Control-Allow-Origin": "*"
      }})

      console.log(response.data)
      setCuposTomados(response.data);
    }
  };

  return (
    <div className="container">
      <h2 style={{paddingTop:"150px"}}>Listar Inscritos</h2>
      <Link to={`/registrar`} className="btn btn-dark" style={{ padding: "8px 16px", fontSize: "14px" }}>
        Registrar Horario
      </Link>
      <br />
      <br />
      <br />
      <div className="form-group">
        <label>Seleccionar día:</label>
        <DatePicker
          className="form-control"
          selected={selectedDay}
          onChange={handleDayChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Seleccionar día"
        />
      </div>
      <div className="form-group">
        <label>Seleccionar bloque:</label>
        <select className="form-control" value={selectedBlock} onChange={handleBlockChange}>
          <option value="">Seleccionar bloque</option>
          <option value="08:15">Bloque 1 (08:15 - 09:25)</option>
          <option value="09:25">Bloque 2 (09:35 - 10:45)</option>
          <option value="10:35">Bloque 3 (10:55 - 12:05)</option>
          <option value="11:45">Bloque 4 (12:15 - 13:25)</option>
          <option value="12:55">Bloque 5 (13:35 - 14:45)</option>
          <option value="14:05">Bloque 6 (14:55 - 16:05)</option>
          <option value="15:15">Bloque 7 (16:15 - 17:25)</option>
          <option value="16:25">Bloque 8 (17:35 - 18:45)</option>
        </select>
      </div>
      <button className="btn btn-dark" onClick={handleBuscarCupos} disabled={!selectedDay || !selectedBlock}>
        Buscar
      </button>
      <br />
      {cuposTomados.length > 0 && (
        <div>
          <br />
          <h4>Cupos Tomados:</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Faltas</th>
              </tr>
            </thead>
            <tbody>
              {cuposTomados.map((cupo) => (
                <tr key={cupo.email}>
                  <td>{cupo.email}</td>
                  <td>{cupo.absenceCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarCupos;
