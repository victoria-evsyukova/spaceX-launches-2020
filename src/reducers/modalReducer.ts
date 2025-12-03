
import { type LaunchType } from "../types";

type State = {
    isModalOpen: boolean
    selectedLaunch: LaunchType | null
}

type Action = 
    | { type: 'OPEN_MODAL'; payload?: LaunchType}
    | { type: 'CLOSE_MODAL' }


const initialStateModal = {
    isModalOpen: false,
    selectedLaunch: null
}

const modalReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'OPEN_MODAL': {
            return {
                ...state,
                isModalOpen: true,
                selectedLaunch: action.payload || null
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                isModalOpen: false,
                selectedLaunch: null
            }
        }
        default: 
            return state
    }
}

export { modalReducer, initialStateModal }