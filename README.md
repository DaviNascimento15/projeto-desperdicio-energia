# Projeto: Desperdício de Energia (Node + TypeScript)

Esse projeto educativo demonstra um backend simples em Node + TypeScript usando Express.
O tema central é **Desperdício de Energia**: a API permite registrar leituras de consumo e
identificar desperdícios simples.

## Como usar (Cloud CodeSpaces ou local)
1. Instale dependências: `npm install`
2. Copie `.env.example` para `.env` e ajuste se necessário.
3. Para desenvolvimento: `npm run dev` (usa ts-node-dev)
4. Para produção:
   - `npm run build`
   - `npm start`

## Estrutura
- `src/server.ts` - servidor básico (Express)
- `src/routes/energy.ts` - rotas da API (criar/listar/alterar/excluir leituras)
- `src/utils/fsExamples.ts` - exemplos de leitura/escrita com fs
- `data/records.json` - arquivo usado como "banco" simples

## Endpoints principais
- `GET /` - status
- `GET /energy` - listar leituras
- `POST /energy` - criar leitura (json: { "device": "...", "consumption": number, "timestamp": "..."} )
- `PUT /energy/:id` - alterar
- `DELETE /energy/:id` - excluir

## Notas pedagógicas
O projeto contém trechos comentados que explicam:
- O que é backend, cliente/servidor
- HTTP e métodos
- APIs e formatos (JSON)
- Node, npm, scripts personalizados
- TypeScript e organização de pastas
- Uso de variáveis de ambiente
- Express e routers
- Manipulação de arquivos com fs (CRUD)
