import { Monster } from '../../models/interfaces/monster.interface';
import {
  AttributeTitle,
  BattleMonsterCard,
  BattleMonsterName,
  BattleMonsterTitle,
  Image,
  ProgressBar,
  ProgressBox,
  Separator,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
  return (
    <BattleMonsterCard centralized={!monster}>
      {monster && <Image image={monster?.imageUrl} />}

      {monster ? (
        <BattleMonsterName>{monster?.name}</BattleMonsterName>
      ) : (
        <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      )}

      {monster && (
        <>
          <Separator />
          <ProgressBox>
            <AttributeTitle>HP</AttributeTitle>
            <ProgressBar value={monster?.hp} variant="determinate" />
          </ProgressBox>
          <ProgressBox>
            <AttributeTitle>Attack</AttributeTitle>
            <ProgressBar value={monster?.attack} variant="determinate" />
          </ProgressBox>
          <ProgressBox>
            <AttributeTitle>Defense</AttributeTitle>
            <ProgressBar value={monster?.defense} variant="determinate" />
          </ProgressBox>
          <ProgressBox>
            <AttributeTitle>Speed</AttributeTitle>
            <ProgressBar value={monster?.speed} variant="determinate" />
          </ProgressBox>
        </>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
