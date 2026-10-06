# Student Management API

Questa API consente di gestire studenti, esami e iscrizioni. I dati sono conservati in array in memoria; router e controller sono organizzati in moduli separati.

## Tecnologie utilizzate

- Node.js
- Express.js
- Mocha, Chai e chai-http per i test

## Prerequisiti

- Node.js v14+
- npm v6+

## Installazione

1. Accedi alla cartella del progetto:

```bash
cd lez02_api_test
```

2. Installa le dipendenze:

```bash
npm install
```

## Avvio del server

```bash
npm start
```

Il server sarà attivo su http://127.0.0.1:4000.

## Avvio con Docker

Dalla cartella del progetto, crea l'immagine e avvia il container:

```bash
docker build -t studenti-api .
docker run --rm -p 4000:4000 studenti-api
```

L'API sarà raggiungibile su http://127.0.0.1:4000. La porta interna può essere
configurata con la variabile d'ambiente `PORT`.

## Endpoint disponibili

### 1. Recupera tutti gli studenti

**GET** `/students`

Risposta:

```json
{
    "status": "SUCCESS",
    "data": [
        {
            "codice": "stud1",
            "nome": "Giulia",
            "cognome": "Rossi",
            "email": "giulia.rossi@example.it",
            "corso": "Informatica"
        }
    ]
}
```

### 2. Recupera uno studente specifico

**GET** `/students/:cod`

Parametro `cod`: codice dello studente.

In caso di codice non trovato, la risposta ha stato HTTP 404 e contiene:

```json
{
    "status": "ERROR",
    "data": "Oggetto non trovato"
}
```

### 3. Crea uno studente

**POST** `/students`

Invia tutti i campi seguenti in formato JSON. Il `codice` viene generato dal server.

```json
{
    "nome": "Sara",
    "cognome": "Verdi",
    "email": "sara.verdi@example.it",
    "corso": "Matematica"
}
```

La risposta contiene `status: "SUCCESS"` e lo studente creato. Se manca un campo o un valore non è valido, restituisce HTTP 400.

### 4. Sostituisce i dati di uno studente

**PUT** `/students/:cod`

Parametro `cod`: codice dello studente. Invia tutti i campi dello studente in formato JSON:

```json
{
    "nome": "Marco",
    "cognome": "Bianchi",
    "email": "marco.bianchi@example.it",
    "corso": "Economia"
}
```

La risposta contiene `status: "SUCCESS"` e lo studente aggiornato. Se manca un campo o un valore non è valido, restituisce HTTP 400.

### 5. Elimina uno studente

**DELETE** `/students/:cod`

Parametro `cod`: codice dello studente.

Risposta in caso di successo:

```json
{
    "status": "SUCCESS"
}
```

### 6. Recupera tutti gli esami

**GET** `/exams`

Restituisce l'elenco degli esami disponibili.

### 7. Recupera un esame

**GET** `/exams/:cod`

Parametro `cod`: codice dell'esame, ad esempio `esam1`.

### 8. Crea un esame

**POST** `/exams`

Invia tutti i campi in formato JSON; il codice viene generato dal server:

```json
{
    "nome": "Basi di dati",
    "data": "15/12/2026",
    "corso": "Informatica",
    "aula": "Aula 3"
}
```

### 9. Sostituisce un esame

**PUT** `/exams/:cod`

Invia tutti i campi dell'esame (`nome`, `data`, `corso`, `aula`). I campi mancanti o non validi generano HTTP 400.

### 10. Elimina un esame

**DELETE** `/exams/:cod`

Un esame con iscrizioni attive non può essere eliminato (HTTP 409). Elimina prima le iscrizioni associate.

### 11. Recupera tutte le iscrizioni

**GET** `/enrollments`

Restituisce l'elenco delle iscrizioni.

### 12. Recupera un'iscrizione

**GET** `/enrollments/:cod`

Parametro `cod`: codice dell'iscrizione, ad esempio `iscr1`.

### 13. Crea un'iscrizione

**POST** `/enrollments`

Associa uno studente esistente a un esame esistente:

```json
{
    "studenteCodice": "stud1",
    "esameCodice": "esam1"
}
```

La stessa persona non può essere iscritta due volte allo stesso esame (HTTP 409); codici di studente o esame non validi generano HTTP 400.

### 14. Sostituisce un'iscrizione

**PUT** `/enrollments/:cod`

Invia entrambi i campi (`studenteCodice` e `esameCodice`) riferiti a record esistenti.

### 15. Elimina un'iscrizione

**DELETE** `/enrollments/:cod`

Rimuove l'iscrizione identificata dal codice.

## Note

- L'API parte con 22 studenti di esempio.
- L'API parte con due esami di esempio; le iscrizioni iniziano vuote.
- I dati sono conservati in memoria e non sono persistenti: al riavvio del server vengono ripristinati i dati iniziali.
- La struttura usa `routes/` per gli endpoint, `controllers/` per la logica e `data/database.js` per gli array condivisi.

## Contribuire

1. Crea un branch per la modifica.
2. Aggiungi i tuoi cambiamenti e i relativi test.
3. Apri una pull request.

## Licenza

Questo progetto è rilasciato sotto la licenza ISC.
