import ExcelExport from "@/services/exportFile/exportToExcel"
import printJS from "print-js";
import html2pdf from "html2pdf.js"




     const downLoadExcel = (selectedFileType, element, fileName, fileHeaderToExport, fileToExport) => {
        if (selectedFileType === "pdf") {
            // printJS({
            // //   ignoreElements: ['ignore1', 'ignore2'],
            //   maxWidth: 867,
            //   header: 'DONATION TRANSACTIONS',
            //   printable: [{
            //         DATE: '543',
            //         EVENT: '5242',
            //         DONATION: '4242',
            //         AMOUNT: 23432,
            //         DONOR: '234234234'
            //         }],
            //   properties: ['DATE', 'DONATION', 'AMOUNT', 'DONOR'],
            //   type: 'json',
            //   headerStyle:
            //     'font-family: Nunito Sans, Calibri; text-align: center;',
            //   gridHeaderStyle:
            //     'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;',
            //   gridStyle:
            //     'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300',
            // })
            // var element = document.getElementById('element-to-print'); //fix
            var opt = {
                // margin:       1,
                filename:     `${fileName}.pdf`,
                // image:        { type: 'jpeg', quality: 0.98 },
                // html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

                // New Promise-based usage:
                html2pdf().set(opt).from(element).save();
            // html2pdf(element);
        } else {
            const filterVal = fileHeaderToExport.map((i, index) => index)
            const list = fileToExport
            const header = fileHeaderToExport
            console.log(filterVal)
            console.log(fileHeaderToExport)

            ExcelExport.exportFile(filterVal, list, header, fileName.name, selectedFileType.name)
        }
    }

  const tableHeaderToJson = (_th) => {
        // let _htmlToJSON = function(){
            // let _tr = _table.getElementsByTagName("tr")[index];  //fix
            // let _th = document.getElementsByTagName("th");
            let _arr = [].map.call( _th, function( th ) {
                return th.innerHTML;
            }).join( ',' );
            let _data = _arr.split(",");
            console.log(_data)
            console.log("html to JSON", _data);
            // emit('data-header-to-export', _data)
            return  Array.from(_data);
        // };
            // _htmlToJSON();
  }

  const tableToJson = (_table) => {
        let _trLength = _table.getElementsByTagName("tr").length;
        let _jsonData = [];
        let _obj = {};

        let _htmlToJSON = function(index){
            let _tr = _table.getElementsByTagName("tr")[index];
            let _td = _tr.getElementsByTagName("td");
            let _arr = [].map.call( _td, function( td ) {
                return td.innerHTML;
            }).join( ',' );
            let _data = _arr.split(",");
            // console.log(_data)

            _obj = Object.assign({}, _data)

            _jsonData.push(_obj);

        };
        for(var i = 1; i < _trLength; i++){
            _htmlToJSON(i);
        }
        console.log("html to JSON",_jsonData);
        return _jsonData
        // emit('data-to-export', _jsonData)
    }

    export default {
        tableToJson,
        tableHeaderToJson,
        downLoadExcel,
        printJS
    }