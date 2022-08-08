import React, {
    createContext,
    useState,
    useEffect,
    FormEvent
} from 'react'
import { useQuery } from 'react-apollo'
// @ts-ignore
import profileEmail from '../../../graphql/profileEmail.gql'
import { ProviderData, ProviderProps, formFields } from '../typings/myAccount-profile'
import { mask } from '../utils/mask'
import { onlyNumbers, arrayToSelect, scrollTo} from '../utils/miscellaneous'

export const customerTypePF = [
    'Cirurgião Dentista',
    'Estudante',
    'Protético',
    'Biomédico',
    'Médico',
    'Farmacêutico',
    'Enfermeiro'
]
type customerTypePF = typeof customerTypePF[number]
  
export const corporateCustomerTypeOptions = [
    'Clínica Odontológica',
    'Laboratório de Prótese',
    'Clínica Estética',
    'Clínica Médica'
]
type corporateCustomerTypeOptions = typeof corporateCustomerTypeOptions[number]

export const genderOptions = [
    'Masculino',
    'Feminino'
]
type genderOptions = typeof genderOptions[number]
  
export const specialty = [
    'Acupuntura',
    'Cirurgia e Traumatologia Buco-Maxilo-Facial',
    'Clínica Geral',
    'Dentística',
    'Disfunção Temporomandibular e Dor Orofacial',
    'Endodontia',
    'Estomatologia',
    'Harmonização Orofacial',
    'Homeopatia',
    'Implantodontia',
    'Odontogeriatria',
    'Odontologia do Esporte',
    'Odontologia Legal e do Trabalho',
    'Odontologia para Pacientes com Necessidades Especiais',
    'Odontopediatria',
    'Ortodontia',
    'Ortopedia Funcional dos Maxilares',
    'Patologia Oral e Maxilo Facial',
    'Periodontia',
    'Prótese Buco-Maxilo-Facial',
    'Prótese Dentária',
    'Radiologia',
    'Saúde Coletiva'
]
type specialty = typeof specialty[number]
  
export const uf = [ 'AC' , 'AL' , 'AP' , 'AM' , 'BA' , 'CE' , 'DF' , 'ES' , 'GO' , 'MA' , 'MT' , 'MS' , 'MG' , 'PA' , 'PB' , 'PR' , 'PE' , 'PI' , 'RJ' , 'RN' , 'RS' , 'RO' , 'RR' , 'SC' , 'SP' , 'SE' , 'TO' ]
type uf = typeof uf[number]
  
export const universitySemester = [
    '1º Semestre',
    '2º Semestre',
    '3º Semestre',
    '4º Semestre',
    '5º Semestre',
    '6º Semestre',
    '7º Semestre',
    '8º Semestre',
    '9º Semestre',
    '10º Semestre'
]
type universitySemester = typeof universitySemester[number]
  
export const universityEndOptions = [
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030'
]
type universityEndOptions = typeof universityEndOptions[number]

const getProfileData = (email: string, fields: string) => {
    return fetch(`/api/io/safedata/CL/search/?_fields=${fields}&_where=email=${email}`)
    .then( response => {
        if (response.status == 404) {
            throw new Error('new customer');
        }
        return response.json()
    }).then(
        (result) => {
            return result;
        }
    )
}

export const patchProfileData = async (entity:string, form:formFields, id:string|undefined) => {

   let url = `/safedata/${entity}/documents/${id}`

   let response = await fetch(url, {
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
       },
       method: 'PATCH',
       body: JSON.stringify(form)
    })
    return response
}

export const Context = createContext({} as ProviderData)

