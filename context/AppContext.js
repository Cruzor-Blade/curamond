import React, {createContext, useState} from 'react';

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [currentTopic, setCurrentTopic] = useState('');
    const [numStars, setNumStars] = useState('')
    return (
        <AppContext.Provider
        value={{
        currentTopic,
        numStars,
        setCurrentTopic,
        setNumStars
    }}
        >
            {children}
        </AppContext.Provider>
    )
}