apiConecction();

$(document).ready(function () {
  //---> Bein: Saldo Inicial
  //saldoInicial();
  //---> End:  Saldo Inicial

  //---> Bein: All Caja

  allCaja();
  calc();
  calendario();

  $("#reloadCaja").click(function () {
    console.log("Run click allcaja")
    allCaja()
  });
  //---> End:  All Caja

  //---> New User
  newCaja();

  //---> New User

  newSaldoinicial();
});

//---> Bein: Saldo Inicial
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

//---> Bein: All Caja
function allCaja(fechaId) {
  console.info("Run: allcaja");

  $("#rMestabla").fadeOut(3000);

  var settings = {
    url:
      url_caja_all +
      "?id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",
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
            var saldotr = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(val.saldo);
            var tiporegistro = "entrada";
          } else if (val.tipo == "salida") {
            var colortr = "table-danger";
            var saldotr = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(val.saldo);
            var tiporegistro = "salida";
          } else if (val.tipo == "inicial") {
            var colortr = "table-primary alert-link";
            var saldotr = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(val.tipo);
            var tiporegistro = "inicial";
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
              '<tr class="text-center ' +
                colortr +
                " " +
                tiporegistro +
                ' " id="' +
                val.id_advance +
                '">' +
                '<th scope="row"><input name="idX" type="checkbox" class="idAcheckbox" id="' +
                val.id_advance +
                '"></th>' +
                '<td class="text-capitalize text-left" id="' +
                id_ori_adv +
                '">' +
                id_ori_adv +
                "</td>" +
                '<td class="text-capitalize">' +
                val.fecha +
                "</td>" +
                '<td class="text-capitalize">' +
                val.tipo +
                "</td>" +
                '<td class="text-lowercase"> <span class="alert-link entradaMonto">' +
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(val.entrada) +
                "</span></td>" +
                '<td class="text-capitalize"><span class="alert-link salidaMonto">' +
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(val.salida) +
                "</span></td>" +
                '<td class="text-lowercase"> <span class="alert-link saldoMonto">' +
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(val.saldo) +
                "</span></td>" +
                '<td class="text-lowercase">' +
                val.nocompra +
                "</td>" +
                '<td class="text-capitalize text-left">' +
                val.concepto +
                "</td>" +
                '<td class="text-capitalize">' +
                val.totalbilletes +
                "</td>" +
                '<td class="text-capitalize">' +
                val.notas +
                "</td>" +
                "</tr>"
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
    .always(function () {});
}
//---> End: All Caja

function calc() {
  console.info("Run: calc");
  $("#tipo,#exampleInputMonto").click(function () {
    //$("#exampleInputMonto,#exampleInputSaldotext,#exampleInputSaldoval).val("");
  });
  /*
  saldoinicial exampleInputMonto = exampleInputSaldotext

  saldoHelp
  */
  $("#exampleInputMonto").change(function () {
    /*
    if ($("#tipo").val() == "entrada") {
        
      saldo = parseInt($("#saldoinicial").val()) + parseInt($(this).val());
        $("#saldoHelp").html($("#saldoinicial").val() + "+" + $(this).val() + "=" + saldo );

    } else if ($("#tipo").val() == "salida") {

        saldo = parseInt($("#saldoinicial").val()) - parseInt($(this).val());
        $("#saldoHelp").html($("#saldoinicial").val() + "-" + $(this).val() + "=" + saldo );

    }

    */
  });
}

function calendario() {
  console.info("Run: Calendario");

  $("#start").change(function () {
    alert($(this).val());
  });
}

//---> New caja
function newCaja() {
  console.info("Run: newcaja");

  $("#caja-monto").val("$00.00");
  $("#caja-nocompra").val("No #000");
  $("#caja-nombre").val("Golden Trade Value");
  $("#caja-concepto").val("Compra, Venta, Comisión");
  $("#caja-billetes").val("No #000");
  $("#caja-notas").val("Notas de la transacción");

  $("#caja-monto")
  $("#caja-nocompra").click(function () {
    $(this).val(" ");
  });
  $("#caja-nombre").click(function () {
    $(this).val(" ");
  });
  $("#caja-concepto").click(function () {
    $(this).val(" ");
  });
  $("#caja-billetes").click(function () {
    $(this).val(" ");
  });
  $("#caja-notas").click(function () {
    $(this).val(" ");
  });

  //----> Begin: click save caja
  $("#b-new-caja").click(function () {
  

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
        //--->
        console.info("Run: reload alluser");
        allCaja();

        //----->Modal
        $("#createModal").modal("hide");

        //----->ALERT
        $("#rMesalert").hide(300);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //--->
        console.info("Run: error alluser");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function () {
        //--->
        console.info("Run: allways alluser");

        $("#caja-monto").val("$00.00");
        $("#caja-nocompra").val("No #000");
        $("#caja-nombre").val("Golden Trade Value");
        $("#caja-concepto").val("Compra, Venta, Comisión");
        $("#caja-billetes").val("No #000");
        $("#caja-notas").val("Notas de la transacción");
      });
    //---->
  });
  //----> End: click save caja
}
//---> New caja

//---> New saldo inicial
function newSaldoinicial() {
  console.info("Run: newSaldoinicial");

  $("#saldoInicial").val("$00.00")
  $("#totalbilletesInicial").val("$00.00")
  $("#notasInicial").val("Notas")

  $("#saldoInicial").click(function () {$(this).val(" ");});
  $("#totalbilletesInicial").click(function () {$(this).val(" ");});
  $("#notasInicial").click(function () {$(this).val(" ");});


  $("#saldoInicial").change(function () {
    $("#saldoincialformat").html(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format($(this).val())
    );
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
        allCaja();
        saldoInicial();

        //----->BUTTON
        $("#caja-create").show(300);
        $("#saldoinicial-create").hide(300);
        //----->Modal
        $("#saldoinicialModal").modal("hide");
        //----->TABLE
        $("#rMestabla").show(300);
        //----->ALERT
        $("#sMesalert").hide(300);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.info("Run: error alluser");
        xhrError(jqXHR, textStatus, errorThrown);
      })
      .always(function () {});
  });
}
//---> New saldo inicial
