import React,{Component} from 'react';
import axios from 'axios';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password : '',
            successMessage: null,
            //token: Buffer.from(`${this.state.username}:${this.state.password}`, 'utf8').toString('base64') 
        }; 

        // If from some resom i do not want to use fat arrow function i'll be needed to concect those functions to this like here:
        // this.handleUserNameChange = this.handleUserNameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }  
        //handle change events
        handleSubmitevents = (e) => {
                e.preventDefault();
                const payload = JSON.stringify({
                    "username":this.state.username,
                    "password":this.state.password,
                })
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                  };

                axios.get('http://localhost:56181/api/CustomerFacadeApiController/GetAllMyFlights', payload, {headers: 
                {"Access-Control-Allow-Origin": "*", 'Content-type': 'application/json',
                'Authorization': `Basic`}}
                )
                    .then(function (response) {
                        if(response.status === 200){
                            console.log(response.data)

                            // setState(prevState => ({
                            //      ...prevState,
                            //      'successMessage' : 'Login successful. Redirecting to home page..'
                            // }))
                            //  localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                            //  redirectToHome();
                            //  props.showError(null)
                        }
                        else if(response.code === 204){
                            this.props.showError("Username and password do not match");
                        }
                        else{
                            this.props.showError("Username does not exists");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        }
        handlePasswordChange=(event)=>{
          this.setState({password: event.target.value});
           console.log("Password: " + this.state.password);
        }
        
        handleUserNameChange=(event)=>{
            this.setState({username: event.target.value});
            console.log("UserName: " + this.state.username );
        }
    render(){
return(
    <div className=" TestLoginForm ">
        <form onSubmit={this.handleSubmitevents}>
        {
        //handle error condition
        }
        <label>User Name</label>
        <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserNameChange} />
        <label>Password</label>
        <input type="password" data-test="password" value={this.state.password } onChange={this.handlePasswordChange} />
        <input type="submit" value="Log In" data-test="submit" />
        </form>
    </div>
        );
    }
}