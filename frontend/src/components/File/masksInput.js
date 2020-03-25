export function maskToCpf(cpfValue) {
  if (cpfValue) {
    let formatedCpf = cpfValue.replace(/\D/g, '')
    formatedCpf = formatedCpf.replace(/(\d{3})(\d)/, '$1.$2')
    formatedCpf = formatedCpf.replace(/(\d{3})(\d)/, '$1.$2')
    formatedCpf = formatedCpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    return formatedCpf
  }
  return cpfValue
}

export function maskToTelephone(number) {
  if (number) {
    let formatedNumber = number.replace(/\D/g, '')
    formatedNumber = formatedNumber.replace(/^(\d\d)(\d)/g, '($1) $2')
    if (number.length === 15 || number.length === 11) {
      formatedNumber = formatedNumber.replace(/(\d{5})(\d)/, '$1-$2')
    } else {
      formatedNumber = formatedNumber.replace(/(\d{4})(\d)/, '$1-$2')
    }
    return formatedNumber
  }
  return number
}
