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
          LEAO: { tamanho: 3, bioma: 'savana' },
          LEOPARDO: { tamanho: 2, bioma: 'savana' },
          CROCODILO: { tamanho: 3, bioma: 'rio' },
          MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
          GAZELA: { tamanho: 2, bioma: 'savana' },
          HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
      }
    analisaRecintos(tipoAnimal, quantidade) {
        tipoAnimal = tipoAnimal.toUpperCase();
    
    // Validações iniciais
    if (!this.animaisInfo[tipoAnimal]) {
      return { erro: 'Animal inválido' };
    }
    
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }

    // Obtém informações do animal
    const animalInfo = this.animaisInfo[tipoAnimal];
    
    const recintosViaveis = this.recintos.filter(recinto => {
      const espaçoOcupado = quantidade * animalInfo.tamanho;
      let espaçoLivre = recinto.tamanhoTotal;
      
      // Verifica bioma
      if (!animalInfo.bioma.includes(recinto.bioma) && (recinto.bioma !== 'savana e rio' || !animalInfo.bioma.includes('savana') || !animalInfo.bioma.includes('rio'))) {
        return false;
      }    
      
        if (recinto.animais && Object.keys(recinto.animais).length > 0) {
          for (const [animalExistente, qtdExistente] of Object.entries(recinto.animais)) {
            const infoExistente = this.animaisInfo[animalExistente.toUpperCase()];
        
            // Verifica se a informação do animal existe
            if (!infoExistente) {
              return false; // Ou outra lógica de tratamento
            }
        
            // Verifica se o bioma do animal existente é compatível com o bioma do recinto
            if (infoExistente.bioma !== recinto.bioma) {
              return false;
            }
        
            // Verifica se o animal tem um único bioma e o bioma é o mesmo do animal existente
            if (animalInfo.bioma.length === 1 && animalInfo.bioma[0] === infoExistente.bioma && animalExistente !== tipoAnimal) {
              return false;
            }
        
            // Verifica se o animal tem dois biomas, mas nenhum deles corresponde ao bioma do animal existente
            if (animalInfo.bioma.length === 2 && !animalInfo.bioma.includes(infoExistente.bioma)) {
              return false;
            }
        
            // Verifica se o animal tem bioma 'savana', mas o animal existente tem bioma 'rio'
            if (animalInfo.bioma.length === 1 && animalInfo.bioma[0] === 'savana' && infoExistente.bioma === 'rio') {
              return false;
            }
          }
        }    

      // Verifica se há espaço suficiente
      espaçoLivre -= espaçoOcupado;
      if (recinto.animais && Object.keys(recinto.animais).length > 0) {
        espaçoLivre -= 1; // Espaço extra por ter mais de uma espécie
      }
      
      return espaçoLivre >= 0;
    });

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    // Formata a resposta
    const resposta = {
      recintosViaveis: recintosViaveis
        .map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (quantidade * animalInfo.tamanho)} total: ${recinto.tamanhoTotal})`)
        .sort()
    };
    return resposta;
  }

  listarRecintos() {
    return this.recintos.map(recinto => {
      const numAnimais = Object.keys(recinto.animais).length;
      return `Recinto ${recinto.numero} - Bioma: ${recinto.bioma}, Número de animais: ${numAnimais}`;
    });
  }
}
export { RecintosZoo as RecintosZoo };

