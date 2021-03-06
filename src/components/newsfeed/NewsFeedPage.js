import React, { Component } from 'react'
import { GridList, GridListTile } from '@material-ui/core';
import  NFContainer from './NFContainer';
import {getPosts, addPost} from '../../services/postService';
import {AdCard} from "../Advertising/AdCard";
import { MainLoader } from '../loader/MainLoader';
import {getLoggedUser} from "../../services/userService";
import {getAdvertisements} from '../../services/advertisementService'
import toastr from "toastr";



class NewsFeedPage extends Component {

    state={
        announces:[],
        loading:true,
        newPost:{
            links:[],
            body:"",
            image:"",
            file:""
        },
        user:{},
        photoPreview:'',
        addLink:false,
        posts:[],
    }

    componentWillMount(){

        this.setState({loading:true})
        this.getRandomAdvertisements()
        getPosts()
            .then(r=>{
               this.setState({posts:r})
               console.log(r)
               this.setState({loading:false})
            }).catch(e=>{
                console.log(e)
            })
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("aqui esta",user)
        this.setState({user})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.setState({loading:true})    
        addPost(this.state.newPost)
            .then(r=>{
                let {posts, newPost} = this.state;
                posts.unshift(r)
                newPost.body=""
                newPost.links=[]
                this.clearFile()
                this.setState({posts, newPost, loading:false, addLink:false})
                
            }).catch(e=>{
                console.log(e)
            })

        
    }

    getRandomAdvertisements=()=>{
        getAdvertisements()
            .then(r=>{
                console.log(r)
                this.setState({announces:r})
            }).catch(e=>{
            console.log(e)
            toastr.error(e)
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
    let {photoPreview, newPost, addLink, posts, loading,user, announces} = this.state;
    if(loading) return(<MainLoader/>)
    return (

        <GridList cellHeight={'auto'} cols={3}>
            <GridListTile cols={2} >
                <NFContainer />
            </GridListTile>
            <GridListTile cols={1} style={{paddingLeft:'50px'}}>
                <AdCard announces={announces}/>
            </GridListTile>
        </GridList>




    )
  }
}

const styles = {
    
}

export default NewsFeedPage
