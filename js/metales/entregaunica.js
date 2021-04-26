//-------------------------------------------------------------------->
console.log("%cLoad File : %centregaunica","color: cyan", "color: yellow");
/********************************/
/*          ENTREGA UNICA       */
/********************************/
function clickModalEntregaUnica(){
    $("#btnModalEntregaUnica").on('click',function() {
        
        clearUnicaInput()

        $(".ge-show").fadeOut().addClass("d-none")
        $(".ge-show-load").fadeIn().removeClass("d-none")

        btnId = $('input[type="checkbox"]:checked').val();
        
        $("#metalesPrecio").empty().append($(".precio_id." + btnId).text())
        $("#metalesPrecioInput").empty().val($(".precio_id." + btnId).text())
        
        /*carga la informacion del cierre*/
        loadingMetalesOne(btnId)
        let typeX = "unica"
        loadingVale(typeX)
    })
}
function btnEntregaUnica(){
    $("#btnGenerarEntregaUnica").on('click',function() { 
        saveEntregaUnica()
    })
}
function clearUnicaInput(){
    //Entregas
    $("#input_barra,#input_ley,#input_fino").val("")
    $("#input_fino").attr("title","barra * ley / 24k = fino");
    //Cierres
    $("#input_finopza,#input_importe").val("")
    //Pagos
    $("#input_total,#input_pagos,#input_saldo").val("")

    $("#input_eunvale,#input_eu_nolext,#input_eu_grsaf,#metales_eu_precio,#input_eu_barra,#input_eu_ley,#input_eu_fino,#input_eu_finopza,#input_eu_importe,#input_eu_pagos,#input_eu_total,#input_eu_saldo").val("")
}

function fino_eu_Change(){
    console.log("Run: fino_eu_Change")
    //A)input_eu_barra - input_eu_ley - input_eu_fino
    $("#input_eu_gr,#input_eu_ley").on('click',function(){
        if($("#input_eu_grs").val()){
            $(this).val("")
            $("#input_eu_fino").val("")
        }        
        if($("#input_eu_ley").val()){
            $(this).val("")
            $("#input_eu_fino").val("")
        }  
    })

    //B Calcular el fino 
    $("#input_eu_grs,#input_eu_ley").on('change',function() {
        inputCalcular_eu_Importe()
        //inputCalcular_eu_Saldo()
    })
    //c cierres
    $("#input_eu_precio").on('click',function(){
        if($("#input_eu_precio").val()){
            $(this).val("")
            $("#input_eu_importe").val("")
        }              
    })    
    $("#input_eu_precio").on('change',function() {
        inputCalcular_eu_ImporteFP()
    })

   //D
   $("#input_eu_finopza").on('click',function(){
        if($("#input_eu_finopza").val()){
            $(this).val("")
        }              
    })  

    $("#input_eu_finopza").on('change',function(){
        inputCalcular_eu_ImportePza()
    })  

    //E PAGOS
    $("#input_eu_pagos").on('click',function(){
        if($("#input_eu_pagos").val()){
            $(this).val("")
        }              
    })  

    $("#input_eu_pagos").on('change',function(){
        inputCalcular_eu_Saldo()
    })  
    

}

    function inputCalcular_eu_Importe(){
            //----->
            let input_barra  = parseFloat($("#input_eu_grs").val())
            let input_ley    = parseFloat($("#input_eu_ley").val())

            if(input_barra > 0 && input_ley > 0){
                let input_fino = input_barra * input_ley / 24;
                
                $("#input_eu_fino,#input_eu_finopza").val(input_fino.toFixed(2))

            }else{}
            //----->    
            //return result;
    }
    function inputCalcular_eu_ImporteFP(){
        let xyz = $("#input_eu_precio").val();  
        let i_f = $("#input_eu_fino").val();

        let importe = i_f*xyz;
            importe = importe.toFixed(2);

            $("#input_eu_fino").attr("title",input_barra + "*" + input_ley + "/24=" + input_fino);
            $("#input_eu_importe,#input_eu_total").val(importe)
    }    
    function inputCalcular_eu_ImportePza(){
        let xyz = $("#input_eu_precio").val();  
        let i_f = $("#input_eu_finopza").val();

        let importe = i_f*xyz;
            importe = importe.toFixed(2);

            $("#input_eu_fino").attr("title",input_barra + "*" + input_ley + "/24=" + input_fino);
            $("#input_eu_importe,#input_eu_total").val(importe)
    } 
    function inputCalcular_eu_Saldo(){
        let pagos = parseFloat($("#input_eu_pagos").val()); 
            pagos = pagos.toFixed(2);

        let total = parseFloat($("#input_eu_total").val()); 
            total = total.toFixed(2);
        
        let saldo_actual = parseFloat($(".saldoActual").html()); 
            saldo_actual = saldo_actual.toFixed(2);

        let input_saldo = parseFloat(saldo_actual) + parseFloat(total) - parseFloat(pagos);
            input_saldo = input_saldo.toFixed(2)

            $("#input_eu_saldo").val(input_saldo)
    }    
//-------------------------------------------------------------------->