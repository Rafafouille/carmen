//fonction pour le début ================================================
function debug(e,s)
{
    if( typeof(s) == 'undefined' ){
        console.log("> DEBUG : "+e);
    }
    else
	console.log("> DEBUG : ("+s+") "+e);
}


//Fonction qui tente de se connecter =========================================
connection=function()
	{
		var login=$("#login-user").val();//On récupere les login
		var mdp=$("#login-mdp").val();//et mot de pass

		$.post("./sources/PHP/repondeur.php",		//URL de la requete
			{
				action:"login",	//paramètres d'envoi
				login:login,
				mdp:mdp
			},
			function (reponse)
				{	
					if(reponse=="OK")
					{
						$("#messageConnectionReussie").css("display","block");
						$("#messageConnectionRatee").css("display","none");
						setTimeout(function(){location.reload();},1000);
					}
					else
					{
						$("#messageConnectionRatee").css("display","block");
						$("#messageConnectionRatee span").text(reponse);
					}
				},//fin de la fonction callback
				"text"//mode de réception
			);
	}


//Fonction qui tente de se déconnecter =========================================
deconnection=function()
	{

		$.post("./sources/PHP/repondeur.php",		//URL de la requete
			{
				action:"unlog",	//paramètres d'envoi
			},
			function (reponse)
				{	
					if(reponse=="OK")
					{
						$("#messageDeconnectionReussie").css("display","block");
						$("#messageDeconnectionRatee").css("display","none");
						location.reload();
					}
					else
					{
						$("#messageDeconnectionRatee").css("display","block");
					}
				},//fin de la fonction callback
				"text"//mode de réception
			);
	}

// Fonction qui renvoie 1, -1 ou 0 selon le signe du réel x
function signe(x)
	{
		if(x==0)
			return 0;
		if(x<0)
			return -1;
		return 1;
	}
