import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import MessageService from "../../services/MessageService";
import ChatWindow from './ChatWindow';


const Chat = () => {
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    // const loadData = async("WxTpjzEGHEl", "top") => {
    //     await CommentService.getCommentList(section)
    //       .then((response) => {
    //         return response.data;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }

      useEffect(() => {
        (async () => {
          const {data} = await MessageService.getMessageList();
          setChat(data);
        })()
      }, [])

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_BASE_URL + '/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');
                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        try {
            await fetch(process.env.REACT_APP_BASE_URL + '/chat/messages', {
                method: 'POST',
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('sendMessage');
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }

    return (
        <ChatWindow chat={chat} />
    );
};

export default Chat;
