import ExcelExport from "@/services/exportFile/exportToExcel"
import printJS from "print-js";
import html2pdf from "html2pdf.js"




const downLoadExcel = (selectedFileType, element, fileName, fileHeaderToExport, fileToExport) => {
    if (selectedFileType === "pdf") {
        var element = document.getElementById('element-to-print'); //fix
        var opt = {
            // margin:       0.3,
            // padding:      1,
            filename: `${fileName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
        // html2pdf(element);
    } else {
        const filterVal = fileHeaderToExport.map((i, index) => index)
        const list = fileToExport
        const header = fileHeaderToExport
        ExcelExport.exportFile(filterVal, list, header, fileName, selectedFileType)
    }
}

const tableHeaderToJson = (_th) => {
    let _arr = [].map.call(_th, function (th) {
        return th.innerHTML;
    }).join('|');
    let _data = _arr.split("|");
    return Array.from(_data);
}

const tableToJson = (_table) => {
    let _trLength = _table.getElementsByTagName("tr").length;
    let _jsonData = [];
    let _obj = {};

    let _htmlToJSON = function (index) {
        let _tr = _table.getElementsByTagName("tr")[index];
        let _td = _tr.getElementsByTagName("td");
        let _arr = [].map.call(_td, function (td) {
            return td.innerHTML;
        }).join('|');
        let _data = _arr.split("|");
        _obj = Object.assign({}, _data)
        _jsonData.push(_obj);

    };
    for (var i = 1; i < _trLength; i++) {
        _htmlToJSON(i);
    }
    return _jsonData
}

export default {
    tableToJson,
    tableHeaderToJson,
    downLoadExcel,
    printJS
}