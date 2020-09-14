console.log("Load Js Usuarios");
apiConecction();

$(document).ready(function(){
	
	console.info('2 Run -> Data')

		//---> Load User
		console.info('Run: Load User');
		allUser();
		
		//---> Update User
		console.info('Run: Update User');
		$("#btnUpdateUser").click(function(event) {			
			updateUser();
			});	

		//---> Delete User
		console.info('Run: Delete User');	
		$("#btnDeleteUser").click(function(event) {			
			deleteUser();
			});	
		
		//--------------------------------------------------------------------------->
		//---> New User
		console.info('Run: New User');

		$("#b-nuew-user").attr("disabled","disabed");

		$("#user-new").click(function(){
			
			$("#exampleInputUsuario").val("");
			newUserCheck();

		});

		$("#b-nuew-user").click(function(){
			newUser();
		});
			
		//console.error("exampleInputUsuario: " +  $(this).val());
		findUser(val="exampleInputUsuario", val2="usuarioHelp",  val3="Usuario min 8 caracteres Alfanumericos A-Z a-z 1-0.")		
		//--------------------------------------------------------------------------->
	})
	
	//---> all user
	function allUser(){
	//--->
		console.info('Run: all user clear div')
		$("#allUser").empty()
		
		//--->
		console.info('Run: all user print div')
		$.getJSON(url_user_all + "?id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",function(data) {
			
			//--->
			$.each(data, function(i, val) {
				if (val.telefono == null) {telefono = "vacio"}else{telefono = val.telefono}
				if (val.puesto == null) {puesto = "vacio"}else{puesto = val.puesto}

					if (val.user == 'admin') {
						$("#allUser").fadeIn(3000).append("<tr class=\"text-center table-primary\"><th scope=\"row\">#</th><td class=\"text-capitalize\">"+val.user+"</td><td class=\"text-capitalize\">"+val.firstname+"</td><td class=\"text-capitalize\">"+val.secondname+"</td><td>"+val.email+"</td><td>"+telefono+"</td><td class=\"text-uppercase\">"+puesto+"</td></tr>");
						}else{
							$("#allUser").fadeIn(3000).append("<tr class=\"text-center\"><th scope=\"row\"><input name=\"idX\" type=\"checkbox\" class=\"idAcheckbox\" id=\""+val.id_advance+"\"></th><td class=\"text-capitalize\">"+val.user+"</td><td class=\"text-capitalize\">"+val.firstname+"</td><td class=\"text-capitalize\">"+val.secondname+"</td><td>"+val.email+"</td><td>"+telefono+"</td><td class=\"text-uppercase\">"+puesto+"</td></tr>");
							}
					

				})				
			//--->

			//--->
			console.info('Run: all user checkbox only one')
			$('input[name="idX"]').click(function(){$('input[name="idX"]').not(this).prop("checked", false);});				

			$('input[name="idX"]').change(function(){
				id_advance = $(this).attr("id");

				$("#iduserupdate").val(id_advance);

				oneUser(id_advance);
				$("#user-update").prop("disabled",false);
				$("#user-delete").prop("disabled",false);
				})
			
				$("#user-update").prop("disabled",true);
				$("#user-delete").prop("disabled",true);

			//--->					
			}).fail(function(jqXHR, textStatus , errorThrown) {

				//--->
				console.info('Run: all user loading error')
				xhrError(jqXHR, textStatus , errorThrown);

		  		}).always(function() {
					//--->
					console.info('Run: all user always')
		  			});			
	//--->		
	}		
	
	//---> all user
	function oneUser(id_advance){
	//--->			
		$.getJSON(url_user_one + "?id_advance="+id_advance+"&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",function(data) {
			
			//--->
			$.each(data, function(i, val) {
				/*
				Message: "Datasuccessful"
				email: "biohizard@gmail.com"
				firstname: "jorge"
				id_advance: "CLjFxfEC16HE9AZ948Ws"
				permissions: "admin"
				puesto: "vendedor"
				secondname: "garibaldo"
				telefono: "55555"
				time: "2019-08-26 17:37:55"
				user: "admin"
				*/
				$("#updateInputUsuario").val(val.user);
				$("#usuariodelete").html(val.user);

				$("#updateInputPermiso").val(val.permissions).change();
				$("#updateInputEmail").val(val.email);
				
				$("#updateInputNombre").val(val.firstname);
				$("#updateInputApellido").val(val.secondname);
					$("#nombredelete").html(val.firstname + " " + val.secondname);

				$("#updateInputTelefono").val(val.telefono);
				$("#updateInputPuesto").val(val.puesto);
				
				})
			//--->

			console.info('4 Run -> Tiempo Aire Load data')
			//--->					
			}).fail(function(jqXHR, textStatus , errorThrown) {

				xhrError(jqXHR, textStatus , errorThrown);
				console.info('5 Run -> Tiempo Aire Load data Error')

				}).always(function() {
				
					console.log( "complete COBRO" );
				
					});	
	//--->		
	}

	//---> user new
	function newUser(){
		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : url_user_new,
		  "method"      : "POST",
		  "headers": {
		  	"xr8-api-key" : "ewf45r4435trge",
		    "content-type" : "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },"data": {
		    "user"        : $("#exampleInputUsuario").val(),
		    "permissions" : $("#exampleInputPermiso").val(),
		    "email"       : $("#exampleInputEmail").val(),
		    "password"    : $("#exampleInputPassword").val(),
		    "first"       : $("#exampleInputNombre").val(),
		    "second"      : $("#exampleInputApellido").val(),
		    "tel"         : $("#exampleInputTelefono").val(),
		    "puesto"      : $("#exampleInputPuesto").val()

		  	}
		}

		//--->
		console.info('Run: user new xhr')
		$.ajax(settings).done(function(data) {
			//--->
			console.info('Run: reload alluser')
				allUser();
				$("#exampleModal").modal('hide');
				$("#exampleInputNombre,#exampleInputApellido,#exampleInputPuesto,#exampleInputTelefono,#exampleInputUsuario,#exampleInputPassword,#exampleInputPermiso,#exampleInputEmail").val("");
			}).fail(function(jqXHR, textStatus , errorThrown) {
					
					//--->
					console.info('Run: error alluser')
	                	xhrError(jqXHR, textStatus , errorThrown);

				}).always(function() {
						//--->
						console.info('Run: allways alluser')
			    	});
		}		
	
	//---> user update
	function updateUser(){
		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : url_user_update,
		  "method"      : "POST",
		  "headers": {
		  	"xr8-api-key" : "ewf45r4435trge",
		    "content-type" : "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },"data": {
		    "id_advance"  : $("#iduserupdate").val(),
		    "user"        : $("#updateInputUsuario").val(),
		    "permissions" : $("#updateInputPermiso").val(),
		    "email"       : $("#updateInputEmail").val(),
		    "password"    : $("#updateInputPassword").val(),
		    "first"       : $("#updateInputNombre").val(),
		    "second"      : $("#updateInputApellido").val(),
		    "tel"         : $("#updateInputTelefono").val(),
		    "puesto"      : $("#updateInputPuesto").val()

		  	}
		}

		//--->
		console.info('Run: user new xhr')
		$.ajax(settings).done(function(data) {
			
			//--->
			console.info('Run: reload alluser')
    			
				allUser();
				$("#updateModal").modal('hide');

			}).fail(function(jqXHR, textStatus , errorThrown) {
					
					//--->
					console.info('Run: error alluser')
	                	xhrError(jqXHR, textStatus , errorThrown);

				}).always(function() {
						//--->
						console.info('Run: allways alluser')
			    	});
	}				

	//---> user delate
	function deleteUser(){

		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : url_user_delete,
		  "method"      : "POST",
		  "headers": {
		  	"xr8-api-key" : "ewf45r4435trge",
		    "content-type" : "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },"data": {
		    "id_advance"  : $("#iduserupdate").val(),
		  	}
		}

		//--->
		console.info('Run: user new xhr')
		$.ajax(settings).done(function(data) {
			
			//--->
			console.info('Run: reload alluser')
 		
			$("#deleteModal").modal('hide');
			allUser();

			}).fail(function(jqXHR, textStatus , errorThrown) {
					
					//--->
					console.info('Run: error alluser')
	                	xhrError(jqXHR, textStatus , errorThrown);

				}).always(function() {
						//--->
						console.info('Run: allways alluser')
			    	});
	}				

 /*
 #############################################################################
 #                 Begin : New User                                          #
 #############################################################################
 */
