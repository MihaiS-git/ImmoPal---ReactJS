import { stompClient } from './auction-websocket-client.js';
import { setConnected, setError } from '../store/bids-slice.js';

const auctionMiddleware = (store) => (next) => (action) => {
    console.log('Middleware action:', action.type);
    switch (action.type) {
        case 'connect':
            if (!stompClient.connected) {
                stompClient.activate();
                stompClient.onConnect = () => {
                    console.log('STOMP client connected');
                    store.dispatch(setConnected(true));
                };
                stompClient.onStompError = (frame) => {
                    console.error('STOMP error:', frame.body);
                    store.dispatch(setError(frame.body));
                };
            }
            break;
        case 'disconnect':
            if (stompClient.connected) {
                stompClient.deactivate();
                console.log('STOMP client disconnected');
                store.dispatch(setConnected(false));
            }
            break;
        default:
            break;
    }
    return next(action);
};


export default auctionMiddleware;
