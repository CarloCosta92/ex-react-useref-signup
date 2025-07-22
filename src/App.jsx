import { useState, useRef } from 'react';
import './App.css';

function App() {
  // Campi controllati con validazione in tempo reale
  //user
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  //password
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  //descrizione
  const [description, setDescription] = useState('');
  const [isDescriptionValid, setIsDescriptionValid] = useState(null);

  // Campi non controllati con useRef
  const fullNameRef = useRef();
  const specRef = useRef();
  const expRef = useRef();

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  // Validazione username
  const validateUsername = (value) => {
    const isValid = /^[a-zA-Z0-9]{6,}$/.test(value);
    setIsUsernameValid(isValid);
    setUsername(value);
  };

  // Validazione password
  const validatePassword = (value) => {
    const hasLetter = value.split('').some((char) => letters.includes(char));
    const hasNumber = value.split('').some((char) => numbers.includes(char));
    const hasSymbol = value.split('').some((char) => symbols.includes(char));

    const isValid = value.length >= 8 && hasLetter && hasNumber && hasSymbol;
    setIsPasswordValid(isValid);
    setPassword(value);
  };

  // Validazione descrizione
  const validateDescription = (value) => {
    const trimmed = value.trim();
    const isValid = trimmed.length >= 100 && trimmed.length <= 1000;
    setIsDescriptionValid(isValid);
    setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupero valori campi non controllati
    const fullName = fullNameRef.current.value.trim();
    const spec = specRef.current.value;
    const experience = expRef.current.value;

    if (
      !fullName ||
      !username ||
      !isUsernameValid ||
      !password ||
      !isPasswordValid ||
      !spec ||
      isNaN(experience) ||
      Number(experience) < 0 ||
      !description.trim() ||
      !isDescriptionValid
    ) {
      alert("Compila correttamente tutti i campi.");
      return;
    }

    const formData = {
      fullName,
      username,
      password,
      spec,
      experience: Number(experience),
      description,
    };

    console.log("Dati inviati:", formData);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Registrazione Sviluppatore</h2>
      <form onSubmit={handleSubmit}>
        {/* Nome completo  */}
        <div className="mb-3">
          <label htmlFor="nomeCompleto" className="form-label">Nome completo</label>
          <input
            type="text"
            className="form-control"
            id="nomeCompleto"
            placeholder="Mario Rossi"
            ref={fullNameRef}
          />
        </div>

        {/* Username  */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${isUsernameValid === false ? 'is-invalid' : isUsernameValid === true ? 'is-valid' : ''}`}
            id="username"
            placeholder="mariorossi123"
            value={username}
            onChange={(e) => validateUsername(e.target.value)}
          />
          {isUsernameValid === false && <div className="text-danger">Minimo 6 caratteri, solo lettere e numeri.</div>}
          {isUsernameValid === true && <div className="text-success">Username valido.</div>}
        </div>

        {/* Password  */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${isPasswordValid === false ? 'is-invalid' : isPasswordValid === true ? 'is-valid' : ''}`}
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {isPasswordValid === false && (
            <div className="text-danger">
              Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.
            </div>
          )}
          {isPasswordValid === true && <div className="text-success">Password valida.</div>}
        </div>

        {/* Specializzazione  */}
        <div className="mb-3">
          <label htmlFor="specializzazione" className="form-label">Specializzazione</label>
          <select
            className="form-select"
            id="specializzazione"
            ref={specRef}
            defaultValue=""
          >
            <option value="" disabled>Scegli una specializzazione</option>
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        {/* Anni di esperienza  */}
        <div className="mb-3">
          <label htmlFor="esperienza" className="form-label">Anni di esperienza</label>
          <input
            type="number"
            className="form-control"
            id="esperienza"
            placeholder="es. 3"
            ref={expRef}
          />
        </div>

        {/* Descrizione  */}
        <div className="mb-3">
          <label htmlFor="descrizione" className="form-label">Breve descrizione</label>
          <textarea
            className={`form-control ${isDescriptionValid === false ? 'is-invalid' : isDescriptionValid === true ? 'is-valid' : ''}`}
            id="descrizione"
            rows="4"
            placeholder="Scrivi qualcosa su di te..."
            value={description}
            onChange={(e) => validateDescription(e.target.value)}
          />
          {isDescriptionValid === false && (
            <div className="text-danger">La descrizione deve avere tra 100 e 1000 caratteri.</div>
          )}
          {isDescriptionValid === true && <div className="text-success">Descrizione valida.</div>}
        </div>

        <button type="submit" className="btn btn-primary">Invia</button>
      </form>
    </div>
  );
}

export default App;
