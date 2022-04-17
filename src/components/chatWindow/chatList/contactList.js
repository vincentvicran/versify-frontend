import React, { Component } from 'react';
import './chatList.css';
import Avatar from './Avatar';

export default class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
        };
    }

    setSelectedUser(selectedUser) {
        this.props.selectedUser(selectedUser);
    }

    // Method to Update Last Message
    getLastMessage(userid) {
        for (let chat of Object.values(this.props.chats)) {
            if (chat.members.includes(userid)) {
                return chat.messages[chat.messages.length - 1];
            }
        }
    }

    getLastMessageDetails(user) {
        let lastMessage = this.getLastMessage(user._id);
        const lastMessageDetails = (
            <>
                <div className="user-name">{user.name}</div>
                {lastMessage ? (
                    <div className="message-body">{lastMessage.message}</div>
                ) : null}
                {lastMessage ? (
                    <div className="message-date">{lastMessage.date}</div>
                ) : null}
            </>
        );
        return lastMessageDetails;
    }

    getContacts() {
        const contactDetails = this.state.users.map((user, index) => (
            <div
                className="chatlist__item active"
                id={user._id}
                key={user._id}
                onClick={() => this.setSelectedUser(user)}
            >
                <Avatar
                    image={`${'/images/' + user.name}`}
                    isOnline={this.props.isOnline}
                />
                <div className="userMeta">
                    {this.getLastMessageDetails(user)}
                </div>
            </div>
        ));
        return contactDetails;
    }

    render() {
        return (
            <div className="main__chatlist">
                <button className="btn">
                    <i className="fa fa-plus"></i>
                    <span>New conversation</span>
                </button>
                <div className="chatlist__heading">
                    <h2>Chats</h2>
                    <button className="btn-nobg">
                        <i className="fa fa-ellipsis-h"></i>
                    </button>
                </div>
                <div className="chatList__search">
                    <div className="search_wrap">
                        <input type="text" placeholder="Search Here" required />
                        <button className="search-btn">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="chatlist__items">{this.getContacts()}</div>
            </div>
        );
    }
}
