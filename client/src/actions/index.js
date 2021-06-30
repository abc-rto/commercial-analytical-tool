import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR, DASHBOARD_GET_DATA } from './types'

/*
ActionCreators -> create/return Actions ({ }) -> dispatched -> middlewares -> reducers
*/

export const signUp = data => {
    /*
        Step 1) Use the data and to make HTTP request to our BE abd send it along [x]
        Step 2) Take BE response (jwtToken is hee now!) [x]
        Step 3) Dispatch 'user just signed up' (with jwtToken)[x]
        Step 4) Save the jwtToken into our localStorage[x]
    */

    return async dispatch => {
        try {
            console.log('[ActionCreator] signUp called!');
            const res = await axios.post('http://localhost:5001/users/signup', data);

            console.log('[ActionCreator] signUp dispatched an action!');
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['authorize'] = res.data.token;;

        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
        }


    };
}

export const signIn = data => {
    /*
         Step 1) Use the data and to make HTTP request to our BE abd send it along [x]
         Step 2) Take BE response (jwtToken is hee now!) [x]
         Step 3) Dispatch 'user just signed up' (with jwtToken)[x]
         Step 4) Save the jwtToken into our localStorage[x]
     */

    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5001/users/signin', data);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['authorize'] = res.data.token;
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email and password combination is not valid'
            })
        }
    };
}

export const getSecret = () => {
    return async dispatch => {
        try {
            console.log('[ActionCreator] Trying to get BE\'s secret!');
            const res = await axios.get('http://localhost:5001/users/secret');
            console.log('res', res);

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })

        } catch (error) {
            console.error('error', error);
        }
    }
}

    export const signOut = () => {
        return dispatch => {
            localStorage.removeItem("JWT_TOKEN");
            axios.defaults.headers.common['authorize'] = '';
            dispatch({
                type: AUTH_SIGN_OUT,
                payload: ''
            });

        };
    }

    export const getInverterData = () => {
        return async dispatch => {
            try {
                const res = await axios.get('http://localhost:5001/post/inverters').then(res => res.data);
                //const dataPromise = res.then((response) => response.data)
                //console.log(res);
                //console.log('ID: ', res[0].id, 'Name: ', res[0].name);
                // res.forEach(element => {
                //     result.push(element);
                // });
                //console.log(res);
    
                dispatch({
                    type: DASHBOARD_GET_DATA,
                    payload: res
                })
    
                return res;
    
            } catch (error) {
                console.error('error', error);
            }
        }
    }