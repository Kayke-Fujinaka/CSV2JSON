// const fs = require("fs");
// csv = fs.readFileSync("exemplo.csv")

// var array = csv.toString().split("\r");

// let result = [];
 
// let headers = array[0].split(", ")

// for (let i = 1; i < array.length - 1; i++) {
//   let obj = {}
 
//   let str = array[i]
//   let s = ''
 
//   let flag = 0
//   for (let ch of str) {
//     if (ch === '"' && flag === 0) {
//       flag = 1
//     }
//     else if (ch === '"' && flag == 1) flag = 0
//     if (ch === ', ' && flag === 0) ch = '|'
//     if (ch !== '"') s += ch
//   }
 
//   let properties = s.split("|")
 
//   for (let j in headers) {
//     if (properties[j].includes(", ")) {
//       obj[headers[j]] = properties[j]
//         .split(", ").map(item => item.trim())
//     }
//     else obj[headers[j]] = properties[j]
//   }
 
//   result.push(obj)
// }
 
// let json = JSON.stringify(result);
// fs.writeFileSync('output.json', json);

// ------------------------------------------------------------------------------

// var fs = require('fs');

// function CSVToJSONConvertor() {
//     if (!!process.argv[2]) {
//         var buff = fs.readFileSync(process.argv[2] + './exemplo.csv', "utf8");
//         // split to array
//         var rowsArray = buff.split('\n');
//         var row = '';
//         var json = '';

//         for (var i = 0; i < rowsArray.length; i++) {
//             var commaPos = rowsArray[i].search(',');
//             row += '"' + rowsArray[i].slice(0, commaPos) + '": "' + rowsArray[i].slice(commaPos + 1).replace(/^"/,'').replace(/"$/, '') + '",\n';
//         }

//         // add '{}', cut ',\n'

//         json = '{\n' + row.slice(0,-2) + '\n}\n';
        
//         fs.writeFileSync(process.argv[2] + '.json', json, "utf8");
//     } else {
//         console.log('enter csv file');
//     }
// }

// CSVToJSONConvertor()

// -----------------------------------------------------------

const readline = require('readline');
const fs = require('fs');

var isTrue = true;
const rl = readline.createInterface({
  input: fs.createReadStream('exemplo.csv')
});
var header;
var jsObj;
var jsonResult = {};

var countryName;
var year;

//read a single line
rl.on('line', function (line) {

  if(isTrue){
      header = line.split(',');
      isTrue = false;
  }
  else {
    var commaRemoved = line.replace(/"[^"]+"/g, function (match) {
      match = match.replace("\"", "");
      match = match.replace("\"", "");

      return match.replace(/,/g, '');
    });
    jsObj = commaRemoved.split(',');


    countryName = jsObj[0];
    year = jsObj[4];
    indCode = jsObj[2];

//If country doesn't exist , add the country as key
    if(!(countryName in jsonResult)) {
      //create object with country as key
      jsonResult[countryName] = {};
    }

//If the year doesn't exist , add the year as key
    if(!(year in jsonResult[countryName])) {
      //Create object with year as key
      jsonResult[countryName][year] = {};
    }

    var obj = {};
    if(jsObj[3]=="SP.DYN.LE00.FE.IN" || jsObj[3]=="SP.DYN.LE00.MA.IN") {

      if(jsObj[3]=="SP.DYN.LE00.FE.IN") {
        indCode = "female";
      }else if(jsObj[3]=="SP.DYN.LE00.MA.IN") {
        indCode = "male";
      }

      if(!(indCode in jsonResult[countryName][year])) {
        //Create object with 'indicator name' as key
        jsonResult[countryName][year][indCode] = jsObj[5];
      }
    }
  }
});

rl.on('close' , function() {

var outputFilename = 'output.json';
fs.writeFileSync(outputFilename,JSON.stringify(jsonResult,null,4),'utf-8');
/*fs.writeFile(outputFilename, JSON.stringify(jsonResult, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON output file: " + outputFilename);
    }
  });*/
});