import { useState } from 'react';
import { Col } from 'react-bootstrap';

interface Props {
  maxItemPerPage: number;
  totalItem?: number;
  onPageChanged?: (index: number) => void;
}

const CPagination = (props: Props) => {
  // Props
  const { maxItemPerPage, totalItem, onPageChanged } = props;
  const [index, setIndex] = useState<number>(0);
  const pageCount = Math.ceil(totalItem / maxItemPerPage);

  // Events
  const onIndexChanged = (index: number): void => {
    setIndex(index);
    if (onPageChanged !== undefined) {
      onPageChanged(index);
    }
  };
  const onLeftArrowPressed = (): void => {
    if (index > 0) {
      onIndexChanged(index - 1);
    }
  };
  const onRightArrowPressed = (): void => {
    if (index < pageCount - 1) {
      onIndexChanged(index + 1);
    }
  };

  // Generate list of pages
  const pages = [];
  const lower = Math.max(0, index - 2);
  const upper = Math.min(index + 2, pageCount - 1);
  for (let pageIndex = lower; pageIndex <= upper; pageIndex++) {
    // Add pages
    const pagePos = pageIndex + 1;
    pages.push(
      <a key={pageIndex} onClick={() => onIndexChanged(pageIndex)}>
        {pagePos}
      </a>
    );
  }

  if (totalItem === undefined) return (<></>);

  // Component
  return (
    <div className='d-flex flex-column align-items-center'>
      <div className="product__pagination">
        <a onClick={onLeftArrowPressed}>
          <i className="fa fa-long-arrow-left"></i>
        </a>

        {pages}

        <a onClick={onRightArrowPressed}>
          <i className="fa fa-long-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default CPagination;
