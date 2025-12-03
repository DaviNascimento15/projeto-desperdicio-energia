import { Router } from 'express';
import { readData, writeData } from '../utils/fsExamples';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const router = Router();
const dataFile = process.env.DATA_FILE || path.resolve(__dirname, '../../data/records.json');

// Entendendo HTTP:
// - GET: ler dados
// - POST: criar recursos
// - PUT/PATCH: atualizar
// - DELETE: remover

router.get('/', async (req, res) => {
    const data = await readData(dataFile);
    res.json(data);
});

router.post('/', async (req, res) => {
    const body = req.body;
    if (!body || typeof body.consumption !== 'number' || !body.device) {
        return res.status(400).json({ error: 'payload inválido. Ex: { device, consumption (number), timestamp? }' });
    }
    const data = await readData(dataFile);
    const item = { id: uuidv4(), device: body.device, consumption: body.consumption, timestamp: body.timestamp || new Date().toISOString() };
    data.push(item);
    await writeData(dataFile, data);
    res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const data = await readData(dataFile);
    const idx = data.findIndex((d:any) => d.id === id);
    if (idx === -1) return res.status(404).json({ error: 'não encontrado' });
    data[idx] = { ...data[idx], ...body };
    await writeData(dataFile, data);
    res.json(data[idx]);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await readData(dataFile);
    const filtered = data.filter((d:any) => d.id !== id);
    if (filtered.length === data.length) return res.status(404).json({ error: 'não encontrado' });
    await writeData(dataFile, filtered);
    res.status(204).send();
});

export default router;
