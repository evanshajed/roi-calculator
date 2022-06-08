totalOTARevenue2021 =0;         // Total OTA Revenue 2021
totalDigitalRevenue2021 =0;     // Total Digital Revenue 2021

pdag2022BroadCast = 22.0;       // Projected Digital Advertising Growth 2022 for Broadcast
pdag2023BroadCast = 12.90;      // Projected Digital Advertising Growth 2023 for Broadcast
pdag2024BroadCast = 8.40;       // Projected Digital Advertising Growth 2024 for Broadcast

pOTAAdRG2022 = 11.40;           // Projected OTA Ad Revenue Growth 2022
pOTAAdRG2023 = -5.00;           // Projected OTA Ad Revenue Growth 2023
pOTAAdRG2024 = -1.00;           // Projected OTA Ad Revenue Growth 2024

let OTA_2021      =0;   let OTA_2022      =0;   let OTA_2023      =0;   let OTA_2024      =0;

let Digital_2021      =0;   let Digital_2022      =0;   let Digital_2023      =0;   let Digital_2024      =0;

let Large_2021    =0;     let Mid_2021      =0;     let Small_2021    =0;
let Large_2022    =0;     let Mid_2022      =0;     let Small_2022    =0;
let Large_2023    =0;     let Mid_2023      =0;     let Small_2023    =0;
let Large_2024    =0;     let Mid_2024      =0;     let Small_2024    =0;





function Projected_OTA_Revenue( previousYearRevenue, percentageChange ){

    //console.log("Previous Year Revenue :" + previousYearRevenue);

    result = 0;
    percentageChange = percentageChange/100;
    result = previousYearRevenue * (1+percentageChange);

    return result;
}

function Projected_Third_Party_Digital_Revenue(previousYearRevenue, percentageChange ){

    result = 0;
    percentageChange = percentageChange/100;
    result = previousYearRevenue * (1+percentageChange);

    return result;

}

//let myChart = new Chart(ctx, {});

function SetDefaultValue(thisId){

    //console.log("here is MIRV");

    var str = thisId.value;
    str = $.trim(str);
    if (str.length === 0) {
        thisId.value = "$0";
    }
}


/*
function SetDefaultValue(thisId) {

    console.log('Inside Set Default Value Method');
    let id = thisId;
    $('#'+id).val('10');
    console.log($('#'+id).val());
    $('#'+id).text('0');
}
*/

function ValueIn3DigitComma(strVal) {

    //console.log("strVal Before :"+strVal);

    if(strVal.charAt(0)==="$"){
        strVal = strVal.slice(1);
    }

    strVal = strVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (strVal === "NaN")
        strVal = 0;
    strVal = "$" + strVal;

    //console.log("strVal After :"+strVal);
    return strVal;
}

function savePDF(){

    var node = document.getElementById('zone');
    //domtoimage.toPng(node)
    domtoimage.toJpeg(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
                                    //document.body.appendChild(img);
            let doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
            });
            doc.addImage(img,'JPEG', 10, 0, 185, 298);
            doc.save("Marketron_ROI_Calculation.pdf");
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}

