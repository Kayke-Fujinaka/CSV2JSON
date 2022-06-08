// Incluir o fs module
const fs = require("fs");

// Função que lista os arquivos do diretório CSV
function CSVDirectory(csvPath) {
  // Retorna todos os arquivos
  return fs.readdirSync(csvPath);
}

// Váriavel para armazenar os arquivos .csv que serão convertidos
const files = CSVDirectory("./CSV");

// Um for que vai iterar cada arquivo armazenado na const files
// No caso vai percorrer com o 'i' até a posição do tamanho do array
for (let i = 0; i < files.length; i++) {
  // O fs.createReadStream() é um método do fs para ler arquivos
  // O reader vai receber o files[i] que é a mesma coisa que o caminho até chegar no arquivo
  // O './CSV/' serve para completar o caminho para o método ler
  reader = fs.createReadStream(`./CSV/${files[i]}`);

  /* 
  A função on() serve para escutar os eventos do código a qual recebe dois arg
  - O primeiro é o nome do evento "data";
  - O segundo é uma função de callback (Ação realizadas cada vez que evento for disparado) 
  */
  reader.on("data", (chunk) => {
    // Recebe os arquivos iterados do for e transforma eles em string
    let content = chunk.toString();

    // Criamos um array que recebe o dado do csv até a quebra de linha
    // (no caso define um array de dados por linha)
    let items = content.split("\n");

    // O Header vai pegar apenas os items[0] do array e
    // Criará um array que estará separando cada elemento depois da ','
    let headers = items[0].split(",");

    // Vai armazenar um array que não conterá o Header, pois vai iniciar
    // com o i = 1, ou seja, na linha abaixo dos cabeçalhos
    const itemsNewArray = [];

    // Inicia após a primeira linha. Assim sem o conter os cabeçalhos.
    for (let i = 1; i < items.length; i++) {
      // Vai dividir cada elemento com o string assim que encontrar alguma vírgula
      // Depois colocar em um array
      const itemSplit = items[i].split(",");

      // Vai colocar os itens dividos acima em um outro array que armazenará
      // Porém sem que contenha o header ou cabeçalho
      itemsNewArray.push(itemSplit);
    }

    // Função que irá converter todos os itens em JSON
    const createJSON = () => {
      // Vai armazenar um array de objetos dos itens convertidos em JSON
      const arrayJSON = [];

      // Vai armazenar em um objeto que vai receber com o Spread Operator
      let obj = {};

      // Fez um map nos itens do Array
      // Vai pesquisar dentro do array o elemento como paramêtro
      const convertItems = itemsNewArray.map((element) => {
        // Vai passar em cada item de cada linha de dentro do Array
        // Abaixo do Header
        for (let index = 0; index < element.length; index++) {
          // A const header é correspondente ao nome da coluna
          // e a const value é a correspodente ao valor dentro do header
          const header = headers[index].replace("\n", "");
          const value = element[index].replace("\n", "");
          // Criou um objeto pegando o index de cada for
          // para ir adicionando dentro do Objeto com o Spread Operator
          obj = { ...obj, [header]: value };
        }
        // Vai empurrar os objetos para o array 'arrayJSON'
        arrayJSON.push(obj);
      });

      // Pega o caminho dos arquivos e os arquivos e
      // muda o nome do formato para .json
      const nameFile = files[i].replace(".csv", ".json");

      // O método writeFile vai gravar os dados em um novo arquivo
      // Ele vai pegar o nome do file 'nameFile' que foi alterado para ser .json no final
      // Além de colocar o array que contêm os objeto num novo arquivo
      // Então o arquivo vai ter o nome escolhido e o conteúdo do Array com objetos
      // stringify ele codifica o arquivo convertido, pois vai ter um desformatado
      const result = fs.writeFileSync(
        `./JSON/${nameFile.replace("./CSV", "")}`,
        JSON.stringify(arrayJSON)
      );
    };

    // Chama a função
    createJSON();
  });
}
