import "../styles/comentarios.css";
import Person from "..//images/card/Person.svg";
export default function Comentarios({ usuario = "User", comentario }) {
  return (
    <div className="card">
      <div className="container-card">
        <img src={Person} className="img"/>
        <h3 className="usuario">{usuario}</h3>
      </div>
      <p className="comentario">{comentario}</p>
    </div>
  );
}
