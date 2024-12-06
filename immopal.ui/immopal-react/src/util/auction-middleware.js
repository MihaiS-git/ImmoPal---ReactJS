import { stompClient } from './auction-websocket-client.js';
import { setConnected, setError } from '../store/bids-slice.js';

const auctionMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case 'connect':
            if (!stompClient.connected) {
                stompClient.activate();
                stompClient.onConnect = () => {
                    store.dispatch(setConnected(true));
                };
                stompClient.onWebSocketError = (error) => {
                    console.error('WebSocket error occurred:', error);
                };
                stompClient.onStompError = (frame) => {
                    console.error('STOMP error:', frame.body);
                    store.dispatch(setError(frame.body));
                };
            } else {
                console.log('STOMP client is already connected');
            }
            break;
        case 'disconnect':
            if (stompClient.connected) {
                stompClient.deactivate();
                store.dispatch(setConnected(false));
            }
            break;
        default:
            break;
    }
    return next(action);
};


export default auctionMiddleware;
