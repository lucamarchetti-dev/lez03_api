const { studenti, iscrizioni, prossimoCodice } = require("../data/database");

function getAll(req, res) {
    res.json({ status: "SUCCESS", data: studenti });
}

function getByCode(req, res) {
    const studente = studenti.find(elemento => elemento.codice === req.params.cod);
    if (!studente) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
    res.json({ status: "SUCCESS", data: studente });
}

function create(req, res) {
    const body = req.body || {};
    const nome = body.nome;
    const cognome = body.cognome;
    const email = body.email;
    const corso = body.corso;

    if ([nome, cognome, email, corso].some(valore => typeof valore !== "string" || !valore.trim())) {
        return res.status(400).json({ status: "ERROR", data: "Dati dello studente non validi" });
    }

    const nuovoStudente = {
        codice: `stud${prossimoCodice.studenti++}`,
        nome,
        cognome,
        email,
        corso
    };
    studenti.push(nuovoStudente);
    res.json({ status: "SUCCESS", data: nuovoStudente });
}

function replace(req, res) {
    const studente = studenti.find(elemento => elemento.codice === req.params.cod);
    if (!studente) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }

    const body = req.body || {};
    const nome = body.nome;
    const cognome = body.cognome;
    const email = body.email;
    const corso = body.corso;

    if ([nome, cognome, email, corso].some(valore => typeof valore !== "string" || !valore.trim())) {
        return res.status(400).json({ status: "ERROR", data: "Dati dello studente non validi" });
    }

    Object.assign(studente, { nome, cognome, email, corso });
    res.json({ status: "SUCCESS", data: studente });
}

function remove(req, res) {
    const indice = studenti.findIndex(elemento => elemento.codice === req.params.cod);
    if (indice === -1) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
    if (iscrizioni.some(iscrizione => iscrizione.studenteCodice === req.params.cod)) {
        return res.status(409).json({ status: "ERROR", data: "Studente già iscritto a un esame" });
    }

    studenti.splice(indice, 1);
    res.json({ status: "SUCCESS" });
}

module.exports = { getAll, getByCode, create, replace, remove };
