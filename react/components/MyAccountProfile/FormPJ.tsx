import React, { useContext } from 'react'
import { Context, corporateCustomerTypeOptions } from './contexts/MyAccountProfileContext';
// @ts-ignore
import { Input, Dropdown, Button } from 'vtex.styleguide'
import { useForm } from 'react-hook-form'
import { validateCNPJ, validatePhone } from './utils/validators'

const FormPJ = () => {

    const { fields, isPatchLoading, arrayToSelect, handleOnChange, handleOnChangeIsent, onSubmit } = useContext(Context)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: fields
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ph3 ph6-ns">
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Input
                        label='Razão Social*'
                        {...register('corporateName', { required: 'Campo Obrigatório' })}
                        errorMessage={errors.corporateName?.message}
                    />
                </div>
                <div className="pa3 w-50-ns">
                    <Input
                        label='Nome Fantasia*'
                        {...register('tradeName', { required: 'Campo Obrigatório' })}
                        errorMessage={errors.tradeName?.message}
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto" style={{position: 'relative'}}>
                    <Input
                        label='Inscrição Estadual'
                        {...register('stateInscription', { required: 'Campo Obrigatório' })}
                        value={fields.stateInscription}
                        dataAttributes={{'mask': 'onlyNumber'}}
                        onChange={handleOnChange}
                        disabled={fields.stateInscription == 'ISENTO'}
                        errorMessage={errors.stateInscription?.message}
                    />
                    <label style={{position: 'absolute', right: '30px', top: '53%'}}><input type='checkbox' defaultChecked={fields.stateInscription == 'ISENTO'} onChange={handleOnChangeIsent} /> Isento</label>
                </div>
                <div className="pa3 w-50-ns">
                    <Input
                        label='CNPJ'
                        {...register(
                            'corporateDocument', 
                            { 
                                required: 'Campo Obrigatório',
                                validate: {
                                    cnpj: (value) => validateCNPJ(value)
                                }
                            }
                        )}
                        value={fields.corporateDocument}
                        dataAttributes={{'mask': 'cnpj'}}
                        onChange={handleOnChange}
                        errorMessage={ errors.corporateDocument && (errors.corporateDocument?.type === 'cnpj' ? 'O CNPJ digitado é inválido' : errors.corporateDocument?.message) }
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Dropdown
                        label='Área de Atuação*'
                        options={ arrayToSelect(corporateCustomerTypeOptions) }
                        value={fields.customerType}
                        {...register('customerType', { required: 'Campo Obrigatório' })}
                        onChange={handleOnChange}
                        errorMessage={errors.customerType?.message}
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Input
                        label='Nome do Contato*'
                        {...register('firstName', { required: 'Campo Obrigatório' })}
                        errorMessage={errors.firstName?.message}
                    />
                </div>
                <div className="pa3 w-50-ns">
                    <Input
                        label='Sobrenome do Contato*'
                        {...register('lastName', { required: 'Campo Obrigatório' })}
                        errorMessage={errors.lastName?.message}
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Input
                        name='email'
                        label='Email*'
                        value={fields.email}
                        readOnly
                        disabled
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Input
                        label='Telefone de Contato*'
                        {...register(
                            'homePhone', 
                            { 
                                required: 'Campo Obrigatório',
                                validate: {
                                    homePhone: (value) => validatePhone(value)
                                }
                            }
                        )}
                        value={fields.homePhone}
                        dataAttributes={{'mask': 'phone'}}
                        onChange={handleOnChange}
                        errorMessage={ errors.homePhone && (errors.homePhone?.type === 'phone' ? 'O telefone digitado é inválido' : errors.homePhone?.message) }
                    />
                </div>
                <div className="pa3 flex-auto">
                    <Input
                        label='Celular*'
                        {...register(
                            'cellPhone', 
                            { 
                                required: 'Campo Obrigatório',
                                validate: {
                                    cellPhone: (value) => validatePhone(value)
                                }
                            }
                        )}
                        value={fields.cellPhone}
                        dataAttributes={{'mask': 'phone'}}
                        onChange={handleOnChange}
                        errorMessage={ errors.cellPhone && (errors.cellPhone?.type === 'phone' ? 'O telefone digitado é inválido' : errors.cellPhone?.message) }
                    />
                </div>
                <div className="pa3 flex-auto">
                    <Input
                        label='WhatsApp*'
                        {...register(
                            'whatsapp', 
                            { 
                                required: 'Campo Obrigatório',
                                validate: {
                                    whatsAppPhone: (value) => validatePhone(value)
                                }
                            }
                        )}
                        value={fields.whatsapp}
                        dataAttributes={{'mask': 'phone'}}
                        onChange={handleOnChange}
                        errorMessage={ errors.whatsapp && (errors.whatsapp?.type === 'phone' ? 'O telefone digitado é inválido' : errors.whatsapp?.message) }
                    />
                </div>
            </div>
            <div className="pa3 flex-auto align-items-end">
                <Button 
                    variation='primary'
                    size='large'
                    type='submit'
                    isLoading={isPatchLoading}
                    disabled={isPatchLoading}
                >
                    Salvar
                </Button>
            </div>
        </form>
    )
}

export default FormPJ