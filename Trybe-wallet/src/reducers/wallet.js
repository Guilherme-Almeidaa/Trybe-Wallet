import { GET_CURRENCE, REQUEST_CURRENCE, FAILED_REQUEST, SAVE_EXPENES, SUM_EXPENSE } from '../actions/index'

const initialState = {
    currencies: [],
    expenses: [],
    isFetching: false,
    sumExpenses: 0,
}

const wallet = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CURRENCE:
            return { ...state, isFetching: true };
        case GET_CURRENCE:
            return { ...state, isFetching: false, currencies: action.payload };
        case FAILED_REQUEST:
            return { ...state, isFetching: false, currencies: action.payload };
        case SAVE_EXPENES:
            return { ...state, expenses: [...state.expenses, action.expense] };
        case SUM_EXPENSE:
            return { ...state, sumExpenses: action.sum }
        default:
            return state;
    }
}

export default wallet;
