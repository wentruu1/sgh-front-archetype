import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { Link } from "react-router-dom";
const RegistrarHorario = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [cuposDisponibles, setCuposDisponibles] = useState([]);
  const [cupos, setCupos] = useState(null);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleDayChange = (date) => {
    setSelectedDay(date);
    console.log(date)
    setSelectedHorario("");
    setCuposDisponibles([]);
  };

  const handleHorarioChange = (e) => {
    setSelectedHorario(e.target.value);
  };

  const handleReservar = async () => {
    if (selectedDay && selectedHorario) {
      setCupos(await getCupos(selectedHorario,selectedDay))
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
    setShowSuccess(true);
    setConfirmMessage("");
  };

  const handleCerrarResultado = () => {
    setShowSuccess(false);
    setConfirmMessage("")
  }

  const handleCancelarReserva = () => {
    setShowModal(false);
    setConfirmMessage("");
  };

  const handleReiniciarCupos = () => {
    setCuposDisponibles([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dia = new Date(selectedDay)
    let mes;
    if(dia.getMonth() + 1 < 10){
      mes = `0${dia.getMonth() + 1}`
    }
    const dayString = `${dia.getFullYear()}-${mes}-${dia.getDate()}`;
    const form = {
        email: email,
        date: dayString,
        slotId: getBloque(selectedHorario)
    }
    const response = await axios.post('http://localhost:3000/schedules/addToSlot', form, { headers: {
        "Access-Control-Allow-Origin": "*"
      }})
    console.log(response.data)
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

  const getCupos = async (horario, day) => {
    const bloque = getBloque(horario)
    console.log(bloque)
    const dia = new Date(day)
    let mes;
    if(dia.getMonth() + 1 < 10){
      mes = `0${dia.getMonth() + 1}`
    }
    const dayString = `${dia.getFullYear()}-${mes}-${dia.getDate()}`;
    const form = {
      date: dayString,
      slotId: bloque
    }
    const response = await axios.post('http://localhost:3000/schedules/slotsFilled', form, { headers: {
            "Access-Control-Allow-Origin": "*"
          }})
    return 30-response.data;
  }

  const horarios = [
    "08:15",
    "09:25",
    "10:35",
    "11:45",
    "12:55",
    "14:05",
    "15:15",
    "16:25",
  ];

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Registrar Horario</h2>
      <Link to={`/buscar`} className="btn btn-dark" style={{ padding: "8px 16px", fontSize: "14px" }}>
        Listar Inscritos
      </Link>
      <br />
      <br />
      <br />
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
          <p>Quedan {cupos} cupos. Por favor, ingresa el usuario a inscribir, </p>
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <div>
              <label>Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
            </div>
            <Button type="sumbit" variant="success" onClick={handleConfirmReserva}>
            Confirmar
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancelarReserva}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reservacion exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Se ha agregado la reserva al horario seleccionado.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCerrarResultado}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


      <br />
    </div>
  );
};

export default RegistrarHorario;