import React from 'react';
import './Login.css';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from '../../assets/aniver.png';
import {Link} from 'react-router-dom';

export const LoginDisplay = ({onSubmit, changeToSignup}) => {


    return (
        <div className='login'>

            <div className="menu" style={{color:"white", position:"fixed"}}>
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
                <div className="box_men">
                    <hr className="line"/>
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                </div>
            </div>

            <div className="login_box">
        <form onSubmit={onSubmit}>
             <Paper style={{width:"300px", padding:" 4% 2%", heigth:"auto"}}>
                    <div className="circle_login">
                        <img src={logo} alt=""/>
                    </div>
                 <h3>Bienvenido</h3>
                 <div style={{marginLeft:"30px", color:"#808080 !important"}}>
                     <Grid container spacing={8} alignItems="flex-end" >
                         <Grid item>
                             <AccountCircle />
                         </Grid>
                         <Grid item>
                             <TextField name="email" label="Email" />
                         </Grid>
                     </Grid>
                     <Grid container spacing={8} alignItems="flex-end">
                         <Grid item>
                             <AccountCircle />
                         </Grid>
                         <Grid item>
                             <TextField type="password" name="password" label="Password" />
                         </Grid>
                     </Grid>
                     <br/>

                 </div>
                 <button className="btn_login" type={"submit"} >
                     Login
                 </button>

                <p>¿Aún no tienes cuenta? registrate <a href="#!" onClick={changeToSignup}><strong style={{textDecoration:"underline", color:"#648943"}}>aquí</strong></a></p>
             </Paper>
             </form>
            </div>
        </div>
    )
}