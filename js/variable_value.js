totalOTARevenue2021 =0;         // Total OTA Revenue 2021
totalDigitalRevenue2021 =0;     // Total Digital Revenue 2021

pdag2022BroadCast = 22.0;       // Projected Digital Advertising Growth 2022 for Broadcast
pdag2023BroadCast = 12.90;      // Projected Digital Advertising Growth 2023 for Broadcast
pdag2024BroadCast = 8.40;       // Projected Digital Advertising Growth 2024 for Broadcast

pOTAAdRG2022 = 11.40;           // Projected OTA Ad Revenue Growth 2022
pOTAAdRG2023 = -5.00;           // Projected OTA Ad Revenue Growth 2023
pOTAAdRG2024 = -1.00;           // Projected OTA Ad Revenue Growth 2024

let OTA_2021      =0;
let OTA_2022      =0;
let OTA_2023      =0;
let OTA_2024      =0;

let Digital_2021      =0;
let Digital_2022      =0;
let Digital_2023      =0;
let Digital_2024      =0;

let Large_2021    =0;     let Mid_2021      =0;     let Small_2021    =0;
let Large_2022    =0;     let Mid_2022      =0;     let Small_2022    =0;
let Large_2023    =0;     let Mid_2023      =0;     let Small_2023    =0;
let Large_2024    =0;     let Mid_2024      =0;     let Small_2024    =0;

function Projected_OTA_Revenue( previousYearRevenue, percentageChange ){

    console.log("Previous Year Revenue :" + previousYearRevenue);

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

function SetDefaultValue(thisId) {

    console.log('Inside Set Default Value Method');
    let id = thisId;
    $('#'+id).val('10');
    console.log($('#'+id).val());
    $('#'+id).text('0');
}

function ValueIn3DigitComma(strVal) {

    console.log("strVal Before :"+strVal);

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

    /*
    html2canvas(document.body).then(function(canvas) {
        document.body.appendChild(canvas);
    });
    */
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );

    var HTML_Width = document.body.offsetWidth;
    //var HTML_Height = document.body.offsetHeight;
    var HTML_Height = height

    var top_left_margin = 0;
    //var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Width = HTML_Width;
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    //var PDF_Height = PDF_Width + top_left_margin;

    var canvas_image_width = HTML_Width;
    //var canvas_image_height = HTML_Height;
    var canvas_image_height = height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


    const element = document.body;
    let y = element.scrollHeight;
    let x = element.scrollWidth;

    //alert(y);

    html2canvas(document.body, {
        /*quality: 2,*/
        quality: 2,
        scale: 1.0,
        allowTaint: true,
        tainTest:false,
        loggin:true,
        height:y*1.5

    }).then(function (canvas)
    {
        canvas.getContext('2d');
        //alert(canvas.height + "  " + canvas.width);

        //document.body.appendChild(canvas);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        //var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        // here is the most important part because if you dont replace you will get a DOM 18 exception.
        //window.location.href=image; // it will save locally

        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

        /*
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            //pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height-50);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 1), canvas_image_width, canvas_image_height-5);
            //pdf.addImage(imgData, 'JPG');
        }
        */
        setTimeout(function () {
            pdf.save("Calculation.pdf");
        }, 1000);

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

let chart_OTA_Projected_Revenue_Values = [];
let chart_Digital_Projected_Revenue_Values = [];

let Digital_COMPANY_Projected_Revenue_LARGE = [];
let Digital_COMPANY_Projected_Revenue_MID = [];
let Digital_COMPANY_Projected_Revenue_SMALL = [];

function chart_OTA_Projected_Revenue(chart_OTA_Projected_Revenue_Values){

    console.log("chart VALUES:"+chart_OTA_Projected_Revenue_Values);

    new Chart(document.getElementById("chart_OTA_Projected_Revenue"), {
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
                /*
                {
                    label: "Europe",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [408,547,675,734],
                    fill: false
                },
                {
                    label: "Africa",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [133,221,783,2478],
                    fill: false
                },
                {
                    label: "Asia",
                    type: "line",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [33,21,83,107]
                }
                ,{
                    label: "Europe",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    data: [408,547,675,734],
                },
                {
                    label: "Africa",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [133,221,783,2478]
                }
                ,{
                    label: "Asia",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    //data: chart_OTA_Projected_Revenue_Values
                    data: [33,21,83,478]
                }
                */
            ]
        },
        options: {
            title: {
                display: true,
                text: 'OTA Revnue Projection Chart From 2021'
            },
            legend: { display: false }
            ,scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 10000
                    }
                }]
            }
        }
    });



}
function chart_Digital_Projected_Revenue(chart_Digital_Projected_Revenue_Values){

    console.log("chart VALUES:"+chart_Digital_Projected_Revenue_Values);

    new Chart(document.getElementById("chart_Digital_Projected_Revenue"), {
        type: 'bar',
        data: {
            labels: ["2021", "2022", "2023", "2024"],
            datasets: [
                {
                    label: "Digital Revenue",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                    type: "bar",
                    borderColor: "#8e5ea2",
                    data: chart_Digital_Projected_Revenue_Values,
                    fill: false
                }
                /*
                {
                    label: "Europe",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [408,547,675,734],
                    fill: false
                },
                {
                    label: "Africa",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [133,221,783,2478],
                    fill: false
                },
                {
                    label: "Asia",
                    type: "line",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [33,21,83,107]
                }
                ,{
                    label: "Europe",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    data: [408,547,675,734],
                },
                {
                    label: "Africa",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [133,221,783,2478]
                }
                ,{
                    label: "Asia",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    //data: chart_OTA_Projected_Revenue_Values
                    data: [33,21,83,478]
                }
                */
            ]
        },
        options: {
            title: {
                display: true,
                text: 'OTA Revnue Projection Chart From 2021'
            },
            legend: { display: false }
            ,scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 10000
                    }
                }]
            }
        }
    });



}

