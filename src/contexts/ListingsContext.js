import React, { createContext, useReducer } from 'react'
import ListingsReducer from './ListingsReducer'
import state from './state'

const initialState = state

// create context
export const ListingsContext = createContext(initialState)

// provider component
export const ListingsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ListingsReducer, initialState)

    // actions
    function removeListing(id) {
        dispatch({
            type: 'REMOVE_LISTING',
            payload: id
        })
    }

    function addListing(listing) {
        dispatch({
            type: 'ADD_LISTING',
            payload: listing
        })
    }

    return (
        <ListingsContext.Provider value={{
            listings: state.listings,
            removeListing,
            addListing
        }}>
            {children}
        </ListingsContext.Provider>)
}