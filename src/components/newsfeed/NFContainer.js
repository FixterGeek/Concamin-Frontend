import React, {Component} from 'react';
import {NewsFeedComponent} from './NewsFeedComponent';
import PropTypes from 'prop-types'
import {getOwnPosts, getPosts, addPost, deletePost, likePost} from '../../services/postService';
import {getPostComments, addComment, deleteComment, editComment} from '../../services/commentService';
import toastr from 'toastr';
import {PostCard} from './PostCard';
//import { Divider } from '../../../node_modules/@material-ui/core';
import {getAdvertisements} from '../../services/advertisementService'
import swal from 'sweetalert';


class NFContainer extends Component{

    state = {
        announces:[],
        posts:[],
        loading:true,
        newPost:{
            links:[],
            body:"",
            image:"",
            file:""
        },
        newComment:{},
        user: {},
        skip : 0,

        ask:()=>{},
        photoPreview:'',
        addLink:false,
    }

    componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'));

        this.setState({user});
        if(this.props.own){
            this.getOwn();
            this.setState({ask:this.getOwn})
            return;
        }
        else if(this.props.tipo === "PERSONAL"){
            this.getAll();
            this.setState({ask:this.getAll})
            return;
        }
        else if(this.props.tipo === "GROUP"){
            this.getGroupPosts();
            this.setState({ask:this.getGroupPosts});
            return;

        }
    }
//read
    getGroupPosts = (skip=0) => {
        const groupId = this.props.groupId;
        getPosts(skip, "GROUP", groupId)
        .then(posts=>{
            if(posts.length < 1) {
                this.refs.mas.innerHTML="¡Ya no hay mas posts!";
                this.refs.mas.disabled=true;
            }
            const newArray = [...this.state.posts, ...posts];
            this.setState({posts:newArray, skip})
        })
        .catch(err=>{

            toastr.error('No se pudieron cargar tus posts');
        })
    }

    getAll = (skip=0) => {
        getPosts(skip)
        .then(posts=>{

            if(posts.length < 1) {
                this.refs.mas.innerHTML="¡Ya no hay mas posts!";
                this.refs.mas.disabled=true;
            }
            const newArray = [...this.state.posts, ...posts];
            this.setState({posts:newArray, skip})
        })
        .catch(err=>{

            toastr.error('No se pudieron cargar tus posts');
        })
    };

    getOwn = (skip=0)=>{
        getOwnPosts(skip)
        .then(posts=>{
            if(posts.length < 1) {
                this.refs.mas.innerHTML="¡Ya no hay mas posts!";
                this.refs.mas.disabled=true;
            }
            const newArray = [...this.state.posts, ...posts];
            this.setState({posts:newArray, skip})
        })
        .catch(err=>{

            toastr.error('No se pudieron cargar tus posts');
        })
    }



    askForMore = () => {
        let {skip} = this.state;
        skip += 10;
        this.state.ask(skip)
    }
//write

