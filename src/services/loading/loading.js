const getData = (list, number) => {
    let data = [];
    for (let i = 0; i < number; i++) {
        if (list.length > 0 && list[i]) {
            data.push(list[i])
        }
    }
    return data
}

export default getData