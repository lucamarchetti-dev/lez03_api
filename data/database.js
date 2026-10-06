const studenti = [
    {
        codice: "stud1",
        nome: "Giulia",
        cognome: "Rossi",
        email: "giulia.rossi@example.it",
        corso: "Informatica"
    },
    {
        codice: "stud2",
        nome: "Marco",
        cognome: "Bianchi",
        email: "marco.bianchi@example.it",
        corso: "Ingegneria gestionale"
    }
];

const esami = [
    {
        codice: "esam1",
        nome: "Programmazione",
        data: "20/10/2026",
        corso: "Informatica",
        aula: "Aula 1"
    },
    {
        codice: "esam2",
        nome: "Analisi matematica",
        data: "12/11/2026",
        corso: "Ingegneria gestionale",
        aula: "Aula 2"
    }
];

const iscrizioni = [];

const prossimoCodice = {
    studenti: 3,
    esami: 3,
    iscrizioni: 1
};

module.exports = { studenti, esami, iscrizioni, prossimoCodice };
