import React from 'react'
// @ts-ignore
import { PageHeader } from 'vtex.styleguide'

const Header = () => {

    return (
        <header className="profile-header">
            <div className="db">
                <PageHeader
                    title='Dados de Cadastro'
                    linkLabel='Voltar'
                    onLinkClick={() => {
                        window.location.hash = '/'
                    }}
                />
            </div>
        </header>
    )
}

export default Header