function chart_Digital_COMPANY_Projected_Revenue(){

    new Chart(document.getElementById("chart_Digital_COMPANY_Projected_Revenue"), {
        type: 'bar',
        data: {
            labels: ["2021", "2022", "2023", "2024"],
            datasets: [
                {
                    label: "Large",
                    type: "line",
                    borderColor: "#8e5ea2",
                    data: [Large_2021,Large_2022,Large_2023,Large_2024],
                    fill: false
                },
                {
                    label: "Mid",
                    type: "line",
                    borderColor: "#3e95cd",
                    data: [Mid_2021,Mid_2022,Mid_2023,Mid_2024],
                    fill: false
                },
                {
                    label: "Small",
                    type: "line",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [Small_2021,Small_2022,Small_2023,Small_2024]
                }
                ,{
                    label: "Large",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    data: [Large_2021,Large_2022,Large_2023,Large_2024],
                },
                {
                    label: "Mid",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [Mid_2021,Mid_2022,Mid_2023,Mid_2024],
                }
                ,{
                    label: "Small",
                    type: "bar",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backgroundColorHover: "#3e95cd",
                    data: [Small_2021,Small_2022,Small_2023,Small_2024]
                }

            ]
        },
        options: {
            title: {
                display: true,
                text: 'OTA Revnue Projection Chart From 2021'
            },
            legend: { display: false }
            ,scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 10000
                    }
                }]
            }
        }
    });
}

/* OTA Revenue start  */
let OTA2022revenue    =0;       let OTA2023revenue      =0;     let OTA2024revenue    =0;
/* OTA Revenue end  */





