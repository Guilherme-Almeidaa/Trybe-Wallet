// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PASSWORD = 'ADD_PASSWORD';

export const emailSave = (email) => ({ type: ADD_EMAIL, email });
export const passwordSave = (pass) => ({ type: ADD_PASSWORD, pass });

export const GET_CURRENCE = 'GET_CURRENCES';
export const REQUEST_CURRENCE = 'REQUEST_CURRENCES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const getCurrences = (json) => ({ type: GET_CURRENCE, payload: json });
const requestCurrences = () => ({ type: REQUEST_CURRENCE });
const failedRequest = (error) => ({ type: FAILED_REQUEST, payload: error })


export const fetchCurrences = () => {
    return async (dispatch) => {
        try {
            dispatch(requestCurrences())
            const fetchCurrence = await fetch('https://economia.awesomeapi.com.br/json/all')
            const currenceJson = await fetchCurrence.json();
            dispatch(getCurrences(currenceJson))
        } catch (error) {
            dispatch(failedRequest(error))
        }
    }

}

export const SAVE_EXPENES = 'SAVE_EXPENES'

export const saveExpenses = (expense) => ({ type: SAVE_EXPENES, expense })

export const SUM_EXPENSE = "SUM_EXPENSE";

export const sumExpense = (sum) => ({type:SUM_EXPENSE , sum });


