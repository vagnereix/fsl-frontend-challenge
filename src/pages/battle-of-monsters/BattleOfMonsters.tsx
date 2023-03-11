import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';
import { API_URL } from '../../constants/env';
import { Monster } from '../../models/interfaces/monster.interface';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectComputerMonster,
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster) as Monster;
  const computerMonster = useSelector(selectComputerMonster) as Monster;

  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  const handleStartBattleClick = async () => {
    const response = await (
      await fetch(`${API_URL}/battle`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          monster1Id: selectedMonster.id,
          monster2Id: computerMonster.id,
        }),
      })
    ).json();

    if (response.tie) {
      setWinner('tie');
      return;
    }

    setWinner(response.winner.name);
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner !== null && (
        <WinnerDisplay text={winner === 'tie' ? 'No one' : winner} />
      )}

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
          monster={selectedMonster}
        />

        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>

        <MonsterBattleCard
          title={computerMonster?.name || 'Computer'}
          monster={computerMonster}
        />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