$(document).ready(function () {

    chart_OTA_Projected_Revenue();
    chart_Digital_Projected_Revenue();
    chart_Digital_COMPANY_Projected_Revenue();

    /////////////////////////////////////////////////////////////////////
    $("#totalDigitalRevenue2021LARGE").on({
        focus: function(){

            console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }
        },
        keyup: function () {

            console.log("Digitial Keyup 2021 - "+$(this).val());

            var str = $(this).val();
            var regex = /[$.,\s]/g;
            var stripped = str.replace(regex, '');

            Large_2021 = stripped;
            ///////////////////////////////////////////////////////////////

            let digitalRevenue2022L = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Large_2022 = digitalRevenue2022L;
            $('#Digital2022Large').val(digitalRevenue2022L.toFixed(2));
            $('#Digital2022Large').text(digitalRevenue2022L.toFixed(2));

            let digitalRevenue2023L = Projected_Third_Party_Digital_Revenue(Large_2022,pdag2023BroadCast);
            Large_2023 = digitalRevenue2023L;
            $('#Digital2023Large').val(digitalRevenue2023L.toFixed(2));
            $('#Digital2023Large').text(digitalRevenue2023L.toFixed(2));

            let digitalRevenue2024L = Projected_Third_Party_Digital_Revenue(Large_2023,pdag2024BroadCast);
            Large_2024 = digitalRevenue2024L;
            $('#Digital2024Large').val(digitalRevenue2024L.toFixed(2));
            $('#Digital2024Large').text(digitalRevenue2024L.toFixed(2));


            //////////////////////////////////////////////////////////////////////////////////
            /*
            var str = $(this).val();
            var regex = /[$.,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);
            */

            var num = $(this).val();
            var commaNum = ValueIn3DigitComma(num);
            $(this).val(commaNum);
            console.log(commaNum);

            chart_Digital_COMPANY_Projected_Revenue();


        },
        blur: function () {
            /*
            $("#totalDigitalRevenue2021").each(function() {
                //console.log("Inside Blur");
                var num = $(this).val();
                console.log("2021 - " + num);

                console.log("Digitial Keyup 2021 - " + $(this).val());
                let digitalRevenue2022 = Projected_Third_Party_Digital_Revenue($(this).val(), pdag2022BroadCast);
                Large_2022 = digitalRevenue2022;
                $('#Digital2022Large').val(digitalRevenue2022);
                $('#Digital2022Large').text(digitalRevenue2022);


                var num = $(this).val();
                var commaNum = ValueIn3DigitComma(num);
                $(this).val(commaNum);
                console.log(commaNum);
            });
            */
        }
    });
    $("#totalDigitalRevenue2021MID").on({
        focus: function(){

            console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }


        },
        keyup: function () {

            console.log("Digitial Keyup 2021 - "+$(this).val());

            var str = $(this).val();
            var regex = /[$.,\s]/g;
            var stripped = str.replace(regex, '');

            Mid_2021 = stripped;
            //////////////////////////////////////////////////////////////////////////////////

            let digitalRevenue2022M = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Mid_2022 = digitalRevenue2022M;
            $('#Digital2022Mid').val(digitalRevenue2022M.toFixed(2));
            $('#Digital2022Mid').text(digitalRevenue2022M.toFixed(2));

            let digitalRevenue2023M = Projected_Third_Party_Digital_Revenue(Mid_2022,pdag2023BroadCast);
            Mid_2023 = digitalRevenue2023M;
            $('#Digital2023Mid').val(digitalRevenue2023M.toFixed(2));
            $('#Digital2023Mid').text(digitalRevenue2023M.toFixed(2));

            let digitalRevenue2024M = Projected_Third_Party_Digital_Revenue(Mid_2023,pdag2024BroadCast);
            Mid_2024 = digitalRevenue2024M;
            $('#Digital2024Mid').val(digitalRevenue2024M.toFixed(2));
            $('#Digital2024Mid').text(digitalRevenue2024M.toFixed(2));


            //////////////////////////////////////////////////////////////////////////////////
            /*
            var str = $(this).val();
            var regex = /[$.,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);
            */

            var num = $(this).val();
            var commaNum = ValueIn3DigitComma(num);
            $(this).val(commaNum);
            console.log(commaNum);

            chart_Digital_COMPANY_Projected_Revenue();

        },
        blur: function () {
            /*
            $("#totalDigitalRevenue2021").each(function() {
                //console.log("Inside Blur");
                var num = $(this).val();
                console.log("2021 - " + num);

                console.log("Digitial Keyup 2021 - " + $(this).val());
                let digitalRevenue2022 = Projected_Third_Party_Digital_Revenue($(this).val(), pdag2022BroadCast);
                Large_2022 = digitalRevenue2022;
                $('#Digital2022Large').val(digitalRevenue2022);
                $('#Digital2022Large').text(digitalRevenue2022);


                var num = $(this).val();
                var commaNum = ValueIn3DigitComma(num);
                $(this).val(commaNum);
                console.log(commaNum);
            });
            */
        }
    });
    $("#totalDigitalRevenue2021SMALL").on({
        focus: function(){

            console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }


        },
        keyup: function () {

            console.log("Digitial Keyup 2021 - "+$(this).val());

            var str = $(this).val();
            var regex = /[$.,\s]/g;
            var stripped = str.replace(regex, '');

            Small_2021 = stripped;

            ///////////////////////////////////////////////////////////////

            let digitalRevenue2022S = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Small_2022 = digitalRevenue2022S;
            $('#Digital2022Small').val(digitalRevenue2022S.toFixed(2));
            $('#Digital2022Small').text(digitalRevenue2022S.toFixed(2));

            let digitalRevenue2023S = Projected_Third_Party_Digital_Revenue(Small_2022,pdag2023BroadCast);
            Small_2023 = digitalRevenue2023S;
            $('#Digital2023Small').val(digitalRevenue2023S.toFixed(2));
            $('#Digital2023Small').text(digitalRevenue2023S.toFixed(2));

            let digitalRevenue2024S = Projected_Third_Party_Digital_Revenue(Small_2023,pdag2024BroadCast);
            Small_2024 = digitalRevenue2024S;
            $('#Digital2024Small').val(digitalRevenue2024S.toFixed(2));
            $('#Digital2024Small').text(digitalRevenue2024S.toFixed(2));

            ///////////////////////////////////////////////////////////////

            /*
            var str = $(this).val();
            var regex = /[$.,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);
            */

            var num = $(this).val();
            var commaNum = ValueIn3DigitComma(num);
            $(this).val(commaNum);
            console.log(commaNum);

            chart_Digital_COMPANY_Projected_Revenue();

        },
        blur: function () {
            /*
            $("#totalDigitalRevenue2021").each(function() {
                //console.log("Inside Blur");
                var num = $(this).val();
                console.log("2021 - " + num);

                console.log("Digitial Keyup 2021 - " + $(this).val());
                let digitalRevenue2022 = Projected_Third_Party_Digital_Revenue($(this).val(), pdag2022BroadCast);
                Large_2022 = digitalRevenue2022;
                $('#Digital2022Large').val(digitalRevenue2022);
                $('#Digital2022Large').text(digitalRevenue2022);


                var num = $(this).val();
                var commaNum = ValueIn3DigitComma(num);
                $(this).val(commaNum);
                console.log(commaNum);
            });
            */
        }
    });
    /////////////////////////////////////////////////////////////////////
    $("#totalOTARevenue2021").on({
        focus: function(){

            console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }
        },
        keyup: function () {

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            OTA_2021=stripped;
            console.log("stripped value :" +stripped);

            // formatCurrency($(this));
            console.log("2021 - "+ $(this).val());

            let otaRevenue2022 = Projected_OTA_Revenue(stripped,pOTAAdRG2022);
            OTA_2022 = otaRevenue2022.toFixed(2);
            $('#OTA2022revenue').val(otaRevenue2022.toFixed(2));
            $('#OTA2022revenue').text(otaRevenue2022.toFixed(2));

            let otaRevenue2023 = Projected_OTA_Revenue(otaRevenue2022,pOTAAdRG2023);
            OTA_2023 = otaRevenue2023.toFixed(2);
            $('#OTA2023revenue').val(otaRevenue2023.toFixed(2));
            $('#OTA2023revenue').text(otaRevenue2023.toFixed(2));

            let otaRevenue2024 = Projected_OTA_Revenue(otaRevenue2023,pOTAAdRG2024);
            OTA_2024 = otaRevenue2024.toFixed(2);
            $('#OTA2024revenue').val(otaRevenue2024.toFixed(2));
            $('#OTA2024revenue').text(otaRevenue2024.toFixed(2));

            //$(this).val("");
            var num = $(this).val();
            var commaNum = ValueIn3DigitComma(num);
            $(this).val(commaNum);
            console.log(commaNum);

            console.log("CHART DATA FOR OTA Revenue :"+OTA_2021+"-"+OTA_2022+"-"+OTA_2023+"-"+OTA_2024);
            console.log(OTA_2021);

            chart_OTA_Projected_Revenue_Values = [OTA_2021,OTA_2022,OTA_2023,OTA_2024];
            chart_OTA_Projected_Revenue(chart_OTA_Projected_Revenue_Values);

        },
        blur: function () {
            chart_OTA_Projected_Revenue(chart_OTA_Projected_Revenue_Values);
            /*
            $("#totalOTARevenue2021").each(function() {
                //console.log("Inside Blur");
                var num = $(this).val();
                console.log("2021 BLUR- "+num);

                let otaRevenue2022 = Projected_OTA_Revenue(num,pOTAAdRG2022);
                OTA_2022 = otaRevenue2022;
                $('#OTA2022revenue').val(otaRevenue2022);
                $('#OTA2022revenue').text(otaRevenue2022);

                let otaRevenue2023 = Projected_OTA_Revenue(otaRevenue2022,pOTAAdRG2023);
                OTA_2023 = otaRevenue2023;
                $('#OTA2023revenue').val(otaRevenue2023);
                $('#OTA2023revenue').text(otaRevenue2023);

                let otaRevenue2024 = Projected_OTA_Revenue(otaRevenue2023,pOTAAdRG2024);
                OTA_2024 = otaRevenue2024;
                $('#OTA2024revenue').val(otaRevenue2024);
                $('#OTA2024revenue').text(otaRevenue2024);

                $(this).val("");
                var commaNum = ValueIn3DigitComma(num);
                $(this).val(commaNum);
                console.log(commaNum);

            });
            */
        }
    });
    $("#totalDigitalRevenue2021").on({
        focus: function(){

            console.log("On Focus");

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);

            if(stripped == 0){
                $(this).val('');
                $(this).text('');
            }
        },
        keyup: function () {

            var str = $(this).val();
            var regex = /[$,\s]/g;
            var stripped = str.replace(regex, '');
            console.log("stripped value :" +stripped);

            Digital_2021 = stripped;
            // formatCurrency($(this));
            console.log("2021 - "+ $(this).val());

            let DigitalRevenue2022 = Projected_Third_Party_Digital_Revenue(stripped,pdag2022BroadCast);
            Digital_2022 = DigitalRevenue2022;
            $('#Digital2022revenue').val(DigitalRevenue2022.toFixed(2));
            $('#Digital2022revenue').text(DigitalRevenue2022.toFixed(2));

            let DigitalRevenue2023 = Projected_Third_Party_Digital_Revenue(DigitalRevenue2022,pdag2023BroadCast);
            Digital_2023 = DigitalRevenue2023;
            $('#Digital2023revenue').val(DigitalRevenue2023.toFixed(2));
            $('#Digital2023revenue').text(DigitalRevenue2023.toFixed(2));

            let DigitalRevenue2024 = Projected_Third_Party_Digital_Revenue(DigitalRevenue2023,pdag2024BroadCast);
            Digital_2024 = DigitalRevenue2024;
            $('#Digital2024revenue').val(DigitalRevenue2024.toFixed(2));
            $('#Digital2024revenue').text(DigitalRevenue2024.toFixed(2));

            //$(this).val("");
            var num = $(this).val();
            var commaNum = ValueIn3DigitComma(num);
            $(this).val(commaNum);
            console.log(commaNum);

            chart_Digital_Projected_Revenue_Values = [Digital_2021,Digital_2022,Digital_2023,Digital_2024];
            chart_Digital_Projected_Revenue(chart_Digital_Projected_Revenue_Values);

        },
        blur: function () {

            chart_Digital_Projected_Revenue(chart_Digital_Projected_Revenue_Values);
            /*
            $("#totalOTARevenue2021").each(function() {
                //console.log("Inside Blur");
                var num = $(this).val();
                console.log("2021 BLUR- "+num);

                let otaRevenue2022 = Projected_OTA_Revenue(num,pOTAAdRG2022);
                OTA_2022 = otaRevenue2022;
                $('#OTA2022revenue').val(otaRevenue2022);
                $('#OTA2022revenue').text(otaRevenue2022);

                let otaRevenue2023 = Projected_OTA_Revenue(otaRevenue2022,pOTAAdRG2023);
                OTA_2023 = otaRevenue2023;
                $('#OTA2023revenue').val(otaRevenue2023);
                $('#OTA2023revenue').text(otaRevenue2023);

                let otaRevenue2024 = Projected_OTA_Revenue(otaRevenue2023,pOTAAdRG2024);
                OTA_2024 = otaRevenue2024;
                $('#OTA2024revenue').val(otaRevenue2024);
                $('#OTA2024revenue').text(otaRevenue2024);

                $(this).val("");
                var commaNum = ValueIn3DigitComma(num);
                $(this).val(commaNum);
                console.log(commaNum);

            });
            */
        }
    });


});
