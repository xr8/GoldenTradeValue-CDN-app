console.log("%cLoad File : %cbtndetalles", "color: cyan", "color: yellow");
//--------------------------------------------------------------->
//BEGIN
/*
    menu top 
    activate modal
       a) #btnNewCierre
       b) #btnNewEntrega
    
    btn modal
        a) #btn_Save_generar => Generar cierre
        b) #btn_Save         => Generar entrega
        c) #btn_Save_saldo   => Generar saldo base
*/

/*Begin: A)*/
/* BTN top click  activa el loading y ventana modal*/


/********************************/
/*          SALDO               */
/********************************/
/*Begin: A)*/
// Click -> Btn saldo base*/
function clickModalSaldo(){
    $("#btnModalSaldo").on('click',function(){
        console.info("Run: Click Btn saldo")
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnSaldo(){
    $("#btn_Save_saldo").on('click',function() { 
        console.info("Run: Click Btn saldo")
        $('#saldoModal').modal('hide')
        saveSaldoGenerar() 
        refreshXhr()
    })
}

/********************************/
/*          CIERRE SIMPLE       */
/********************************/
/*Begin: A)*/
// Click -> Btn cierre simple*/
function clickModalCierreS(){
    $("#btnModalCierreSimple").on('click',function(){
        console.info("Run: Click Btn cierre simple")
        
        loadingVale('cierresimple') 

        inputCalcular_cs_clear()

        $("#input_cs_precio").val($('.'+$('input[type="checkbox"]').val()+'.precio').html())
        
        changeCierreS()
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnCierreS(){
    $("#btnSaveCierreS").on('click',function() { 
        console.info("Run: Click Btn cierre simple")
        $('#cierreSimple').modal('hide')
        
        saveCierreSimple()
        
    })
}
function changeCierreS(){
    $("#input_cs_fino").on('click',function(){
        if($("#input_eu_grs").val()){
            $(this).val("")
            $("#input_cs_fino").val("")
        }             
    })
    $("#input_cs_fino").on('change',function() {
        inputCalcular_cs_Importe()
    })
    $("#input_cs_pagos").on('change',function() {
        inputCalcular_cs_Saldo()
    })
}
function inputCalcular_cs_Importe(){
    let input_fino_cs    = parseFloat($("#input_cs_fino").val())
    let input_precio_cs  = parseFloat($("#input_cs_precio").val().replace("$", ""))
    let input_importe_cs = input_fino_cs * input_precio_cs
        input_importe_cs = input_importe_cs.toFixed(2)

        $("#input_cs_importe,#input_cs_total").val(input_importe_cs)
}
function inputCalcular_cs_Saldo(){
    let input_saldoxhr_cs = parseFloat($("#xhrSaldo").html().replace("$", ""))
    let input_cs_total    = parseFloat($("#input_cs_total").val())
    let input_cs_pagos    = parseFloat($("#input_cs_pagos").val())
    
    let x = input_saldoxhr_cs + input_cs_total - input_cs_pagos;
    $("#input_cs_saldo").val(x.toFixed(2))
}
function inputCalcular_cs_clear(){
    $("#input_cs_fino,#input_cs_precio,#input_cs_importe,#input_cs_total,#input_cs_pagos,#input_cs_saldo,#input_cs_observaciones").val(" ")
}
function saveCierreSimple() {
    console.log("BTN SAVE");

    let input_cs_fino          = $("#input_cs_fino").val()
    let input_cs_precio        = $("#input_cs_precio").val()
    let input_cs_importe       = $("#input_cs_importe").val()
    let input_cs_total         = $("#input_cs_total").val()
    let input_cs_pagos         = $("#input_cs_pagos").val()
    let input_cs_saldo         = $("#input_cs_saldo").val()
    let input_cs_observaciones = $("#input_cs_observaciones").val()
    let save_vale              = $("#save_vale_cs").val()
    let settings = {
        "url": urlMetalesdetallesC + '?type=cierreSimple',
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Basic cm9vdDphZG1pbg==",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "save_id_advance"         : $('input[type="checkbox"]:checked').val(),
            "save_id_advance_user"    : $("#id_advance_x").val(),
            "input_cs_fino" : input_cs_fino,
            "input_cs_precio" : input_cs_precio,
            "input_cs_importe" : input_cs_importe,
            "input_cs_total" : input_cs_total,
            "input_cs_pagos" : input_cs_pagos,
            "input_cs_saldo" : input_cs_saldo,
            "input_cs_observaciones" : input_cs_observaciones,
            "save_vale"              : save_vale  
        }
    };

    let jqxhr1 = $.ajax(settings).done(function(response) {
            console.log("Run: Cierres")
        })
        .done(function(data) {
            $.each(data, function(i, val) {})
        })
        .fail(function(data, jqXHR, textStatus, errorThrown) {
            console.info("Run: all user loading error");
            xhrError(jqXHR, textStatus, errorThrown);
        })
        .always(function(data) {  
            refreshXhr()
            console.info("Run: all user always");
        })

}
//-------------------------------------------------------------------->


function clickModalCierreSdos(){
    $("#btnModalCierreDos").on('click',function(){


        loadingMetalesOne2($('input[type="checkbox"]:checked.checkEntregas').attr("name"))
        loadingVale("save_cierredos")

    })
}