handleSubmit=(e)=>{
    e.preventDefault()
    this.setState({loading:true})  
    const {newPost} = this.state; 
    if(this.props.tipo === "GROUP" ){
        newPost.tipo = "GROUP";
        newPost.group = this.props.groupId;
    }
    addPost(newPost)
         .then(post=>{
            let {posts} = this.state;
            posts.unshift(post)
            newPost.body=""
            newPost.links=[]
            this.clearFile()
            this.setState({posts, newPost, loading:false, addLink:false})
            toastr.success('Se ha publicado tu post')
         }).catch(e=>{
            toastr.error('No se pudo publicar, posiblemente tu archivo es muy pesado' + e)

        })

    
}
handleChange=(e)=>{
    let {newPost} = this.state;
    let field = e.target.name;
    if(e.target.type==="file"){
        newPost[field] = e.target.files[0]
       if(e.target.name==="image"){
        this.handlePreview()

       }
    }
    else{
        newPost[field] = e.target.value
    }
    this.setState({newPost})
    //

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
//Comment functions

getComments=(id, skip=0)=>{
    let {posts} = this.state;
    let post = posts.find(post=>post._id===id)
    if(post.postComments)return
    getPostComments(id, skip)
        .then(r=>{
            posts = posts.map(p=>{
                if(p._id===id) p['postComments'] = r
                return p
            })
            this.setState({posts})

        }).catch(e=>{

            toastr.error('No hubo comentarios, intenta más tarde')
    })
}


newComment=(event, postId)=>{
    let {newComment, posts} = this.state



    if(event.key == 'Enter' && newComment['body'].length>=5){
        this.getComments(postId)
        newComment['post'] = postId

        addComment(newComment)
            .then(r=>{
                toastr.success('Comentario añadido con éxito')

                posts = posts.map(p=>{
                    if(p._id===postId) {
                        if(!p.postComments)p['postComments'] = []
                        p['postComments'] = [...p.postComments, r]
                    }
                    return p
                })
                this.setState({newComment:{body:''}})
            }).catch(e=>{

            toastr.error('No se pudo crear, intenta más tarde')
        })
    }else if(event.key == 'Enter' && newComment['body'].length<=5){
        toastr.error('Escribe más de 5 caracteres para comentar!')
    }

}
handleComment=(e)=>{

        let {newComment} = this.state
        newComment['body'] = e.target.value
        this.setState({newComment})
}

removeComment=(commentId, postId)=>{
    let {posts} = this.state
    deleteComment(commentId)
        .then(r=>{
            toastr.success('Borrado con éxito')
            posts = posts.map(p=>{
               if(p._id===postId) p.postComments=p.postComments.filter(c=>c._id!==commentId)
                return p
            })
            this.setState({posts})
        }).catch(e=>{
            toastr.error('No pudo borrarse, intenta más tarde')
    })
}

//like posts
likePosts=(postId)=>{
    let obj = {
        _id:postId,
        user:JSON.parse(localStorage.getItem('user'))._id
    }

    likePost(obj)
        .then(r=>{

            let {posts} = this.state
            posts = posts.map(p=>{
                if(p._id===r._id) p.likes=[...r.likes]
                return p
            })

            this.setState({posts})
        }).catch(e=>{

    })
}


removePost = (id) => {
    swal({
        title: `Se eliminará el post: ${id}`,
        buttons:true,
        icon:"error",
        dangerMode:true
    })
    .then(willDelete=>{
        if(willDelete){
            return deletePost(id);
        }
        return Promise.reject('cancel');
    })
    .then(post=>{
        swal({
            icon: "success",
            title: "¡Listo!",
            text: 'Tu post se ha borrado',
            button: true
        });
        let {posts} = this.state;
        posts = posts.filter(p=>p._id!==id);
        this.setState({posts});
    })
    .catch(e=>{
        if(e==="cancel")return;
        swal({
            icon: "warning",
            text: e,
            title: "No se pudo borrar"
        });
        setTimeout(()=>swal.close(),2000);
        return;
    })
};


    render(){
        const { posts, user, newPost, photoPreview,addLink, newComment, announces } = this.state;

        return(
            <div>
            <PostCard 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange} 
                photoPreview={photoPreview} 
                clearFile={this.clearFile}
                user={user}
                {...newPost} 
                clearLink={this.clearLink}
                addLinks={this.addLinks}
                handleLink={this.handleLink}
                addLink={addLink}
            />
            <NewsFeedComponent
                removePost={this.removePost}
                user={user}
                posts={posts}
                getComments={this.getComments}
                newComment={this.newComment}
                handleComment={this.handleComment}
                comment={newComment}
                removeComment={this.removeComment}
                likePosts={this.likePosts}

            />
            <button ref="mas" style={{marginBottom:100}} onClick={this.askForMore} >Cargar más</button>  
            </div>
            
        );
    }
}

NFContainer.propTypes = {
    own: PropTypes.bool.isRequired,
    tipo: PropTypes.string.isRequired, 
    groupId: PropTypes.string,
    eventId: PropTypes.string,
}

NFContainer.defaultProps = {
    own: false,
    tipo: "PERSONAL"
}

export default NFContainer;