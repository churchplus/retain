const amountWithCommas = (amount) => {
    let format = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if(format !== 'NaN') return format
    return 0
}

export default {
    amountWithCommas,
}