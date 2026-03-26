#!/usr/bin/env node
/**
 * MCP Server — BulletinFacile Assistant
 * Expose le chatbot paie comme outil MCP pour Claude Code
 * Usage: node scripts/mcp-bsfacile.mjs
 */

const BASE_URL = process.env.BSFACILE_URL || 'https://bulletinfacile.fr';

// MCP protocol via stdio
const readline = await import('readline');
const rl = readline.createInterface({ input: process.stdin });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

// MCP handshake + tool definitions
rl.on('line', async (line) => {
  let msg;
  try { msg = JSON.parse(line); } catch { return; }

  if (msg.method === 'initialize') {
    send({
      jsonrpc: '2.0', id: msg.id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'bsfacile-assistant', version: '1.0.0' },
      },
    });
  }

  else if (msg.method === 'tools/list') {
    send({
      jsonrpc: '2.0', id: msg.id,
      result: {
        tools: [
          {
            name: 'ask_paie',
            description: 'Pose une question sur la paie française (SMIC, cotisations, bulletins de salaire, congés, DSN, conventions collectives…). Répond en français avec les données URSSAF 2026.',
            inputSchema: {
              type: 'object',
              properties: {
                question: {
                  type: 'string',
                  description: 'La question sur la paie (ex: "Quel est le SMIC 2026 ?" ou "Comment calculer la réduction Fillon ?")',
                },
              },
              required: ['question'],
            },
          },
          {
            name: 'create_bulletin',
            description: 'Renvoie le lien pour créer un bulletin de salaire sur BulletinFacile.fr avec les paramètres pré-remplis si fournis.',
            inputSchema: {
              type: 'object',
              properties: {
                salaire_brut: { type: 'number', description: 'Salaire brut mensuel en euros' },
                type_contrat: { type: 'string', enum: ['CDI', 'CDD', 'alternance', 'apprentissage'], description: 'Type de contrat' },
              },
            },
          },
        ],
      },
    });
  }

  else if (msg.method === 'tools/call') {
    const { name, arguments: args } = msg.params;

    if (name === 'ask_paie') {
      try {
        const res = await fetch(`${BASE_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: args.question }),
        });
        const data = await res.json();
        const text = data.answer || 'Aucune réponse disponible.';
        send({
          jsonrpc: '2.0', id: msg.id,
          result: {
            content: [{ type: 'text', text }],
          },
        });
      } catch (err) {
        send({
          jsonrpc: '2.0', id: msg.id,
          result: {
            content: [{ type: 'text', text: `Erreur: ${err.message}` }],
            isError: true,
          },
        });
      }
    }

    else if (name === 'create_bulletin') {
      const params = new URLSearchParams();
      if (args.salaire_brut) params.set('brut', args.salaire_brut);
      if (args.type_contrat) params.set('contrat', args.type_contrat);
      const url = `${BASE_URL}/generateur${params.toString() ? '?' + params : ''}`;
      send({
        jsonrpc: '2.0', id: msg.id,
        result: {
          content: [{ type: 'text', text: `Créez votre bulletin ici : ${url}` }],
        },
      });
    }

    else {
      send({
        jsonrpc: '2.0', id: msg.id,
        error: { code: -32601, message: `Outil inconnu: ${name}` },
      });
    }
  }

  else if (msg.method === 'notifications/initialized') {
    // no-op
  }

  else {
    if (msg.id !== undefined) {
      send({
        jsonrpc: '2.0', id: msg.id,
        error: { code: -32601, message: 'Method not found' },
      });
    }
  }
});
