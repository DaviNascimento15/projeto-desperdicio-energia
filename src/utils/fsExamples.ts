import { promises as fs } from 'fs';
import path from 'path';

// Manipulação de arquivos (FS module) - exemplos de CRUD usando promessas
export async function ensureDataFile(filePath: string) {
    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.access(filePath);
    } catch (err) {
        // se não existe, cria com array vazio
        await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
    }
}

export async function readData(filePath: string): Promise<any[]> {
    await ensureDataFile(filePath);
    const content = await fs.readFile(filePath, 'utf-8');
    try {
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export async function writeData(filePath: string, data: any[]) {
    await ensureDataFile(filePath);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
