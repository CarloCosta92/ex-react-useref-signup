import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [fullName, setFullName] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [spec, setSpec] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');

  const [userValid, setUserValid] = useState(null);
  const [passValid, setPassValid] = useState(null);
  const [descValid, setDescValid] = useState(null);

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  // Validazione username
  const validateUsername = (value) => {
    // formula copiata
    const isValid = /^[a-zA-Z0-9._-]{6,}$/.test(value);
    setUserValid(isValid);
    setUsername(value);
  };

  // Validazione password
  const validatePassword = (value) => {
    const hasLetter = value.split('').some((char) => letters.includes(char));
    const hasNumber = value.split('').some((char) => numbers.includes(char));
    const hasSymbol = value.split('').some((char) => symbols.includes(char));

    const isValid = value.length >= 8 && hasLetter && hasNumber && hasSymbol;
    setPassValid(isValid);
    setPassword(value);
  };

  // Validazione descrizione
  const validateDescription = (value) => {
    const trimmed = value.trim();
    const isValid = trimmed.length >= 100 && trimmed.length <= 1000;
    setDescValid(isValid);
    setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      fullName.trim() === '' ||
      !userValid ||
      !passValid ||
      spec === '' ||
      experience === '' ||
      isNaN(experience) ||
      Number(experience) < 0 ||
      !descValid
    ) {
      alert("Compila correttamente tutti i campi.");
      return;
    }

    const formData = {
      fullName,
      userName,
      password,
      spec,
      experience: Number(experience),
      description,
    };

    setData(formData);
    console.log("Dati inviati:", formData);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Registrazione Sviluppatore</h2>
      <form onSubmit={handleSubmit}>
        {/* Nome completo */}
        <div className="mb-3">
          <label htmlFor="nomeCompleto" className="form-label">Nome completo</label>
          <input
            type="text"
            className="form-control"
            id="nomeCompleto"
            placeholder="Mario Rossi"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${userValid === false ? 'is-invalid' : userValid === true ? 'is-valid' : ''}`}
            id="username"
            placeholder="mariorossi123"
            value={userName}
            onChange={(e) => validateUsername(e.target.value)}
          />
          {userValid === false && <div className="text-danger">Minimo 6 caratteri, solo lettere e numeri.</div>}
          {userValid === true && <div className="text-success">Username valido.</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${passValid === false ? 'is-invalid' : passValid === true ? 'is-valid' : ''}`}
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {passValid === false && (
            <div className="text-danger">
              Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.
            </div>
          )}
          {passValid === true && <div className="text-success">Password valida.</div>}
        </div>

        {/* Specializzazione */}
        <div className="mb-3">
          <label htmlFor="specializzazione" className="form-label">Specializzazione</label>
          <select
            className="form-select"
            id="specializzazione"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          >
            <option value="" disabled>Scegli una specializzazione</option>
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        {/* Esperienza */}
        <div className="mb-3">
          <label htmlFor="esperienza" className="form-label">Anni di esperienza</label>
          <input
            type="number"
            className="form-control"
            id="esperienza"
            placeholder="es. 3"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        {/* Descrizione */}
        <div className="mb-3">
          <label htmlFor="descrizione" className="form-label">Breve descrizione</label>
          <textarea
            className={`form-control ${descValid === false ? 'is-invalid' : descValid === true ? 'is-valid' : ''}`}
            id="descrizione"
            rows="4"
            placeholder="Scrivi qualcosa su di te..."
            value={description}
            onChange={(e) => validateDescription(e.target.value)}
          />
          {descValid === false && (
            <div className="text-danger">La descrizione deve avere tra 100 e 1000 caratteri.</div>
          )}
          {descValid === true && <div className="text-success">Descrizione valida.</div>}
        </div>

        <button type="submit" className="btn btn-primary">Invia</button>
      </form>
    </div>
  );
}

export default App;
