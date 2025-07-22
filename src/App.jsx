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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione all'invio
    if (
      fullName.trim() === '' ||
      userName.trim() === '' ||
      password.trim() === '' ||
      password.length < 8 ||
      spec === '' ||
      experience === '' ||
      isNaN(experience) ||
      Number(experience) < 0 ||
      description.trim() === ''
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
    <>
      <div className="container my-5">
        <h2 className="mb-4">Registrazione Sviluppatore</h2>
        <form onSubmit={handleSubmit}>

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


          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="mariorossi123"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


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


          <div className="mb-3">
            <label htmlFor="descrizione" className="form-label">Breve descrizione</label>
            <textarea
              className="form-control"
              id="descrizione"
              rows="4"
              placeholder="Breve descrizione"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">Invia</button>
        </form>
      </div>
    </>
  );
}

export default App;
