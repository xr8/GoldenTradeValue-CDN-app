//--------------------------------------------------------------->
//BEGIN
/*****************************************************************
 *                             BEGIN                             *
 *                         FUNCTION TOOLS                          *
 *****************************************************************/
 console.log("%cLoad File : %ctools", "color: cyan", "color: yellow");
function  allTools(){
    checkOnlyOne()

    finoChange()
    fino_eu_Change()
    /*


    plusEntrada()
    btnDeleteEntregas()    
    */
}

function allModal(){
    console.log("%cRun: allModal\n\n A)clickModalSaldo\n B)clickModalCierre\n C)clickModalEntrega\n D)clickModalEntregaUnica%c\n", "line-height: 0.8;", "line-height: 1.7;")
    clickModalCierre()
    clickModalPagos()
    /*
    clickModalCierre()
    clickModalCierreS()
    clickModalEntrega()
    clickModalCierreSdos()

    clickModalEntregaUnica()  
    
    clickModalSaldo()
    clickModalEntregaUnica()
    clickModalEntregaMultiple()    
    clickModalCierreSdos()
    */
}
function allBtn(){
    console.log("%cRun: allBtn\n\nA)btnSaldo\nB)btnCierre\nC)btnEntrega\nD)btnEntregaUnica\n%c", "line-height: 0.8;", "line-height: 1.7;")
    btnCierre()
    btnPagos()
    /*
    btnCierre()
    btnCierreS()
    btnEntrega()
    btnEntregaMultiple()

    btnEntregaUnica() 
    
    btnSaldo()
    btnEntregaUnica()
    */
}
//--------------------------------------------------------------->
/*solo un checkbox se puede seleccionar*/
function checkOnlyOne(){
    $(document).on('click', 'input[type="checkbox"]', function() {
        x = $('input[type="checkbox"]').not(this).prop('checked', false);

        let y = $(this).val();

        if (parseFloat($("#" + y + " .pesoactual").html()) <= 0) {
            $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").attr("disabled", true)
        } else {
            //--------------------->
            if ($('input[type="checkbox"]').is(':checked')) {

                $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").attr("disabled", false)
                $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").removeClass('btn-secondary').addClass('btn-primary');

                $("#cierreEntrega").val(y);
            } else {

                $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").attr("disabled", true)
                $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").removeClass('btn-primary').addClass('btn-secondary');

            }
            //--------------------->
        }
    })
}

function btnDisables(){
    $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").attr("disabled",true).removeClass('btn-primary').addClass('btn-secondary');
}
function btnEnables(){
    $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").attr("disabled",false).removeClass('btn-secondary').addClass('btn-primary');
}
//---------------------> loadingMetalesReaderEntregas() 
function zerocien(x) {
    //x >1,=1,<9,=9   x = 1...9                      0009
    if (x == 1 || x <= 9) {
        y = "000" + x;
        //x >= 10 and x x == 99 x = 10...99     0099
    } else if (x == 10 || x <= 99) {
        y = "00" + x;
        //x >= 100 and x x == 999 x = 100...999 0999
    } else if (x == 100 || x <= 999) {
        y = "0" + x;
        //x >= 1000 x = 1000 .... °°            9999
    } else if (x >= 1000) {
        y = x;
    } else { y = x; }

    return y;
}
function zeronull(x) {
    //x >1,=1,<9,=9   x = 1...9                      0009
    if (x == null || x==0) {
        y = "sin informacion";
    }

    return y;
}



function finoChange(){
    //A)
    $("#input_fino,#input_finopza").val("")
    $("#input_barra,#input_ley").on('click',function(){

        if($("#input_barra").val()){
            $(this).val("0")
            $("#input_fino").val("0")
        }
        if($("#input_ley").val()){
            $(this).val("0")
            $("#input_fino").val("0")
        }
        /*
        Fino/Pza
        importe
        pagos
        total
        saldo
        */
       $("#input_finopza,#input_importe,#input_pagos,#input_total,#input_saldo").val("")
    })

    /*
    B) 
        result fino  -> ba#rra * ley /24 para oro
        result salldo -> total + saldo - pagos = saldo
    */
    $("#input_barra,#input_ley").on('change',function() {
        /*
        id="input_barra"
        id="input_ley"
        id="input_fino"
        Formula
        input_barra * input_ley / 24
        */   
        inputCalcularImporte()
        inputCalcularSaldo()
    })

    /*
    C) 
    * Cierres
    * input_finopza
    * input_fino
    */
    $("#input_finopza").on('click',function() {
        $(this).val("")
        /*
        Fino/Pza
        importe
        pagos
        total
        saldo
        */
        $("#input_importe,#input_pagos,#input_total,#input_saldo").val("")

        
    })

    $("#input_finopza").on('change',function() {
        
        if($("#input_barra").val() >= 0 || $("#input_ley").val() >= 0 || $("#input_barra").val() == "" || $("#input_ley").val() == "" ){
            console.log(1)
        }else{
            console.log(2)
        }

        //$("#input_barra,#input_ley").val(0)
        //$("#input_fino").val($(this).val())

            inputCalcularImporteFP()
            $("#input_pagos").val(0)

            inputCalcularSaldo()
    })

    /*
    D) 
    * Pagos
    */        
    $("#input_pagos").on('click',function() {
        $(this).val(0)
        inputCalcularSaldo()
    })
    $("#input_pagos").on('change',function() {
        inputCalcularSaldo()
    })    
    
}

