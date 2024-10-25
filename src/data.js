import fs from 'fs';
import path from 'path';

// Definindo os dados para o CSV
const data = [
  ['id', 'name', 'age'],
  ['1', 'John Doe', '28'],
  ['2', 'Jane Smith', '34'],
  ['3', 'Emily Johnson', '22'],
];

// Convertendo os dados para formato CSV
const csvData = data.map((row) => row.join(',')).join('\n');

// Salvando o CSV na pasta do projeto
const filePath = path.join(process.cwd(), 'data.csv');
fs.writeFileSync(filePath, csvData);

console.log(`Arquivo CSV gerado em: ${filePath}`);
