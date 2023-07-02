import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const handleBuscarCupos = () => {
    if (selectedDay && selectedBlock) {
      const cupos = [
        {horario: "08:15 - 09:25", nombre: "Juan Pérez", carrera: "Ingeniería Informática", rut: "12.345.678-9" },
        {horario: "09:35 - 10:45", nombre: "María Gómez", carrera: "Psicología", rut: "98.765.432-1" },
        {horario: "10:55 - 12:05", nombre: "Carlos Rodríguez", carrera: "Administración de Empresas", rut: "11.223.344-5" },
      ];

      setCuposTomados(cupos);
    }
  };

  return (
    <div className="container">
      <h2 style={{paddingTop:"150px"}}>Buscar Cupos</h2>
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
          <option value="Bloque 1 (08:15 - 09:25)">Bloque 1 (08:15 - 09:25)</option>
          <option value="Bloque 2 (09:35 - 10:45)">Bloque 2 (09:35 - 10:45)</option>
          <option value="Bloque 3 (10:55 - 12:05)">Bloque 3 (10:55 - 12:05)</option>
          <option value="Bloque 4 (12:15 - 13:25)">Bloque 4 (12:15 - 13:25)</option>
          <option value="Bloque 5 (13:35 - 14:45)">Bloque 5 (13:35 - 14:45)</option>
          <option value="Bloque 6 (14:55 - 16:05)">Bloque 6 (14:55 - 16:05)</option>
          <option value="Bloque 7 (16:15 - 17:25)">Bloque 7 (16:15 - 17:25)</option>
          <option value="Bloque 8 (17:35 - 18:45)">Bloque 8 (17:35 - 18:45)</option>
          <option value="Bloque 9 (18:55 - 20:05)">Bloque 9 (18:55 - 20:05)</option>
          <option value="Bloque 10 (20:15 - 21:25)">Bloque 10 (20:15 - 21:25)</option>
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
                <th>Nombre</th>
                <th>Carrera</th>
                <th>RUT</th>
              </tr>
            </thead>
            <tbody>
              {cuposTomados.map((cupo) => (
                <tr key={cupo.id}>
                  <td>{cupo.nombre}</td>
                  <td>{cupo.carrera}</td>
                  <td>{cupo.rut}</td>
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
