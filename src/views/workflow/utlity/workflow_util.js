const getGroups = (groupsStr, allGroups) => {
    if (!allGroups || allGroups.length <= 0 || !groupsStr) return [ ]
    return allGroups.filter(i => groupsStr.includes(i.id));
}

const getGroup = (id, items) => {
    return items.find(i => id === (i.id));
}

export default {
    getGroups,
    getGroup
}