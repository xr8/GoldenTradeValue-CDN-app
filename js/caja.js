//---------------------------------------------------------------------------
$(document).ready(function () {
  console.log(147 + " " + "Entrada Salida");
  apiConecction();
  
  //--------------------------------------------------------------------------->
  /*
  |->CAJA.JS
  |-----> Saldo Inicial
  |----------> click()
  |----------> newSaldoinicial(type)
  |----------> calcMoney()

  BTN
  Saldo Inicial
    Top
      id="saldoinicial-create"
    Modal
      id="cajaCerrar" 
      id="b-new-caja" 

  Entrada/Salida
    Top
      id="btnNewEntradaSalida"
    Modal
      id="btnCajaCerrar"
      id="btnCajaEntradaSalida"
  */
  console.info("Run: Entrada Salida");
  $("#saldoinicial-create").click(function (varFunction) {
    console.info("Disable button save");

   let type = "inicial"
    //-----> begin:  nuevo saldo inicial
    newSaldoinicial(type);

    //-----> begin:
    calcMoney();

    /*no existe #ultimafecha*/
    //utilityUltimafecha()
  });
  //--------------------------------------------------------------------------->

  //--------------------------------------------------------------------------->
  /*
  |->CAJA.JS
  |-----> Entrada Salida
  |----------> click()
  |----------> newSaldoinicial(type)
  |----------> calcMoney()

  BTN
  Entrada/Salida
    Top
      id="btnNewEntradaSalida"
    Modal
      id="btnCajaCerrar"
      id="btnCajaEntradaSalida"
  */
 console.info("Run: Entrada Salida");
 $("#b-new-caja").attr('disabled','disabled');

 $("#btnNewEntradaSalida").click(function (varFunction) {
   console.info("Disable button save");
   fechaTicket()
   let type = "entradasalida"
   //-----> begin:  nuevo saldo inicial
   newSaldoinicial(type);

   //-----> begin:
   calcMoney();

   /*no existe #ultimafecha*/
   //utilityUltimafecha()
 });
 //--------------------------------------------------------------------------->

  //--------------------------------------------------------------------------->
    //---> Begin: All Caja
    fechaIid = $("#start").val();
    allCaja(fechaIid);

    //utilityUltimafecha();
  //--------------------------------------------------------------------------->

  //--------------------------------------------------------------------------->
  //-----> Begin: Reload  All Caja
  $("#start").change(function(){
    console.log("Run change fecha");
    fechaIid = $(this).val()
    allCaja(fechaIid);
  });
//--------------------------------------------------------------------------->  

//--------------------------------------------------------------------------->
  //-----> Begin: Reload  All Caja
  $("#reloadCaja").click(function () {
    console.log("Run click allcaja");
    fechaIid = $("#start").val();
    allCaja(fechaIid);
  });  
//--------------------------------------------------------------------------->


});
//--------------------------------------------------------------------------->

/***************************************************************************** 
 *                                                                           *
 *                                                                           *
 *                                  FUNCTION                                 *
 *                              New Saldo Inicial                            *
 *                                                                           *
 *****************************************************************************/
