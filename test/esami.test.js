const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { expect } = chai;

chai.use(chaiHttp);

describe("Exams API", () => {
    describe("GET /exams", () => {
        it("Dovrebbe recuperare tutti gli esami", (done) => {
            chai.request(app)
                .get("/exams")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data).to.be.an("array").that.is.not.empty;
                    done();
                });
        });
    });

    describe("GET /exams/:cod", () => {
        it("Dovrebbe recuperare un esame esistente", (done) => {
            chai.request(app)
                .get("/exams/esam1")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.data.codice).to.equal("esam1");
                    done();
                });
        });

        it("Dovrebbe restituire 404 per un esame inesistente", (done) => {
            chai.request(app)
                .get("/exams/inesistente")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    done();
                });
        });
    });

    describe("POST /exams", () => {
        it("Dovrebbe creare un esame", (done) => {
            chai.request(app)
                .post("/exams")
                .send({ nome: "Basi di dati", data: "15/12/2026", corso: "Informatica", aula: "Aula 3" })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.data.codice).to.equal("esam3");
                    done();
                });
        });
    });

    describe("PUT /exams/:cod", () => {
        it("Dovrebbe sostituire tutti i campi dell'esame", (done) => {
            chai.request(app)
                .put("/exams/esam3")
                .send({ nome: "Basi di dati II", data: "16/12/2026", corso: "Informatica", aula: "Aula 4" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.data.nome).to.equal("Basi di dati II");
                    expect(res.body.data.aula).to.equal("Aula 4");
                    done();
                });
        });
    });

    describe("DELETE /exams/:cod", () => {
        it("Dovrebbe eliminare un esame senza iscrizioni", (done) => {
            chai.request(app)
                .delete("/exams/esam3")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    done();
                });
        });
    });
});
