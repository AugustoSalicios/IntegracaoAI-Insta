import express from "express";
import * as dotenv from "dotenv";
import resumoRoutes from "./routes/resumoRoutes.js";

dotenv.config();// Carrega as variáveis do arquivo .env

const app = express();
app.use(express.json()); //Diz ao express para entender mensagens em Json

app.use(resumoRoutes); //Usando as rotas criadas em resumoRoutes

const PORTA = process.env.PORT || 3000;
app.listen(PORTA,() => {
  console.log(`Servidor rodando em ${PORTA}`);
});