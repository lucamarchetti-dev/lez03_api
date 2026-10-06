// test/app.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = chai;

chai.use(chaiHttp);

describe("Student Management API", () => {

    // Test per l'endpoint GET /students
    describe("GET /students", () => {
        it("Dovrebbe recuperare tutti gli studenti", (done) => {
            chai.request(app)
                .get("/students")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data).to.be.an("array").that.is.not.empty;
                    done();
                });
        });
    });

    // Test per l'endpoint GET /students/:cod
    describe("GET /students/:cod", () => {
        it("Dovrebbe recuperare uno studente specifico", (done) => {
            chai.request(app)
                .get("/students/stud1")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data.codice).to.equal("stud1");
                    done();
                });
        });

        it("Dovrebbe restituire un errore se lo studente non esiste", (done) => {
            chai.request(app)
                .get("/students/nonEsistente")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    expect(res.body.data).to.equal("Oggetto non trovato");
                    done();
                });
        });
    });

    // Test per l'endpoint POST /students
    describe("POST /students", () => {
        it("Dovrebbe creare un nuovo studente", (done) => {
            const nuovoStudente = {
                nome: "Sara",
                cognome: "Verdi",
                email: "sara.verdi@example.it",
                corso: "Matematica"
            };
            chai.request(app)
                .post("/students")
                .send(nuovoStudente)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data).to.include(nuovoStudente);
                    expect(res.body.data.codice).to.equal("stud3");
                    done();
                });
        });

        it("Dovrebbe rifiutare i dati mancanti", (done) => {
            chai.request(app)
                .post("/students")
                .send({ nome: "Studente" })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });
    });

    // Test per l'endpoint PUT /students/:cod
    describe("PUT /students/:cod", () => {
        it("Dovrebbe sostituire i dati dello studente", (done) => {
            chai.request(app)
                .put("/students/stud2")
                .send({
                    nome: "Marco",
                    cognome: "Bianchi",
                    email: "marco.bianchi@example.it",
                    corso: "Economia"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data.corso).to.equal("Economia");
                    expect(res.body.data.email).to.equal("marco.bianchi@example.it");
                    done();
                });
        });

        it("Dovrebbe restituire un errore se lo studente non esiste", (done) => {
            chai.request(app)
                .put("/students/nonEsistente")
                .send({
                    nome: "X",
                    cognome: "Y",
                    email: "x.y@example.it",
                    corso: "Test"
                })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });

        it("Dovrebbe rifiutare i campi mancanti", (done) => {
            chai.request(app)
                .put("/students/stud2")
                .send({ corso: "Economia" })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });
    });

    // Test per l'endpoint DELETE /students/:cod (per ultimo: modifica il mock condiviso)
    describe("DELETE /students/:cod", () => {
        it("Dovrebbe eliminare uno studente esistente", (done) => {
            chai.request(app)
                .delete("/students/stud1")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    done();
                });
        });

        it("Dovrebbe restituire un errore se lo studente non esiste", (done) => {
            chai.request(app)
                .delete("/students/nonEsistente")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });
    });
});
