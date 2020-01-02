import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import PropTypes from 'prop-types';

import {Container, Title, Time, Info} from './styles';

export default function CheckinInfo({data, checkIns}) {
  const number = checkIns.indexOf(data) + 1;
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);
  return (
    <Container>
      <Info>
        <Title>{`Check-in #${number}`}</Title>
        <Time>{parsedDate}</Time>
      </Info>
    </Container>
  );
}

CheckinInfo.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
  }).isRequired,
  checkIns: PropTypes.instanceOf(Array).isRequired,
};
