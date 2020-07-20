$(document).ready(function () {
  
  //---> Begin: All Caja  
  fechaIid = $("#start").val();
  allCaja(fechaIid);
  
  autoComplete();

  //-----> Begin: Reload  All Caja
  $("#reloadCaja").click(function () {
    console.log("Run click allcaja");
    fechaIid = $("#start").val();
    allCaja(fechaIid);
  });
  
  //-----> Begin: Reload  All Caja
  $("#start").change(function(){
    console.log("Run change fecha");
    fechaIid = $(this).val()
    allCaja(fechaIid);
  });
  
  //-----> begin:  nuevo saldo
  newSaldoinicial();

 //-----> begin:  nuevo caja
 bottonCajaNuevo()
 nuevaFechainput()

 monedas()
 billetes()
 
 fechaTicket()
 copyTicketData()
 cerrarCaja()

 utilityUltimafecha()
 
 apiConecction();
});

/***************************************************************************** 
 *                                                                           *
 *                                                                           *
 *                                  FUNCTION                                 *
 *                                  All Caja                                 *
 *                                                                           *
 *****************************************************************************/
/*
|->CAJA.JS
|----- ALLcAJA
|---------> calcCeldauno()
|---------> subTotales()
|--------------> calcSalida()
|--------------> calcSaldo()
|--------------> calcEntrada()
|---------> calcTotal()
|---------> calcAllceldas()
*/
 //---> Bein: All Caja
function allCaja(fechaId) {
  console.info("Run: All Caja");
  
  console.info("Disable button save");
  $("#b-new-caja").attr('disabled','disabled');

  $("#rMestabla").fadeOut(3000);

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
      //---> EACH
      $.each(data, function (i, val) {

        if (val.Error == "104") {
          //----> IF
          /*
          Its use is: muestra el 
                                -bottonsaldo inicial
                                -alert saldo inicial
                                -alert regstro encaja
          */    
          //----->BUTTON
          $("#saldoinicial-create").show(300);
          //----->ALERT
          $("#sMesalert").show(300);
          //$("#rMesalert").show(300);
          
          //----> IF
        } else {
          //----> ELSE

          //----->TABLE
          $("#rMestabla").show(300);

          //----->BUTTON
          $("#caja-create").show(300);

          if (val.origen_id_advance == null) {
            id_ori_adv = "vacio";
          } else {
            id_ori_adv = val.origen_id_advance;
          }

          if (val.tipo == "entrada") {
            
            var colortr = "table-secondary";
            var saldotr = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.saldo);
            var tiporegistro ="entrada calcular calculaActivas " + i + "target";

          } else if (val.tipo == "salida") {
            
            var colortr = "table-danger";
            var saldotr = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.saldo);
            var tiporegistro = "salida calcular calculaActivas " + i + "target";
          
          } else if (val.tipo == "inicial") {

            var colortr = "table-primary alert-link";
            var saldotr = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.tipo);
            var tiporegistro = "inicial calculaActivas " + i + "target";

          }

          $("#saldoinicial").val(
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(val.saldo)
          );
          //---->
          $("#allCaja")
          .fadeIn(3000)
          .append(
              '<tr class="text-center ' + colortr + " " + tiporegistro + ' " id="' + val.id_advance + '"          >' +
                '<th scope="row"><input name="idX" type="checkbox" class="idAcheckbox" id="' + val.id_advance + '"></th>' +
                '<td class="text-capitalize text-left" id="' + id_ori_adv + '"                                    >' + id_ori_adv + "</td>" +
                '<td class="text-capitalize"                                                                      >' + val.fecha + "</td>" +
                '<td class="text-capitalize"                                                                      >' + val.tipo + "</td>" +
                '<td class="text-lowercase"                                                                       > <span class="alert-link entradaMonto">' + new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.entrada) + "</span></td>" +
                '<td class="text-capitalize"                                                                      > <span class="alert-link salidaMonto">'  + new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.salida) + "</span></td>" +
                '<td class="text-lowercase"                                                                       > <span class="alert-link saldoMonto">'   + new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(val.saldo) + "</span></td>" +
                '<td class="text-lowercase"                                                                       >' + val.nocompra + "</td>" +
                '<td class="text-capitalize text-left"                                                            >' + val.concepto + "</td>" +
              '</tr>'
          );
          //---->