//--------------------------------------------------------------------------->
function newUserCheck(){
	checkInput(val="exampleInputNombre",  val2="nombreHelp",   val3="Nombre (s) ejemplo Juan Carlos.")
	checkInput(val="exampleInputApellido",val2="apellidoHelp", val3="Apellido (s) ejemplo Hernandez Garcia.")
	checkInput(val="exampleInputPuesto",  val2="puestoHelp",   val3="Puesto de trabajo ejemplo vendedor, supervisor, mantenimiento.")
	checkInput(val="exampleInputTelefono",val2="telefonoHelp", val3="Telefono ejemplo 55 1050 2040")

	checkInput(val="exampleInputUsuario", val2="usuarioHelp",  val3="Usuario min 8 caracteres Alfanumericos A-Z a-z 1-0.")
	checkInput(val="exampleInputPassword",val2="passwordHelp", val3="Password min 8 caracteres Alfanumericos A-Z a-z 1-0.")
	
	checkSelect(val="exampleInputPermiso",val2="permisoHelp",  val3="Permiso para el manejo del sistema.")
	
	checkInput(val="exampleInputEmail",   val2="emailHelp",    val3="Email ejemplo usuario@gmai.com recuerda el email se ocupará para recuperación del password.")
}	
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
function checkInput(val,val2,val3){
	
	clearInput(val,val2,val3);

	$("#" + val).on('change', function() {
		if($(this).val() != ""){
			$("#"+val2).removeClass("text-muted").removeClass("text-success").removeClass("text-danger").addClass("text-success").html("Ok, este campo SI es valido");
			}else{
				$("#"+val2).removeClass("text-muted").removeClass("text-success").removeClass("text-danger").addClass("text-danger").html("Ok, este campo NO es valido, " + val3);
				}
		valInput()
	});
	
}	
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
function checkSelect(val,val2,val3){
	$("#"+val).on('change', function() {
		if(
			$(this).val()         != 'null'
		){
			$("#b-nuew-user").attr("disabled",false);
			$("#permisoHelp").removeClass("text-muted").removeClass("text-success").removeClass("text-danger").addClass("text-success").html("Ok, este campo SI es valido");
			}else{
				$("#b-nuew-user").attr("disabled","disabed");
				$("#permisoHelp").removeClass("text-muted").removeClass("text-success").removeClass("text-danger").addClass("text-danger").html("Ok, este campo NO es valido, Permiso para el manejo del sistema.");
				}
	});

	$("#"+val).on('change', function() {
		if($(this).val()         != 'null'){
			$(this).css({"background-color": "rgb(232, 240, 254) !important;"});
			}else{
				$(this).css({"background-color": "rgb(255, 255, 255) !important;"});
				}
	});
}	
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
function valInput(){
	if(
		empty($('#exampleInputNombre').val())   == false && 
		empty($('#exampleInputApellido').val()) == false && 
		empty($('#exampleInputPuesto').val())   == false && 
		empty($('#exampleInputEmail').val())    == false &&
		empty($("#exampleInputPermiso").val())  == null
	){
		$("#b-nuew-user").attr("disabled",false);
		}else{
			$("#b-nuew-user").attr("disabled","disabed");
			}
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
function clearInput(val,val2,val3){
	$("#" + val).click(function(){
		$(this).val("")
		$("#"+val2).removeClass("text-muted").removeClass("text-success").removeClass("text-danger").addClass("text-danger").html("Ok, este campo NO es valido, " + val3);
		$("#b-nuew-user").attr("disabled","disabed");
	});
}
//--------------------------------------------------------------------------->

//--------------------------------------------------------------------------->
function findUser(val,val2,val3){
	$("#exampleInputUsuario").change(function(){
		x =  $("#"+val).val()
		console.log("findUser")
		
		let settings = {
			"url": url_user_find + x + "&a181a603769c1f98ad927e7367c7aa51=68934a3e9455fa72420237eb05902327",
			"method": "GET",
			"timeout": 0,
			"headers": {
			  "Authorization": "Basic cm9vdDphZG1pbg=="
			},
		  }

		$.ajax(settings).done(function (response) {
			console.log(response);
				if(response){
					if(response[0].Existence == true){
						alert("El usuario " + x + " ya exite")
						$("#exampleInputUsuario").val("")
						$("#usuarioHelp").removeClass("text-muted").removeClass("text-success").removeClass("text-danger").addClass("text-danger").html("Ok, este campo NO es valido, " + val3);
					}else{}
				}else{}
			}).fail(function(jqXHR, textStatus , errorThrown) {			
				console.info('Run: error alluser')
				xhrError(jqXHR, textStatus , errorThrown);
				}).always(function() {
					console.info('Run: allways alluser')
					})
	})
}
//--------------------------------------------------------------------------->