import { PageURL } from 'enum/PageURL';
import { TProduct } from 'models';
import { MouseEvent } from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { toggleWatchList } from './api';

interface Props extends TProduct { }

const ProductCover = (props: Props) => {
  const { id,
    coverImageUrl,
    topBidder,
    currentPrice,
    name,
    auctionLogCount,
    reservedPrice,
    createdAt
  } = props;

  function toggleFavorite(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    toggleWatchList(id);
  }

  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="product__item">
        <Link to={PageURL.Detail.replace(':id', id.toString())}>
          <div
            className="product__item__pic set-bg"
            style={{
              backgroundImage: `url(${coverImageUrl})`,
              width: '100%',
            }}
          >
            <ul className="product__item__pic__hover">
              <li>
                <a onClick={toggleFavorite}>
                  <i className="fa fa-heart" />
                </a>
              </li>

              <li>
                <a>
                  <i className="fa fa-gavel" />
                </a>
              </li>
            </ul>
          </div>
        </Link>

        <div className="product__item__text">
          <h6>
            <b>{name}</b>
            {(Date.now() - new Date(createdAt).getTime()) < 60 * 60 * 1000 &&
              <Badge className='ml-1' variant="secondary">New</Badge>
            }
          </h6>
          <h6>Bid Price: ${currentPrice ?? reservedPrice}</h6>
          {topBidder &&
            <h6>Top bidder: {topBidder?.firstName} {topBidder?.lastName}</h6>
          }
          <h6>Log count: {auctionLogCount}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProductCover;
