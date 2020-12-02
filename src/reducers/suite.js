const INITIAL_STATE = []

export default function count(userAction = INITIAL_STATE, action) {
    switch(action.type) {
        case 'EBAY':
            return [...userAction, 'ebay']

        case 'BANKING':
            return [...userAction, 'banking']

        case 'ISLAMIC':
            return [...userAction, 'islamic']
    
        default:
            return userAction;
    }
}