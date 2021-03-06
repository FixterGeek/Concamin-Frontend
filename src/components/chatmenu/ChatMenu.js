import React, { Component } from 'react';
import { ChatMenuList } from './ChatMenuList';
import './ChatMenu.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Input from '@material-ui/core/Input';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Create from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { ChatAdd } from './ChatAdd';
import { getOrCreateChat, addMessage } from '../../services/chatService';
import toastr from 'toastr'
import { animateScroll } from "react-scroll"
import { withRouter } from 'react-router-dom';

const conversationList = [

]

class Chat extends Component {
    state = {
        conversationNumber: '6',
        addChat: false,
        onClose: '',


        users: [{
            name: 'mefit',
            username: 'mefit',
            fecha: '10/10/1900',
            _id: "5b036c4dd34e8b469533c096",
            email: 'mefit@gmail.com'
        },
        {
            name: 'carro',
            fecha: '10/15/2919'
        },
        {
            name: 'Jose',
            _id: 2,
            email: 'jose@gmail.com',
            username: 'Jose',
            fecha: '8/06/2919'
        },
        ],
        input: '',
        inputFollowers: '',
        infoUser: [],
        visible: true,
        close: true,
        expanded: true,
        data: [],
        messageInput: '',
        userSelected: null,
        activeChat: {},
        followerList: []
    }

    verifyUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.following) {
            this.componentWillMount();
        }
    }
    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;
        if (user.following) {
            this.setState({ followerList: user.following })
        }
        console.log(user);
    }

    onAddChat = () => {
        this.setState({
            close: !this.state,
            expanded: true
        })
    }

    //CHAT ADD
    handleInput = (e) => {
        let { messageInput } = this.state
        messageInput = e.target.value
        this.setState({ messageInput })
    }

    onChangeHandler = (e) => {
        this.setState({
            input: e.target.value,
            data: []
        })

        console.log(this.state.data);

    }

    onChangeConversations = (e) => {
        this.setState({
            inputFollowers: e.target.value,
            data: []
        })
    }

    onClickChat = (follower) => {
        getOrCreateChat(follower._id)
            .then(chat => {
                this.setState({ userSelected: follower.username, activeChat: chat })
                this.onAddChat();
            })
            .catch(e => {
                console.log(e);
                toastr.error(e)
            })
    }

    addMessage = (e) => {
        //input
        const user = JSON.parse(localStorage.getItem('user'));
        const { activeChat } = this.state;
        const message = {
            user: user._id,
            date: new Date(),
            body: this.state.messageInput,
            profilePic: user.profilePic,
        };
        if (e.key === 'Enter') {
            console.log('orale:', message)
            addMessage(message, activeChat._id)
                .then(chat => {
                    //activeChat.messages.push(message);
                    this.setState({ activeChat: chat, messageInput: '' });
                    animateScroll.scrollToBottom({
                        containerId: "chatWindow"
                    })
                })
                .catch(e => {
                    console.log(e);
                    toastr.error("Inicia sesión : " + e.statusText)
                });
        }

    }

    onChange = (follower) => {
        this.setState({
            input: follower.name,
            infoUser: follower,
            visible: false,
        })
    }

    pushButton = () => {
        this.setState({
            data: this.state.infoUser,
        })
    }

    onClose = () => {
        this.setState({
            close: !this.state.close,
            userSelected: null,
            input: ''
        })
    }

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "chatWindow"
        })
    }
    //END CHAT ADD
    render() {
        return (
            <div className="chat">
                <ExpansionPanel style={{
                    minWidth: '320px',
                    margin: 0,
                    position: 'fixed',
                    bottom: 0,
                    right: 50,
                }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: 'dimgray' }}>
                        <Typography>Mensajes ({conversationList.length})</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ padding: 0 }} >
                        <div style={{
                            width: '100%',
                        }}>
                            {conversationList.length > 0 ?
                                <div className="scroll" style={{ height: '60vh' }}>
                                    <ChatMenuList
                                        conversationList={conversationList}
                                        textInput={this.state.inputFollowers}
                                        onClickChat={this.onClickChat}
                                    />
                                </div> :
                                <div className="scroll" style={{ height: '60vh' }}>
                                    <h2> No hay conversaciones </h2>
                                </div>
                            }
                            <div style={{ width: '100%', backgroundColor: 'dimgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Input style={{ height: 50, flexGrow: 2, paddingLeft: 10, width: '100%' }}
                                    value={this.state.inputFollowers}
                                    onChange={this.onChangeConversations}
                                    placeholder="Buscar una conversacion"
                                />
                                <Button style={{ marginRight: 5 }} variant="fab" mini color="secondary" aria-label="Create" onClick={this.onAddChat}>
                                    <Create />
                                </Button>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ChatAdd
                    messageInput={this.state.messageInput}
                    followerList={this.state.followerList}
                    addMessage={this.addMessage}
                    {...this.state.activeChat}
                    textInput={this.state.input}
                    onChange={this.onChange}
                    close={this.state.close}
                    onClose={this.onClose}
                    onChangeHandler={this.onChangeHandler}
                    pushButton={this.pushButton}
                    visible={this.state.visible}
                    hidden={this.state.close}
                    expanded={this.state.expanded}
                    userSelected={this.state.userSelected}
                    onClickChat={this.onClickChat}
                    handleInput={this.handleInput}
                    scrollToBottom={this.scrollToBottom}
                />
            </div>
        )
    }
}

export default Chat;