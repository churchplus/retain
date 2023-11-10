const deviceWidth = {
    only() {
        let screenWidth = window.screen.width
        if (screenWidth >= 1920) {
            return 'xlOnly'
        } else if (screenWidth >= 1200 && screenWidth < 1920) {
            return 'lgOnly'
        } else if (screenWidth >= 992 && screenWidth < 1200) {
            return 'mdOnly'
        } else if (screenWidth >= 768 && screenWidth < 992) {
            return 'smOnly'
        } else if (screenWidth < 768) {
            return 'xsOnly'
        }
    },
    down() {
        let screenWidth = window.screen.width
        if (screenWidth <= 2000) {
            return 'xlAndDown'
        } 
         if (screenWidth <= 1900) {
            return 'lgAndDown'
        } 
         if (screenWidth <= 1200) {
            return 'mdAndDown'
        } 
         if (screenWidth <= 992) {
            return 'smAndDown'
        } 
         if (screenWidth <= 768) {
            return 'xsAndDown'
        }
    },
    up() {
        let screenWidth = window.screen.width
        if (screenWidth >= 1920) {
            return 'xlAndUp'
        } 
         if (screenWidth >= 1200) {
            return 'lgAndUp'
        } 
         if (screenWidth >= 992) {
            return 'mdAndUp'
        } 
         if (screenWidth >= 768) {
            return 'smAndUp'
        } 
         if (screenWidth >= 300) {
            return 'xsAndUp'
        }
    },

}

export default deviceWidth

