# Student Management API

Questa API consente di gestire studenti, permettendo di crearli, recuperarli, aggiornarli e cancellarli. I dati sono conservati in un array in memoria.

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

### 4. Modifica uno studente

**PATCH** `/students/:cod`

Parametro `cod`: codice dello studente. Invia uno o più campi da modificare:

```json
{
    "corso": "Economia"
}
```

La risposta contiene `status: "SUCCESS"` e lo studente aggiornato. I campi non inviati restano invariati.

### 5. Elimina uno studente

**DELETE** `/students/:cod`

Parametro `cod`: codice dello studente.

Risposta in caso di successo:

```json
{
    "status": "SUCCESS"
}
```

## Note

- L'API parte con due studenti di esempio.
- I dati sono conservati in memoria e non sono persistenti: al riavvio del server vengono ripristinati i dati iniziali.

## Contribuire

1. Crea un branch per la modifica.
2. Aggiungi i tuoi cambiamenti e i relativi test.
3. Apri una pull request.

## Licenza

Questo progetto è rilasciato sotto la licenza ISC.
