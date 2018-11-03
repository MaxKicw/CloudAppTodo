import * as actionTypes from './actionTypes';

const initialState = {
    objects:[],
    value:'',
    token:'',
    username:'',
    sign:"halllo",
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.GET_ALL_DATA:
        return{
            ...state,
            objects: action.objects,
        }
        default:
        break;
        case actionTypes.CLEAR_INPUT_FIELD:
        return{
            ...state,
            value: '',
        }
        case actionTypes.FILL_INPUT_FIELD:
        return{
            ...state,
            value: action.txt,
        }
        case actionTypes.SET_TOKEN:
        return{
            ...state,
            token: action.token,
            username: action.username,
        }
    }
    return state;
}

export default reducer;