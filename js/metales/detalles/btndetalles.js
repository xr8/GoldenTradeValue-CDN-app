console.log("%cLoad File : %cbtndetalles", "color: cyan", "color: yellow");
//--------------------------------------------------------------->
//BEGIN
/********************************/
/*    Tabs Generar Pagos        */
/********************************/

/*Begin: A)*/
// Click -> Btn saldo base*/
/*
function clickModalSaldo(){
    $("#btnModalSaldo").on('click',function(){
        console.info("Run: Click Btn saldo")
    })
}
*/
/* BTN -> click  sava Generar Cierre*/
/*
function btnSaldo(){
    $("#btn_Save_saldo").on('click',function() { 
        console.info("Run: Click Btn saldo")
        $('#saldoModal').modal('hide')
        saveSaldoGenerar() 
        refreshXhr()
    })
}
*/

/********************************/
/*   Generar Cierre Simple      */
/********************************/
// Click -> Btn cierre simple*/
/*
function clickModalCierreS(){
    $("#btnModalCierreSimple").on('click',function(){

        inputCalcular_cs_clear()
        $("#input_cs_precio").val($('.'+$('input[type="checkbox"]').val()+'.precio').html())

        loadingVale('cierresimple')
        
        changeCierreS()
    })
}
*/
/* BTN -> click  sava Generar Cierre*/
/*

*/



/********************************/
/*          Cierre             */
/********************************/
/*
function clickModalCierreSdos(){
    $("#btnModalCierreDos").on('click',function(){
        loadingMetalesOne2($('input[type="checkbox"]:checked.checkEntregas').attr("name"))
        loadingVale("save_cierredos")
    })
}
*/
/********************************/
/*           Entrega Nueva      */
/********************************/
/*
function clickModalEntregaUnica(){
    $("#btnentregaUnica").on('click',function() {
        
        $(".ge-show").fadeOut().addClass("d-none")
        $(".ge-show-load").fadeIn().removeClass("d-none")

        btnId = $('input[type="checkbox"]:checked').val();
        
        $("#metalesPrecio").empty().append($(".precio_id." + btnId).text())
        $("#metalesPrecioInput").empty().val($(".precio_id." + btnId).text())
    
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
*/
/************************************************************/
/*                            MODAL                         */
/************************************************************/

/********************************/
/*    Tabs Generar Cierre       */
/********************************/
function clickModalCierre(){
    $("#btnModalCierre").on('click',function() {
        console.info("Run: Click Btn cierre 123321")
        $("#generar_c_fecha,#generar_c_tipo,#generar_c_grs,#generar_c_precio").val("")
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

/********************************/
/*    Tabs Generar Cierres      */
/********************************/
function clickModalCierres(){
    $("#btnModalCierres").on('click',function(){
        
        let checkEntregas = $('input[type="checkbox"]:checked').attr('class')
        checkEntregas = checkEntregas.split(" ")
        
        x = $("td.fino." + checkEntregas[2]).html()
        $("#cierresTxt").html(x)
        
        let xyz = $('input[type="checkbox"]:checked').attr('class')
                xyz = xyz.split(" ")

        $("#cierre_id_advance").val(xyz[2])

        $('input[type="checkbox"]').not(this).prop('checked', false);
        setTimeout(function(){
            $("#btnModalCierres").attr("disabled",true)
        }, 2000);
        
    })
}
/********************************/
/*    Tabs Generar Pagos        */
/********************************/
function clickModalPagos(){
    $("#btnModalPagos").on('click',function() {
        console.info("Run: Click Btn cierre 123321")

        $("#generarSaldo").val($("#xhrSaldo").html())
        //btnPagosSaldo()
        
    })
}

/************************************************************/
/*                            SAVE                          */
/************************************************************/

/********************************/
/*    Tabs Generar Cierre       */
/********************************/
function btnCierre(){
    $("#btnGenerarCierre").on('click',function() { 
        console.log("Btn generar cierre")
        $('#cierreModal').modal('hide')
        saveDataCierre()
    }) 
}
/********************************/
/*           Entrega Nueva      */
/********************************/
function btnEntrega(){
    $("#btnGenerarEntrega").on('click',function() { 
        saveEntrega()
    })
}

function btnCierreS(){
    $("#btnGenerarCierres").on('click',function() { 
        console.info("Run: Click Btn cierre simple")
        saveDataCierres()       
    })
}