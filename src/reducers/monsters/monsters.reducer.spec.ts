import monstersData from '../../../data/monsters.json';
import {
  fetchMonstersData,
  setComputerMonster,
  setSelectedMonster,
} from './monsters.actions';
import { monstersReducer } from './monsters.reducer';

describe('Monsters Reducer', () => {
  it('should return the initial state', () => {
    expect(monstersReducer(undefined, { type: undefined })).toEqual({
      monsters: [],
      selectedMonster: null,
      computerMonster: null,
    });
  });

  it('should not change the monsters list on action pending', () => {
    const action = { type: fetchMonstersData.pending };
    const state = monstersReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        monsters: [],
      }),
    );
  });

  it('should not change the monsters list on action rejected', () => {
    const action = { type: fetchMonstersData.rejected };
    const state = monstersReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        monsters: [],
      }),
    );
  });

  it('should change the monsters list on action fulfilled', () => {
    const action = {
      type: fetchMonstersData.fulfilled,
      payload: monstersData.monsters,
    };
    const state = monstersReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        monsters: monstersData.monsters,
      }),
    );
  });

  it('should add the selected monster to the state', () => {
    const state = monstersReducer(
      undefined,
      setSelectedMonster(monstersData.monsters[0]),
    );

    expect(state).toEqual(
      expect.objectContaining({
        selectedMonster: monstersData.monsters[0],
      }),
    );
  });

  it('should add the computer monster to the state', () => {
    const state = monstersReducer(
      undefined,
      setComputerMonster(monstersData.monsters[1]),
    );

    expect(state).toEqual(
      expect.objectContaining({
        computerMonster: monstersData.monsters[1],
      }),
    );
  });
});
