ID=0;	//Numero courant d'une bulle (0 au debut)


//Une fois chargée... INITIALISATION !!!!
window.onload = function()
{

	//Création de la scene ***************************
	$('#scene').attr("width",$(window).width());	// On redimensionne le canvas aux dimensions de la fenetre
	$('#scene').attr("height",$(window).height());
	SCENE = new createjs.Stage("scene");
	
	SCENE.enableMouseOver(30); // Permet d'activer les "rollover", "rollout", le type CSS de cursor, etc.
		

	// Création de calques *******************
		
	/*SCENE.calqueBackground = new createjs.Container();
		SCENE.addChild(SCENE.calqueBackground);*/
		
	SCENE.calquePrincipal = new createjs.Container();
		SCENE.calquePrincipal.x = $(window).width()/2 ;
		SCENE.calquePrincipal.y = $(window).height()/2 ;
		SCENE.addChild(SCENE.calquePrincipal);
	
	
	
	
	// Création de la 1ere bulle *************
	
	BULLE0 = new BulleDossier(root);
		SCENE.calquePrincipal.addChild(BULLE0);
		if(nomBulleRacine!="")
			BULLE0.titre(nomBulleRacine);
		BULLE0.loadChildren(ouvrirPremiereBulle);	//On crée (et on ouvre) les 1ers enfants.
		BULLE0.Gconnecteur.visible=false;	//On efface la queue
		if(AFFICHE_MENU)
			BULLE0.menu.visible = false,
	
	
	
	
	
	
	
	
	// Pour les animations, il faut mettre un "métronome" (static)
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", SCENE);
	
	
	SCENE.update();// Dessine
	
	
	
	// Evenements souris
	creeZoom(SCENE.calquePrincipal, SCENE)
	
	
	// Evenement resize Windows 
	window.addEventListener("resize",function(evt)
		{
			var w = window.innerWidth; // -2 accounts for the border
   			var h = window.innerHeight;
			SCENE.canvas.width = w;
			SCENE.canvas.height = h;
		})
		
	

}
