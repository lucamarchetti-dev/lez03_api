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
    },
    {
        codice: "stud3",
        nome: "Sara",
        cognome: "Verdi",
        email: "sara.verdi@example.it",
        corso: "Matematica"
    },
    {
        codice: "stud4",
        nome: "Luca",
        cognome: "Ferrari",
        email: "luca.ferrari@example.it",
        corso: "Informatica"
    },
    {
        codice: "stud5",
        nome: "Elena",
        cognome: "Romano",
        email: "elena.romano@example.it",
        corso: "Economia"
    },
    {
        codice: "stud6",
        nome: "Matteo",
        cognome: "Gallo",
        email: "matteo.gallo@example.it",
        corso: "Ingegneria gestionale"
    },
    {
        codice: "stud7",
        nome: "Chiara",
        cognome: "Conti",
        email: "chiara.conti@example.it",
        corso: "Matematica"
    },
    {
        codice: "stud8",
        nome: "Andrea",
        cognome: "Marino",
        email: "andrea.marino@example.it",
        corso: "Informatica"
    },
    {
        codice: "stud9",
        nome: "Francesca",
        cognome: "Greco",
        email: "francesca.greco@example.it",
        corso: "Economia"
    },
    {
        codice: "stud10",
        nome: "Davide",
        cognome: "Bruno",
        email: "davide.bruno@example.it",
        corso: "Ingegneria gestionale"
    },
    {
        codice: "stud11",
        nome: "Martina",
        cognome: "Rizzo",
        email: "martina.rizzo@example.it",
        corso: "Matematica"
    },
    {
        codice: "stud12",
        nome: "Alessandro",
        cognome: "Moretti",
        email: "alessandro.moretti@example.it",
        corso: "Informatica"
    },
    {
        codice: "stud13",
        nome: "Federica",
        cognome: "Lombardi",
        email: "federica.lombardi@example.it",
        corso: "Economia"
    },
    {
        codice: "stud14",
        nome: "Simone",
        cognome: "Barbieri",
        email: "simone.barbieri@example.it",
        corso: "Ingegneria gestionale"
    },
    {
        codice: "stud15",
        nome: "Alice",
        cognome: "Fontana",
        email: "alice.fontana@example.it",
        corso: "Matematica"
    },
    {
        codice: "stud16",
        nome: "Tommaso",
        cognome: "Santoro",
        email: "tommaso.santoro@example.it",
        corso: "Informatica"
    },
    {
        codice: "stud17",
        nome: "Beatrice",
        cognome: "Marchetti",
        email: "beatrice.marchetti@example.it",
        corso: "Economia"
    },
    {
        codice: "stud18",
        nome: "Riccardo",
        cognome: "Caruso",
        email: "riccardo.caruso@example.it",
        corso: "Ingegneria gestionale"
    },
    {
        codice: "stud19",
        nome: "Giulia",
        cognome: "Ferrara",
        email: "giulia.ferrara@example.it",
        corso: "Matematica"
    },
    {
        codice: "stud20",
        nome: "Nicolo",
        cognome: "Galli",
        email: "nicolo.galli@example.it",
        corso: "Informatica"
    },
    {
        codice: "stud21",
        nome: "Valentina",
        cognome: "Martini",
        email: "valentina.martini@example.it",
        corso: "Economia"
    },
    {
        codice: "stud22",
        nome: "Gabriele",
        cognome: "Leone",
        email: "gabriele.leone@example.it",
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
    studenti: 23,
    esami: 3,
    iscrizioni: 1
};

module.exports = { studenti, esami, iscrizioni, prossimoCodice };
