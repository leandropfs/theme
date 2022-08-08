export interface ProviderData {
    fields: formFields;
    isGetLoading: boolean;
    isPatchLoading: boolean;
    isPatchSucceed: boolean;
    isPatchError: boolean;
    arrayToSelect: (array:string[]) => void;
    handleOnChange: (e:FormEvent<HTMLInputElement>) => void;
    handleOnChangeIsent: (e:FormEvent<HTMLInputElement>) => void;
    onSubmit: (data:object) => void;
}

export interface ProviderProps {
    children: ReactNode
}

export interface formFields {
    id?: string,
    userId?: string,
    email?: string,
    isCorporate?: boolean,
    firstName?: string,
    lastName?: string,
    corporateName?: string,
    tradeName?: string,
    gender?: string,
    birthDate?: string | null,
    document?: string,
    regionalDocument?: string,
    regionalDocumentState?: string,
    corporateDocument?: string,
    stateInscription?: string,
    customerType?: customerTypePF | corporateCustomerTypeOptions | '',
    professionalDocument?: string | '',
    professionalDocumentState?: uf | '',
    specialty?: specialty | '',
    secondSpecialty?: specialty | '',
    university?: string | '',
    universityCampus?: string | '',
    universityEnrollment?: string | '',
    universityClass?: string | '',
    universitySemester?: universitySemester | '',
    universityEnd?: universityEnd | '',
    homePhone?: string,
    cellPhone?: string,
    whatsapp?: string
}