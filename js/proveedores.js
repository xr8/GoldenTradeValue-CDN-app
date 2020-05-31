console.log("Load Js Proveedores");
apiConecction();

$(document).ready(function () {
  console.info("2 Run -> Data");

  //---> Load User
  console.info("Run: Load User");
  allClientes();

  //---> Update User
  console.info("Run: Update User");
  $("#btnUpdateUser").click(function (event) {
    updateClientes();
  });

  //---> Delete User
  console.info("Run: Delete User");
  $("#btnDeleteUser").click(function (event) {
    deleteClientes();
  });

  //---> New User
  console.info("Run: New User");
  $("#b-nuew-user").click(function () {
    newClientes();
  });
});

//---> all user
function allClientes() {
  //--->

  //--->
  console.info("Run: all user clear div");
  $("#allUser").empty();

  //--->
  console.info("Run: all user print div");
  $.getJSON(
    url_proveedores_all +
      "?id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",
    function (data) {
      //--->
      $.each(data, function (i, val) {
        if (val.telefono == null) {
          telefono = "vacio";
        } else {
          telefono = val.telefono;
        }
        if (val.puesto == null) {
          puesto = "vacio";
        } else {
          puesto = val.puesto;
        }

        $("#allUser")
          .fadeIn(3000)
          .append(
            '<tr class="text-center"><th scope="row"><input name="idX" type="checkbox" class="idAcheckbox" id="' +
              val.id_advance +
              '"></th><td class="text-capitalize">' +
              val.rs_rfc +
              '</td><td class="text-capitalize">' +
              val.rs_pais +
              '</td><td class="text-capitalize">' +
              val.rs_giro +
              '</td><td class="text-capitalize">' +
              val.firstname +
              '</td><td class="text-capitalize">' +
              val.secondname +
              "</td><td>" +
              val.email +
              "</td><td>" +
              telefono +
              "</td><td>" +
              val.rfc +
              "</td><td>" +
              val.curp +
              "</td><td>" +
              val.direccion +
              "</td></tr>"
		  );
		  
      });
      //--->

      //--->
      console.info("Run: all user checkbox only one");
      $('input[name="idX"]').click(function () {
        $('input[name="idX"]').not(this).prop("checked", false);
      });

      $('input[name="idX"]').change(function () {
        id_advance = $(this).attr("id");

        $("#iduserupdate").val(id_advance);

        oneClientes(id_advance);
        $("#user-update").prop("disabled", false);
        $("#user-delete").prop("disabled", false);
      });

      $("#user-update").prop("disabled", true);
      $("#user-delete").prop("disabled", true);

      //--->
    }
  )
    .fail(function (jqXHR, textStatus, errorThrown) {
      //--->
      console.info("Run: all user loading error");
      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {
      //--->
      console.info("Run: all user always");
    });
  //--->
}

//---> all user
function oneClientes(id_advance) {
	//--->
  
	$.getJSON(
	  url_proveedores_one +
		"?id_advance=" +
		id_advance +
		"&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",
	  function (data) {
		//--->
		$.each(data, function (i, val) {
		  /*
					  {id_advance: "0f9385c23d1d5825d266", time: "2020-05-29 15:05:15", email: "viernes@gomez.com",…}
					  1_fechaconsti: "2020-05-30"
					  1_giro: "2"
					  1_id_advance: "0f9385c23d1d5825d266"
					  1_pais: "2"
					  1_rfc: "2"
					  Message: "Datasuccessful"
					  curp: "BEML920313HMCLNS09"
					  direccion: "Av. Paseo de la Reforma No 347, Cuauhtémoc, CP 06500 Ciudad de México, CDMX"
					  email: "viernes@gomez.com"
					  firstname: "viernes"
					  id_advance: "0f9385c23d1d5825d266"
					  rfc: "SAOK790530QZ2"
					  secondname: "gomez"
					  telefono: "5511112222"
					  time: "2020-05-29 15:05:15"
					  */
  
		  $("#nombredelete").html(val.firstname + " " + val.secondname);
		  $("#emaildelete").html(val.email);
  
		  $("#updateInputRfc1").val(val.rs_rfc).change();
		  $("#updateInputPais1").val(val.rs_pais).change();
		  $("#updateInputgiro1").val(val.rs_giro).change();
  
		  $("#updateInputNombre").val(val.firstname).change();
		  $("#updateInputApellido").val(val.secondname).change();
		  $("#updateInputEmail").val(val.email).change();
  
		  $("#updateInputTelefono").val(val.telefono).change();
		  $("#updateInputRfc").val(val.rfc).change();
		  $("#updateInputCurp").val(val.curp).change();
  
		  $("#updateInputDireccion").val(val.direccion).change();
		});
		//--->
  
		console.info("4 Run -> Tiempo Aire Load data");
		//--->
	  }
	)
	  .fail(function (jqXHR, textStatus, errorThrown) {
		xhrError(jqXHR, textStatus, errorThrown);
		console.info("5 Run -> Tiempo Aire Load data Error");
	  })
	  .always(function () {
		console.log("complete COBRO");
	  });
  
	//--->
  }

//---> user new
function newClientes() {
  var settings = {
    async: true,
    crossDomain: true,
    url: url_proveedores_new,
    method: "POST",
    headers: {
      "xr8-api-key": "ewf45r4435trge",
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    },
    data: {
		rfc1: $("#exampleInputRfc1").val(),
		pais1: $("#exampleInputPais1").val(),
		giro1: $("#exampleInputgiro1").val(),
		first: $("#exampleInputNombre").val(),
		second: $("#exampleInputApellido").val(),
		email: $("#exampleInputEmail").val(),
		tel: $("#exampleInputTelefono").val(),
		rfc: $("#exampleInputRfc").val(),
		curp: $("#exampleInputCurp").val(),
		direccion: $("#exampleInputDireccion").val()
    }
  };

  //--->
  console.info("Run: user new xhr");
  $.ajax(settings)
    .done(function (data) {
      //--->
      console.info("Run: reload alluser");

      allClientes();
      $("#exampleModal").modal("hide");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      //--->
      console.info("Run: error alluser");
      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {
      //--->
      console.info("Run: allways alluser");
    });
}

//---> user update
function updateClientes() {
  var settings = {
    async: true,
    crossDomain: true,
    url: url_proveedores_update,
    method: "POST",
    headers: {
      "xr8-api-key": "ewf45r4435trge",
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    },
    data: {
		id_advance: $("#iduserupdate").val(),

		rfc1: $("#updateInputRfc1").val(),
		pais1: $("#updateInputPais1").val(),
		giro1: $("#updateInputgiro1").val(),
  
		first: $("#updateInputNombre").val(),
		second: $("#updateInputApellido").val(),
		email: $("#updateInputEmail").val(),
		tel: $("#updateInputTelefono").val(),
		rfc: $("#updateInputRfc").val(),
		curp: $("#updateInputCurp").val(),
		direccion: $("#updateInputDireccion").val()
    }
  };

  //--->
  console.info("Run: user new xhr");
  $.ajax(settings)
    .done(function (data) {
      //--->
      console.info("Run: reload alluser");

      allClientes();
      $("#updateModal").modal("hide");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      //--->
      console.info("Run: error alluser");
      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {
      //--->
      console.info("Run: allways alluser");
    });
}

//---> user delate
function deleteClientes() {
  var settings = {
    async: true,
    crossDomain: true,
    url: url_proveedores_delete,
    method: "POST",
    headers: {
      "xr8-api-key": "ewf45r4435trge",
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    },
    data: {
      id_advance: $("#iduserupdate").val(),
    },
  };

  //--->
  console.info("Run: user new xhr");
  $.ajax(settings)
    .done(function (data) {
      //--->
      console.info("Run: reload alluser");

      $("#deleteModal").modal("hide");
      allClientes();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      //--->
      console.info("Run: error alluser");
      xhrError(jqXHR, textStatus, errorThrown);
    })
    .always(function () {
      //--->
      console.info("Run: allways alluser");
    });
}
