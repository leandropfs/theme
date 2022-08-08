import React, { useContext } from 'react'
import { Context } from './contexts/MyAccountProfileContext';
// @ts-ignore
import { Spinner } from 'vtex.styleguide'
import FormMessages from './FormMessages';
import FormPF from './FormPF'
import FormPJ from './FormPJ'

const Form = () => {

    const { fields, isGetLoading } = useContext(Context)

    return (
        <>
        { isGetLoading ? (
            <div className="c-muted-1" style={{textAlign: 'center'}}>
                <Spinner color='currentColor' size={40} />
            </div>
        ) : (
            <>
                <FormMessages />
                { fields.isCorporate ? (
                    <FormPJ />
                ) : (
                    <FormPF />
                )}
            </>
        )}
        </>
    )
}

export default Form