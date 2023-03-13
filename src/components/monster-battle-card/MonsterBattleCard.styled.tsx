import styled from '@emotion/styled';
import {
  Box,
  Card,
  CardMedia,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { colors } from '../../constants/colors';

export const BattleMonsterCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'centralized',
})<{ centralized?: boolean }>(({ centralized }) => ({
  padding: '13px 11px',
  width: 'calc(307px - 22px)',
  height: centralized ? '415px' : 'auto',
  background: colors.white,
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '7px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: centralized ? 'center' : 'flex-start',
  justifyContent: centralized ? 'center' : 'auto',
}));

export const BattleMonsterTitle = styled(Typography)(() => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '36px',
  lineHeight: '42px',
  color: colors.black,
  marginBottom: '5px',
}));

export const BattleMonsterName = styled(BattleMonsterTitle)(() => ({
  fontSize: '22px',
  lineHeight: '26px',
}));

export const AttributeTitle = styled(BattleMonsterTitle)(() => ({
  fontSize: '12px',
  lineHeight: '14px',
}));

export const ProgressBox = styled(Box)(() => ({
  width: '100%',
  marginBottom: '11px',
}));

export const Image = styled(CardMedia)(() => ({
  width: '100%',
  height: '178px',
  borderRadius: '7px',
  marginBottom: '14px',
}));

export const ProgressBar = styled(LinearProgress)(() => ({
  width: '100%',
  height: 8,
  borderRadius: 15,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colors.progressBarBackground,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: colors.progressColor,
  },
}));

export const Separator = styled(Divider)(() => ({
  width: '100%',
  height: '0px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  marginBottom: '11px',
}));