function formatCurrency(input, blur) {

    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumberLeft(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

        input_val = input_val.replace("$-", "-$");

    } else {
        var i = input_val.indexOf("-");

        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        if (i >= 0)
        {
            input_val = input_val.replace("$", "-$");
        }

        // final formatting
        if (blur === "blur") {
            // input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);

}

let chart_OTA_Projected_Revenue_Values = [0,0,0,0];
let chart_Digital_Projected_Revenue_Values = [0,0,0,0];

let Digital_COMPANY_Projected_Revenue_LARGE = [];
let Digital_COMPANY_Projected_Revenue_MID = [];
let Digital_COMPANY_Projected_Revenue_SMALL = [];

/////////////////////////


//////////////////////////

function chart_OTA_Projected_Revenue(chart_OTA_Projected_Revenue_Values){

    //console.log("chart VALUES:"+chart_OTA_Projected_Revenue_Values);

    var xValues = ["2021", "2022", "2023", "2024"];
    var yValues = chart_OTA_Projected_Revenue_Values;
    var barColors = ["#0f488d", "#46b649","#0896c5","#1f2e3e"];

    new Chart("chart_OTA_Projected_Revenue", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "OTA Revenue",
                backgroundColor: barColors,
                type: "bar",
                borderColor: "#8e5ea2",
                data: yValues,
            }]
        },
        options: {
            interactivityEnabled: false,
            hover: {mode: null},
            events: ["mouseout", "click", "touchstart", "touchmove", "touchend"],
            interaction: {
                mode: 'nearest'
            },

            animation: false,
            legend: {display: false}
            /*
            title: {
                display: true,
                text: "OTA Ad Revenue Chart"
            }
            */
            ,hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0
            , scales: {
                beginAtZero: true,
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        suggestedMin: 1000,
                        callback: function (value, index, values) {
                            var resInM = (value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M';
                            return '$' + resInM;
                        }
                    },
                }]
            }
        }
    });

    /*
    new Chart("chart_OTA_Projected_Revenue", {
        type: 'bar',
        data: {
            labels: ["2021", "2022", "2023", "2024"],
            datasets: [
                {
                    label: "OTA Revenue",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                    type: "bar",
                    borderColor: "#8e5ea2",
                    data: chart_OTA_Projected_Revenue_Values,
                    //data: [OTA_2021,OTA_2022,OTA_2023,OTA_2024],
                    fill: false
                }

            ]
        },
        options: {
            title: {
                display: true,
                text: 'OTA Revenue Projection Chart From 2021'
            },
            legend: { display: false }
            ,scales: {
                yAxes: [{
                    ticks: {
                        //suggestedMin: 10000
                        callback: function (value, index, values) {

                            var resInM = (value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M';
                            return '$' + resInM;
                        }
                    },
                    gridLines: {

                        lineWidth: 0.5,//0 will hide horizontal line
                        zeroLineWidth: 1
                    }
                }]
                ,xAxes: [{
                    ticks: {
                        fontSize: 14
                    },
                    barPercentage: 0.4,
                    gridLines: {

                        lineWidth: 0,
                        zeroLineWidth: 1
                    }
                }]
            }
            ,responsive: true,
            tooltips: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: '#F0F0F0',

                itemSort: function (a, b) {
                    return 0 - 1
                },

                // String - Tooltip title font weight style
                tooltipTitleFontStyle: "bold",

                // String - Tooltip title font colour
                titleFontColor: "#5D6067",
                titleFontSize: 13,
                bodyFontSize: 14,
                bodySpacing: 6,
                callbacks: {
                    label: function (tooltipItems, data) {

                        var multistringText = [];
                        var str = Math.round(tooltipItems.value);

                        multistringText.push("  " + str + "%");
                        return multistringText;
                    },
                    labelColor: function (tooltipItems, chart) {

                        if (tooltipItems.datasetIndex === 0)//blue bar
                            return {

                                backgroundColor: 'rgb(19, 90, 156, 1)'
                            };
                        else if (tooltipItems.datasetIndex === 1)//green
                            return {

                                backgroundColor: 'rgb(73, 180, 76, 1)'
                            };
                        else if (tooltipItems.datasetIndex === 2)//lite blue
                            return {

                                backgroundColor: 'rgb(10, 173, 238, 1)'
                            };
                        else if (tooltipItems.datasetIndex === 3)//orange
                            return {

                                backgroundColor: 'rgb(244, 157, 52, 1)'
                            };

                    },
                    labelTextColor: function (tooltipItems, chart) {

                        return "#5D6067";
                    }

                }
            }

        }
    });
    */



}
function chart_Digital_Projected_Revenue(chart_Digital_Projected_Revenue_Values){

    var xValues = ["2021", "2022", "2023", "2024"];
    var yValues = chart_Digital_Projected_Revenue_Values;
    var barColors = ["#0f488d", "#46b649","#0896c5","#1f2e3e"];

    new Chart("chart_Digital_Projected_Revenue", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Digital Revenue",
                backgroundColor: barColors,
                type: "bar",
                borderColor: "#8e5ea2",
                data: yValues,
            }]
        },
        options: {
            interactivityEnabled: false,
            hover: {mode: null},
            events: ["mouseout", "click", "touchstart", "touchmove", "touchend"],
            interaction: {
                mode: 'nearest'
            },


            animation: false,
            legend: {display: false}
            /*
            title: {
                display: true,
                text: "OTA Ad Revenue Chart"
            }
            */
            ,hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0
            , scales: {
                beginAtZero: true,
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        suggestedMin: 1000,

                        callback: function (value, index, values) {
                            var resInM = (value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M';
                            return '$' + resInM;
                        }

                    },
                }]
            }
        }
    });

}
function chart_Digital_COMPANY_Projected_Revenue(){

    let ctx = document.getElementById('chart_Digital_COMPANY_Projected_Revenue').getContext('2d');
    let mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["2021", "2022", "2023", "2024"],
            datasets: [{
                label: 'Your Digital Revenue',
                data: chart_Digital_Projected_Revenue_Values,
                // this dataset is drawn below
                order: 4,
                borderColor: '#0896c5',
                backgroundColor: '#0896c5',
                yAxisID:'A'
            }, {
                label: 'Large Market',
                data: [Large_2021,Large_2022,Large_2023,Large_2024],
                type: 'line',
                // this dataset is drawn on top
                order: 3,
                fill: false,
                borderColor: '#46b649',
                yAxisID:'B'
            },
            {
                label: 'Mid Market',
                data: [Mid_2021, Mid_2022, Mid_2023, Mid_2024],
                type: 'line',
                // this dataset is drawn on top
                order: 2,
                fill: false,
                borderColor: '#7030a0',
                yAxisID:'B'
            },
            {
                label: 'Small Market',
                data: [Small_2021, Small_2021, Small_2023, Small_2024],
                type: 'line',
                // this dataset is drawn on top
                order: 1,
                fill: false,
                borderColor: '#0f488d',
                yAxisID:'B'
            }],

        },
        options: {
            /*
            scales: {
                y: {
                    beginAtZero: true
                }
            }
            */
            interactivityEnabled: false,
            hover: {mode: null},
            hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            animation: false,
            events: ["mouseout", "click", "touchstart", "touchmove", "touchend"],
            interaction: {
                mode: 'nearest'
            },
            scales: {
                yAxes: [
                    {
                        id: 'A',
                        position: 'left',
                        ticks: {
                            suggestedMin: 100000,
                            fontColor: 'rgb(0,0,0)',
                            callback: function (value, index, values) {
                                let resInM = (value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M';
                                return '$' + resInM;
                            },
                        },
                        scaleLabel: {
                            display: true,
                            fontSize: 14,
                            labelString: 'Your Digital Revenue',
                        }
                    },
                    {
                        id: 'B',
                        position: 'right',
                        ticks: {
                            suggestedMin: 100000,
                            fontColor: '#04300a',
                            callback: function (value, index, values) {
                                let resInM = (value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M';
                                return '$' + resInM;
                            },
                        },
                        gridLines: {
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            fontSize: 14,
                            labelString: 'Digital Revenue by Company Size',
                        }
                    }
                ]
            },
            legend:{
                position:'bottom'
            }
        }
    });

}

