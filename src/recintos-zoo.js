class RecintosZoo {

  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { macaco: 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { gazela: 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { leao: 1 } }
    ];

    this.animaisInfo = {
      LEAO: { tamanho: 3, bioma: 'savana', carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: 'savana', carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: 'rio', carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: 'savana', carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(tipoAnimal, quantidade) {
    tipoAnimal = tipoAnimal.toUpperCase();

    if (!this.animaisInfo[tipoAnimal]) {
      return { erro: 'Animal inválido' };
    }
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }

    const animalInfo = this.animaisInfo[tipoAnimal];

    const recintosViaveis = this.recintos.filter(recinto => {
      let espaçoLivre = recinto.tamanhoTotal;

      if (Array.isArray(animalInfo.bioma)) {
        if (!animalInfo.bioma.some(b => recinto.bioma.includes(b))) {
          return false;
        }
      } else if (!recinto.bioma.includes(animalInfo.bioma)) {
        return false;
      }

      let possuiOutraEspecie = false;
      for (const [animalExistente, qtdExistente] of Object.entries(recinto.animais)) {
        const infoExistente = this.animaisInfo[animalExistente.toUpperCase()];

        if (animalInfo.carnivoro || infoExistente.carnivoro) {
          if (animalExistente.toUpperCase() !== tipoAnimal) {
            return false;
          }
        }

        if (animalInfo.bioma.includes('savana') && animalInfo.bioma.includes('rio') && tipoAnimal === 'HIPOPOTAMO') {
          if (recinto.bioma !== 'savana e rio') {
            return false;
          }
        }

        if (tipoAnimal === 'MACACO' && !Object.keys(recinto.animais).length) {
          return false;
        }

        espaçoLivre -= infoExistente.tamanho * qtdExistente;
        possuiOutraEspecie = possuiOutraEspecie || animalExistente.toUpperCase() !== tipoAnimal;
      }

      if (possuiOutraEspecie) {
        espaçoLivre -= 1;
      }

      espaçoLivre -= animalInfo.tamanho * quantidade;
      return espaçoLivre >= 0;
    });

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    const resultado = {
      recintosViaveis: recintosViaveis
        .map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (animalInfo.tamanho * quantidade)} total: ${recinto.tamanhoTotal})`)
        .sort()
    };
    return resultado;
  }

  listarRecintos() {
    return this.recintos.map(recinto => {
      const numAnimais = Object.keys(recinto.animais).length;
      return `Recinto ${recinto.numero} - Bioma: ${recinto.bioma}, Número de animais: ${numAnimais}`;
    });
  }
}
export { RecintosZoo as RecintosZoo };