/*
|->CAJA.JS
|----- newSaldoinicial()
|---------> allCaja()
|---------> saldoInicia()
*/
function newSaldoinicial(type) {
  
  /*
  fechaTicket()
  copyTicketData()
  cerrarCaja()
  */
  /*
  a)
  b)
  c)
  d)
  e)
  f)
  */
 //<option value="inicial">Inicial</option>
  if(type == "inicial"){
    $("#caja-tipo").empty().append("<option value=\"null\">- Opciones -</option><option value=\"inicial\">Inicial</option>")
  }else if(type == "entradasalida"){
    $("#caja-tipo").empty().append("<option value=\"null\">- Opciones -</option><option value=\"entrada\">Entrada</option><option value=\"salida\">Salida</option>")
  }else{
    $("#caja-tipo").empty().append("<option value=\"null\">- Opciones -</option>")
  }

  //a) desabilita los imput
  inputNuevodisabled()
  utilityUltimafecha()
  //b)
  $("#buscador").attr('disabled','disabled');

  //----->
  //c)
  $("#caja-nuevoFecha").change(function () {
    
    nuevaFechainput($(this).val())

    if($(this).val() != "" ){
      $("#fechaHelp").removeClass("text-danger").fadeIn().html('La fecha es correcto.').addClass("text-success");
      $("#buscador").attr('disabled',false);        
      }else{
        $("#buscador").attr('disabled','disabled')      
      } 
      $(this).empty();
  })
  //----->

  //----->
  //d)
  $("#caja-nuevoFecha").click(function(){    
    $(this).val("")
    $("#fechaHelp").removeClass("text-muted");
    $("#fechaHelp").fadeIn().html('La fecha es obligatoria para poder avanzar.').addClass("text-danger");
    $("#buscador").attr('disabled','disabled')
  })
  //----->

  //----->
  //e)  
  $("#buscador").click(function(){    
    $(this).val("")
    $("#nombreHelp").removeClass("text-muted")
    $("#nombreHelp").fadeIn().html('La Nombre es obligatoria para poder avanzar.').addClass("text-danger")
  })
  //----->

  //----->
  //f)
  //f-1)
  //f-2)
    $("#buscador").change(function () {
      if($(this).val() != "" ){
        $("#nombreHelp").removeClass("text-muted").removeClass("text-danger").fadeIn().html('El nombre es correcto.').addClass("text-success");

        //activa el boton de guardar
        //f)
        //f-1)
        inputNuevoenabled()
        //f-2)
        validarInput()

        }else{} 
    })    
  //----->

    //----->
    $("#caja-monto").click(function () {

      $(this).val("")

      clearCajaClose()

    })

    $("#caja-monto").change(function () {
      /*<a 
      class="btn-addMB btn bg-secondary text-light" 
      data-toggle="collapse" 
      href="#multiCollapseExample1-x" 
      role="button" 
      aria-expanded="false" 
      aria-controls="multiCollapseExample1-x">
      Añadir monedas y billetes
      </a>
      */
      if($(this).val() > 0){
        cajaMontoNum= new Intl.NumberFormat("en-US",{style: "currency",currency: "USD",}).format($(this).val());    
      //------------------------------------------------------------------------> X)
      /*Activar el boton de guardar
      Añadir monedas y billetes : valida si es necesario completar estos campos 
      monto = si el monto esta activo
      caja  = si el monedas y billetes esta activo
      */
     let varFunctionx = true
     let varFunction  = "noactive"
      btnValidarMB(varFunctionx,varFunction)
      //------------------------------------------------------------------------> X)

        $("#cajaMonto").html(cajaMontoNum)
        activeBottonCaja()

      }else{}

    })   

  //----->
}
//a) desabilita los imput
function inputNuevodisabled(){

  $("#caja-concepto,#caja-notas,#tipo,#caja-monto,#caja-nocompra").val("");
  $("#caja-concepto,#caja-notas,#tipo,#caja-monto,#caja-nocompra").attr('disabled','disabled');

  $("#caja-concepto,#caja-notas,#tipo,#caja-nocompra").click(function () {$(this).val("")})
}
//f-1)
function inputNuevoenabled(){
  $("#caja-concepto,#caja-notas,#tipo,#caja-monto,#caja-nocompra").val("").attr('disabled',false);
}
//f-2)
function validarInput(){
  console.log("validar Inputs")  

  $("#b-new-caja").on('click',function(){
    
  $(this).attr('disabled','disabled');
      if($("#caja-nuevoFecha").val() == ""){
        alert("El campo Fecha es requerido para continuar")
        }else if($("#buscador").val() == ""){
          alert("El campo Nombre es requerido para continuar")
          }else if($("#caja-concepto").val() == ""){
            alert("El campo Concepto es requerido para continuar")
            }else if($("#caja-tipo").val() == "null"){
              alert("El campo Tipo es requerido para continuar")
              }else if($("#caja-monto").val() == ""){
                alert("El campo Monto es requerido para continuar")
                }else{
                  newRegistrocaja()
                  //printDiv()
                }
  })
}
//----> Begin: click save caja
function newRegistrocaja(){
  
  var saveApicaja     = true
  var cajaIdAdvance   = $("#id_advance").val()
  var cajaNuevaFecha  = $("#caja-nuevoFecha").val()
  var cajaResult      = $("#totalMBstring").val()
  var cajaConcepto    = $("#caja-concepto").val()
  var cajaNotas       = $("#caja-notas").val()
  var cajaTipo        = $("#caja-tipo").val()
  var cajaMonto       = $("#caja-monto").val()
  var cajaNoCompra    = $("#caja-nocompra").val()
  var cajaTotalMBData = $("#totalMBData").val()

  console.log("run ticket copy");
  fechaTicket();
  $("#ticketFecha").html($("#caja-nuevoFecha").val());
  $("#ticketNombre").html($("#buscador").val());
  $("#ticketConcepto").html($("#caja-concepto").val());
  $("#ticketTipo").html($("#caja-tipo").val());
  $("#ticketMonto").html("$" + $("#caja-monto").val());
  $("#ticketTotal").html($("#totalMBData").val());

  

  /*
  copyTicketDataOne((x = "#caja-nuevoFecha"),(y = "#ticketFecha"),   (z = "date"));
  copyTicketDataOne((x = "#caja-nombre"),    (y = "#ticketNombre"),  (z = "str"));
  copyTicketDataOne((x = "#caja-concepto"),  (y = "#ticketConcepto"),(z = "str"));
  copyTicketDataOne((x = "#caja-tipo"),      (y = "#ticketTipo"),    (z = "str"));
  copyTicketDataOne((x = "#caja-monto"),     (y = "#ticketMonto"),   (z = "money"));
  */




  var settings = {
    async: true,
    crossDomain: true,
    url: url_caja_new,
    method: "POST",
    headers: {
      "xr8-api-key"  : "ewf45r4435trge",
      "content-type" : "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    },
    data: {
      cajaIdAdvance  : cajaIdAdvance,
      cajaNuevaFecha : cajaNuevaFecha,
      cajaResult     : cajaResult,
      cajaConcepto   : cajaConcepto,
      cajaNotas      : cajaNotas,
      cajaTipo       : cajaTipo,
      cajaMonto      : cajaMonto,
      cajaNoCompra   : cajaNoCompra,
      cajaTotalMBData: cajaTotalMBData,
      cajaSave       : saveApicaja
    }
  };

    //--->
    console.info("Run: user new xhr");
    $.ajax(settings)
      .done(function (data) {
        //----->ALERT
        $("#sMesalert,#rMesalert").hide(300);

        //----->BUTTON        
        $("#saldoinicial-create").hide(300);
        $("#ticket-print").removeClass("d-none").fadeIn()
        $("#ticket-print").click(function () {printDiv()})
        
        /*no existe #ultimafecha*/
        //utilityUltimafecha()

        inputNuevodisabled()
        fechaIid = $("#start").val()
        allCaja(fechaIid);
        
        $("#ticket-print").removeClass("d-none").fadeIn()

        $("#ticket-print").click(function () {
          printDiv()
        })



      }).fail(function (jqXHR, textStatus, errorThrown) {
        
        //--->
        console.info("Run: error alluser");
        xhrError(jqXHR, textStatus, errorThrown);
        $('#saldoinicialModal').modal('hide')
        alert("Error: No se pudo guardar la informacion.")
        //--->

      }).always(function () {
        
        //--->
        console.info("Run: allways alluser");
        $('#saldoinicialModal').modal('hide')
        //--->
        delete saveApicaja     ;
        delete cajaIdAdvance   ;
        delete cajaNuevaFecha  ;
        delete cajaResult      ;
        delete cajaConcepto    ;
        delete cajaNotas       ;
        delete cajaTipo        ;
        delete cajaMonto       ;
        delete cajaNoCompra    ;
        delete cajaTotalMBData ;
        delete settings;

      });
    //---->
  
}

/*
|->CAJA.JS
|----- monedas()
|---------> calcMondeas()
|-----
|----- billetes()
|---------> calcBilletes()
|--------------> calcMonedasBilletes()
|-------------------> totalMBData()
*/
function calcMoney(){
    /*
    monedas()
    billetes()
    
    
    fechaTicket()
    copyTicketData()
    cerrarCaja()
       */
    //-----> begin:
    autoComplete();

    clearMonedasBilletes();

    
    changeMonedasBilletes();

    cerrarCaja();
}
function changeMonedasBilletes(){
  
  $(".moneda-50c, .moneda-1p, .moneda-2p, .moneda-5p, .moneda-10p, .billete-20p, .billete-50p, .billete-100p, .billete-200p, .billete-500p, .billete-1000p").change(function(){
    
    calcMondeas();
    calcBilletes();
    calcMonedasBilletes();

  })  
 
}
function calcMondeas(){
  var  cincoC  = parseInt($(".moneda-50c").val());
  var  unoP    = parseInt($(".moneda-1p").val());
  var  dosP    = parseInt($(".moneda-2p").val());
  var  cincoP  = parseInt($(".moneda-5p").val());
  var  diezP   = parseInt($(".moneda-10p").val());
  
  if(isNaN(cincoC)){cincoC = 0}
  if(isNaN(unoP))  {unoP   = 0}
  if(isNaN(dosP))  {dosP   = 0}
  if(isNaN(cincoP)){cincoP = 0}
  if(isNaN(diezP)) {diezP  = 0}

  var  totalMonedasTxt = cincoC + "|" + unoP + "|" +  dosP + "|" +  cincoP + "|" + diezP;
  console.log(totalMonedasTxt);

  cincoC  = cincoC*0.5;
  unoP    = unoP*1;
  dosP    = dosP*2;
  cincoP  = cincoP*5;
  diezP   = diezP*10;

  var totalMonedas  = new Intl.NumberFormat("en-US",{style: "currency",currency: "USD",}).format(cincoC + unoP + dosP + cincoP + diezP);
  $("#subTotalMonedas").empty().html(totalMonedas);
  $("#subTotalMonedasCalc").empty().val(totalMonedas);

  /*ticket*/
  $("#ticketSubTotalMonedas").empty().html(totalMonedas);
      
  //calcMonedasBilletes();
}
function calcBilletes(){

  var  veinteP     = parseInt($(".billete-20p").val());
  var  cincuentaP  = parseInt($(".billete-50p").val());
  var  cienP       = parseInt($(".billete-100p").val());
  var  docientosP  = parseInt($(".billete-200p").val());
  var  quinientosP = parseInt($(".billete-500p").val());
  var  milP        = parseInt($(".billete-1000p").val());
  
  if(isNaN(veinteP))    {veinteP     = 0}
  if(isNaN(cincuentaP)) {cincuentaP  = 0}
  if(isNaN(cienP))      {cienP       = 0}
  if(isNaN(docientosP)) {docientosP  = 0}
  if(isNaN(quinientosP)){quinientosP = 0}
  if(isNaN(milP))       {milP        = 0}

  var  totalBilletesTxt = veinteP + "|" + cincuentaP + "|" +  cienP + "|" +  docientosP + "|" + quinientosP + "|" + milP;
  console.log(totalBilletesTxt);

  veinteP     = veinteP * 20;
  cincuentaP  = cincuentaP * 50;
  cienP       = cienP * 100;
  docientosP  = docientosP * 200;
  quinientosP = quinientosP * 500;
  milP        = milP * 1000;

 var  totalBilletes    =  new Intl.NumberFormat("en-US",{style: "currency",currency: "USD",}).format( veinteP + cincuentaP + cienP + docientosP + quinientosP + milP);
  $("#subTotalBilletes").empty().html(totalBilletes);
  $("#subTotalBilletesCalc").empty().val(totalBilletes);

  /*ticket*/
  $("#ticketSubTotalBilletes").empty().html(totalBilletes);
  

  
}
function calcMonedasBilletes() {
 
  var subTotalMonedas      = $("#subTotalMonedas").html();
  var subTotalBilletes     = $("#subTotalBilletes").html();

  var totalMonedasBilletes = parseFloat(subTotalMonedas.replace(/[^\d\.]*/g, "")) + parseFloat(subTotalBilletes.replace(/[^\d\.]*/g, ""));
  var totalMonedasBilletes = new Intl.NumberFormat("en-US",{style: "currency",currency: "USD",}).format(totalMonedasBilletes);

  $("#totalMonedasBilletes").empty().html(totalMonedasBilletes);
  $("#totalMBData").empty().val(totalMonedasBilletes);

  diferenciaMonto = parseFloat($("#caja-monto").val().replace(/[^\d\.]*/g, ""))
  diferenciaTotal = parseFloat($("#totalMBData").val().replace(/[^\d\.]*/g, ""))
  
  diferenciaresta      = diferenciaMonto - diferenciaTotal;
  diferenciaPorcentaje = diferenciaresta * 100;
  diferenciaPorcentaje = diferenciaPorcentaje / diferenciaMonto;
  
  if (diferenciaPorcentaje < 0) {
    
    diferenciarestaPositivo = parseFloat(diferenciaresta) * parseInt(1);
    alert("La suma de los billetes y monedas es mayor por: $" + diferenciarestaPositivo);

  } else if (diferenciaPorcentaje == 0) {

      //------------------------------------------------------------------------> X)
      /*Activar el boton de guardar
      Añadir monedas y billetes : valida si es necesario completar estos campos 
      monto = si el monto esta activo
      caja  = si el monedas y billetes esta activo
      */
     let varFunctionx = true
     let varFunction  = "active"
     btnValidarMB(varFunctionx,varFunction)
     //------------------------------------------------------------------------> X)

        totalMBData()
    
  } else if (diferenciaPorcentaje > 0) {

    /* 3 = 3%  es el diferencia  en porcentaje entre monto y el total */
    if (diferenciaPorcentaje <= 3) {

      //alert("La suma de los billetes y monedas es menor por: $"  + diferenciaresta);

    } else {
    }

  }

}
function totalMBData(){
  var  veinteP    = parseInt($(".billete-20p").val());
  var  cincuentaP = parseInt($(".billete-50p").val());
  var  cienP      = parseInt($(".billete-100p").val());
  var  docientosP = parseInt($(".billete-200p").val());
  var  quinientosP = parseInt($(".billete-500p").val());
  var  milP       = parseInt($(".billete-1000p").val());
  
  if(isNaN(veinteP))    {veinteP     = 0}
  if(isNaN(cincuentaP)) {cincuentaP  = 0}
  if(isNaN(cienP))      {cienP       = 0}
  if(isNaN(docientosP)) {docientosP  = 0}
  if(isNaN(quinientosP)){quinientosP = 0}
  if(isNaN(milP))       {milP        = 0}

  var  totalBilletesTxt = veinteP + "|" + cincuentaP + "|" +  cienP + "|" +  docientosP + "|" + quinientosP + "|" + milP;

  var  cincoC  = parseInt($(".moneda-50c").val());
  var  unoP    = parseInt($(".moneda-1p").val());
  var  dosP    = parseInt($(".moneda-2p").val());
  var  cincoP  = parseInt($(".moneda-5p").val());
  var  diezP   = parseInt($(".moneda-10p").val());
  
  if(isNaN(cincoC)){cincoC = 0}
  if(isNaN(unoP))  {unoP   = 0}
  if(isNaN(dosP))  {dosP   = 0}
  if(isNaN(cincoP)){cincoP = 0}
  if(isNaN(diezP)) {diezP  = 0}

  var  totalMonedasTxt = cincoC + "|" + unoP + "|" +  dosP + "|" +  cincoP + "|" + diezP + "|" ;
  $("#totalMBstring").empty().val(totalMonedasTxt + totalBilletesTxt)
  
}
/*
Añadir monedas y billetes : valida si es necesario completar estos campos 
true  = si el monto esta activo
false = si el monedas y billetes esta activo
*/
//----> validar
//------------------------------------------------------------------------> X)
function btnValidarMB(varFunctionx,varFunction){
  console.log("Run: btnValidarMB: " + varFunction)

  if(varFunctionx == true && varFunction == "active"){
    //activa el boton de guardar
    $("#b-new-caja").attr("disabled", false);
  }

}
        
/*
|->CAJA.JS
|----- autoComplete()
|
*/
//-----> Autocomplete
function autoComplete() {
  console.info("Run: Aautocomplete");
  //--->
  $("#buscador").autocomplete({
    minLength: 4,
    delay: 100,
    source: function (req, add) {
      // XMLHttpRequest --->
      $.getJSON(urlBuscadorAutocomplete, req, function (data) {
        var suggestions = [];
        $.each(data, function (i, val) {
          if (val.Buscador == "Error") {
            suggestions.push({
              id: "Error 101",
              value: "Busqueda fallida",
            });
          } else {
            suggestions.push({
              id: val.id_advance,
              value: val.firstname + " " + val.secondname,
            });
          }
        });
        add(suggestions);
      });
    },
    select: function (event, ui) {
      $("#result").val(" ").val(ui.item.id);
    },
  });
  //--->
}
function clearMonedasBilletes(){
  $(".moneda-50c, .moneda-1p, .moneda-2p, .moneda-5p, .moneda-10p, .billete-20p, .billete-50p, .billete-100p, .billete-200p, .billete-500p, .billete-1000p").click(function (){ 
    $(this).val('')
    calcMondeas();
    calcBilletes();
    calcMonedasBilletes()
  })
}
/* 
  | clearCajaClose()
  ° Desactiva el boton de añadir monedas y billetes
  ° Limpia inputs caja monedas y billetes
  ° Colapsa la caja
*/
function clearCajaClose(){
  $(".moneda-50c, .moneda-1p, .moneda-2p, .moneda-5p, .moneda-10p, .billete-20p, .billete-50p, .billete-100p, .billete-200p, .billete-500p, .billete-1000p").val('')
  $("#cajaMonto").html("$00.00")
  $('#multiCollapseExample1').removeClass("show").addClass("hide")

  $(".btn-addMB").
  removeClass("bg-primary").
  addClass("bg-secondary").
  attr("href"," ").
  attr("href","#multiCollapseExample1-x").
  attr("aria-controls"," ").
  attr("aria-controls","multiCollapseExample1-x")

  $("#subTotalMonedas,#subTotalBilletes,#totalMonedasBilletes").empty().html("$" + 0);
}
/*
|activeBottonCaja()
°activa el boton de añadir monedas y billetes 
*/
function activeBottonCaja(){
  $(".btn-addMB").
        removeClass("bg-secondary").
        addClass("bg-primary").
        attr("href"," ").
        attr("href","#multiCollapseExample1").
        attr("aria-controls","").
        attr("aria-controls","multiCollapseExample1")
}  
  /*
  |->CAJA.JS
  |----- copyTicketData()
  |---------> copyTicketDataOne(x, y, z)
  */

  function copyTicketData() {
    console.log("Run: Copy Ticket 12 + fechaTicket");
    
    fechaTicket();

    copyTicketDataOne((x = "#caja-nuevoFecha"),(y = "#ticketFecha"),   (z = "date"));
    copyTicketDataOne((x = "#caja-nombre"),    (y = "#ticketNombre"),  (z = "str"));
    copyTicketDataOne((x = "#caja-concepto"),  (y = "#ticketConcepto"),(z = "str"));
    copyTicketDataOne((x = "#caja-tipo"),      (y = "#ticketTipo"),    (z = "str"));
    copyTicketDataOne((x = "#caja-monto"),     (y = "#ticketMonto"),   (z = "money"));

    copyTicketDataOne((x = ".moneda-50c"), (y = "#ticketM50"), (z = "str"));
    copyTicketDataOne((x = ".moneda-1p"), (y = "#ticketM1"), (z = "str"));
    copyTicketDataOne((x = ".moneda-2p"), (y = "#ticketM2"), (z = "str"));
    copyTicketDataOne((x = ".moneda-5p"), (y = "#ticketM5"), (z = "str"));
    copyTicketDataOne((x = ".moneda-10p"), (y = "#ticketM10"), (z = "str"));

    copyTicketDataOne((x = ".billete-20p"), (y = "#ticketB20"), (z = "str"));
    copyTicketDataOne((x = ".billete-50p"), (y = "#ticketB50"), (z = "str"));
    copyTicketDataOne((x = ".billete-100p"), (y = "#ticketB100"), (z = "str"));
    copyTicketDataOne((x = ".billete-200p"), (y = "#ticketB200"), (z = "str"));
    copyTicketDataOne((x = ".billete-500p"), (y = "#ticketB500"), (z = "str"));
    copyTicketDataOne((x = ".billete-1000p"),(y = "#ticketB1000"),(z = "str"));


  }

  function copyTicketDataOne(x, y, z) {
    $(x).change(function () {
      if (z == "str") {
        $(y).html($(this).val().toUpperCase());
      } else if (z == "money") {
        $(y).html(
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format($(this).val())
        );
      } else if (z == "date") {
        $(y).html($(this).val());
        console.log("fecha: " + $(this).val())
      }
    });
    /*
    Sub Total Monedas por la line 787
    calcMondeas()  
    #subTotalMonedas -> #ticketSubTotalMonedas

    Sub Total Billetes por la line 838
    calcBilletes() 
    #subTotalBilletes -> #ticketSubTotalBilletes
    
    860
    calcMonedasBilletes() 
    #totalMonedasBilletes -> #ticketTotal
    
    */
  }

/*
|->CAJA.JS
|----- fechaTicket()
|---------> AddZero(num) 
*/  

function fechaTicket(){ 
  var now = new Date(); 
  var strDateTime = [[AddZero(now.getDate()),AddZero(now.getMonth() + 1),now.getFullYear()].join("/"),[AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" "); 
  document.getElementById("fechaTran").innerHTML = strDateTime; 
}

function AddZero(num) { 
  return (num >= 0 && num < 10) ? "0" + num : num + ""; 
}

/*
|->CAJA.JS
|----- cerrarCaja()
|---------> clearTicketData()
*/  

function cerrarCaja() {
  console.log("Run: click cerrar caja");
  $("#cajaCerrar").click(function () {
    clearTicketData();
    clearCajaClose()
  });
}

function clearTicketData() {
  console.log("Run: Clear Ticket");
  $("#ticketFecha").html("0000-00-00")
  $("#ticketNombre").html("AEIOU")
  $("#ticketConcepto").html("AEIOU")
  $("#ticketTipo").html("AEIOU")
  $("#ticketMonto").html("$00.00")
  
  $("#ticketSubTotalMonedas,#ticketSubTotalBilletes,#ticketTotal").html("$00.00")

  $("#ticketM50,#ticketM1,#ticketM2,#ticketM5,#ticketM10,#ticketB20,#ticketB50,#ticketB10,#ticketB200,#ticketB500,#ticketB1000").html("0");

  fechaTicket()
}


//--------------------------------------------------------------------------->
 function newSaldoinicial2() {
  console.info("Run: newSaldoinicial");

  $("#saldoInicial").val("$00.00");
  $("#totalbilletesInicial").val("$00.00");
  $("#notasInicial").val("Notas");

  $("#saldoInicial").click(function () {$(this).val(" ");});
  $("#totalbilletesInicial").click(function () {$(this).val(" ");});
  $("#notasInicial").click(function () {$(this).val(" ");});

  $("#saldoInicial").change(function () {$("#saldoincialformat").html(new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format($(this).val()));});

  $("#b-saldoInicial").click(function () {
    /*

    fecha               Y-m-d
    origen_id_advance   GVT
    saldo               $
    entrada             0
    salida              0
    nocompra            0
    concepto            "Saldo inicia del mes **** "
    totalbilletes
    notas              
    
    INPUT
    saldoInicial
    totalbilletesInicial
    notasInicial
    */
    var settings = {
      url: url_saldo_create,
      method: "POST",
      timeout: 0,
      headers: {
        Authorization: "Basic cm9vdDphZG1pbg==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        fecha: $("#saldoIncialfecha").html(),
        origen_id_advance: "Golden Trade Value",
        tipo: "inicial",
        saldo: $("#saldoInicial").val(),
        entrada: "0",
        salida: "0",
        nocompra: "0",
        concepto: "Saldo inicia del mes",
        totalbilletes: $("#totalbilletesInicial").val(),
        notas: $("#notasInicial").val(),
      },
    };

    $.ajax(settings)
      .done(function (data) {
        console.log(data);
        //----->TABLE
        //$("#rMestabla").show(300);
        //----->ALERT
        $("#sMesalert,#rMesalert").hide(300);
        //----->Modal
        $("#saldoinicialModal").modal("hide");
        //----->BUTTON
        $("#saldoinicial-create").hide(300);

        fechaIid = $("#start").val()
        allCaja(fechaIid);
        saldoInicial();

        console.info("update")        
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.info("Run: error alluser");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function () {});
  });
}

function printDiv() {
  var printContents = document.getElementById("Ticket").innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;

  $("#ticket-print").addClass("d-none");
  location.reload();
}   
//--------------------------------------------------------------------------->

/***************************************************************************** 
 *                                                                           *
 *                                                                           *
 *                                  FUNCTION                                 *
 *                                  All Caja                                 *
 *                                                                           *
 *****************************************************************************/
/*
|->CAJA.JS
|----- AllCaja
|--------> Autocomplete
|--------> calcCeldauno()
|---------> subTotales()
|--------------> calcSalida()
|--------------> calcSaldo()
|--------------> calcEntrada()
|---------> calcTotal()
|---------> calcAllceldas()
*/
 //---> Bein: All Caja
 function allCaja(fechaId) {
  //--->
  console.info("Run: All Caja " + fechaId);
  
  fechaIdAntes  = fechaId.split("-");  
  fechaMesAntes =  parseInt(fechaIdAntes[1]);

  let nowMes  = new Date(); 
  nowMes      = nowMes.getMonth() + 1;

  console.log("Mes Pasado: " + fechaMesAntes + " " + nowMes)

  $("#saldoinicial-create,#btnNewEntradaSalida").hide(300);
  //----->ALERT
  $("#rMestabla").hide()

  urlX = url_caja_all + "?id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09&date=" + fechaId;

  var settings = {
    url:urlX,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: "Basic cm9vdDphZG1pbg==",
    },
  };

  $.ajax(settings)
    .done(function (data) {
      $("#allCaja").empty();
      $("#sMesalert,#rMesalert").hide(300);

      //---> each
      $.each(data, function (i, val) {
        
        if (val.Error == "104") {
          //----> IF
          /*
          Its use is: muestra el 
                                -bottonsaldo inicial
                                -alert saldo inicial
                                -alert regstro encaja
                                         if(fechaMesAntes < nowMes){
          //----->BUTTON
          $("#saldoinicial-create,#btnNewEntradaSalida").hide(300);
        }else{
          $("#saldoinicial-create,#btnNewEntradaSalida").show(300);
        }
          */    
         $("#saldoinicial-create").show(300);
          //----->ALERT
          $("#sMesalert").show(300);
          //$("#rMesalert").show(300);
          
          //----> IF
        } else {
          //----> ELSE

          $("#btnNewEntradaSalida").show(300);
          //----->TABLE
          $("#rMestabla").show(300);

          //----->BUTTON
          

          if (val.origen_id_advance == null) {
            id_ori_adv = "vacio";
          } else {
            id_ori_adv = val.cajaResult;
          }

          if (val.cajaTipo == "entrada") {
            var colortr = "table-secondary";
            var saldotr = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.cajaMonto);
            var tiporegistro ="entrada calcular calculaActivas " + i + "target";
          } else if (val.cajaTipo == "salida") {
            var colortr = "table-danger";
            var saldotr = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.cajaMonto);
            var tiporegistro = "salida calcular calculaActivas " + i + "target";
          } else if (val.cajaTipo == "inicial") {
            var colortr = "table-primary alert-link";
            var saldotr = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.cajaMonto);
            var tiporegistro = "inicial calculaActivas " + i + "target";
          }

          $("#allCaja")
          .fadeIn(3000)
          .append(
              '<tr class="text-center ' + colortr + " " + tiporegistro + ' " id="' + val.id_advance + '"          >' +
                '<th scope="row"><input name="idX" type="checkbox" class="idAcheckbox" id="' + val.id_advance + '">                                            </th>' +
                '<td class="text-capitalize text-left" id="' + val.cajaResult + '"                                >' + val.firstname + " " + val.secondname + "</td>" +
                '<td class="text-capitalize"                                                                      >' + val.cajaNuevaFecha + "</td>" +
                '<td class="text-capitalize"                                                                      >' + val.cajaTipo + "</td>" +
                '<td class="text-lowercase"                                                                       > <span class="alert-link  calcular entradaMonto">' + new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.cajaEntrada) + "</span></td>" +
                '<td class="text-capitalize"                                                                      > <span class="alert-link  calcular salidaMonto">'  + new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.cajaSalida) + "</span></td>" +
                '<td class="text-lowercase"                                                                       > <span class="alert-link  calcular saldoMonto">'   + new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.cajaSaldo) + "</span></td>" +
                '<td class="text-lowercase"                                                                       >' + val.cajaNoCompra + "</td>" +
                '<td class="text-capitalize text-left"                                                            >' + val.cajaConcepto + "</td>" +
              '</tr>'
          );
          //---->
     
          //----> ELSE
        }
        
      })
      //---> each
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.info("Run: all user loading error");
      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function (data) {
      console.log("val:" + data.length)
      
      if(data.length == 0){
       // alert(0)
      }else if(data.length == 1){
       // alert(1)
        calcCeldauno();
        subTotales();
        calcTotal();
      }else if(data.length >= 2){
       // alert(2)
        calcCeldauno();
        subTotales();
        calcTotal();
        calcAllceldas();
      }else if(data.length >= 3){
       // alert(3)
      }
    })
  //--->
}

  //---> Begin: 
  function calcCeldauno() {
    console.info("Run calc Celdauno");
    //-----> x[0]
    entradaMonto = $("#allCaja .calcular .entradaMonto").each(function (key) {});
    entradaMonto = parseInt(entradaMonto[0].textContent.replace(/[^\d\.]*/g, ""));

    //-----> x[0]
    salidaMonto = $("#allCaja .calcular .salidaMonto").each(function (key) {});
    salidaMonto = parseInt(salidaMonto[0].textContent.replace(/[^\d\.]*/g, ""));

    //-----> y[0]
    saldoInicial = $("#allCaja .inicial .saldoMonto").html();
    saldoInicial = parseInt(saldoInicial.replace(/[^\d\.]*/g, ""));

    if (entradaMonto > 0) {
      saldoUno = entradaMonto + saldoInicial;
    } else if (entradaMonto > 0) {
      saldoUno = salidaMonto - saldoInicial;
    }

    $("#allCaja .1target .saldoMonto").html(new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(saldoUno));
  }
  /*
  //---> Begin: calcTotal()
                  calcEntrada()
                  calcSalida()
                  calcSaldo()
  */
  function subTotales() {
    console.info("Run: subTotales");

    subtotalEntrada = calcEntrada()
    subtotalSalida  = calcSalida()
    subtotalSaldo   = calcSaldo()

    $("#allCaja").append(
      '<tr class="table-dark text-center text-dark">' +
        '<th scope="row"></th><td></td><td></td><td></td>' +
        '<td class="text-capitalize"><span class="alert-link">Entrada  </span></td>' +
        '<td class="text-capitalize"><span class="alert-link">Salida   </span></td>' +
        '<td class="text-capitalize"><span class="alert-link">Saldo    </span></td>' +
        '<td></td><td></td>' +
      '</tr>' +
      '<tr class="table-dark text-dark">' +
        '<th scope="row"></th><td></td><td></td>' +
        '<td class="text-capitalize text-left"><span class="alert-link">Subtotal </span></td>' +
        '<td class="text-capitalize text-center"><span class="alert-link">' + subtotalEntrada + '</span></td>' +
        '<td class="text-capitalize text-center"><span class="alert-link">' + subtotalSalida  + '</span></td>' +
        '<td class="text-capitalize text-center"><span class="alert-link">' + subtotalSaldo   + '</span></td>' +
        '<td></td><td></td>' +
      '</tr>'
    );
  }
  /*
  //---> Begin: calcTotal()
                  calcEntrada()
                  calcSalida()
  */
  function calcTotal()  {
    saldoInicial = $("#allCaja .inicial .saldoMonto").html();
    saldoInicial = saldoInicial.replace(/[^\d\.]*/g, "");
    saldoInicial = parseInt(saldoInicial);

    //---->

    subtotalEntrada = calcEntrada();
    subtotalEntrada = subtotalEntrada.replace(/[^\d\.]*/g, "");
    subtotalEntrada = parseInt(subtotalEntrada);

    //---->

    subtotalSalida = calcSalida();
    subtotalSalida = subtotalSalida.replace(/[^\d\.]*/g, "");
    subtotalSalida = parseInt(subtotalSalida);

    //---->

    total = subtotalEntrada - subtotalSalida + saldoInicial;
    total = new Intl.NumberFormat("en-US",{style: "currency",currency: "USD",}).format(total);

    $("#allCaja").append(
      '<tr class="table-dark text-dark">' +
        '<th scope="row"></th><td></td><td></td>' +
        '<td class="text-capitalize text-left"><span class="alert-link">Total </span></td>' +
        "<td></td>" +
        "<td></td>" +
        '<td class="text-capitalize text-center"><span class="alert-link">' + total + "</span></td>" +
        "<td></td><td></td>" +
      "</tr>"
    );
  }
  //---> Begin:
  function calcEntrada() {
    var sumaEntrada = 0;

    $("#allCaja .entrada .entradaMonto").each(function (key) {
      montoEntrada = $(this).html();
      montoEntrada = montoEntrada.replace(/[^\d\.]*/g, "");
      montoEntrada = parseInt(montoEntrada);

      sumaEntrada += montoEntrada;
    });
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(sumaEntrada);
  }
  //---> Begin:
  function calcSalida() {
    var sumaSalida = 0;

    $("#allCaja .salida .salidaMonto").each(function (key) {
      montoEntrada = $(this).html();
      montoEntrada = montoEntrada.replace(/[^\d\.]*/g, "");
      montoEntrada = parseInt(montoEntrada);

      sumaSalida += montoEntrada;
    });
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(sumaSalida);
  }

  //---> Begin:
  function calcAllceldas() {
  //----->
    console.log("Run: calcAllceldas")

    entradaMonto = $("#allCaja .calcular .entradaMonto").each(function (key) {});
    salidaMonto  = $("#allCaja .calcular  .salidaMonto").each(function (key) {});
    saldoMonto   = $("#allCaja .calcular   .saldoMonto").each(function (key) {});
    imas         = entradaMonto.length + 1;

    for (var i = 0; i < entradaMonto.length; i++) {
    //----->

    /**********************************
     *      o$ + 1E = 1$
     **********************************/

    x = i + 1;
    y = i + 2;
    
      if(x > i){

        //----->
        if(x == entradaMonto.length){
        } else {
          entradaX = parseInt(entradaMonto[x].textContent.replace(/[^\d\.]*/g, ""));
          salidaX = parseInt(salidaMonto[x].textContent.replace(/[^\d\.]*/g, ""));
        }
        //----->        

        }else{
          entradaX = 0;
          salidaX  = 0;
        }

      saldoX = parseInt(saldoMonto[i].textContent.replace(/[^\d\.]*/g, ""));

      if (entradaX > 0) {
        resultadoX = saldoX + entradaX;
      } else {
        resultadoX = saldoX - salidaX;
      }

      resultadoX = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(resultadoX);

      $("#allCaja ." + y + "target .saldoMonto").html(resultadoX);

    //----->    
    }

  //----->
  }


  //---> Begin:
  function calcSaldo() {
    montoEntrada = $(".inicial .saldoMonto").html();
    montoEntrada = montoEntrada.replace(/[^\d\.]*/g, "");
    montoEntrada = parseInt(montoEntrada);

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(montoEntrada);
  }


  //----->
