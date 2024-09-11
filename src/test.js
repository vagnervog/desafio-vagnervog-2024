import { RecintosZoo } from "./RecintosZoo.js";
// Instanciando a classe
const zoo = new RecintosZoo();

// Teste com o animal "leão" e quantidade 1
const resultado1 = zoo.analisaRecintos('leao', 1);
console.log(resultado1);

// Teste com o animal "macaco" e quantidade 3
const resultado2 = zoo.analisaRecintos('macaco', 3);
console.log(resultado2);

// Teste com o animal "gazela" e quantidade 1
const resultado3 = zoo.analisaRecintos('gazela', 1);
console.log(resultado3);

const resultado4 = zoo.analisaRecintos('unicornio', 1);
console.log(resultado4); // Espera-se { erro: 'Animal inválido' }

const resultado5 = zoo.analisaRecintos('leao', 0);
console.log(resultado5); // Espera-se { erro: 'Quantidade inválida' }

const resultado6 = zoo.analisaRecintos('leao', -1);
console.log(resultado6); // Espera-se { erro: 'Quantidade inválida' }

const resultado7 = zoo.analisaRecintos('leao', 'três');
console.log(resultado7); // Espera-se { erro: 'Quantidade inválida' }

const resultado8 = zoo.analisaRecintos('crocodilo', 2);
console.log(resultado8);

const resultado9 = zoo.analisaRecintos('crocodilo', 3);
console.log(resultado9); // Espera-se { erro: 'Não há recinto viável' }

const listaRecintos = zoo.listarRecintos();
console.log("Lista dos recintos:");
listaRecintos.forEach(info => {
  console.log(info);
});