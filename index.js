const fs = require("fs");
csv = fs.readFileSync("exemplo.csv");

// Serve para converter os dados para String e joga eles no Array
// O split divide e separa uma String
var lines = csv.split(" ");

// As linhas do CSV serão covertidas e serão mandadas para o 'result'
var result = [];

// A primeira linha ou a lines[0] será onde armazenará o cabeçalho do array
var headers = lines[0].split(",");

for (var i = 1; i < lines.length; i++) {
  var obj = {};
  var currentline = lines[i].split(",");

  for (var j = 0; j < headers.length; j++) {
    obj[headers[j]] = currentline[j];
  }

  result.push(obj);
}

let json = JSON.stringify(result);
fs.writeFileSync("output.json", json);
