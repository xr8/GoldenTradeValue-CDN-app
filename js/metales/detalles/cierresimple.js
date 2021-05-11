
/********************************/
/*          CIERRE SIMPLE       */
/********************************/
/*Begin: A)*/

// Click -> Btn cierre simple*/
function clickModalCierreS(){
    $("#btnModalCierreSimple").on('click',function(){

        inputCalcular_cs_clear()

        loadingVale('cierresimple')
        
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
        $("#save_vale_cs,#input_cs_fino,#input_cs_precio,#input_cs_importe,#input_cs_total,#input_cs_pagos,#input_cs_saldo,#input_cs_observaciones").val(" ")
    }
//-------------------------------------------------------------------->