/*no existe #ultimafecha*/
function utilityUltimafecha(){
  console.info('utility Ultima fecha')
  urlX = url_caja_utility + "ultimafecha";

  var settings = {
    url:urlX,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: "Basic cm9vdDphZG1pbg==",
    },
  };

  $.ajax(settings)
  .done(function (data) {
    //--->
    $.each(data, function (i, val) {$("#ultimafecha").val(val.cajaNuevaFecha)});
    //--->
    setTimeout(function(){ $("#caja-nuevoFecha").attr('disabled',false) }, 1000);
    
  })
  .fail(function (jqXHR,textStatus,errorThrown) {
      xhrError(jqXHR,textStatus,errorThrown)
  })
  .always(function () {
  })
}


   /*
  |->CAJA.JS
  |----- nuevaFechainpuz()
  |---------> fechasInputs()
  |---------> inputNuevoenabled()
  |---------> inputNuevodisabled() <----> A)->bottonCajaNuevo()
  */
 function nuevaFechainput(val){
    //--------------------------------------------->  
    d = new Date();
    m = d.getDate();

    d      = new Date();
    n      = d.getMonth();
    let mesHoy = n + 1;

    let diaHoy = m;
     mesHoy = "0"+mesHoy;

    //--------------------------------------------->
      let fecha     = $("#ultimafecha").val();
          fecha     = fecha.split("-");  

      let annoFecha = fecha[0];
      let mesFecha  = fecha[1];
      let diaFecha  = fecha[2];
    
      //--------------------------------------------->
      let fechaUi    = val;
       fechaUi    = fechaUi.split("-");  

      let annoUi     = fechaUi[0];
      let mesUi      = fechaUi[1];
      let diaUi      = fechaUi[2];

    fechasInputs(diaHoy,mesHoy,fecha,annoFecha,mesFecha,diaFecha,fechaUi,annoUi,mesUi,diaUi)
  
}

