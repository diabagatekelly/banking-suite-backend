const INITIAL_STATE = {isLogged : false}

export default function count(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'AUTH':
            return {...state, isLogged: true}

        case 'UNAUTH':
            return {...state, isLogged: false}
    
        default:
            return state;
    }
}