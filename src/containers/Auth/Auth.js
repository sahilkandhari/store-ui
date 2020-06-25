import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import axios from 'axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                signIn:true
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                signIn:true
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                signIn:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                signIn:false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                signIn:false
            },
        },
        isSignUp : true,
        loading : false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.isSignUp) {
            this.setState({loading: true})
            const signUpForm = {
                email : this.state.controls.email.value, 
                password: this.state.controls.password.value,
                name: this.state.controls.name.value,
                address: {
                    street: this.state.controls.value,
                    city:this.state.controls.city.value
                }
            }
            axios.post('http://localhost:4000/api/users', signUpForm)
            .then((res) => {
                console.log(res.data)
                this.props.addToken(res.data.token, res.data.user._id)
                this.setState({loading: false})
            })
            .catch(err => console.log(err))
            this.setState({loading: false})
        }
        else{
            this.setState({loading: true})
            axios.post('http://localhost:4000/api/users/login', {email : this.state.controls.email.value, 
                                                                password: this.state.controls.password.value})
            .then((res) => {
                console.log(res.data)
                this.props.addToken(res.data.token, res.data.user._id)
                this.setState({loading: false})
              })
            .catch(error => console.log(error.error))
            this.setState({loading: false})
        }
        
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render () {
        let formElementsArray = [];
        for ( let key in this.state.controls ) {
            if(this.state.isSignUp) {
                    formElementsArray.push( {
                        id: key,
                        config: this.state.controls[key]
                    })
                }else if(!this.state.isSignUp){
                    if(this.state.controls[key].signIn) {  
                         formElementsArray.push( {
                                id: key,
                                config: this.state.controls[key]
                     })
                    }
                }
            } 
          

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if(this.state.loading) {
            form = <Spinner /> 
        }
        let authRedirect = null
        if(this.props.isAuth) {
            authRedirect = <Redirect to="/"/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                {this.state.isSignUp ? <p style={{fontWeight: "bold"}}>Already have an account?</p> : null}
                <Button clicked={this.switchAuthModeHandler} 
                btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        id: state.auth.id,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToken: (token,id) => dispatch(actions.addToken(token,id)),
        removeToken: () => dispatch(actions.removeToken())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Auth,axios));