function fechasInputs(diaHoy,mesHoy,fecha,annoFecha,mesFecha,diaFecha,fechaUi,annoUi,mesUi,diaUi){
  console.log("Dia Hoy"+ diaHoy + "mes Hoy: " +  mesHoy)
  console.log("ultima Fecha:" + fecha + " ultima  Fecha Año:" + annoFecha + " ultima  Fecha mes:" + mesFecha + " ultima  Dia Mmes:" + diaFecha)
  console.log("fecha ui:" + fechaUi + " " + "año UI:" + annoUi + " " + "mes UI:" + mesUi + " " + "dia UI:" + diaUi)

  if(mesUi != mesHoy){
    alert("El registro con Mes diferente al actual no son validas y no esta permitido");
    $("#caja-nuevoFecha").val(" ")
  }else if (diaHoy < diaUi) {
    alert("El registro con fecha mayor al dia de hoy no son validas y no esta permitido");
    $("#caja-nuevoFecha").val(" ")
  }else{

    if (typeof(diaFecha) == "undefined") {
      //alert(123)
    }else if (diaFecha > diaUi) {
      //alert(456)
      alert("El registro con fecha menores al ultimo registro no son validas y no esta permitido");
      $("#caja-nuevoFecha").val(" ")
    }

  }
  /*

else if (diaFecha > diaUi) {
    alert("El registro con fecha menores al ultimo registro no son validas y no esta permitido");
    $("#caja-nuevoFecha").val(" ")
  }else if (typeof(diaFecha) == "undefined") {
    alert(123)   
  }

      if (typeof(myVariable) != "undefined"){
      

  if(fechaMes != mesUi){
    alert("El registro con Mes diferente al actual no son validas y no esta permitido");
  }else if (fechainferior > fechaUi) {
    alert("El registro con fecha menores al ultimo registro no son validas y no esta permitido");
  } else if (fechaSuperior < fechaUi) {
    alert("El registro con fecha mayor al dia de hoy no son validas y no esta permitido");
  } else {}
  */

}