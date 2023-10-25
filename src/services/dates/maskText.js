let mask = {
    maskEmail1(email) {
        return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2") 
    },
    maskEmail2(email) {
        console.log(email)
        let lastDot = email.lastIndexOf('.')
        let split = email.split(email.split("")[lastDot])
        return `${email.substr(0, 3)}${new Array(split[0].length - 1).fill('*').join('')}.${split[2] ? split[2] : split[1]}`
    },
    maskText(text) {
        console.log(text)
        console.log(text.slice(0,3)+'****'+text.slice(text.length-3))
        return text.slice(0,3)+'****'+text.slice(text.length-3)
    },
}

export default mask