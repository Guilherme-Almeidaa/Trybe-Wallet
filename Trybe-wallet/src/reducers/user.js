// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL, ADD_PASSWORD } from '../actions/index'
const initialState = {
    email: '',
    password: '',
}


const user = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMAIL:
            return { ...state, email: action.email };
        case ADD_PASSWORD:
            return { ...state, password: action.pass }
        default:
            return state
    }
}

export default user;