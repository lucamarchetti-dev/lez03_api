// Importa i pacchetti
const express = require("express");
const cors = require("cors");
const studentiRouter = require("./routes/studentiRouter");
const esamiRouter = require("./routes/esamiRouter");
const iscrizioniRouter = require("./routes/iscrizioniRouter");

// Avvia l'applicazione
const app = express();
app.use(cors()); // Configura CORS con allow all
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configura l'accesso
const host = "0.0.0.0";
const port = process.env.PORT || 4000;

app.use("/students", studentiRouter);
app.use("/exams", esamiRouter);
app.use("/enrollments", iscrizioniRouter);

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

module.exports = app;   //Serve per Mocha
