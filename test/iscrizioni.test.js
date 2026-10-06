const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = chai;

chai.use(chaiHttp);

describe("Enrollments API", () => {
    describe("GET /enrollments", () => {
        it("Dovrebbe recuperare la lista delle iscrizioni", (done) => {
            chai.request(app)
                .get("/enrollments")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data).to.be.an("array");
                    done();
                });
        });
    });

    describe("POST /enrollments", () => {
        it("Dovrebbe iscrivere uno studente a un esame esistente", (done) => {
            chai.request(app)
                .post("/enrollments")
                .send({ studenteCodice: "stud2", esameCodice: "esam1" })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.data.codice).to.equal("iscr1");
                    expect(res.body.data.studenteCodice).to.equal("stud2");
                    done();
                });
        });

        it("Dovrebbe impedire iscrizioni duplicate", (done) => {
            chai.request(app)
                .post("/enrollments")
                .send({ studenteCodice: "stud2", esameCodice: "esam1" })
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });

        it("Dovrebbe rifiutare codici di studente o esame non validi", (done) => {
            chai.request(app)
                .post("/enrollments")
                .send({ studenteCodice: "inesistente", esameCodice: "esam1" })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });
    });

    describe("GET /enrollments/:cod", () => {
        it("Dovrebbe recuperare un'iscrizione esistente", (done) => {
            chai.request(app)
                .get("/enrollments/iscr1")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.data.esameCodice).to.equal("esam1");
                    done();
                });
        });
    });

    describe("PUT /enrollments/:cod", () => {
        it("Dovrebbe sostituire i riferimenti dell'iscrizione", (done) => {
            chai.request(app)
                .put("/enrollments/iscr1")
                .send({ studenteCodice: "stud2", esameCodice: "esam2" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.data.esameCodice).to.equal("esam2");
                    done();
                });
        });
    });

    describe("DELETE /enrollments/:cod", () => {
        it("Dovrebbe eliminare l'iscrizione esistente", (done) => {
            chai.request(app)
                .delete("/enrollments/iscr1")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    done();
                });
        });

        it("Dovrebbe restituire 404 per un'iscrizione inesistente", (done) => {
            chai.request(app)
                .delete("/enrollments/inesistente")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });
    });
});
