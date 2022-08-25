import DefaultButton from 'components/button/DefaultButton';
import Loading from 'components/loading';
import { TStatus } from 'models';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { blockBidder, getCurrentBidder, checkSellerOfProduct, TCurrentBidder } from './api';

interface Props {
    productId?: number;
}

const CurrentBidderList = (props: Props) => {
    const { productId } = props;

    const [currentBidders, setCurrentBidders] = useState<TCurrentBidder[] | undefined>(undefined);
    const [isSellerOfProduct, setIsSellerOfProduct] = useState<boolean>(false);
    const [apiStatus, setApiStatus] = useState<TStatus>('idle')

    useEffect(() => {
        if (!productId) return;
        if (apiStatus !== 'idle') return;

        setTimeout(async () => {
            try {
                setApiStatus('pending');
                const results = await Promise.all([
                    getCurrentBidder(productId),
                    checkSellerOfProduct(productId),
                ])

                setCurrentBidders(results[0]);
                setIsSellerOfProduct(results[1]);
                setApiStatus('success');
            }
            catch (error) {
                setApiStatus('reject');
            }
        })
    }, [productId, apiStatus])

    function blockCurrentBidder(bidderId: number) {
        blockBidder(productId, bidderId);

        if (currentBidders === undefined) return;

        setCurrentBidders(currentBidders.map(bidder => {
            if (bidder.id === bidderId)
                bidder.isBlocked = true;

            return bidder;
        }));
    }

    const uiMap = {
        'idle': <Loading />,
        'pending': <Loading />,
        'success': (
            <table id="bidinfo" className="table table-hover">
                <thead>
                    <tr>
                        <th>Bidder ID</th>
                        <th>Name</th>
                        <th>Is banned</th>
                    </tr>
                </thead>
                <tbody id="category-container">
                    {currentBidders?.map(currentBidder => (
                        <tr key={currentBidder.id}>
                            <td>{currentBidder.id}</td>
                            <td>{currentBidder.fullName}</td>
                            <td>
                                {(isSellerOfProduct && !currentBidder.isBlocked)
                                    ? <DefaultButton onClick={() => blockCurrentBidder(currentBidder.id)}>Block</DefaultButton>
                                    : <>{currentBidder.isBlocked ? 'Yes' : 'No'}</>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ),
        'reject': (
            <Row className='d-flex flex-column align-items-center'>
                <p className='pt-5'>Something is wrong</p>
            </Row>
        )
    }

    return uiMap[apiStatus];
}

export default CurrentBidderList