/*'<td class="text-capitalize"                                                                      >' + val.totalbilletes + "</td>" +
                '<td class="text-capitalize"                                                                      >' + val.notas + "</td>" + */
          //----> ELSE
        }
        
      });
      //---> EACH
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.info("Run: all user loading error");
      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {
      //
      //setTimeout(function(){ calcCeldauno() }, 3000);

     calcCeldauno();
     //

     subTotales();
     calcTotal();

     setTimeout(function(){ calcAllceldas() }, 3000);
     
    });
}
  //---> Bein: 
  function calcCeldauno() {
    console.info("Run calc Celdauno")
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

    $("#allCaja .1target .saldoMonto").html(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(saldoUno)
    );
  }
  //---> Bein: 
  function subTotales() {
    console.info("Run: subTotales");

    subtotalEntrada = calcEntrada();
    subtotalSalida = calcSalida();
    subtotalSaldo = calcSaldo();

    $("#allCaja").append(
      '<tr class="table-dark text-center text-dark">' +
        '<th scope="row"></th><td></td><td></td><td></td>' +
        '<td class="text-capitalize"><span class="alert-link">Entrada  </span></td>' +
        '<td class="text-capitalize"><span class="alert-link">Salida   </span></td>' +
        '<td class="text-capitalize"><span class="alert-link">Saldo    </span></td>' +
        "<td></td><td></td>" +
        "</tr>" +
        '<tr class="table-dark text-dark">' +
        '<th scope="row"></th><td></td><td></td>' +
        '<td class="text-capitalize text-left"><span class="alert-link">Subtotal </span></td>' +
        '<td class="text-capitalize text-center"><span class="alert-link">' +
        subtotalEntrada +
        "</span></td>" +
        '<td class="text-capitalize text-center"><span class="alert-link">' +
        subtotalSalida +
        "</span></td>" +
        '<td class="text-capitalize text-center"><span class="alert-link">' +
        subtotalSaldo +
        "</span></td>" +
        "<td></td><td></td>" +
        "</tr>"
    );
  }

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
  function calcSaldo() {
    montoEntrada = $(".inicial .saldoMonto").html();
    montoEntrada = montoEntrada.replace(/[^\d\.]*/g, "");
    montoEntrada = parseInt(montoEntrada);

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(montoEntrada);
  }
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
  //---> Bein: 
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
    total = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);

    $("#allCaja").append(
      '<tr class="table-dark text-dark">' +
        '<th scope="row"></th><td></td><td></td>' +
        '<td class="text-capitalize text-left"><span class="alert-link">Total </span></td>' +
        "<td></td>" +
        "<td></td>" +
        '<td class="text-capitalize text-center"><span class="alert-link">' +
        total +
        "</span></td>" +
        "<td></td><td></td>" +
        "</tr>"
    );
  }
  
  //---> Bein: 
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

      //alert("entrada" + entradaX + "salida" + salidaX + "resultado" + resultadoX)
      resultadoX = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(resultadoX);

      //alert("#allCaja ." + y + "target .saldoMonto")
      $("#allCaja ." + y + "target .saldoMonto").html(resultadoX);

    //----->    
    }

  //----->
  }
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
 //---> Bein: 
 function newSaldoinicial() {
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
        $("#caja-create").show(300);
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
  //---> Bein: 
  function saldoInicial() {
    //--->
    console.info("Run: saldoInicial");

    let fecha = $("#start").val();

    var settings = {
      url: url_saldo_read + fecha + "&uGk0ahH53zvvk2aq1Kbr=inicial",
      method: "GET",
      timeout: 0,
      headers: {
        Authorization: "Basic cm9vdDphZG1pbg==",
      },
    };

    //---> AJAX
    $.ajax(settings)
      .done(function (data) {
        console.info(data);

        //---> EACH
        $.each(data, function (i, val) {
          if (val.Error == "104") {
            saldo_x = 0;
            //----->BUTTON
            $("#saldoinicial-create").show(300);
            //----->ALERT
            $("#sMesalert").show(300);
            $("#rMesalert").show(300);
          } else {
            //---->
            saldo_x = val.saldo;

            //---->
          }

          saldo_y = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(saldo_x);
          saldo_x = saldo_x;

          $("#saldoinicial,#nuevoTotal")
            .fadeIn(3000)
            .val(saldo_x)
            .html(saldo_y)
            .attr("placeholder", saldo_x);
        });
        //---> EACH
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.info("Run: all user loading error");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function () {});
    //---> AJAX

    //--->
  }
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
|----- A)bottonCajaNuevo()
|---------> inputNuevodisabled()
*/
function bottonCajaNuevo(){

  $("#caja-create").click(function(){
    inputNuevodisabled()
  })
  validarInput()

}

function inputNuevodisabled(){
  /*
  tipo
  monto
  no compra
  nombre
  concepto
  total billetes notas

col-1
fecha
nombre
concepto
notas

col-2
tipo
monto
no compra
total billetes  
  */


 $("#caja-nuevoFecha").val("");
 $("#caja-nombre").val("").attr('disabled','disabled');
 $("#caja-concepto").val("").attr('disabled','disabled');
 $("#caja-notas").val("").attr('disabled','disabled');

$("#caja-tipo").val("").attr('disabled','disabled');
$("#caja-monto").val("").attr('disabled','disabled');
$("#caja-nocompra").val("").attr('disabled','disabled');

$("#caja-billetes").val("").val("No #000").attr('disabled','disabled');
$("#b-new-caja").attr('disabled','disabled');

$("#caja-nombre,#caja-concepto,#caja-notas").click(function () {$(this).val("");});

}

function validarInput(){
console.log("validar Inputs")  
/*
fecha
nombre
concepto
tipo
monto
monedas y billetes

*/
$("#b-new-caja").click(function () {
  
    /*
    alert($("#caja-nuevoFecha").val())
    alert($("#caja-nombre").val())
    alert($("#caja-concepto").val())
    alert($("#caja-tipo").val())
    alert($("#caja-monto").val())
    */

    if($("#caja-nuevoFecha").val() == ""){
      alert("El campo Fecha es requerido para continuar")
    }else if($("#caja-nombre").val() == ""){
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

});

}
//----> Begin: click save caja
function newRegistrocaja(){

  $("#b-new-caja").click(function () {
    $("#b-new-caja").attr('disabled','disabled');
    $("#ticket-print").addClass("d-none")
    console.info("on po click")

    if ($("#caja-tipo").val() == "entrada") {
      entrada = $("#caja-monto").val();
      salida = 0;
    } else if ($("#caja-tipo").val() == "salida") {
      entrada = 0;
      salida = $("#caja-monto").val();
    } else {
      salida = null;
      entrada = null;
    }
    /*
      console.debug("saldo actual:" + $("#saldoActualinput").val());    
      console.debug("fecha:"        + $("#nuevoFecha").html());
      console.debug("entrada:"      + entrada);
      console.debug("salida:"       + salida);
      console.debug("monto:"        + $("#exampleInputMonto").val());
      console.debug("saldo nuevo:"  + $("#exampleInputSaldoval").val());
      console.debug("no compra     " + $("#exampleInputNocompra").val());
      console.debug("nombre        " + $("#exampleInputNombre").val());
      console.debug("concepto      " + $("#exampleInputConcepto").val());
      console.debug("total billetes" + $("#exampleInputTotalbilletes").val());
      console.debug("notas         " + $("#exampleInputNotas").val());
      */

    let settings = {
      async: true,
      crossDomain: true,
      url: url_caja_new,
      method: "POST",
      headers: {
        "xr8-api-key": "ewf45r4435trge",
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      data: {
        fecha: $("#caja-nuevoFecha").val(),
        origen_id_advance: $("#caja-nombre").val(),
        saldo: "0",
        entrada: entrada,
        salida: salida,
        nocompra: $("#caja-nocompra").val(),
        concepto: $("#caja-concepto").val(),
        totalbilletes: $("#totalMBData").val(),
        notas: $("#caja-notas").val(),
        tipo: $("#caja-tipo").val(),
      },
    };

    //--->
    console.info("Run: user new xhr");
    $.ajax(settings)
      .done(function (data) {

        //----->ALERT
        $("#sMesalert,#rMesalert").hide(300);
        //----->Modal
        $("#createModal").modal("hide");
        //----->BUTTON
        $("#caja-create").show(300);
        $("#saldoinicial-create").hide(300);

        $("#ticket-print").removeClass("d-none").fadeIn()

        $("#ticket-print").click(function () {
          printDiv()
        })


      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //--->
        console.info("Run: error alluser");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function () {
        //--->
        console.info("Run: allways alluser");
        utilityUltimafecha()
        inputNuevodisabled()

        fechaIid = $("#start").val()
        allCaja(fechaIid);

        

      });
    //---->
  });
}   
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
      $("#ultimafecha").empty();
      //---> EACH
      $.each(data, function (i, val) {
        $("#ultimafecha").val(val.fecha);
      });
      //---> EACH

    })
    .fail(function (jqXHR, textStatus, errorThrown) {

      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {

    })
}

 //----> 
/*
|->CAJA.JS
|----- nuevaFechainpuz()
|---------> fechasInputs()
|---------> inputNuevoenabled()
|---------> inputNuevodisabled() <----> A)->bottonCajaNuevo()
*/
function nuevaFechainput(){
  $("#caja-nuevoFecha").change(function(){

      fecha    = $("#ultimafecha").val();
      fecha    = fecha.split("-");  
      fechadia = fecha[2];

      //---->

      var d = new Date();
      var diaHoy = d.getDate();
      
      //---->

      fechaUi    = $(this).val();
      fechaUi    = fechaUi.split("-");  
      diaUi      = fechaUi[2];

      //_--------------------------------------------->

    //ultimo reistro
    fechainferior  = fechadia
    // dia hoy
    fechaSuperior  = diaHoy
    // ui
    fechaUi        = diaUi
    
      fechasInputs(fechainferior,fechaSuperior,fechaUi)
  
    })
}

function fechasInputs(fechainferior, fechaSuperior, fechaUi) {
  if (fechainferior > fechaUi) {
    
    alert("El registro con fecha menores al ultimo registro no son validas y no esta permitido");
    inputNuevodisabled();

  } else if (fechaSuperior < fechaUi) {
    
    alert("El registro con fecha mayor al dia de hoy no son validas y no esta permitido");
    inputNuevodisabled();

  } else {

    inputNuevoenabled();

  }
}

function inputNuevoenabled(){
  $("#caja-tipo").attr('disabled',false);
  $("#caja-monto").attr('disabled',false);
  $("#caja-nocompra").attr('disabled',false);
  $("#caja-nombre").attr('disabled',false);
  $("#caja-concepto").attr('disabled',false);
  $("#caja-billetes").attr('disabled',false);
  $("#caja-notas").attr('disabled',false);  
}

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
      $("#ultimafecha").empty();
      //---> EACH
      $.each(data, function (i, val) {
        $("#ultimafecha").val(val.fecha);
      });
      //---> EACH

    })
    .fail(function (jqXHR, textStatus, errorThrown) {

      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {

    })
}  

