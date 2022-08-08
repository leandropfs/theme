import React, { useContext } from 'react'
import { Context, customerTypePF, genderOptions, uf, universitySemester, universityEndOptions, specialty } from './contexts/MyAccountProfileContext';
// @ts-ignore
import { Input, Dropdown, Button } from 'vtex.styleguide'
import { useForm } from 'react-hook-form'
import { validatePhone, validateCPF } from './utils/validators'

const FormPF = () => {

    const { fields, isPatchLoading, arrayToSelect, handleOnChange, onSubmit } = useContext(Context)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: fields
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ph3 ph6-ns">
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Input
                        label='Nome*'
                        {...register('firstName', { required: 'Campo Obrigatório' })}
                        errorMessage={errors.firstName?.message}
                    />
                </div>
                <div className="pa3 w-50-ns">
                    <Input
                        label='Sobrenome*'
                        {...register('lastName', { required: 'Campo Obrigatório' })}
                        errorMessage={errors.lastName?.message}
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 flex-auto">
                    <Input
                        label='CPF*'
                        {...register(
                            'document', 
                            { 
                                required: 'Campo Obrigatório',
                                validate: {
                                    cpf: (value) => validateCPF(value)
                                }
                            }
                        )}
                        value={fields.document}
                        dataAttributes={{'mask': 'cpf'}}
                        onChange={handleOnChange}
                        errorMessage={ errors.document && (errors.document?.type === 'cpf' ? 'O CPF digitado é inválido' : errors.document?.message) }
                    />
                </div>
                <div className="pa3 w-25-ns">
                    <Dropdown
                        label='Sexo*'
                        options={ arrayToSelect(genderOptions) }
                        value={fields.gender}
                        {...register('gender', { required: 'Campo Obrigatório' })}
                        onChange={handleOnChange}
                        errorMessage={errors.gender?.message}
                    />
                </div>
                <div className="pa3 w-25-ns">
                    <Input
                        label='Data de Nascimento*'
                        {...register('birthDate', { required: 'Campo Obrigatório' })}
                        value={fields.birthDate}
                        dataAttributes={{'mask': 'date'}}
                        onChange={handleOnChange}
                        errorMessage={errors.birthDate?.message}
                    />
                </div>
            </div>
            <div className="flex-ns flex-wrap">
                <div className="pa3 w-33-ns flex-auto">
                    <Input
                        label='RG*'
                        {...register( 'regionalDocument', {required: 'Campo Obrigatório'})}
                        value={fields.regionalDocument}
                        dataAttributes={{'mask': 'onlyNumber'}}
                        onChange={handleOnChange}
                        errorMessage={errors.regionalDocument?.message}
                    />
                </div>
                <div className="pa3 w-33-ns">
                    <Dropdown
                        label='RG Estado*'
                        options={ arrayToSelect(uf) }
                        value={fields.regionalDocumentState}
                        {...register('regionalDocumentState', { required: 'Campo Obrigatório' })}
                        onChange={handleOnChange}
                        errorMessage={errors.regionalDocumentState?.message}
                    />
                </div>
                <div className="pa3 w-33-ns">
                    <Dropdown
                        label='Profissão*'
                        options={ arrayToSelect(customerTypePF) }
                        value={fields.customerType}
                        {...register('customerType', { required: 'Campo Obrigatório' })}
                        onChange={handleOnChange}
                        errorMessage={errors.customerType?.message}
                    />
                </div>
            </div>
            { fields.customerType == "Cirurgião Dentista" && (
                <>
                    <div className="flex-ns flex-wrap">
                        <div className="pa3 flex-auto">
                            <Input
                                label='CRO*'
                                {...register('professionalDocument', { required: 'Campo Obrigatório' })}
                                errorMessage={errors.professionalDocument?.message}
                            />
                        </div>
                        <div className="pa3 w-30-ns">
                            <Dropdown
                                label='CRO Estado*'
                                options={ arrayToSelect(uf) }
                                value={fields.professionalDocumentState}
                                {...register('professionalDocumentState', { required: 'Campo Obrigatório' })}
                                onChange={handleOnChange}
                                errorMessage={errors.professionalDocumentState?.message}
                            />
                        </div>
                    </div>
                    <div className="flex-ns flex-wrap">
                        <div className="pa3 flex-auto">
                            <Dropdown
                                label='Especialidade'
                                options={ arrayToSelect(specialty) }
                                value={fields.specialty}
                                {...register('specialty')}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="pa3 w-30-ns">
                            <Dropdown
                                label='Outra Especialidade'
                                options={ arrayToSelect(specialty) }
                                value={fields.secondSpecialty}
                                {...register('secondSpecialty')}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                </>
            )}
            { fields.customerType == "Estudante" && (
                <>
                    <div className="flex-ns flex-wrap">
                        <div className="pa3 flex-auto">
                            <Input
                                label='Instituição de Ensino*'
                                {...register('university', { required: 'Campo Obrigatório' })}
                                errorMessage={errors.university?.message}
                            />
                        </div>
                        <div className="pa3 w-30-ns">
                            <Input
                                label='Campus*'
                                {...register('universityCampus', { required: 'Campo Obrigatório' })}
                                errorMessage={errors.universityCampus?.message}
                            />
                        </div>
                    </div>
                    <div className="flex-ns flex-wrap">
                        <div className="pa3 flex-auto">
                            <Input
                                label='Matrícula*'
                                {...register('universityEnrollment', { required: 'Campo Obrigatório' })}
                                errorMessage={errors.universityEnrollment?.message}
                            />
                        </div>
                        <div className="pa3 w-50-ns">
                            <Input
                                label='Turma*'
                                {...register('universityClass', { required: 'Campo Obrigatório' })}
                                errorMessage={errors.universityClass?.message}
                            />
                        </div>
                    </div>
                    <div className="flex-ns flex-wrap">
                        <div className="pa3 flex-auto">
                            <Dropdown
                                label='Semetre Atual*'
                                options={ arrayToSelect(universitySemester) }
                                value={fields.universitySemester}
                                {...register('universitySemester', { required: 'Campo Obrigatório' })}
                                onChange={handleOnChange}
                                errorMessage={errors.universitySemester?.message}
                            />
                        </div>
                        <div className="pa3 w-50-ns">
                            <Dropdown
                                label='Previsão de Conclusão*'
                                options={ arrayToSelect(universityEndOptions) }
                                value={fields.universityEnd}
                                {...register('universityEnd', { required: 'Campo Obrigatório' })}
                                onChange={handleOnChange}
                                errorMessage={errors.universityEnd?.message}
                            />
                        </div>
                    </div>
                </>
            )}
            { fields.customerType == 'Protético' || fields.customerType == 'Biomédico' || fields.customerType == 'Médico' || fields.customerType == 'Farmacêutico' || fields.customerType == 'Enfermeiro' ? (
                <>
                    <div className="flex-ns flex-wrap">
                        <div className="pa3 flex-auto">
                            <Input
                                label='Registro Profissional*'
                                {...register('professionalDocument', { required: 'Campo Obrigatório' })}
                                errorMessage={errors.professionalDocument?.message}
                            />
                        </div>
                        <div className="pa3 w-30-ns">
                            <Dropdown
                                label='Registro Profissional Estado*'
                                options={ arrayToSelect(uf) }
                                value={fields.professionalDocumentState}
                                {...register('professionalDocumentState', { required: 'Campo Obrigatório' })}
                                onChange={handleOnChange}
                                errorMessage={errors.professionalDocumentState?.message}
                            />
                        </div>
                    </div>
                </>
            ):(<></>)}
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
                        label="WhatsApp*"
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

export default FormPF