function chart_COMPANY(){

    /*
    let ctx2 = document.getElementById('COMPANY').getContext('2d');
    let mixedChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["2021", "2022", "2023", "2024"],
            datasets: [{
                label: 'Bar Dataset',
                data: chart_Digital_Projected_Revenue_Values,
                // this dataset is drawn below
                order: 4,
                borderColor: 'rgba(8,47,215,0.35)',
                backgroundColor: 'rgba(8,47,215,0.35)',
                yAxisID:'A'
            }, {
                label: 'Line Dataset',
                data: [Large_2021,Large_2022,Large_2023,Large_2024],
                type: 'line',
                // this dataset is drawn on top
                order: 3,
                fill: false,
                borderColor: 'rgb(37,163,59)',
                yAxisID:'B'
            },
                {
                    label: 'Line Dataset',
                    data: [Mid_2021, Mid_2022, Mid_2023, Mid_2024],
                    type: 'line',
                    // this dataset is drawn on top
                    order: 2,
                    fill: false,
                    borderColor: 'rgb(11,241,156)',
                    yAxisID:'B'
                },
                {
                    label: 'Line Dataset',
                    data: [Small_2021, Small_2021, Small_2023, Small_2024],
                    type: 'line',
                    // this dataset is drawn on top
                    order: 1,
                    fill: false,
                    borderColor: 'rgb(4,48,10)',
                    yAxisID:'B'
                }],

        },
        options: {
            scales: {
                yAxes: [
                    {
                        id: 'A',
                        position: 'left',
                        ticks: {
                            suggestedMin: 100000,
                            fontColor: 'rgba(8,47,215,0.35)',
                        },
                    },
                    {
                        id: 'B',
                        position: 'right',
                        ticks: {
                            suggestedMin: 100000,
                            fontColor: '#04300a',
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            interaction: {
                mode: 'x'
            }
        }
    });
    */


    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April'
        ],
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: chart_Digital_Projected_Revenue_Values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y',
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [Large_2021,Large_2022,Large_2023,Large_2024],
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            yAxisID: 'y1',
        },
            {
                type: 'line',
                label: 'Line Dataset',
                data: [Mid_2021, Mid_2022, Mid_2023, Mid_2024],
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                yAxisID: 'y1',
            },
            {
                type: 'line',
                label: 'Line Dataset',
                data: [Small_2021, Small_2021, Small_2023, Small_2024],
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                yAxisID: 'y1',
            },]
    };

    let ctx = document.getElementById('COMPANY').getContext('2d');
    const mixedChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            scales: {
                yAxes: [
                    {
                        id: 'y',
                        position: 'left',
                        ticks: {
                            suggestedMin: 100000,
                            fontColor: 'rgba(8,47,215,0.35)',
                        },
                    },
                    {
                        id: 'y1',
                        position: 'right',
                        ticks: {
                            suggestedMin: 100000,
                            fontColor: '#04300a',
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
        }
    },);
}

