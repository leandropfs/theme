const EMAIL_REGEX = /^[A-z0-9"+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/
const PHONE_REGEX = /([0-9]|\(|\)|\+| |-)+/

export function validateEmail(email: string|undefined) {
  return email ? EMAIL_REGEX.test(email) : false
}

export function validatePhone(phone: string|undefined) {
  return phone ? PHONE_REGEX.test(phone) : false
}

export function validateCPF(value: string|undefined) {
    if (typeof value !== 'string') {
        return false;
    }

    value = value.replace(/[\s.-]*/igm, '')
    if (
        !value ||
        value.length != 11 ||
        value == '00000000000' ||
        value == '11111111111' ||
        value == '22222222222' ||
        value == '33333333333' ||
        value == '44444444444' ||
        value == '55555555555' ||
        value == '66666666666' ||
        value == '77777777777' ||
        value == '88888888888' ||
        value == '99999999999' 
    ) {
        return false
    }
  
    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
        return false;
    }

    const values = value.split('').map(el => +el);
    const rest = (count: number) => (values.slice(0, count-12).reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10;

    return rest(10) === values[9] && rest(11) === values[10];
}

export function validateCNPJ(value: string|undefined) {
    if (!value) return false
  
    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
  
    // Elimina valor em formato inválido
    if (!validTypes) return false
  
    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (value.length > 18) return false
  
      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(value)
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
  
      // Se o formato é válido, usa um truque para seguir o fluxo da validação
      if (digitsOnly || validFormat) true
      // Se não, retorna inválido
      else return false
    }
  
    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []
  
    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false
    
    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
  
    // Cálculo validador
    const calc = (x: number) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0
  
      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }
  
      const result = 11 - (sum % 11)
  
      return result > 9 ? 0 : result
    }
  
    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)
    
    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false
  
    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]
}