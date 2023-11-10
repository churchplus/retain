<template>
    <div  class="container-fluid">
        <div class="con">
            <div id="domId" ref="chart" class="chart"></div>
        </div>
       
    </div>
</template>

<script>
import { onUpdated, ref, watchEffect } from "vue";
import Highcharts from "highcharts";

import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsOrganization from "highcharts/modules/organization";
import HighchartsExporting from "highcharts/modules/exporting";



export default {
    props: ["domId", "data" ],

    setup(props) {
        const chart = ref(null);
        const matchedValues = ref([])

        watchEffect(() => {
            if (props.data.length > 0) {
                const allIDs = props.data.map(i => i.id)
                allIDs.forEach(i => {
                    props.data.forEach(j => {
                        if (i == j.parentID) {
                            matchedValues.value.push([props.data.find(k => k.id == i).id, j.id])
                        }
                    })
                })
            }
        })

         onUpdated(() => {
             console.log(props.data)
            HighchartsSankey(Highcharts);
            HighchartsOrganization(Highcharts);
            HighchartsExporting(Highcharts);

           Highcharts.chart(domId, {
    chart: {
        height: 800,
        width: 1000,
        inverted: false,
    },

    title: {
        text: 'Ministry Level Chart'
    },

    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var nodeName = point.toNode.name,
                    nodeId = point.toNode.id,
                    nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
                    parentDesc = point.fromNode.id;
                return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
            }
        }
    },

    series: [{
        type: 'organization',
        name: 'Highsoft',
        dataLabels: {
            style: {
                fontSize: '13px',
                fontWeight: 'normal',
                color: 'orange',
                textOverflow: 'ellipsis'
            }
        },
        keys: ['from', 'to'],
        data: matchedValues.value,
        //  [
        //     ['Shareholders', 'Board'],
        //     ['Board', 'CEO'],
        //     ['CEO', 'CTO'],
        //     ['CEO', 'CPO'],
        //     ['CEO', 'CSO'],
        //     ['CEO', 'HR'],
        //     ['CTO', 'Product'],
        //     ['CTO', 'Web'],
        //     ['CSO', 'Sales'],
        //     ['HR', 'Market'],
        //     ['CSO', 'Market'],
        //     ['HR', 'Market'],
        //     ['CTO', 'Market']
        // ],
        levels: [{
            level: 0,
            color: 'silver',
            dataLabels: {
                 style: {
                    fontSize: '10px'
                        },
            },
            height: 20
        }, {
            level: 1,
            color: '#3786da79',
            // dataLabels: {
            //     color: 'black',
            //      style: {
            //         fontSize: '10px'
            //             }
            // },
            height: 20
        }, {
            level: 2,
            color: '#98010451'
        }, {
            level: 4,
            color: '#35915451'
        }],
        nodes: props.data,
        // [{
        //     id: 'Shareholders'
        // }, {
        //     id: 'Board'
        // }, {
        //     id: 'CEO',
        //     title: 'CEO',
        //     name: 'Grethe Hjetland',
        //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131126/Highsoft_03862_.jpg'
        // }, {
        //     id: 'HR',
        //     title: 'HR/CFO',
        //     name: 'Anne Jorunn Fjærestad',
        //     color: '#007ad0',
        //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131210/Highsoft_04045_.jpg'
        // }, {
        //     id: 'CTO',
        //     title: 'CTO',
        //     name: 'Christer Vasseng',
        //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131120/Highsoft_04074_.jpg'
        // }, {
        //     id: 'CPO',
        //     title: 'CPO',
        //     name: 'Torstein Hønsi',
        //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131213/Highsoft_03998_.jpg'
        // }, {
        //     id: 'CSO',
        //     title: 'CSO',
        //     name: 'Anita Nesse',
        //     image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2020/03/17131156/Highsoft_03834_.jpg'
        // }, {
        //     id: 'Product',
        //     name: 'Product developers'
        // }, {
        //     id: 'Web',
        //     name: 'Web devs, sys admin'
        // }, {
        //     id: 'Sales',
        //     name: 'Sales team'
        // }, {
        //     id: 'Market',
        //     name: 'Marketing team',
        //     column: 5
        // }],
        colorByPoint: false,
        color: '#35889151',
        dataLabels: {
            color: 'black',
            // style: {
            //     fontSize: '10px'
            // }
        },
        borderColor: 'white',
        nodeWidth: 120
    }],
    tooltip: {
        outside: true
    },
    exporting: {
        allowHTML: true,
        sourceWidth: 800,
        sourceHeight: 600
    }

});
         })
          return { chart, HighchartsOrganization, matchedValues }
    },
}
</script>

<style scoped>
.con {
    min-width: 300px;
    max-width: 900px;
    margin: 1em auto;
    /* border: 1px solid silver; */
}

#csv {
    display: none;
    color: #35889151
}
/* .chart{
    font-size: 10px!important;
} */
#domId {
  min-width: 300px;
  overflow: scroll !important;
}

</style>