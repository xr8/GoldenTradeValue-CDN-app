apiConecction();
/*
|->CAJA.JS
|----- ALLcAJA
|----- sALDO INICIA #b-saldoInicial

*/
$(document).ready(function () {
 
  //---> Bein: All Caja
 fechaIid = $("#start").val()
 allCaja(fechaIid);

//-----> begin:
 $("#reloadCaja").click(function () {

  console.log("Run click allcaja");
  fechaIid = $("#start").val()
  allCaja(fechaIid);

});

$("#start").change(function(){
  console.log("Run change fecha");
  fechaIid = $(this).val()
  allCaja(fechaIid);
});


  //-----> begin:  nuevo saldo
 newSaldoinicial();

 //-----> begin:  nuevo caja
bottonCajaNuevo()

 newRegistrocaja()

nuevaFechainput()

inoutNuevodisabled()

});

/***************************************************************************** 
 *                                                                           *
 *                                                                           *
 *                                  FUNCTION                                 *
 *                                                                           *
 *                                                                           *
 *****************************************************************************/

//---> Bein: All Caja
function allCaja(fechaId) {
  console.info("Run: allcaja");

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
          $("#rMesalert").show(300);
          
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
                '<td class="text-capitalize"                                                                      >' + val.totalbilletes + "</td>" +
                '<td class="text-capitalize"                                                                      >' + val.notas + "</td>" +
              '</tr>'
            );
          //---->

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
      /*


      

      //setTimeout(function(){ calcCeldauno() }, 3000);
      */

     calcCeldauno();
     //

     subTotales();
     calcTotal();
     
     calcAllceldas();

    });
}
//---> End: All Caja


  //---> New caja

//---> Bein: Saldo Inicial
//saldo inicial input  hidden
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
//---> End: Saldo Inicial

//---> New saldo inicial
function newSaldoinicial() {
  console.info("Run: newSaldoinicial");

  $("#saldoInicial").val("$00.00");
  $("#totalbilletesInicial").val("$00.00");
  $("#notasInicial").val("Notas");

  $("#saldoInicial").click(function () {
    $(this).val(" ");
  });
  $("#totalbilletesInicial").click(function () {
    $(this).val(" ");
  });
  $("#notasInicial").click(function () {
    $(this).val(" ");
  });

  $("#saldoInicial").change(function () {
    $("#saldoincialformat").html(new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format($(this).val()));
  });

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
      .always(function () {



      });
  });
}
//---> New saldo inicial


//----> Begin: click save caja
function newRegistrocaja(){

  $("#b-new-caja").click(function () {
    $("#b-new-caja").attr('disabled','disabled')
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
        totalbilletes: $("#caja-billetes").val(),
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

        fechaIid = $("#start").val()
        allCaja(fechaIid);
        saldoInicial();

      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //--->
        console.info("Run: error alluser");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function () {
        //--->
        console.info("Run: allways alluser");

        inoutNuevodisabled()
      });
    //---->
  });
}   
function nuevaFechainput(){
  $("#caja-nuevoFecha").change(function(){
      fecha = $(this).val();
      fecha = fecha.split("-");
      
      let fechadia = fecha[2];
      fechasInputs(fechadia)
  
    })
}

//----->
function fechasInputs(fechadia){
    
  var d = new Date();
  var diaHoy = d.getDate();
  
  var diaLimite = diaHoy - 3;

  //alert("Select day" + fechadia)
  //alert("js day"+diaHoy);
  
  /*fechadia >= diaHoy
    select      js   
      
      && fechadia >= diaLimite

  */

  if(fechadia > diaHoy){
      alert("El registro con fechas futuras no esta permitido")
      inoutNuevodisabled()
  }else if(fechadia <= diaLimite){
    alert("Solo se permite ingresar nuevos registros  del dia actual de ayer y antier")
    $inoutNuevodisabled()
  }else{
    inoutNuevoenabled()
  }


}

function inoutNuevodisabled(){
  /*
  tipo
  monto
  no compra
  nombre
  concepto
  total billetes notas
  */
 $("#caja-nuevoFecha").val("");
  $("#caja-tipo").attr('disabled','disabled');
  $("#caja-monto").val("$00.00").attr('disabled','disabled');
  $("#caja-nocompra").val("No #000").attr('disabled','disabled');
  $("#caja-nombre").val("Golden Trade Value").attr('disabled','disabled');
  $("#caja-concepto").val("Compra, Venta, Comisión").attr('disabled','disabled');
  $("#caja-billetes").val("No #000").attr('disabled','disabled');
  $("#caja-notas").val("Notas de la transacción").attr('disabled','disabled');
  
     $("#caja-monto").click(function (){$(this).val(" ")});
  $("#caja-nocompra").click(function (){$(this).val(" ")});
    $("#caja-nombre").click(function (){$(this).val(" ")});
  $("#caja-concepto").click(function (){$(this).val(" ")});
  $("#caja-billetes").click(function (){$(this).val(" ")});
     $("#caja-notas").click(function (){$(this).val(" ")});
}

function inoutNuevoenabled(){
  $("#caja-tipo").attr('disabled',false);
  $("#caja-monto").attr('disabled',false);
  $("#caja-nocompra").attr('disabled',false);
  $("#caja-nombre").attr('disabled',false);
  $("#caja-concepto").attr('disabled',false);
  $("#caja-billetes").attr('disabled',false);
  $("#caja-notas").attr('disabled',false);  
}

function bottonCajaNuevo(){
  $("#caja-create").click(function(){
    $("#b-new-caja").attr('disabled',false)
    inoutNuevodisabled()
  })
}

 //----> 



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
        "<td></td><td></td><td></td><td></td>" +
        "</tr>"
    );
  }
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
        "<td></td><td></td><td></td><td></td>" +
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
        "<td></td><td></td><td></td><td></td>" +
        "</tr>"
    );
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
  function calcAllceldas() {
    entradaMonto = $("#allCaja .calcular .entradaMonto").each(function (key) {});
    salidaMonto = $("#allCaja .calcular .salidaMonto").each(function (key) {});
    saldoMonto = $("#allCaja .calcular .saldoMonto").each(function (key) {});
  
    imas = entradaMonto.length + 1;
  
    for (var i = 0; i < entradaMonto.length; i++) {
      /**********************************
       *      o$ + 1E = 1$
       **********************************/
  
      x = i + 1;
      y = i + 2;
  
      if (x > i) {
        entradaX = parseInt(entradaMonto[x].textContent.replace(/[^\d\.]*/g, ""));
        salidaX = parseInt(salidaMonto[x].textContent.replace(/[^\d\.]*/g, ""));
      } else {
        entradaX = 0;
        salidaX = 0;
      }
  
      saldoX = parseInt(saldoMonto[i].textContent.replace(/[^\d\.]*/g, ""));
  
      if (entradaX > 0) {
        resultadoX = saldoX + entradaX;
      } else {
        resultadoX = saldoX - salidaX;
      }
  
      //alert("entrada" + entradaX + "salida" + salidaX + "resultado" + resultadoX)
      resultadoX = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(resultadoX);
      //alert("#allCaja ." + y + "target .saldoMonto")
      $("#allCaja ." + y + "target .saldoMonto").html(resultadoX);
    }
  }
  