jQuery(document).ready(function($) {
  
  // Set the Options for "Bloodhound" suggestion engine
  let engine = new Bloodhound({
    remote: {
      url: url_caja_utility + 'buscar&term=%QUERY%',
      wildcard: '%QUERY%'
    },
    datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
    queryTokenizer: Bloodhound.tokenizers.whitespace
      });

      $(".search-input").typeahead({
          hint: true,
          highlight: true,
          minLength: 3
      }, {
          // This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
          name: 'usersList',          
          source: engine.ttAdapter(),
          // the key from the array we want to display (name,id,email,etc...)
          display: function (data) {return data.nombrecompuesto},
          templates: {
              empty:  ['<a class="list-group-item">Buscar Usuario, Clientes o Provedores...</a>'],
              header: ['<div class="input-group input-results-dropdown">'],
              suggestion: function (data) {return '<a class="text-capitalize list-group-item">'  + data.firstname + ' ' +data.secondname + '</a>'}
          },
          close: function (){alert(123)}
      });
  
  $(".search-input").change(function () {
  $("#result").val(" ").val($(this).val())
  })
  

})

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

  function monedas(){
    $(".moneda-50c, .moneda-1p , .moneda-2p , .moneda-5p , .moneda-10p").click(function (){ 
      $(this).val(" ")
      calcMondeas()
    });
  
    $(".moneda-50c, .moneda-1p , .moneda-2p , .moneda-5p , .moneda-10p").change(function(){
      calcMondeas()
    });
    
    
    calcMondeas()
  
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
  
    var  totalMonedas    = cincoC + unoP + dosP + cincoP + diezP;
    $("#subTotalMonedas").empty().html("$" + totalMonedas);
    /*ticket*/
    $("#ticketSubTotalMonedas").empty().html("$" + totalMonedas);
        
    calcMonedasBilletes();
  }

  function billetes(){
    console.log("A1234567890")
  
    $(".billete-20p, .billete-50p, .billete-100p, .billete-200p, .billete-500p, .billete-1000p").click(function (){ 
      $(this).val(" ")
      calcBilletes()
    });
  
    $(".billete-20p, .billete-50p, .billete-100p, .billete-200p, .billete-500p, .billete-1000p").change(function(){
      calcBilletes()
    });
    
    
    calcBilletes()
  
  }
  function calcBilletes(){
  
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
    console.log(totalBilletesTxt);
  
    veinteP     = veinteP * 20;
    cincuentaP  = cincuentaP * 50;
    cienP       = cienP * 100;
    docientosP  = docientosP * 200;
    quinientosP = quinientosP * 500;
    milP        = milP * 1000;
  
    var  totalBilletes    = veinteP + cincuentaP + cienP + docientosP + quinientosP + milP;
    $("#subTotalBilletes").empty().html("$" + totalBilletes);
  
    /*ticket*/
    $("#ticketSubTotalBilletes").empty().html("$" + totalBilletes);
    
    calcMonedasBilletes();
    
  }
  
  function calcMonedasBilletes(){
    var subTotalMonedas  =  $("#subTotalMonedas").html()
    var subTotalBilletes =  $("#subTotalBilletes").html()
      
    var totalMonedasBilletes = parseFloat(subTotalMonedas.replace(/[^\d\.]*/g, "")) + parseFloat(subTotalBilletes.replace(/[^\d\.]*/g, ""));
    
    if(totalMonedasBilletes == $("#caja-monto").val()){

      var totalMonedasBilletes = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(totalMonedasBilletes);
    
      $("#totalMonedasBilletes").html(totalMonedasBilletes);  
      /*Ticket*/
      $("#ticketTotal").html(totalMonedasBilletes);
      
      totalMBData();
      $("#b-new-caja").attr("disabled",false);

    }else{
      
      falta = totalMonedasBilletes - $("#caja-monto").val() 
      
      if(totalMonedasBilletes > $("#caja-monto").val() ){

        alert("La suma de los billetes y monedas es mayor por: " + falta)

      }else if(totalMonedasBilletes < $("#caja-monto").val() ){
        
        //alert("La suma de los billetes y monedas es menor")

      }else{

        alert("123")
        $("#b-new-caja").attr("disabled",false);

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
    
    $("#totalMBData").empty().val(totalMonedasTxt + totalBilletesTxt)
    
  }

/*
|->CAJA.JS
|----- copyTicketData()
|---------> copyTicketDataOne(x, y, z)
*/
  function copyTicketData() {
    console.log("Run: Copy Ticket 12");

    copyTicketDataOne((x = "#caja-nuevoFecha"),(y = "#ticketFecha"),(z = "date"));
    copyTicketDataOne((x = "#caja-nombre"), (y = "#ticketNombre"), (z = "str"));
    copyTicketDataOne((x = "#caja-concepto"),(y = "#ticketConcepto"),(z = "str"));
    copyTicketDataOne((x = "#caja-tipo"), (y = "#ticketTipo"), (z = "str"));
    copyTicketDataOne((x = "#caja-monto"), (y = "#ticketMonto"), (z = "money"));

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
      alert(123)
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

  function printDiv() {
    var printContents = document.getElementById('Ticket').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    $("#ticket-print").addClass("d-none")
  }   
//--------------------------------------------------------------------------->

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
          if(val.Buscador == "Error"){
            suggestions.push({
              id: "Error 101",
              value: "Busqueda fallida",
            });
          }else{

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