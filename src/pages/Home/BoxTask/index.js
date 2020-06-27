import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container, Text } from './styles';

function BoxTask({ data, first }) {
  return (
    <Container first={first}>
      <Text>{data.text}</Text>
    </Container>
  );
}

export default memo(BoxTask);

BoxTask.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
  first: PropTypes.bool.isRequired,
};