/* OTA Revenue start  */
let OTA2022revenue    =0;       let OTA2023revenue      =0;     let OTA2024revenue    =0;
/* OTA Revenue end  */

$(document).ready(function () {

chart_OTA_Projected_Revenue();
chart_Digital_Projected_Revenue();

    /* ---------------------------------------------------------------- */

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    var str = $('#totalDigitalRevenue2021LARGE').val();
    //console.log(str);
    //var regex = /[$.,\s]/g;
    var regex = /[$,\s]/g;
    var stripped = str.replace(regex, '');
    Large_2021 = stripped;
    //console.log(Large_2021);
    let digitalRevenue2022L = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
    Large_2022 = digitalRevenue2022L;
    //console.log(Large_2022);
    $('#Digital2022Large').val(digitalRevenue2022L.toFixed(2));
    //console.log(digitalRevenue2022L.toFixed(2));
    $('#Digital2022Large').text(dollarUS.format(Large_2022));

    let digitalRevenue2023L = Projected_Third_Party_Digital_Revenue(Large_2022,pdag2023BroadCast);
    Large_2023 = digitalRevenue2023L;
    $('#Digital2023Large').val(digitalRevenue2023L.toFixed(2));
    $('#Digital2023Large').text(dollarUS.format(Large_2023));

    let digitalRevenue2024L = Projected_Third_Party_Digital_Revenue(Large_2023,pdag2024BroadCast);
    Large_2024 = digitalRevenue2024L;
    $('#Digital2024Large').val(digitalRevenue2024L.toFixed(2));
    $('#Digital2024Large').text(dollarUS.format(Large_2024));
    /* ---------------------------------------------------------------- */

    /* ---------------------------------------------------------------- */
    var str = $('#totalDigitalRevenue2021MID').val();
    //var regex = /[$.,\s]/g;
    var regex = /[$,\s]/g;
    var stripped = str.replace(regex, '');
    Mid_2021 = stripped;

    let digitalRevenue2022M = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
    Mid_2022 = digitalRevenue2022M;
    $('#Digital2022Mid').val(digitalRevenue2022M.toFixed(2));
    $('#Digital2022Mid').text(dollarUS.format(Mid_2022));

    let digitalRevenue2023M = Projected_Third_Party_Digital_Revenue(Mid_2022,pdag2023BroadCast);
    Mid_2023 = digitalRevenue2023M;
    $('#Digital2023Mid').val(digitalRevenue2023M.toFixed(2));
    $('#Digital2023Mid').text(dollarUS.format(Mid_2023));

    let digitalRevenue2024M = Projected_Third_Party_Digital_Revenue(Mid_2023,pdag2024BroadCast);
    Mid_2024 = digitalRevenue2024M;
    $('#Digital2024Mid').val(digitalRevenue2024M.toFixed(2));
    $('#Digital2024Mid').text(dollarUS.format(Mid_2024));
    /* ---------------------------------------------------------------- */

    /* ---------------------------------------------------------------- */



    var str = $('#totalDigitalRevenue2021SMALL').val();
    //var regex = /[$.,\s]/g;
    var regex = /[$,\s]/g;
    var stripped = str.replace(regex, '');
    Small_2021 = stripped;

    let digitalRevenue2022S = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
    Small_2022 = digitalRevenue2022S;
    $('#Digital2022Small').val(digitalRevenue2022S.toFixed(2));
    $('#Digital2022Small').text(dollarUS.format(Small_2022));

    let digitalRevenue2023S = Projected_Third_Party_Digital_Revenue(Small_2022,pdag2023BroadCast);
    Small_2023 = digitalRevenue2023S;
    $('#Digital2023Small').val(digitalRevenue2023S.toFixed(2));
    $('#Digital2023Small').text(dollarUS.format(Small_2023));

    let digitalRevenue2024S = Projected_Third_Party_Digital_Revenue(Small_2023,pdag2024BroadCast);
    Small_2024 = digitalRevenue2024S;
    $('#Digital2024Small').val(digitalRevenue2024S.toFixed(2));
    $('#Digital2024Small').text(dollarUS.format(Small_2024));
    /* ---------------------------------------------------------------- */

chart_Digital_COMPANY_Projected_Revenue();

//chart_COMPANY();

    /////////////////////////////////////////////////////////////////////
    $("#totalDigitalRevenue2021LARGE").on({
        focus: function(){
            //console.log("On Focus");
            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            //console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }
        },
        keyup: function () {

            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });

            var str = $(this).val();
            //var regex = /[$.,\s]/g;
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            Large_2021 = stripped;
            ///////////////////////////////////////////////////////////////

            let digitalRevenue2022L = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Large_2022 = digitalRevenue2022L;

            $('#Digital2022Large').val(digitalRevenue2022L.toFixed(2));
            $('#Digital2022Large').text(dollarUS.format(Large_2022));



            let digitalRevenue2023L = Projected_Third_Party_Digital_Revenue(Large_2022,pdag2023BroadCast);
            Large_2023 = digitalRevenue2023L;
            $('#Digital2023Large').val(digitalRevenue2023L.toFixed(2));
            $('#Digital2023Large').text(dollarUS.format(Large_2023));

            let digitalRevenue2024L = Projected_Third_Party_Digital_Revenue(Large_2023,pdag2024BroadCast);
            Large_2024 = digitalRevenue2024L;
            $('#Digital2024Large').val(digitalRevenue2024L.toFixed(2));
            $('#Digital2024Large').text(dollarUS.format(Large_2024));


            chart_Digital_COMPANY_Projected_Revenue();

            //chart_COMPANY();

        },
        blur: function () {

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(this).val(dollarUS.format(stripped));
            //console.log("Dollars: " + dollarUS.format(stripped));
        }
    });
    $("#totalDigitalRevenue2021MID").on({
        focus: function(){

            //console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            //console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }


        },
        keyup: function () {

            //console.log("Digitial Keyup 2021 - "+$(this).val());
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });

            var str = $(this).val();
            //var regex = /[$.,\s]/g;
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            Mid_2021 = stripped;
            //////////////////////////////////////////////////////////////////////////////////

            let digitalRevenue2022M = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Mid_2022 = digitalRevenue2022M;
            $('#Digital2022Mid').val(digitalRevenue2022M.toFixed(2));
            $('#Digital2022Mid').text(dollarUS.format(Mid_2022));

            let digitalRevenue2023M = Projected_Third_Party_Digital_Revenue(Mid_2022,pdag2023BroadCast);
            Mid_2023 = digitalRevenue2023M;
            $('#Digital2023Mid').val(digitalRevenue2023M.toFixed(2));
            $('#Digital2023Mid').text(dollarUS.format(Mid_2023));

            let digitalRevenue2024M = Projected_Third_Party_Digital_Revenue(Mid_2023,pdag2024BroadCast);
            Mid_2024 = digitalRevenue2024M;
            $('#Digital2024Mid').val(digitalRevenue2024M.toFixed(2));
            $('#Digital2024Mid').text(dollarUS.format(Mid_2024));

            chart_Digital_COMPANY_Projected_Revenue();

            //chart_COMPANY();

        },
        blur: function () {
            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(this).val(dollarUS.format(stripped));
            //console.log("Dollars: " + dollarUS.format(stripped));
        }
    });
    $("#totalDigitalRevenue2021SMALL").on({
        focus: function(){

            //console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            //console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }


        },
        keyup: function () {

            //console.log("Digitial Keyup 2021 - "+$(this).val());
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });

            var str = $(this).val();
            //var regex = /[$.,\s]/g;
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            Small_2021 = stripped;

            ///////////////////////////////////////////////////////////////

            let digitalRevenue2022S = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Small_2022 = digitalRevenue2022S;
            $('#Digital2022Small').val(digitalRevenue2022S.toFixed(2));
            $('#Digital2022Small').text(dollarUS.format(Small_2022));

            let digitalRevenue2023S = Projected_Third_Party_Digital_Revenue(Small_2022,pdag2023BroadCast);
            Small_2023 = digitalRevenue2023S;
            $('#Digital2023Small').val(digitalRevenue2023S.toFixed(2));
            $('#Digital2023Small').text(dollarUS.format(Small_2023));

            let digitalRevenue2024S = Projected_Third_Party_Digital_Revenue(Small_2023,pdag2024BroadCast);
            Small_2024 = digitalRevenue2024S;
            $('#Digital2024Small').val(digitalRevenue2024S.toFixed(2));
            $('#Digital2024Small').text(dollarUS.format(Small_2024));


            chart_Digital_COMPANY_Projected_Revenue();

        },
        blur: function () {
            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(this).val(dollarUS.format(stripped));
            //console.log("Dollars: " + dollarUS.format(stripped));
        }
    });

    /////////////////////////////////////////////////////////////////////
    $("#totalOTARevenue2021").on({
        focus: function(){

            //console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            //console.log("stripped value on focus :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }

        },

        keyup: function () {

            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            OTA_2021=stripped;
            //console.log("stripped value on key up :" +stripped);

            let otaRevenue2022 = Projected_OTA_Revenue(stripped,pOTAAdRG2022);
            OTA_2022 = otaRevenue2022.toFixed(2);
            $('#OTA2022revenue').val(otaRevenue2022.toFixed(2));
            $('#OTA2022revenue').text(dollarUS.format(OTA_2022));

            let otaRevenue2023 = Projected_OTA_Revenue(otaRevenue2022,pOTAAdRG2023);
            OTA_2023 = otaRevenue2023.toFixed(2);
            $('#OTA2023revenue').val(otaRevenue2023.toFixed(2));
            $('#OTA2023revenue').text(dollarUS.format(OTA_2023));

            let otaRevenue2024 = Projected_OTA_Revenue(otaRevenue2023,pOTAAdRG2024);
            OTA_2024 = otaRevenue2024.toFixed(2);
            $('#OTA2024revenue').val(otaRevenue2024.toFixed(2));
            $('#OTA2024revenue').text(dollarUS.format(OTA_2024));


            //console.log("CHART DATA FOR OTA Revenue :"+OTA_2021+"-"+OTA_2022+"-"+OTA_2023+"-"+OTA_2024);
            //console.log(OTA_2021);

            chart_OTA_Projected_Revenue_Values = [OTA_2021,OTA_2022,OTA_2023,OTA_2024];
            chart_OTA_Projected_Revenue(chart_OTA_Projected_Revenue_Values);


        },
        blur: function () {

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            // Format the price above to USD, INR, EUR using their locales.
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(this).val(dollarUS.format(stripped));
            //$(this).text(dollarUS.format(stripped));
            //console.log("Dollars: " + dollarUS.format(stripped));

            chart_OTA_Projected_Revenue(chart_OTA_Projected_Revenue_Values);

        }
    });
    $("#totalDigitalRevenue2021").on({
        focus: function(){

            //console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            //console.log("stripped value on focus :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }
        },
        keyup: function () {

            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            //console.log("stripped value :" +stripped);

            Digital_2021 = stripped;
            // formatCurrency($(this));
            //console.log("2021 - "+ $(this).val());

            let DigitalRevenue2022 = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Digital_2022 = DigitalRevenue2022;
            $('#Digital2022revenue').val(DigitalRevenue2022.toFixed(2));
            $('#Digital2022revenue').text(dollarUS.format(Digital_2022));

            let DigitalRevenue2023 = Projected_Third_Party_Digital_Revenue(DigitalRevenue2022,pdag2023BroadCast);
            Digital_2023 = DigitalRevenue2023;
            $('#Digital2023revenue').val(DigitalRevenue2023.toFixed(2));
            $('#Digital2023revenue').text(dollarUS.format(Digital_2023));

            let DigitalRevenue2024 = Projected_Third_Party_Digital_Revenue(DigitalRevenue2023,pdag2024BroadCast);
            Digital_2024 = DigitalRevenue2024;
            $('#Digital2024revenue').val(DigitalRevenue2024.toFixed(2));
            $('#Digital2024revenue').text(dollarUS.format(Digital_2024));


            chart_Digital_Projected_Revenue_Values = [Digital_2021,Digital_2022,Digital_2023,Digital_2024];
            chart_Digital_Projected_Revenue(chart_Digital_Projected_Revenue_Values);
            chart_Digital_COMPANY_Projected_Revenue();

            //chart_COMPANY();

        },
        blur: function () {

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            // Format the price above to USD, INR, EUR using their locales.
            let dollarUS = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            });
            $(this).val(dollarUS.format(stripped));
            //$(this).text(dollarUS.format(stripped));
            //console.log("Dollars: " + dollarUS.format(stripped));


            chart_Digital_Projected_Revenue(chart_Digital_Projected_Revenue_Values);
            chart_Digital_COMPANY_Projected_Revenue();

            //chart_COMPANY();

        }
    });


});
