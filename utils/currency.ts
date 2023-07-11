


export const format = ( value: number ) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat('en-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })

    return formatter.format( value ); //$2,500.00
}