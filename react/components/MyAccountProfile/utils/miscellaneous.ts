export const onlyNumbers = (value: string|undefined) => {
    return value?.replace(/\D+/g, '')
}

export const arrayToSelect = (array:string[]) => {
    return array.map( value => {
        return ({ value: value, label: value })
    })
}

export const scrollTo = (value:number|undefined) => {
    const distanceToTop = value == undefined ? 0 : value
    window.scrollTo({
        top: distanceToTop,
        behavior: 'smooth',
    })
} 