import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const socket = new SockJS(`http://localhost:9006/ws/auction`);
const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

stompClient.onConnect = (frame) => {
    console.log('Connected ' + frame);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

stompClient.activate();

const sendBid = (auctionId, bid, token) => {
    if (stompClient.connected) {
        stompClient.publish({
            destination: `/app/auction/${auctionId}/bid`,
            headers: `Bearer ${token}`,
            body: JSON.stringify(bid),
        });
    } else {
        console.error('Cannot send bid: STOMP client is not connected.');
    }
};

export { stompClient, sendBid };
