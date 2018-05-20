import React from 'react';
import {Card, CardHeader,CardMedia,CardContent, Avatar,IconButton,Typography,Badge,TextField} from '@material-ui/core/';
import {MoreVert,Favorite} from '@material-ui/icons/';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {CommentBox} from './CommentBox';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor:'red',
    },
    cardpadre:{
        marginBottom:'2%'
    },
    micomentario:{
        display:'flex',
        alignItems:'center',
        backgroundColor:"#dddddd",
        padding: "16px 24px 16px"
    },
    comentaritos:{
        backgroundColor:"#dddddd"
    },
    botoncito:{
        position: "absolute",
        right: "20px",
        zIndex: 999,
    }
};
const actions=[];

export const CardDisplay =  ({Iliked,newsFeed,handleComment})=>(

    newsFeed.map( news=>
        <Card id={news.id} style={styles.cardpadre}>
            <CardHeader
                avatar={
                    <Avatar arial-label={"Recipe"} style={styles.avatar}>
                        B
                    </Avatar>
                }
                title={news.nomb}
                subheader={news.fechita}
                action={
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                }
            />


            <CardContent>
                <Typography component="p">
                    {news.textito}
                </Typography>
            </CardContent>


            {news.imagencita ? <CardMedia
                style={styles.media}
                image={news.imagencita}
            />: ""}


            <div style={styles.botoncito}>
                {<IconButton aria-label="Add to favorites" style={styles.buttonIcon} onClick={Iliked}>
                    {news.likes >=1 ?
                        <Badge badgeContent={news.likes} color="primary">
                            <Favorite />
                        </Badge>:

                        <Favorite />
                    }

                </IconButton>}
            </div>
            <ExpansionPanel style={{margin:'0'}}>

                    <ExpansionPanelSummary >
                        <div style={styles.expansiones}>

                            <Typography> Comentarios</Typography>
                        </div>
                    </ExpansionPanelSummary>

                    <CommentBox handleComment={handleComment} />
            </ExpansionPanel>


            <CardContent style={styles.comentaritos}>
                <div style={styles.micomentario}>
                    <Avatar arial-label={"Recipe"} style={styles.avatar}>
                        B
                    </Avatar>
                    <div style={{marginLeft:"10px", backgroundColor:'white',width:'100%',borderRadius:'5px'}}>
                        <TextField
                            InputProps={{
                                disableUnderline: true,

                            }}
                            onChange={handleComment}
                            style={{padding:"0 10px"}}
                            id="multiline-flexible"
                            placeholder="Escribe tu humilde opinion!"
                            fullWidth={true}
                            multiline
                            margin="normal"
                            name="commet"
                        />
                    </div>
                </div>


            </CardContent>


        </Card>)
);