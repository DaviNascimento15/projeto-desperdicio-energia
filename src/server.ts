import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import energyRouter from './routes/energy';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// O que é cliente/servidor e backend:
// - Backend: parte do sistema que roda no servidor, processa dados, responde requisições.
// - Cliente: aplicativo (navegador, app) que faz requisições HTTP ao servidor.

app.use(express.json());
app.use('/', (req, res, next) => {
    // rota raiz para verificar status
    next();
});

app.use('/energy', energyRouter);

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'API Desperdício de Energia funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
