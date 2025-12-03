
import { type LaunchType } from "../types";

type State = {
    launches: LaunchType[]
    error: string | null
}

type Action = 
    | { type: 'SET_LAUNCHES_SUCCESS'; payload: LaunchType[] }
    | { type: 'SET_LAUNCHES_ERROR'; payload: string }


const initialStateLaunch = {
    launches: [],
    error: null,
    isModalOpen: false,
    selectedLaunch: null
}

const launchReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_LAUNCHES_SUCCESS': {
            return {
                ...state, 
                launches: action.payload,
                error: null
            }
        }
        case 'SET_LAUNCHES_ERROR': {
            return {
                ...state,
                error: action.payload
            }
        }
        default: 
            return state
    }
}

export { launchReducer, initialStateLaunch }