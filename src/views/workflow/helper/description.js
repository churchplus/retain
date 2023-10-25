const getListofItems = (triggers, grps, contributionItems, triggerType) => {
    if (!grps || grps.length === 0 || !contributionItems || contributionItems.length === 0 || !triggers || triggers.length === 0) return { isValid: false };
    const trigger = triggers.find(i => i && i.triggerType === triggerType)
    if (!trigger.jsonCondition) return { isValid: false };
    const parsedData = JSON.parse(trigger.jsonCondition);
    const contributionItem = contributionItems.find(i => i && parsedData && i.id === parsedData.financialContributionID);
    const groups = grps.filter(i => i && parsedData && parsedData.groups && parsedData.groups.includes(i.id));
    return {
        isValid: true,
        parsedData,
        contributionItem,
        groups,
    }
}

export default (triggers, grps, contributionItems) => {
    return {
        //triggerType 0
        '0'() {
            const { parsedData, contributionItem, groups, isValid } = getListofItems(triggers, grps, contributionItems, 0)
            if (!isValid) return { };
            return {
                groups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                range: parsedData.logicalOperator === 'Greater than' ? '>' : '<',
                category: contributionItem && contributionItem.name ? contributionItem.name : '____',
                amount: parsedData.amount ? parsedData.amount : '',
                time: parsedData.singleOrLast ? parsedData.singleOrLast : '____',
                id: 1,
            }
             
        },

        //triggerType 1
        '1'() {
            const { parsedData, contributionItem, groups, isValid } = getListofItems(triggers, grps, contributionItems, 1)
            if (!isValid) return { };
            return {
                groups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                prevTimes: parsedData.gaveTimes ? parsedData.gaveTimes + ' times' : '__ times',
                prevMonths: parsedData.gaveMonth ? parsedData.gaveMonth + ' months' : '__ months',
                category: contributionItem && contributionItem.name ? contributionItem.name : '____',
                currentTimes: parsedData.givenAtLeastTimes ? parsedData.givenAtLeastTimes + ' times' : '__ times',
                currentMonths: parsedData.givenForTheLastMonth ? parsedData.givenForTheLastMonth + ' months' : '__ months',
                id: 11,
            }
             
        },
        '2'() {
            const { parsedData, contributionItem, groups, isValid } = getListofItems(triggers, grps, contributionItems, 2)
            if (!isValid) return { };
            return {
                id: 2,
                groups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                givenAtLeastTimes: parsedData.givenAtLeastTimes ? parsedData.givenAtLeastTimes : "____",
                givenForTheLastMonth: parsedData.givenForTheLastMonth ? parsedData.givenForTheLastMonth : "____",
                category: contributionItem && contributionItem.name ? contributionItem.name : '____',
                notGivenForTheLastMonth: parsedData.notGivenForTheLastMonth ? parsedData.notGivenForTheLastMonth : "____",
            }
             
        },
        '3'() {
            const { parsedData, groups, isValid } = getListofItems(triggers, grps, contributionItems, 3)
            if (!isValid) return { };
            return {
                id: 3,
                groups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                logicalOperator: parsedData.logicalOperator === "Greater than" ? ">" : "<",
                amount: parsedData.amount ? parsedData.amount : "____",
            }
             
        },
        '4'() {
            const { isValid } = getListofItems(triggers, grps, contributionItems, 4)
            if (!isValid) return { };
            return {
                
            }
             
        },
        '5'() {
            const { isValid } = getListofItems(triggers, grps, contributionItems, 5)
            if (!isValid) return { };
            return {
                
            }
             
        },
        '6'() {
            const { groups, isValid } = getListofItems(triggers, grps, contributionItems, 6)
            if (!isValid) return { };
            return {
                selectedGroups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                id: 4,
            }
             
        },
        '7'() {
            const { parsedData, groups, isValid } = getListofItems(triggers, grps, contributionItems, 7)
            if (!isValid) return { };
            return {
                groups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                event: parsedData.event  ? parsedData.event : "____",
                days: parsedData.days ? parsedData.days : "____",
                pastOrFuture: typeof "undefined" === "undefined" ? "_____" : parsedData.pastOrFuture === 0 ? 'Future' : "Past",
                id: 12,
            }
             
        },
        '8'() {
            const { groups, isValid } = getListofItems(triggers, grps, contributionItems, 8)
            if (!isValid) return { };
            return {
                selectedGroups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                id: 6,
            }
             
        },
        '9'() {
            const { groups, isValid } = getListofItems(triggers, grps, contributionItems, 9)
            if (!isValid) return { };
            return {
                selectedGroups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                id: 6,
            }
             
        },
        '10'() {
            const { parsedData, groups, isValid } = getListofItems(triggers, grps, contributionItems, 10)
            if (!isValid) return { };
            return {
                selectedGroups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                logicalOperatorAddOrRemove: parsedData.logicalOperatorAddOrRemove ? parsedData.logicalOperatorAddOrRemove : '____',
                id: 8,
            }
             
        },
        '11'() {
            const { parsedData, groups, isValid } = getListofItems(triggers, grps, contributionItems, 11)
            if (!isValid) return { };
            return {
                selectedGroups: groups && groups.length > 0 ? groups.map(i => i.name) : ['_____'],
                days: parsedData.days ? parsedData.days : '____',
                id: 9,
            }
             
        },
        '12'() {
            const { parsedData, groups, isValid } = getListofItems(triggers, grps, contributionItems, 12)
            if (!isValid) return { };
            return {
                id: 10,
                selectedStatus: parsedData.attendanceStatus && parsedData.attendanceStatus.length > 0 ? parsedData.attendanceStatus : ['____'],
                numOfTimes: parsedData.times,
                timesInLastWeek: parsedData.days,
                selectedGroups: groups && groups.length > 0 ? groups.map(i => i.name) : ['___']
            }
             
        },
    }
}
