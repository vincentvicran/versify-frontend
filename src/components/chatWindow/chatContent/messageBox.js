import React, { Component, createRef } from 'react';
import moment from 'moment';
import './chatContent.css';
import Avatar from '../chatList/Avatar';
// import ChatItem from './ChatItem';

export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgText: '',
        };
        this.sendMessageToServer = this.sendMessageToServer.bind(this);
    }

    messagesEndRef = createRef(null);
    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    };

    componentDidMount() {
        if (this.messagesEndRef.current) {
            this.scrollToBottom();
        }
        window.addEventListener('keydown', (e) => {
            e.key === 'Enter' && this.scrollToBottom();
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleMessageText(e) {
        this.setState({ msgText: e.target.value });
    }

    sendMessageToServer() {
        if (this.state.msgText) {
            //to not send empty message
            let msgObj = {
                message: this.state.msgText,
                date: moment().format('LT'),
            };
            this.props.setNewMsgObj(msgObj);
        }
        this.setState({ msgText: '' });
    }

    // Method to Display Messages
    addMessagesToChat() {
        if (this.props.messages) {
            const msgContent = this.props.messages.map(
                function (message) {
                    if (message.receiverid === this.props.selectedUser._id)
                        return (
                            <div key={message.messageId} className="chat__item">
                                <div className="chat__item__content">
                                    <div className="chat__msg">
                                        {message.message}
                                    </div>
                                </div>
                                <Avatar
                                    isOnline="active"
                                    image={
                                        '/images/' + this.props.loggedInUserDP
                                    }
                                />
                            </div>
                        );
                    else
                        return (
                            <div
                                key={message.messageId}
                                className="chat__item other"
                            >
                                <div className="chat__item__content">
                                    <div className="chat__msg">
                                        {message.message}
                                    </div>
                                </div>
                                <Avatar
                                    isOnline="active"
                                    image={
                                        '/images/' +
                                        this.props.selectedUser.name
                                    }
                                />
                            </div>
                        );
                }.bind(this)
            );
            return msgContent;
        }
    }

    render() {
        return (
            <div className="main__chatcontent">
                <div className="content__header">
                    <div className="blocks">
                        <div className="current-chatting-user">
                            <Avatar
                                isOnline="active"
                                image={
                                    '/images/' + this.props.selectedUser.name
                                }
                            />
                            <p>{this.props.selectedUser.name}</p>
                        </div>
                    </div>

                    <div className="blocks">
                        <div className="settings">
                            <button className="btn-nobg">
                                <i className="fa fa-cog"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content__body">
                    <div className="chat__items">
                        {this.addMessagesToChat()}
                    </div>
                    <div ref={this.messagesEndRef} />
                </div>
                <div className="content__footer">
                    <form
                        className="sendNewMessage"
                        onSubmit={(e) => {
                            e.preventDefault();

                            this.sendMessageToServer();
                            this.scrollToBottom();
                        }}
                    >
                        <button className="addFiles">
                            <i className="fa fa-plus"></i>
                        </button>
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            value={this.state.msgText}
                            onChange={(e) => this.handleMessageText(e)}
                        />
                        <button
                            className="btnSendMsg"
                            id="sendMsgBtn"
                            onClick={() => this.sendMessageToServer()}
                        >
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
