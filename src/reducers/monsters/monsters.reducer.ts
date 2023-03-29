import { createReducer } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  fetchMonstersData,
  setComputerMonster,
  setSelectedMonster,
} from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  computerMonster: Monster | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  computerMonster: null,
};
/*
  Para criar um reducer precisamos definir uma função que recebe
    o estado inicial do rootState & uma action.

  Recebendo isso dentro da função, podemos criar um switch case
    no type da nossa action para identificar que action foi
      enviada pelo dispatch.

  Encontrando qual delas foi enviada/chamada pelo dispatch,
    retornamos o rootState atualizado de acordo com a mesma.
**/

/* 
  A função `createReducer` cria um `Reducer` recebendo o estado inicial do
    `rootState` e a função que definirá os casos do `swith case` executado
      dentro do `Reducer` gerado pela função `createReducer`.
  
  Essa função recebe um parâmetro `builder` utilizado para adicionar um caso
    ao switch case através de `builder.addCase`.
      
  Esse `builder.addCase` recebe dois parâmetros, são eles a `Action` que terá
    seu `type` verificado pelo switch case e a função a ser executada nesse
      caso, onde a mesma retorna o rootState atualizado de acordo.
**/
export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
  }));

  builder.addCase(setComputerMonster, (state, action) => ({
    ...state,
    computerMonster: action.payload,
  }));
});
