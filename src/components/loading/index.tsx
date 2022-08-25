import React, { CSSProperties } from 'react';
import { Row, Spinner } from 'react-bootstrap';

interface Props {
  style?: CSSProperties;
}

const Loading = (props: Props) => {
  const {style} = props;

  return (
    <Row style={style} className="d-flex flex-column justify-content-center align-items-center">
      <Spinner className="my-5" animation="border" />
    </Row>
  );
};

export default Loading;
