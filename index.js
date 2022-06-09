// Incluir o fs module
const fs = require("fs");

// Função que lista os arquivos do diretório CSV
const CSVDirectory = (csvPath) => {
  // Retorna todos os arquivos
  // O método readdir serve para ler o conteúdo de determinado diretório
  return fs.readdirSync(csvPath);
};

// Váriavel para armazenar os arquivos .csv que serão convertidos
// Além de chamar a função passando o caminho até a pasta CSV
const filesList = CSVDirectory("./CSV");

// Um for que vai iterar cada arquivo armazenado na const files
// No caso vai percorrer com o 'i' até a posição dos arquivos existentes
for (let i = 0; i < filesList.length; i++) {
  // O fs.createReadStream() é um método do fs para abrir um arquivo e ler os dados do arquivos
  // O './CSV/' serve para completar o caminho para o método ler
  reader = fs.createReadStream(`./CSV/${filesList[i]}`);

  /* 
  A função on() serve para escutar os eventos do código a qual recebe dois arg
  - O primeiro é o nome do evento "data";
  - O segundo é uma função de callback (Ação realizadas cada vez que evento for disparado) 
  */
  reader.on("data", (chunk) => {
    // Retorna em uma string
    let content = chunk.toString();

    // Criamos um array que recebe o dado do csv até a quebra de linha
    // (no caso define um array de dados por linha)
    let items = content.split("\n");

    // O Header vai pegar apenas os items[0] do array e
    // Criará um array que estará separando cada elemento depois da ','
    let headers = items[0].split(",");

    // Vai armazenar um array que não conterá o Header, pois vai iniciar
    // com o i = 1, ou seja, na linha abaixo dos cabeçalhos
    const arrayWithoutHeader = [];

    // Inicia após a primeira linha. Assim sem o conter os cabeçalhos.
    for (let i = 1; i < items.length; i++) {
      // Vai dividir cada elemento com o string assim que encontrar alguma vírgula
      // Depois colocar em um array
      const itemSplit = items[i].split(",");

      // Vai colocar os itens dividos acima em um outro array que armazenará
      // Porém sem que contenha o header ou cabeçalho
      arrayWithoutHeader.push(itemSplit);
    }

    // Função que irá converter todos os itens em JSON
    const createJSON = () => {
      // Vai armazenar um array de objetos dos itens convertidos em JSON
      const arrayFilesJSON = [];

      // Vai armazenar em um objeto que vai receber com o Spread Operator
      let obj = {};

      // Fez um map nos itens do Array
      // Vai pesquisar dentro do array o element como paramêtro
      const convertItems = arrayWithoutHeader.map((element) => {
        // Vai passar em cada item de cada linha de dentro do Array
        // Abaixo do Header
        for (let index = 0; index < element.length; index++) {
          // A const header é correspondente ao nome da coluna
          const header = headers[index].replace("\r", "");

          // A const value é a correspodente ao valor dentro do header
          const value = element[index].replace("\r", "");

          // Criou um objeto pegando o index de cada for
          // para ir adicionando dentro do Objeto com o Spread Operator
          obj = { ...obj, [header]: value };
        }
        // Vai empurrar os objetos para o array 'arrayFilesJSON'
        arrayFilesJSON.push(obj);
      });

      // Pega o caminho dos arquivos e os arquivos e
      // muda o nome do formato para .json
      const changeNameFile = filesList[i].replace(".csv", ".json");

      // O método writeFile vai gravar os dados em um novo arquivo
      // Direcionar no começo até a pasta './JSON/'
      // Ele vai pegar o nome do file 'nameFile' (concatenado) que foi alterado para ser .json no final
      // Replace no 'nameFile' para remover o ./CSV e deixar vazio. Assim deixando apenas o caminho até o JSON
      fs.writeFileSync(
        `./JSON/${changeNameFile.replace("./CSV", "")}`,
        // O métodos JSON.stringify converte valores em javascript para uma String JSON.
        JSON.stringify(arrayFilesJSON, null, 4)
      );
    };

    // Chama a função
    createJSON();
  });
}