export const ContextProvider = ({children} : ProviderProps) => {

    const { data } = useQuery(profileEmail);
    const [fields, setFields] = useState <formFields>({
        id: '',
        userId: '',
        email: '',
        isCorporate: false,
        customerType: '',
        firstName: '',
        lastName: '',
        corporateName: '',
        tradeName: '',
        gender: '',
        birthDate: '',
        document: '',
        regionalDocument: '',
        regionalDocumentState: '',
        corporateDocument: '',
        stateInscription: '',
        professionalDocument: '',
        professionalDocumentState: '',
        specialty: '',
        secondSpecialty: '',
        university: '',
        universityCampus: '',
        universityEnrollment: '',
        universityClass: '',
        universitySemester: '',
        universityEnd: '',
        homePhone: '',
        cellPhone: '',
        whatsapp: ''
    })
    const [isGetLoading, setIsGetLoading] = useState(true)
    const [isPatchSucceed, setIsPatchSucceed] = useState(false)
    const [isPatchError, setIsPatchError] = useState(false)
    const [isPatchLoading, setIsPatchLoading] = useState(false)

    const updateSate = (field:formFields) => {
        setFields( state => ({...state, ...field}) )
    }
    
    const handleOnChange = (e:FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const newValue = e.currentTarget.getAttribute('data-mask') ? mask(value, e.currentTarget.getAttribute('data-mask')) : value
        updateSate({[e.currentTarget.name]: newValue})
    }

    const handleOnChangeIsent  = (e:FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked
        const newValue = value ? 'ISENTO' : ''
        updateSate({['stateInscription']: newValue})
    }

    const onSubmit = async (data:object) => {
        onSubmitStart()
        const patchFields = unmaskFields(data)
        const response =  await patchProfileData('CL', patchFields, fields.id)
        response.status == 200 ? onSubmitSucceed() : onSubmitError()
    }

    const onSubmitStart = () => {
        setIsPatchLoading(true)
        setIsPatchSucceed(false)
        setIsPatchError(false)
    }

    const onSubmitSucceed = () => {
        setIsPatchLoading(false)
        setIsPatchSucceed(true)
        scrollTo(100)
    }

    const onSubmitError = () => {
        setIsPatchLoading(false)
        setIsPatchError(true)
        scrollTo(100)
    }

    const maskFields = (data:formFields) => {
        const maskedFields = data
              maskedFields.document = mask(data.document, 'cpf')
              maskedFields.corporateDocument = mask(data.corporateDocument, 'cnpj')
              maskedFields.stateInscription = data.stateInscription == undefined ? 'ISENTO' : data.stateInscription
              maskedFields.homePhone = mask(data.homePhone, 'phone')
              maskedFields.cellPhone = mask(data.cellPhone, 'phone')
              maskedFields.whatsapp = mask(data.whatsapp, 'phone')
              if (data.birthDate) {
                var date = new Date(data.birthDate)
                maskedFields.birthDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
              }
          
        return maskedFields
    }

    const unmaskFields = (data:formFields) => {
        const unmaskFields = data
              unmaskFields.document = onlyNumbers(data.document)
              unmaskFields.corporateDocument = onlyNumbers(data.corporateDocument)
              unmaskFields.stateInscription = data.stateInscription == 'ISENTO' ? '' : data.stateInscription
              unmaskFields.homePhone = `+55${onlyNumbers(data.homePhone)}`
              unmaskFields.cellPhone = onlyNumbers(data.cellPhone)
              unmaskFields.whatsapp = onlyNumbers(data.whatsapp)

              if (data.birthDate?.length == 10) {
                const splitedDate = data.birthDate.split('/')
                const date = new Date(`${splitedDate[1]}/${splitedDate[0]}/${splitedDate[2]}`)
                unmaskFields.birthDate = date.toISOString()
              } else {
                unmaskFields.birthDate = null
              }
            
        delete unmaskFields['userId']
        delete unmaskFields['email']
          
        return unmaskFields
    }

    useEffect(() => {
        if(data != undefined){
            getProfileData( data.profile.email, Object.keys(fields).join(',') ).then( info => {
                const fields = maskFields(info[0])
                setFields( fields )
                setIsGetLoading(false)
            })
        }
    }, [data])

    return (
        <Context.Provider value={{ fields, isGetLoading, isPatchLoading, isPatchSucceed, isPatchError, arrayToSelect, handleOnChange, handleOnChangeIsent, onSubmit }}>
            {children}
        </Context.Provider>
    )
}

