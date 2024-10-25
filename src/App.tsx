import  { useState, useEffect } from "react";
import Papa from "papaparse";

interface DataRow {
  [key: string]: string; // Define que cada linha terá chaves de strings e valores de string
}

function App() {
  const [data, setData] = useState<DataRow[]>([]); // Define o estado como um array de objetos com chave-valor

  // Função para carregar o CSV automaticamente
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("/data.csv");
      const reader = response.body?.getReader();
      const result = await reader?.read(); // Lê os dados do CSV
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value); // Decodifica os bytes em uma string

      // Usando Papaparse para ler o CSV
      Papa.parse<DataRow>(csv, {
        header: true,
        complete: (results) => {
          setData(results.data); // Define os dados no estado
        },
      });
    };
 
    fetchCSV();
  }, []); // Executa apenas uma vez ao carregar o componente

  return (
    <div className="App">
      <h1>Leitor de CSV</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
