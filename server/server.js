const path = require("path")
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;


/*La funzione app.use() monta la funzione o le funzioni middleware specificate 
nel percorso specificato: la funzione middleware viene 
eseguita quando la base del percorso richiesto corrisponde path. */
app.use(express.static(publicPath));

//Il primo parametro si riferisce a tutte le pagine (/create, /help ...),
// Il secondo parametro è una arrow function che prende due parametri:
// - request -> che contiene le informazioni sulla richiesta
// - response -> che permette di manipolare la risposta che il server a chiunque abbia creato la richiesta HTTP

app.get("*", (request, response) => {
    response.sendFile(path.join(publicPath, "index.html"));
});

//port è la porta d'accesso al server. Dev'essere mutabile. Quando non è collegata
// al server assume come valore 3000 (localhost:3000)
app.listen(port, () => {
    console.log("server is up!")
});