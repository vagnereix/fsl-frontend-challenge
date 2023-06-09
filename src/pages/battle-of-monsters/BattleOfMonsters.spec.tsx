import { act, render, screen, waitFor } from '@testing-library/react';
import mockFetch from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { BattleOfMonsters } from './BattleOfMonsters';

import monstersData from '../../../data/monsters.json';
import { store } from '../../app/store';

const battleOfMonstersFactory = async () => {
  mockFetch.mockResponse((req) => {
    if (req.url.includes('monsters')) {
      return Promise.resolve(JSON.stringify(monstersData.monsters));
    }

    if (req.url.includes('battle')) {
      return Promise.resolve(
        JSON.stringify({ winner: 'Winner Mocked', tie: false }),
      );
    }

    return Promise.reject(new Error('not mapped url'));
  });

  render(
    <Provider store={store}>
      <BattleOfMonsters />
    </Provider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId('monsters-list-section').childNodes).toHaveLength(
      monstersData.monsters.length,
    ),
  );
};

describe('BattleOfMonsters', () => {
  beforeEach(() => {
    mockFetch.enableMocks();
    mockFetch.resetMocks();
  });

  it('should render the page container', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByText(/Battle of Monsters/i)).toBeInTheDocument();
    expect(screen.getByTestId('start-battle-button')).toBeInTheDocument();
  });

  it('should enable the start battle button on choose a monster', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId('start-battle-button')).toBeDisabled();
    expect(screen.getByTestId('monster-1')).toBeInTheDocument();
    act(() => screen.getByTestId('monster-1').click());
    expect(screen.getByTestId('start-battle-button')).toBeEnabled();
    act(() => screen.getByTestId('monster-1').click());
    expect(screen.getByTestId('start-battle-button')).toBeDisabled();
  });

  it('should start fight after click on button', async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId('monster-1')).toBeInTheDocument();
    await act(() => screen.getByTestId('monster-1').click());
    await act(() => screen.getByTestId('start-battle-button').click());
  });

  it('should show the winner after the fight', async () => {
    await battleOfMonstersFactory();
    await act(() => screen.getByTestId('monster-1').click());
    await act(() => screen.getByTestId('start-battle-button').click());

    setTimeout(() => {
      expect(screen.getByText('Mocked Winner wins!')).toBeInTheDocument();
    }, 500);
  });

  it('should show the tie case after the fight', async () => {
    await battleOfMonstersFactory();

    mockFetch.mockResponse((req) => {
      if (req.url.includes('battle')) {
        return Promise.resolve(JSON.stringify({ winner: '', tie: true }));
      }

      return Promise.reject(new Error('not mapped url'));
    });

    await act(() => screen.getByTestId('monster-1').click());
    await act(() => screen.getByTestId('start-battle-button').click());

    setTimeout(() => {
      expect(screen.getByText('No one wins!')).toBeInTheDocument();
    }, 500);
  });

  it('should clear the winner message select a new monster', async () => {
    await battleOfMonstersFactory();

    await act(() => screen.getByTestId('monster-1').click());
    await act(() => screen.getByTestId('start-battle-button').click());
    await act(() => screen.getByTestId('monster-2').click());

    setTimeout(() => {
      expect(screen.getByText('Mocked Winner wins!')).not.toBeInTheDocument();
    }, 500);
  });
});
