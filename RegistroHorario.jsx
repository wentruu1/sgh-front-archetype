import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrarHorario = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [cuposDisponibles, setCuposDisponibles] = useState({
    Lunes: {
      "08:15": 30,
      "09:25": 30,
      "10:35": 30,
      "11:45": 30,
      "12:55": 30,
      "14:05": 30,
      "15:15": 30,
      "16:25": 30,
      "17:35": 30,
      "18:45": 30,
    },
    Martes: {
      "08:15": 30,
      "09:25": 30,
      "10:35": 30,
      "11:45": 30,
      "12:55": 30,
      "14:05": 30,
      "15:15": 30,
      "16:25": 30,
      "17:35": 30,
      "18:45": 30,
    },
    Miércoles: {
      "08:15": 30,
      "09:25": 30,
      "10:35": 30,
      "11:45": 30,
      "12:55": 30,
      "14:05": 30,
      "15:15": 30,
      "16:25": 30,
      "17:35": 30,
      "18:45": 30,
    },
    Jueves: {
      "08:15": 30,
      "09:25": 30,
      "10:35": 30,
      "11:45": 30,
      "12:55": 30,
      "14:05": 30,
      "15:15": 30,
      "16:25": 30,
      "17:35": 30,
      "18:45": 30,
    },
    Viernes: {
      "08:15": 30,
      "09:25": 30,
      "10:35": 30,
      "11:45": 30,
      "12:55": 30,
      "14:05": 30,
      "15:15": 30,
      "16:25": 30,
      "17:35": 30,
      "18:45": 30,
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setSelectedDay(selectedDay);
    setSelectedHorario("");
  };

  const handleHorarioChange = (e) => {
    setSelectedHorario(e.target.value);
  };

  const handleReservar = () => {
    if (selectedDay && selectedHorario) {
      const updatedCupos = { ...cuposDisponibles };
      const cuposDia = updatedCupos[selectedDay];
      if (cuposDia && cuposDia[selectedHorario] > 0) {
        setShowModal(true);
        setConfirmMessage("¿Desea confirmar la reserva?");
      }
    }
  };

  const handleConfirmReserva = () => {
    const updatedCupos = { ...cuposDisponibles };
    const cuposDia = updatedCupos[selectedDay];
    if (cuposDia && cuposDia[selectedHorario] > 0) {
      cuposDia[selectedHorario] = cuposDia[selectedHorario] - 1;
      setCuposDisponibles(updatedCupos);
      setShowModal(false);
      setConfirmMessage("");
    }
  };

  const handleCancelarReserva = () => {
    setShowModal(false);
    setConfirmMessage("");
  };

  const handleReiniciarCupos = () => {
    if (selectedDay) {
      const initialCupos = { ...cuposDisponibles };
      initialCupos[selectedDay] = {
        "08:15": 30,
        "09:25": 30,
        "10:35": 30,
        "11:45": 30,
        "12:55": 30,
        "14:05": 30,
        "15:15": 30,
        "16:25": 30,
        "17:35": 30,
        "18:45": 30,
      };
      setCuposDisponibles(initialCupos);
    }
  };

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
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

  const horariosDisponibles = selectedDay ? horarios : [];

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
        <select className="form-control" value={selectedDay} onChange={handleDayChange}>
          <option value="">Todos los días</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {selectedDay && (
        <>
          <br />
          <div className="row">
            {horariosDisponibles.map((horario) => (
              <div className="col-md-4" key={horario}>
                <Card
                  className={`card ${selectedHorario === horario ? "bg-dark text-white" : ""}`}
                  onClick={() => setSelectedHorario(horario)}
                >
                  <Card.Body>
                    <Card.Title>{horario}</Card.Title>
                    <Card.Text>
                      {cuposDisponibles[selectedDay][horario] || 30} cupos disponibles
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          {selectedHorario && (
            <>
              <br />
              <Button variant="dark" onClick={handleReservar}>
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
