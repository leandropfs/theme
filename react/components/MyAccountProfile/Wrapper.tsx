import React from 'react'
import Form from './Form'
import Header from './Header'
import { ContextProvider } from './contexts/MyAccountProfileContext'

const Wrapper = () => {
    return (
        <ContextProvider>
            <Header />
            <Form />
        </ContextProvider>
    )
}

export default Wrapper