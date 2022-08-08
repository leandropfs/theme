import msk from 'msk'

export const mask = (value:string|undefined, mask:string|null) => {
    if (mask && value) {
        switch (mask) {
            case 'phone':
                value = value.replace('+55', '')
                value = value.replace(/\D/g, '')
                return msk.fit(value, value.length > 10 ? '(99) 99999-9999' : '(99) 9999-9999')
            case 'cpf':
                return msk.fit(value, '999.999.999-99')
            case 'cnpj':
                return msk.fit(value, '99.999.999/9999-99')
            case 'date':
                return msk.fit(value, '99/99/9999')
            case 'onlyNumber':
                return msk.fit(value, '999999999999999999999999999999999')
            default:
                return value
        }
    }
    return value
}