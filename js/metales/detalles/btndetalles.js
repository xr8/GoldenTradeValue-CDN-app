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


function clickModalCierreSdos(){
    $("#btnModalCierreDos").on('click',function(){


        loadingMetalesOne2($('input[type="checkbox"]:checked.checkEntregas').attr("name"))
        loadingVale("save_cierredos")

    })
}
function btnDisables(){
    $("#btnModalCierreSimple,#btnModalEntrega,#btnModalCierreDos").attr("disabled",true).removeClass('btn-primary').addClass('btn-secondary');
}