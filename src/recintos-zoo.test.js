import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test('Deve rejeitar quantidade inválida', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
    expect(resultado.erro).toBe("Quantidade inválida");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test('Não deve encontrar recintos para 10 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test('Deve encontrar recinto para 1 crocodilo', () => {
    const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  // Tentei de varias formas debugar o codigo abaixo para passar no teste, porem sem sucesso
  test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
    expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(3);
  });


  //testes adicionais

  test('Deve encontrar recinto para 1 leão', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEAO', 1);
    console.log(resultado);
  });

  test('Deve encontrar recintos para 3 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 3);
    console.log(resultado);
  });
   
  /*test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('macaco', 2);
    console.log(resultado);
  });*/
  
  test('Deve encontrar recinto para 1 gazela', () => {
    const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1);
    console.log(resultado);
  });

  test('Deve rejeitar quantidade inválida (0)', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEAO', 0);
    console.log(resultado);
    expect(resultado.erro).toBe('Quantidade inválida');
  });

  test('Deve rejeitar quantidade inválida (-1)', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEAO', -1);
    console.log(resultado);
    expect(resultado.erro).toBe('Quantidade inválida');
  });

  test('Deve rejeitar quantidade inválida (não numérica)', () => {
    const resultado = new RecintosZoo().analisaRecintos('LEAO', 'três');
    console.log(resultado);
    expect(resultado.erro).toBe('Quantidade inválida');
  });

  test('Deve encontrar recintos para 2 crocodilos', () => {
    const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 2);
    console.log(resultado);
  });

  test('Não deve encontrar recintos para 3 crocodilos', () => {
    const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 3);
    console.log(resultado);
    expect(resultado.erro).toBe('Não há recinto viável');
  });

});


