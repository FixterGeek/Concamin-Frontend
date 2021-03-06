import React from 'react';
import './ChatMenu.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Input from '@material-ui/core/Input';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Paper } from '@material-ui/core'
import { Close, ExpandMore } from '@material-ui/icons/';



export const ChatAdd = ({ scrollToBottom, followerList, messageInput, addMessage, participants, messages, onClickChat, userSelected, listi, textInput, onChange, close, onClose, handleInput, onChangeHandler, pushButton, visible, expanded }) => {
    console.log("desconstr", participants, messages)
    const localUser = JSON.parse(localStorage.getItem('user'));
    let list = followerList
        .filter(followerList => textInput.toLowerCase() === '' || followerList.username.toLowerCase().includes(textInput.toLowerCase()))
        .map((follower, index) => {
            return <ListItem button key={index} onChange={() => onChange(follower)} onClick={() => onClickChat(follower)} name={follower.username}>
                <Avatar>
                    <img src={follower.profilePic} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="profile" />
                </Avatar>
                <ListItemText primary={follower.username} secondary={follower.email} />
            </ListItem>
        })

    if (userSelected) return (
        <div>
            <ExpansionPanel style={{
                minWidth: '320px',
                position: 'fixed',
                bottom: 0,
                right: 380,
            }} defaultExpanded={true} hidden={close}>
                <ExpansionPanelSummary expanded={true} expandIcon={<Close onClick={onClose} />} style={{ backgroundColor: 'dimgray' }}>
                    <Typography>{userSelected}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: 0 }} >
                    <div style={{
                        width: '100%',
                    }}>
                        <section style={{ height: '60vh' }} className="scroll" id="chatWindow">
                            {
                                messages.map((m, index) => {
                                    if (m.user == localUser._id) {
                                        return (
                                            <Paper key={index} style={{ maxWidth: '290px', padding: '10px', margin: '5px 5px' }}>
                                                <Avatar>
                                                    <img src={m.profilePic} alt="profile" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                                </Avatar>
                                                {m.body}
                                            </Paper>
                                        )
                                    } else {
                                        return (<Paper key={index} style={{ maxWidth: '290px', padding: '10px', margin: '5px 5px' }}>
                                            {m.body}
                                        </Paper>)
                                    }
                                })}
                        </section>
                        <div style={{ width: '100%', backgroundColor: 'dimgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Input value={messageInput} onKeyPress={addMessage} style={{ height: 50, flexGrow: 2, paddingLeft: 10 }} name="messageInput" onChange={handleInput}
                                placeholder="Escribe un mensaje.."
                            />
                            {/* <Button style={{ marginRight: 5 }} variant="fab" mini color="secondary" aria-label="Create" onClick={this.onAdd}>
                                <Create />
                            </Button> */}
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div >
    )
    return (
        <ExpansionPanel style={{
            minWidth: '320px',
            position: 'fixed',
            bottom: 0,
            right: 380,
        }} defaultExpanded={expanded} hidden={close}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />} style={{ backgroundColor: 'dimgray' }}>
                <Typography>Nuevo mensaje..</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails style={{ padding: 0 }} >
                <div style={{
                    width: '100%',
                }}>
                    <div style={{ width: '100%', backgroundColor: 'dimgray' }}>
                        <Input style={{ height: 50, flexGrow: 2, paddingLeft: 10, width: '100%' }}
                            value={textInput}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <section style={{ height: '60vh' }} className="scroll">
                        <List>{list}</List>
                    </section>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}


