import { RootState } from '../../app/store';

/* 
  Seletores são funções que recebem o State global da store
    e retornam uma propriedade específica.
  
  São utilizados como parâmetro para o useSelector do react-redux.
    Exemplo: useSelector(selectMonsters);
*/
export const selectMonsters = (state: RootState) => state.monsters.monsters;

export const selectSelectedMonster = (state: RootState) =>
  state.monsters.selectedMonster;

export const selectComputerMonster = (state: RootState) =>
  state.monsters.computerMonster;
