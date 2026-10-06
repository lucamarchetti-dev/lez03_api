const { esami, iscrizioni, prossimoCodice } = require("../data/database");

function getAll(req, res) {
    res.json({ status: "SUCCESS", data: esami });
}

function getByCode(req, res) {
    const esame = esami.find(elemento => elemento.codice === req.params.cod);
    if (!esame) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
    res.json({ status: "SUCCESS", data: esame });
}

function create(req, res) {
    const body = req.body || {};
    const nome = body.nome;
    const data = body.data;
    const corso = body.corso;
    const aula = body.aula;

    if ([nome, data, corso, aula].some(valore => typeof valore !== "string" || !valore.trim())) {
        return res.status(400).json({ status: "ERROR", data: "Dati dell'esame non validi" });
    }

    const nuovoEsame = {
        codice: `esam${prossimoCodice.esami++}`,
        nome,
        data,
        corso,
        aula
    };
    esami.push(nuovoEsame);
    res.status(201).json({ status: "SUCCESS", data: nuovoEsame });
}

function replace(req, res) {
    const esame = esami.find(elemento => elemento.codice === req.params.cod);
    if (!esame) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }

    const body = req.body || {};
    const nome = body.nome;
    const data = body.data;
    const corso = body.corso;
    const aula = body.aula;

    if ([nome, data, corso, aula].some(valore => typeof valore !== "string" || !valore.trim())) {
        return res.status(400).json({ status: "ERROR", data: "Dati dell'esame non validi" });
    }

    Object.assign(esame, { nome, data, corso, aula });
    res.json({ status: "SUCCESS", data: esame });
}

function remove(req, res) {
    const indice = esami.findIndex(elemento => elemento.codice === req.params.cod);
    if (indice === -1) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
    if (iscrizioni.some(iscrizione => iscrizione.esameCodice === req.params.cod)) {
        return res.status(409).json({ status: "ERROR", data: "Esame con iscrizioni attive" });
    }

    esami.splice(indice, 1);
    res.json({ status: "SUCCESS" });
}

module.exports = { getAll, getByCode, create, replace, remove };
