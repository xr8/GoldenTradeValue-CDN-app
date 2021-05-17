console.log("%cLoad File : %cbtndetalles", "color: cyan", "color: yellow");
//--------------------------------------------------------------->
//BEGIN

/********************************/
/*    Tabs Generar Cierre       */
/********************************/
function clickModalCierre(){
    $("#btnModalCierre").on('click',function() {
        console.info("Run: Click Btn cierre 123321")
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnCierre(){
    $("#btnGenerarCierre").on('click',function() { 
        console.log("Btn generar cierre")
        $('#cierreModal').modal('hide')
        saveDataGenerar()
    }) 
}
/********************************/
/*    Tabs Generar Cierre       */
/********************************/

/********************************/
/*    Tabs Generar Pagos        */
/********************************/
/*
btnModalPagos
btnGenerarPago
*/
function clickModalPagos(){
    $("#btnModalPagos").on('click',function() {
        console.info("Run: Click Btn cierre 123321")

        $("#generarSaldo").val($("#xhrSaldo").html())
        //btnPagosSaldo()
        
    })
}
/* BTN -> click  sava Generar Cierre*/
function btnPagos(){
    $("#btnGenerarPago").on('click',function() { 
        console.log("Btn generar cierre")
        saveTabsPagos()
        $('#pagosModal').modal('hide')
        
        //saveTabsPagos()

    }) 
}
function btnPagosSaldo(){
    /*
    (SA) = Saaldo anterior
    (T)  = Total
    (P)  =  Pago
    (Sa) = Saldo actual
    formula : (SA) + (T) - (P) = Sa
    */
    $("#generarPago").on('change',function() { 
        let generarPagoTotal = $("#generarPagoTotal").val()
        let generarPago      = $("#generarPago").val()
        let xhrSaldo         = $("#xhrSaldo").html()

        let saldoNuevo       = (parseFloat(xhrSaldo)) + (parseFloat(generarPagoTotal)) - (parseFloat(generarPago));
    }) 
}
/********************************/
/*    Tabs Generar Pagos        */
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
/*   Generar Cierre Simple      */
/********************************/
// Click -> Btn cierre simple*/
function clickModalCierreS(){
    $("#btnModalCierreSimple").on('click',function(){

        inputCalcular_cs_clear()
        $("#input_cs_precio").val($('.'+$('input[type="checkbox"]').val()+'.precio').html())

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

/********************************/
/*           Entrega Nueva      */
/********************************/
function clickModalEntrega(){
    $("#btnModalEntrega").on('click',function() {
        
        $(".ge-show").fadeOut().addClass("d-none")
        $(".ge-show-load").fadeIn().removeClass("d-none")

        btnId = $('input[type="checkbox"]:checked').val();
        
        $("#metalesPrecio").empty().append($(".precio_id." + btnId).text())
        $("#metalesPrecioInput").empty().val($(".precio_id." + btnId).text())
        
        /*carga la informacion del cierre*/
        //loadingMetalesOne(btnId)

        //let typeX = "nueva"
        //loadingVale(typeX)
        let typeX = "entrega"
        loadingVale(typeX)
    })
}

function btnEntrega(){
    $("#btnGenerarEntrega").on('click',function() { 
        saveEntrega()
    })
}

/********************************/
/*          Cierre             */
/********************************/
function clickModalCierreSdos(){
    $("#btnModalCierreDos").on('click',function(){
        loadingMetalesOne2($('input[type="checkbox"]:checked.checkEntregas').attr("name"))
        loadingVale("save_cierredos")
    })
}

/********************************/
/*           Entrega Nueva      */
/********************************/
function clickModalEntregaUnica(){
    $("#btnentregaUnica").on('click',function() {
        
        $(".ge-show").fadeOut().addClass("d-none")
        $(".ge-show-load").fadeIn().removeClass("d-none")

        btnId = $('input[type="checkbox"]:checked').val();
        
        $("#metalesPrecio").empty().append($(".precio_id." + btnId).text())
        $("#metalesPrecioInput").empty().val($(".precio_id." + btnId).text())
        
        /*carga la informacion del cierre*/
        loadingMetalesOne(btnId)

        let typeX = "input_eu_nvale"
        loadingVale(typeX)
    })
}

function btnEntregaUnica(){
    $("#btnGenerarEntrega").on('click',function() { 
        saveEntrega()
    })
}