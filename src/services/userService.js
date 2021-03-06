//const baseUrl = 'http://localhost:3000/auth/';
//const baseUrl = 'https://concamin.herokuapp.com/auth/';
//const baseUrl = 'http://localhost:3000/auth/';
const baseUrl = 'https://murmuring-beach-52120.herokuapp.com/auth/'





export function deleteSkill(skill){
    return fetch(baseUrl + 'skills/' + skill._id, {
        method:'DELETE',
        headers:{
            'Authorization': retrieveToken(),
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(skill=>{
        return skill;
    });
}

export function getSkills(user){
    return fetch(baseUrl + 'skills/' + user._id, {
        headers:{
            'Authorization': retrieveToken()
        }
    })
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(skills=>{
        return skills;
    });
}

export function saveSkill(skill){
    console.log(skill)
    return fetch(baseUrl + 'skills/', {
        method:'post',
        body: JSON.stringify(skill),
        headers:{
            'Authorization': retrieveToken(),
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(skill=>{
        return skill;
    });
}




export function getPublicUser(id){
    return fetch(baseUrl + 'users/' + id, {
        headers:{
            'Authorization': retrieveToken()
        }
    })
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(user=>{
        return user;
    });
}

export function updateUser(user){
    const form = new FormData();
    for(let key in user){
        form.append(key, user[key]);
    }
    return fetch(baseUrl + 'profile', {
        method:'post',
        body:form,
        headers:{
            "Authorization": retrieveToken(),
            //"Content-Type" : "application/json"
        }

    })
    .then(res=>{
        console.log(res)
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(user=>{
        localStorage.setItem('user', JSON.stringify(user))
        return user;
    });
}

export function getLoggedUser(){
    //return fetch(baseUrl + 'logged',{credentials:'include'})
    return fetch(baseUrl + 'logged',{
        headers:{
            'Authorization': retrieveToken()
        }
    })
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(user=>{
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user))
        return user;
    });
}

export function login(auth){
    console.log(auth)
    return fetch(baseUrl + 'login',{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(auth),
        //credentials:'include'
    })
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(data=>{
        console.log(data);
        saveUser(data);
        return data.user;
    });
}

export function signup(user){
    return fetch(baseUrl + 'signup',{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":retrieveToken()
        },
        body:JSON.stringify(user),
        //credentials:'include'
    })
    .then(res=>{
        console.log(res)
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(data=>{
        //console.log(data.user);
        saveUser(data);
        return data.user;
    });
}

export const saveUser = (data)=>{
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
}

export const retrieveToken = ()=>{
    return localStorage.getItem('token');
}



