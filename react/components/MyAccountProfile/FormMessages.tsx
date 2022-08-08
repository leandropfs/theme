import React, { useContext } from 'react'
import { Context } from './contexts/MyAccountProfileContext';
// @ts-ignore
import { Alert } from 'vtex.styleguide'

const FormMessages = () => {

    const { isPatchSucceed, isPatchError } = useContext(Context)

    return (
        <>
            { isPatchSucceed && (
                <div className="pa6">
                    <Alert type='success'>
                        Cadastro atualizado com sucesso!
                    </Alert>
                </div>
            )} 
            { isPatchError && (
                <div className="pa6">
                    <Alert type='error'>
                        Um erro inesperado aconteceu, por favor tente novamente mais tarde!
                    </Alert>
                </div>
            )} 
        </>
    )
}

export default FormMessages