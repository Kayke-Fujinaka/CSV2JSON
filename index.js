// Incluir o fs module
const fs = require("fs");
// O fs.createReadStream() é um método do fs para ler arquivos

// Váriavel para armazenar os arquivos .csv
const files = ["./CSV/exemplo.csv", "./CSV/teste.csv"];

// Um for que vai iterar cada arquivo armazenado do .csv
for (let i = 0; i < files.length; i++) {
  reader = fs.createReadStream(files[i]);

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
    let items = content.split("\n");

    // O Header é o item 0 e ele pega cada item após a vírgula
    let headers = items[0].split(",");

    // Criei um array sem o Header
    // Inicia após a primeira linha que seria o index[0]
    const itemsNewArray = [];
    for (let i = 1; i < items.length; i++) {
      const itemSplit = items[i].split(",");
      itemsNewArray.push(itemSplit);
    }

    // Função que irá converter todos os itens em JSON
    const createJson = () => {
      // Vai armazenar um array de objetos
      const arrayJson = [];

      // Vai armazenar os objetos com o Spread Operator
      let obj = {};

      // Fez um map nos itens do Array
      const convertItems = itemsNewArray.map((element) => {
        // Vai passar em cada item de cada linha de dentro do Array
        for (let index = 0; index < element.length; index++) {
          // Criou um objeto pegando o index de cada for para ir adicionando dentro do Objeto com o Spread Operator
          const header = headers[index].replace("\r", "");
          const value = element[index].replace("\r", "");
          obj = { ...obj, [header]: value };
        }
        // Pega todo objeto e adiciona no Array
        arrayJson.push(obj);
      });

      // Pegou o nome do arquivo e escreveu mudando para .json
      const nameFile = files[i].replace(".csv", ".json");
      // Função que escreve.
      // Ele pega o nome do arquivo e o Array. Ai, ele escreve em um arquivo.
      fs.writeFile(`${nameFile}`, JSON.stringify(arrayJson), (err) => {
        if (err) throw err;
      });
    };

    createJson();
  });
}

// -----------------------------------

// Como ler arquivos de uma página específica [QUASE]
// Como criar arquivos em uma pasta especifíca []
// Método para colocar em um objeto []
