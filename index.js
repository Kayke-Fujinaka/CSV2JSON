// Incluir o fs module
const fs = require("fs");
// O fs.createReadStream() é um método do fs para ler arquivos
reader = fs.createReadStream("./CSV/exemplo.csv");

// Armazena o resultado da conversão
let arr = [];

/* 
A função on() serve para escutar os eventos do código a qual recebe dois arg
- O primeiro é o nome do evento "data";
- O segundo é uma função de callback (Ação realizadas cada vez que evento disparado) 
*/
reader.on("data", (chunk) => {
  // Recebe o arquivo 'exemplo.csv' em string
  let content = chunk.toString();

  // Criamos um array que recebe o dado do csv até a quebra de linha
  // (no caso define um array de dados por linha)
  let splitted = content.split("\n");

  // Criamos um array que cada cabeçalho do csv
  // (no caso define um array com os dados da primeira linha)
  let header = content.split("\n")[0].split(",");

  // Vai receber o push abaixo e colocar num Array
  let teste = [];

  // Um for que vai iterar linha por linha do splitted que é o Array com os dados
  for (let i = 0; i < splitted.length; i++) {
    // Ele vai empurrar para o 'teste' e dividir as string a cada vírgula
    teste.push(splitted[i].split(","));
    for (let index = 0; index < header.length; index++) {}
  }

  //   Vai empurrar o 'teste' para o arr
  arr.push(teste);
});

// Função Assíncrona com o parâmetro 'directory' e 'files'
async function listFileFromDirectory(directory, files) {
  // Se a lista n existir vai criar um array dentro da var 'files'
  if (!files) {
    files = [];
  }

  // Vai rodar a função readdirSync() do modulo fs
  // Vai ter o parâmetro 'directory'
  let listFiles = fs.readdirSync(directory);

  // Para cada arquivo
  for (let c in listFiles) {
    // Vai rodar o stat que retorna algumas informações do arquivo e algumas outras funções
    // Ela é async, então precisa do await
    // Recebe um caminho de um diretório
    let stat = fs.statSync(directory + "/" + listFiles[c]);
    // Vai verificar se o arquivo é uma pasta
    if (stat.isDirectory())
      // Chamando uma função dentro de outra
      await listFileFromDirectory(directory + "/" + listFiles[c], files);
    // Vai pegar a lista de arquivo e vai adicionar o arquivo
    else files.push(directory + "/" + listFiles[c], files);
  }

  return files;

  // 'files' tá dando o Circular 1
}

async function test() {
  // Vai passar como parâmetro o 'directory' - './CSV'
  let files = await listFileFromDirectory("./CSV");
  console.log(files);
}

test();

// -----------------------------------

// Como ler arquivos de uma página específica []
// Como criar arquivos em uma pasta especifíca []
// Método para colocar em um objeto []
