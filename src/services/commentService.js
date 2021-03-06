import {retrieveToken} from "./userService";

//const baseUrl = 'http://localhost:3000/comments/';
//const baseUrl = 'https://concamin.herokuapp.com/comments/';
const baseUrl = 'https://murmuring-beach-52120.herokuapp.com/auth/'

export function addComment(comment){

    return fetch(baseUrl, {
        method:'post',
        body:JSON.stringify(comment),
        //credentials:'include',
        headers:{
            "Authorization": retrieveToken(),
            "Content-Type": "application/json"
        }
    })
        .then(res=>{
            if(!res.ok){
                console.log(res);
                return Promise.reject(res.json())
            }
            return res.json();
        })
        .then(item=>{
            return item;
        })
}

export function getPostComments(postId, skip=0){
    return fetch(baseUrl + `?post=${postId}&skip=${skip}`, {
        method:'get',
        headers:{
            'Authorization': retrieveToken()
        }
    })
    .then(res=>{
        if(!res.ok){
            console.log(res)
            return Promise.reject(res.json())
        }
        return res.json()
    })
        .then(comments=>{
            return comments;
        })

}


export function editComment(comment){

}


export function deleteComment(cId){
    return fetch(baseUrl+cId, {
        method:'DELETE',
        headers:{
            'Authorization': retrieveToken()
        }
    }).then(res=>{
        if(!res.ok){
            console.log(res)
            return Promise.reject(res.json())
        }
        return res.json()
    }).then(item=>{
        return item
    })
}