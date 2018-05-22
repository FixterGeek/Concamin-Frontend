import React, { Component } from 'react'
import { GridList, GridListTile } from '@material-ui/core';
import { NewsFeedComponent } from './NewsFeedComponent';
import {getPosts, addPost} from '../../services/postService';
import {AdCard} from "../Advertising/AdCard";
import Navbar from "../Navbar/Navbar";


class NewsFeedPage extends Component {

    state={
        newPost:{
            links:[],
            body:"",
            image:"",
            file:""
        },
        photoPreview:'',
        addLink:false,
        posts:[],
    }

    componentWillMount(){
        getPosts()
            .then(r=>{
               //this.setState({posts:r})
               console.log(r)
            }).catch(e=>{
                console.log(e)
            })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        //loaders missing
        console.log(this.state.newPost)        
        addPost(this.state.newPost)
            .then(r=>{
                let {posts, newPost} = this.state;
                posts.unshift(r)
                newPost.body=""
                this.clearFile()
                this.setState({posts, newPost})
            }).catch(e=>{
                console.log(e)
            })

        
    }
    handleChange=(e)=>{
        let {newPost} = this.state;
        let field = e.target.name;
        if(e.target.type==="file"){
            newPost[field] = e.target.files[0]
           if(e.target.name==="image"){
            this.handlePreview()
            console.log('preview de foto')
           }
        }
        else{
            newPost[field] = e.target.value
        }
        this.setState({newPost})
        console.log(newPost)
    }
    handlePreview=()=>{
        let reader = new FileReader();
        reader.readAsDataURL(this.state.newPost.image)
        reader.onload = () => {
            this.setState({photoPreview:reader.result})
        }
    }

    clearFile=()=>{
        let {newPost} = this.state;
        newPost.image = ''
        newPost.file = ''
        this.setState({photoPreview:'', newPost})
        document.getElementById('image').value = '';
        document.getElementById('file').value = '';
    }
    ejemplo=()=>{
        console.log("Si funciono")
    }
   
    handleLink=()=>{
       this.setState({addLink:!this.state.addLink})
       console.log('lool')
    }
    addLinks=()=>{
        let {newPost} = this.state;
        newPost['links'].push(newPost.link)
        newPost.link=""       
        this.setState({newPost})
    }
    clearLink=(key)=>{
        let {newPost} = this.state;
        newPost.links.splice(key, 1)
        this.setState({newPost})
    }



  render() {
    let {photoPreview, newPost, addLink, posts} = this.state;
    return (
            <div>
                <Navbar/>
                <GridList cellHeight={'auto'} cols={3}>
                    <GridListTile cols={2} style={styles.gridTile}>
                        <NewsFeedComponent
                            posts={posts}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            photoPreview={photoPreview}
                            newPost={newPost}
                            handleLink={this.handleLink}
                            addLink={addLink}
                            addLinks={this.addLinks}
                            clearLink={this.clearLink}
                            clearFile={this.clearFile}/>
                    </GridListTile>
                    <GridListTile cols={1} style={styles.gridTile}>

                        <AdCard ejemplo={this.ejemplo}/>



                    </GridListTile>
                </GridList>
            </div>



    )
  }
}

const styles = {
    gridTile:{
        padding:'2%'
    }
}

export default NewsFeedPage
