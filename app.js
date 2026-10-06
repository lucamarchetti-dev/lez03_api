// Importa i pacchetti
const express = require("express");
const cors = require("cors");

// Avvia l'applicazione
const app = express();
app.use(cors()); // Configura CORS con allow all
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configura l'accesso
const host = "127.0.0.1";
const port = 4000;

// Database Mock
let studenti = [
    {
        "codice": "stud1",
        "nome": "Giulia",
        "cognome": "Rossi",
        "email": "giulia.rossi@example.it",
        "corso": "Informatica"
    },
    {
        "codice": "stud2",
        "nome": "Marco",
        "cognome": "Bianchi",
        "email": "marco.bianchi@example.it",
        "corso": "Ingegneria gestionale"
    }
];
let prossimoCodice = studenti.length + 1;

// Avvia il server (solo se lanciato direttamente, non quando importato dai test)
if (require.main === module) {
    app.listen(port, host, () => {
        console.log(`Server in ascolto su ${host}:${port}`);
    });
}

// Endpoints

// Recupera tutti gli studenti
app.get("/students", (req, res) => {
    res.json({ status: "SUCCESS", data: studenti });
});

// Recupera uno studente specifico
app.get("/students/:cod", (req, res) => {
    const studente = studenti.find(s => s.codice === req.params.cod);
    if (studente) {
        res.json({ status: "SUCCESS", data: studente });
    } else {
        res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
});

// Crea un nuovo studente
app.post("/students", (req, res) => {
    const body = req.body || {};
    const nome = body.nome;
    const cognome = body.cognome;
    const email = body.email;
    const corso = body.corso;

    if ([nome, cognome, email, corso].some(valore => typeof valore !== "string" || !valore.trim())) {
        return res.status(400).json({ status: "ERROR", data: "Dati dello studente non validi" });
    }

    const nuovoStudente = {
        "codice": `stud${prossimoCodice++}`,
        "nome": nome,
        "cognome": cognome,
        "email": email,
        "corso": corso
    };
    studenti.push(nuovoStudente);
    res.json({ status: "SUCCESS", data: nuovoStudente });
});

// Elimina uno studente
app.delete("/students/:cod", (req, res) => {
    const indice = studenti.findIndex(s => s.codice === req.params.cod);
    if (indice !== -1) {
        studenti.splice(indice, 1);
        res.json({ status: "SUCCESS" });
    } else {
        res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
});

// Modifica i campi di uno studente
app.patch("/students/:cod", (req, res) => {
    const studente = studenti.find(s => s.codice === req.params.cod);

    if (!studente) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }

    const body = req.body || {};
    const campi = ["nome", "cognome", "email", "corso"];
    const campiInviati = campi.filter(campo => body[campo] !== undefined);

    if (campiInviati.length === 0 || campiInviati.some(campo => typeof body[campo] !== "string" || !body[campo].trim())) {
        return res.status(400).json({ status: "ERROR", data: "Dati dello studente non validi" });
    }

    campiInviati.forEach(campo => {
        studente[campo] = body[campo];
    });
    res.json({ status: "SUCCESS", data: studente });
});

module.exports = app;   //Serve per Mocha