function inputCalcularImporte(){
    /*
       id="input_barra"
       id="input_ley"
       id="input_fino"
       Formula
       input_barra * input_ley / 24
   */  
   
       //----->
       let input_barra = parseFloat($("#input_barra").val())
       let input_ley   = parseFloat($("#input_ley").val())
   
       if(input_barra > 0 && input_ley > 0){
           let input_fino = input_barra * input_ley / 24;
           $("#input_fino,#input_finopza").val(input_fino.toFixed(2))
           
           let xyz = $("#metales_precio").html();
           xyz = xyz.split(" ");
           
           let i_f = input_fino.toFixed(2) * xyz[1];
               i_f = i_f.toFixed(2);
   
               //Result
               $("#input_fino").attr("title",input_barra + "*" + input_ley + "/24=" + input_fino);
               $("#input_importe,#input_total").val(i_f)
               $("#input_pagos").val(0)
       }
       //----->    
       //return result;
}
function inputCalcularSaldo(){
    
    /*SALDO ORIGINAL*/
    let saldo = $("#metales_saldo").html()
        saldo = saldo.split(" ")
        saldo = parseFloat(saldo[1])
        saldo = saldo.toFixed(2);

    /*TOTAL*/        
    let total = parseFloat($("#input_total").val()); 
        total = total.toFixed(2)
    
    /*SALDO ACTUAL*/
    let saldo_actual =  $("#metales_saldo_actual").html()
        saldo_actual = saldo_actual.split(" ")
        saldo_actual = parseFloat(saldo_actual[1])
        saldo_actual = saldo_actual.toFixed(2);        

        if($("#input_pagos").val() == ""){

            //---------------->
            if($("#input_total").val() > 0){
                console.log("RUN X:1")
                $("#input_pagos").val(0)
                let pagos = 0;

                //saldo+total-pago
                let input_saldo = parseFloat(saldo_actual) + parseFloat(total) - pagos;
                input_saldo = input_saldo.toFixed(2)
                
                $("#input_saldo").attr("title",saldo_actual + "+" + total + "-" + pagos)

                /*saldo input*/
                $("#input_saldo").val(input_saldo)
                console.log("Run  saldo = saldo actual + total - pago")

            }else{console.log("RUN X:1.2")}
            //---------------->

        }else{
            
            //---------------->
            console.log("RUN X:2")
            let pagos = parseFloat($("#input_pagos").val()); 
            pagos = pagos.toFixed(2);

            let input_saldo = parseFloat(saldo_actual) + parseFloat(total) - parseFloat(pagos);
            input_saldo = input_saldo.toFixed(2)
            
            $("#input_saldo").attr("title",saldo_actual + "+" + total + "-" + pagos)
            
            /*saldo input*/
            $("#input_saldo").val(input_saldo)
            console.log("Run  saldo = saldo + total - pago")

            //---------------->

        }

}
//--------------------------------------------------------------->

//--------------------------------------------------------------->


function btnDeleteEntregas(){
    console.log("Run: btnDeleteEntregas")
    $(".btnDeleteEntregas").on('click',function(){
        let xxx = $(this).attr("class"); 
        let yyy = xxx.split(" "); 
            $("."+yyy[2]).remove();
    })
}
//--------------------------------------------------------------->

//--------------------------------------------------------------->
function inputSaldo(x){
    /*
    input_total
    input_pagos
    */

    /*input saldo  + Saldo print - pagos*/
    let input_saldo = $("#metales_saldo").html();
        input_saldo = input_saldo.split(" ");


        
    let input_pagos = $("#input_pagos").val();            

    //Result
    //$("#input_saldo").val(parseFloat(x) + parseFloat(input_saldo[1]) - parseFloat(input_pagos))
}
function changeFino() {

    $("#generarBarra,#generarLey").change(function() {

        if (isEmpty($("#generarBarra").val())) {
            //alert(1)  
        } else if (isEmpty($("#generarLey").val())) {
            //alert(2)
        } else {
            let a = parseFloat($("#generarBarra").val());
            let b = parseFloat($("#generarLey").val());
            let c = parseInt(24);

            let detail_fino = (a * b) / c;
            $("#generarFino").val(detail_fino.toFixed(2));
            

        }

    });
}
//--------------------------------------------------------------->
function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

