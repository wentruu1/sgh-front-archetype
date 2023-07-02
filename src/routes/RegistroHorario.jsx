import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistrarHorario = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [cuposDisponibles, setCuposDisponibles] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleDayChange = (date) => {
    setSelectedDay(date);
    setSelectedHorario("");
    setCuposDisponibles([]);
  };

  const handleHorarioChange = (e) => {
    setSelectedHorario(e.target.value);
  };

  const handleReservar = () => {
    if (selectedDay && selectedHorario) {
      setShowModal(true);
      setConfirmMessage("¿Desea confirmar la reserva?");
    }
  };

  const handleConfirmReserva = () => {
    setCuposDisponibles((prevCupos) => {
      const updatedCupos = [...prevCupos];
      const newCupo = { day: selectedDay, horario: selectedHorario };
      updatedCupos.push(newCupo);
      return updatedCupos;
    });

    setShowModal(false);
    setConfirmMessage("");
  };

  const handleCancelarReserva = () => {
    setShowModal(false);
    setConfirmMessage("");
  };

  const handleReiniciarCupos = () => {
    setCuposDisponibles([]);
  };

  const horarios = [
    "08:15",
    "09:25",
    "10:35",
    "11:45",
    "12:55",
    "14:05",
    "15:15",
    "16:25",
    "17:35",
    "18:45",
  ];

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Horarios</h2>
      <div className="form-group">
        <label>Filtrar por día:</label>
        <DatePicker
          className="form-control"
          selected={selectedDay}
          onChange={handleDayChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Seleccionar día"
        />
      </div>
      {selectedDay && (
        <>
          <br />
          <div className="row">
            {horarios.map((horario) => (
              <div className="col-md-4" key={horario}>
                <Card
                  className={`card ${selectedHorario === horario ? "bg-dark text-white" : ""}`}
                  onClick={() => setSelectedHorario(horario)}
                >
                  <Card.Body>
                    <Card.Title>{horario}</Card.Title>
                    <Card.Text>30 cupos disponibles</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          {selectedHorario && (
            <>
              <br />
              <Button variant="dark" onClick={handleReservar} style={{ marginRight: "10px" }}>
                Reservar
              </Button>
              <Button variant="dark" onClick={handleReiniciarCupos}>
                Reiniciar Cupos
              </Button>
              <br />
            </>
          )}
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{confirmMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleConfirmReserva}>
            Confirmar
          </Button>
          <Button variant="danger" onClick={handleCancelarReserva}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
    </div>
  );
};

export default RegistrarHorario;
