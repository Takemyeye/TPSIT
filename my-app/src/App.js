import { useState } from "react";
import "./app.css";

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [allData, setAllData] = useState([]);

    const handleSubmite = async () => {
        const response = await fetch("http://localhost:3001/save", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ firstName, lastName }),
        });

        const data = await response.json();
        setResponseData(data);
    };

    const handleLoadAll = async () => {
        const response = await fetch("http://localhost:3001/getAll");
        const data = await response.json();
        setAllData(data);
    }

    return(
        <div>
            <h1>DATA</h1>
            <input type="text" placeholder="nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="nome" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <button onClick={handleSubmite}>manda</button>
            <button onClick={handleLoadAll}>Carica Tutti</button>

            {responseData && (
                <div>
                    <h2>Risultato:</h2>
                    <p>Nome: {responseData.firstName}</p>
                    <p>Cognome: {responseData.lastName}</p>
                </div>
            )}

            {allData.length > 0 && (
                <div>
                    <h2>Tutti i Dati:</h2>
                    <ul>
                        {allData.map((item, index) => (
                            <li key={index}>
                                {item.firstName} {item.lastName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
