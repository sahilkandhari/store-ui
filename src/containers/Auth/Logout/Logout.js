import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import axios from 'axios'

class Logout extends Component {
    componentDidMount () {
        const header = {'Authorization' : 'Bearer ' + this.props.authToken}
        axios.post('http://localhost:4000/api/users/logoutAll', null, {headers: header})
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.props.removeToken()
    }
    render() {
        return <Redirect to="/"/>
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token
    }
}

const mapDispachToProps = dispatch => {
    return {
        removeToken: () => dispatch(actions.removeToken())
    }
}

export default connect(mapStateToProps,mapDispachToProps)(Logout)