console.log("Load Js Usuarios");
apiConecction();

$(document).ready(function(){
	
	console.info('2 Run -> Data')

		//---> Load User
		console.info('Run: Load User');
		allClientes();
		
		//---> Update User
		console.info('Run: Update User');		
		$("#btnUpdateUser").click(function(event) {			
			updateClientes();
			});	

		//---> Delete User
		console.info('Run: Delete User');	
		$("#btnDeleteUser").click(function(event) {			
			deleteClientes();
			});	
		

		//---> New User
		console.info('Run: New User');
	    $("#b-nuew-user").click(function(){
	        newClientes();
	    	});

	})
	
	//---> all user
	function allClientes(){
		//--->

		//--->
		console.info('Run: all user clear div')
		$("#allUser").empty()
		
		//--->
		console.info('Run: all user print div')
		$.getJSON(url_clientes_all + "?id_advance=&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",function(data) {
			
			//--->
			$.each(data, function(i, val) {
				if (val.telefono == null) {telefono = "vacio"}else{telefono = val.telefono}
				if (val.puesto == null) {puesto = "vacio"}else{puesto = val.puesto}

					$("#allUser").fadeIn(3000).append("<tr class=\"text-center\"><th scope=\"row\"><input name=\"idX\" type=\"checkbox\" class=\"idAcheckbox\" id=\""+val.id_advance+"\"></th><td class=\"text-capitalize\">"+val.firstname+"</td><td class=\"text-capitalize\">"+val.secondname+"</td><td>"+val.email+"</td><td>"+telefono+"</td></tr>");

				})				
			//--->

			//--->
			console.info('Run: all user checkbox only one')
			$('input[name="idX"]').click(function(){$('input[name="idX"]').not(this).prop("checked", false);});				

			$('input[name="idX"]').change(function(){
				id_advance = $(this).attr("id");

				$("#iduserupdate").val(id_advance);

				oneClientes(id_advance);
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
	function oneClientes(id_advance){
		//--->			
		
			$.getJSON(url_clientes_one + "?id_advance="+id_advance+"&a181a603769c1f98ad927e7367c7aa51=b326b5062b2f0e69046810717534cb09",function(data) {
				
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
					$("#emaildelete").html(val.email);

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
	function newClientes(){

		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : url_clientes_new,
		  "method"      : "POST",
		  "headers": {
		  	"xr8-api-key" : "ewf45r4435trge",
		    "content-type" : "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },"data": {
		    "email"       : $("#exampleInputEmail").val(),
		    "first"       : $("#exampleInputNombre").val(),
		    "second"      : $("#exampleInputApellido").val(),
		    "tel"         : $("#exampleInputTelefono").val()
		  	}
		}

		//--->
		console.info('Run: user new xhr')
		$.ajax(settings).done(function(data) {
			
			//--->
			console.info('Run: reload alluser')
    			
				allClientes();
				$("#exampleModal").modal('hide');

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
	function updateClientes(){

		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : url_clientes_update,
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
    			
				allClientes();
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
	function deleteClientes(){

		var settings = {
		  "async"       : true,
		  "crossDomain" : true,
		  "url"         : url_clientes_delete,
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
			allClientes();

				}).fail(function(jqXHR, textStatus , errorThrown) {
					
					//--->
					console.info('Run: error alluser')
	                	xhrError(jqXHR, textStatus , errorThrown);

			  		}).always(function() {
						//--->
						console.info('Run: allways alluser')
			    		});




		}				

		