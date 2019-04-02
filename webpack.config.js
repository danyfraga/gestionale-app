/**Al suo interno, webpack è un bundle di moduli statici per le moderne applicazioni JavaScript. 
 * Quando webpack elabora la tua applicazione, crea internamente un grafico delle dipendenze che 
 * mappa ogni modulo richiesto dal tuo progetto e genera uno o più pacchetti . 
 * 
 * Ogni volta che un file dipende da un altro, il webpack considera questo come una dipendenza . 
 * Ciò consente al webpack di acquisire risorse non di codice, come immagini o tipi di carattere web, 
 * e di fornire loro anche delle dipendenze per la propria applicazione.
 * Quando webpack elabora l'applicazione, inizia da un elenco di moduli definiti sulla riga di comando 
 * o nel suo file di configurazione. Partendo da questi punti di accesso , il webpack crea ricorsivamente 
 * un grafico delle dipendenze che include tutti i moduli necessari per l'applicazione, quindi raggruppa 
 * tutti questi moduli in un piccolo numero di pacchetti , spesso solo uno, che devono essere caricati dal browser.*/


// entry -> output
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin")

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
    require("dotenv").config({path: ".env.test"})
} else if (process.env.NODE_ENV === "development") {
    require("dotenv").config({path: ".env.development"})
}

module.exports = (env) => {
    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin("styles.css")

    return {
        /* Un punto di ingresso indica quale webpack del modulo deve utilizzare per iniziare a costruire il suo grafico 
        *di dipendenza interna. Webpack individuerà quali altri moduli e librerie da cui dipende il punto di ingresso 
        *(direttamente e indirettamente).*/
        entry: ["babel-polyfill", "./src/app.js"],
        /**La proprietà di output dice a webpack dove emettere i bundle che crea e come denominare questi file. */
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        /** In module vengono descritte le regole sul quale ad esempio babel deve compiere le trasfromazioni in jsx
         * test significa che babel agisce su tutti i file .js 
         * exclude significa che sono esclusi i file presenti all'interno della foldere node_modules
         */
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                //scss o css
                test: /\.s?css$/,
                //Stessa funzione di loader 
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        /** Facilita il debug, a seconda della stringa permette di visualizzare il codice ad esempio nel suo file */
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            // Per disabilitare il fatto che ogni pagina index.html venga pubblicata al posto di una risposta 404 - leggere documentazione
            historyApiFallback: true,
            publicPath: "/dist/"
        }
    }
}


