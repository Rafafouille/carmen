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
	createjs.Ticker.setFPS(60);
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
	
if(0)
{

	// Création de la 1ere bulle *************
	bulle0=new BulleDossier(root);
	if(nomBulleRacine!="")
		bulle0.titre(nomBulleRacine);
	bulle0.x((scene.width())/2);
	bulle0.y((scene.height())/2);
	bulle0.loadChildren(ouvrirPremiereBulle);	//On crée (et on ouvre) les 1ers enfants.
	scene.calquePrincipal.add(bulle0);	//Rajout de la 1ere bulle au calque

	// Background *************

	scene.calqueBackground.Kversion= new Kinetic.Text({
				  x: 0,
				  y: $(window).height()-9,
				  text: "Carmen V"+version,
				  fontSize: 9,
				  fontFamily: 'Arial',
				  fill: 'black',
				  opacity: 0.15
				});
	if(afficheBackground)
	{
		scene.calqueBackground.KRectBackground= new Kinetic.Rect({
				width: $(window).width(),
				height: $(window).height(),
				fill: couleurBackground,
				opacity:1
				});
		scene.calqueBackground.add(scene.calqueBackground.KRectBackground);	//Rajout de la 1ere bulle au calque
	}
	scene.calqueBackground.add(scene.calqueBackground.Kversion);	//Rajout de la 1ere bulle au calque



	//Ajout à la scene ************************
	scene.add(scene.calqueBackground);	//Rajout à la scene
	scene.add(scene.calquePrincipal);	//Rajout à la scene
	
	
	//Evenement scroll
	document.addEventListener("mousewheel", function(event){
		event.preventDefault();
		event.stopPropagation();
		var deltaY=event.wheelDeltaY;
		var pos=scene.getPointerPosition();
//		scene.calquePrincipal.position({x:scene.calquePrincipal.x()-pos.x,y:scene.calquePrincipal.y()-pos.y});
		var coef=(1.-deltaY*vitesseZoom/1500);
		scene.calquePrincipal.scaleX(scene.calquePrincipal.scaleX()*coef);
		scene.calquePrincipal.scaleY(scene.calquePrincipal.scaleY()*coef);
		var posSourisLocalCalque={x:pos.x-scene.calquePrincipal.x(),y:pos.y-scene.calquePrincipal.y()};
		var delta={x:posSourisLocalCalque.x*(coef-1),y:posSourisLocalCalque.y*(coef-1)};
		scene.calquePrincipal.position({x:scene.calquePrincipal.x()-delta.x,y:scene.calquePrincipal.y()-delta.y});
		scene.draw();
	}
	, false)
	
	//Evenement drag-and-drop...
	
	
	//Gestion du clic-molette
	$("body").mousedown(function(e) {
		if(e.which==2) //Si on appui avec le milieu de la souris (molette)
		{
			var prev={x:e.pageX,y:e.pageY};
			$("body").mousemove(function(ev){
				var zoom=scene.calquePrincipal.scaleX();
				bulle0.x(bulle0.x()+(ev.pageX-prev.x)/zoom);//originalEvent.movementX);
				bulle0.y(bulle0.y()+(ev.pageY-prev.y)/zoom);//originalEvent.movementY);
				prev={x:ev.pageX,y:ev.pageY};
				scene.draw();
			});
		}
	});

	//Relache le clic-molette
	$("body").mouseup("mouseup",function(e){
		$("body").off("mousemove");
	})


ecartement=0;

	//Touch start
	$("body").on("touchstart",function(ev){
			event.preventDefault();
			ecartement=ev;	
		});


	//Touch
	$("body").on("touchmove",function(ev){
			
		});
	
}	
	

}
