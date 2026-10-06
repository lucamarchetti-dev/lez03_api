const { studenti, esami, iscrizioni, prossimoCodice } = require("../data/database");

function getAll(req, res) {
    res.json({ status: "SUCCESS", data: iscrizioni });
}

function getByCode(req, res) {
    const iscrizione = iscrizioni.find(elemento => elemento.codice === req.params.cod);
    if (!iscrizione) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
    res.json({ status: "SUCCESS", data: iscrizione });
}

function validateReferences(studenteCodice, esameCodice, res) {
    if (typeof studenteCodice !== "string" || !studenti.some(studente => studente.codice === studenteCodice)) {
        res.status(400).json({ status: "ERROR", data: "Studente non valido" });
        return false;
    }
    if (typeof esameCodice !== "string" || !esami.some(esame => esame.codice === esameCodice)) {
        res.status(400).json({ status: "ERROR", data: "Esame non valido" });
        return false;
    }
    return true;
}

function hasDuplicate(studenteCodice, esameCodice, codiceEscluso) {
    return iscrizioni.some(iscrizione =>
        iscrizione.codice !== codiceEscluso &&
        iscrizione.studenteCodice === studenteCodice &&
        iscrizione.esameCodice === esameCodice
    );
}

function create(req, res) {
    const body = req.body || {};
    const studenteCodice = body.studenteCodice;
    const esameCodice = body.esameCodice;

    if (!validateReferences(studenteCodice, esameCodice, res)) {
        return;
    }
    if (hasDuplicate(studenteCodice, esameCodice)) {
        return res.status(409).json({ status: "ERROR", data: "Iscrizione già esistente" });
    }

    const nuovaIscrizione = {
        codice: `iscr${prossimoCodice.iscrizioni++}`,
        studenteCodice,
        esameCodice
    };
    iscrizioni.push(nuovaIscrizione);
    res.status(201).json({ status: "SUCCESS", data: nuovaIscrizione });
}

function replace(req, res) {
    const iscrizione = iscrizioni.find(elemento => elemento.codice === req.params.cod);
    if (!iscrizione) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }

    const body = req.body || {};
    const studenteCodice = body.studenteCodice;
    const esameCodice = body.esameCodice;

    if (!validateReferences(studenteCodice, esameCodice, res)) {
        return;
    }
    if (hasDuplicate(studenteCodice, esameCodice, iscrizione.codice)) {
        return res.status(409).json({ status: "ERROR", data: "Iscrizione già esistente" });
    }

    Object.assign(iscrizione, { studenteCodice, esameCodice });
    res.json({ status: "SUCCESS", data: iscrizione });
}

function remove(req, res) {
    const indice = iscrizioni.findIndex(elemento => elemento.codice === req.params.cod);
    if (indice === -1) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
    iscrizioni.splice(indice, 1);
    res.json({ status: "SUCCESS" });
}

module.exports = { getAll, getByCode, create, replace, remove };
