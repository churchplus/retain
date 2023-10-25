const exportToExcel = {
    formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
            return parseTime(v[j])
            } else {
            return v[j]
            }
        }))
    },

    constructFile (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
            return parseTime(v[j])
            } else {
            return v[j]
            }
        }))
    },
    exportToExcel (filterVal, list, header, fileName, fileType) {
        import('@/vendor/export2excel.js').then(excel => {
            excel.export_json_to_excel({
                header: header, //Header Required
                data: this.formatJson(filterVal, list), //Specific data Required
                filename: fileName ? fileName : 'excel-list', //Optional
                autoWidth: true, //Optional
                bookType: fileType ? fileType : 'xlsx' //Optional
            })
        })
    },
    exportFile (filterVal, list, header, fileName, fileType) {
        import('@/vendor/export2excel.js').then(excel => {
            excel.export_json_to_excel({
                header: header, //Header Required
                data: this.formatJson(filterVal, list), //Specific data Required
                filename: fileName ? fileName : 'excel-list', //Optional
                autoWidth: true, //Optional
                bookType: fileType ? fileType : 'xlsx' //Optional
            })
        })
    }
}

export default exportToExcel