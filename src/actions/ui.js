import { types } from "../types/types"


export const uiOpendModal = () => {
    return {
        type: types.uiOpenModal,
    }
}

export const uiClosedModal = () => {
    return {
        type: types.uiCloseModal,
    }
}