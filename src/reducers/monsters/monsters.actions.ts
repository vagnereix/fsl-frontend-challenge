import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import { MonsterService } from './monsters.service';

/* 
  A função `createAction` cria uma `Action` recebendo apenas um parâmetro
    que será o `type` da mesma. O `Payload` dessa `Action` será automáticamente
      recebido e enviado para o `Reducer` quando a mesma for chamada
        pelo dispatch.
        
  Exemplo:
    createAction('actionType') => { type: 'actionType', payload: {} }

  Podemos tipar o valor do `Payload` para a `Action` a ser criada utilizando 
    createAction<actionPayloadType>('actionType');
*/
export const setSelectedMonster = createAction<Monster | null>(
  'monsters/setSelectedMonster'
);

export const setComputerMonster = createAction<Monster | null>(
  'monsters/setComputerMonster'
);

/* 
  A função `createAsyncThunk` cria uma função `Thunk` que recebe dois
    parâmetros onde um é o `type` da `Action` a ser criada, e o outro é uma
      `Promise` que será executada antes de passar o `Payload` para a `Action`
        quando a mesma for chamada via `dispatch`.

  Dessa forma o retorno dessa `Promise` será enviado como `Payload` para essa
    `Action`.
 
  Podemos tipar o valor do `Payload` para a `Action` que será criada da mesma
    forma que fazemos com a função `createAction`. Porém nesse caso,
      ao definirmos o tipo do `Payload` para a `Action` automáticamente
        definimos que o tipo do retorno da `Promise` deverá ser o mesmo.

  Ao criarmos uma `Action` com a função `createAsyncThunk`, serão criadas
    3 tipos de actions, uma para cada estado da `Promise` enviada como paràmetro.

  Exemplo:
    createAsyncThunk<actionPayloadType>('actionType', Promise<promiseReturnType>) =>
      { type: 'actionType', payload: *propriedade do tipo promiseReturnType* }

      actionType.pending, ainda está em execução,
        actionType.rejected, para quando a Promise retornou erro,
          actionType.fulfilled para quando a Promise obteve sucesso.
*/
export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  MonsterService.getAll
);
