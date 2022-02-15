


// ----------------------------------
// FONCTION PRINCIPALE
// -------------------------------------
// Fonction qui gère les commandes de souris pour zoomer
// cible = objet createjs que l'on veut faire bouger/zoomer
// Stage : la scene
function creeZoom(cible, stage, callback, options)
{
	// Autorise l'utilisation de Touch
	//if(createjs.Touch.isSupported())
		createjs.Touch.enable(stage);
	
	// Drag And Drop
	stage.on("stagemousedown",evenementMoletteDown,null,false,{cible:cible})

	// Wheel  (attention : l'évenement est défini via un élément html (canvas), ce qui est différent de createjs
	stage.canvas.addEventListener("wheel",function(event){actionMolette(event,{cible:cible,stage:stage})})
	
	// Création de deux éléments qui correspondent à la position des doigts
	DOIGT1_ZOOM_POSITION = {x:null,y:null}
	DOIGT2_ZOOM_POSITION = {x:null,y:null}
	
	//Suivit des doigts
	stage.on("stagemousemove",suivreDoigts,null,false,{cible:cible})
	
	// Relache les doitgs
	
	stage.on("stagemouseup",releveDoigts,null,false,{cible:cible})
	
}



// ----------------------------------
// Déplacement
// -------------------------------------
function evenementMoletteDown(event,data)
{
	if(event.pointerID==-1 && event.nativeEvent.which == 2) // Si c'est une souris et qu'en plus c'est la molette
	{
		cible = data.cible ;	// Objet que l'on veut faire bouger

		
		//On créer l'action de bouger
		// Rappele : on("type evenement", fonction_callback, scope=null, once=false, parametres supplémentaires
		this.on("stagemousemove",suivreSouris,null,false,{cible:cible , mouseDepart:{x:event.stageX ,y:event.stageY}, cibleDepart:{x: cible.x, y: cible.y} })
	}
	else if(event.pointerID==0)
	{
		DOIGT1_ZOOM_POSITION = {x:event.stageX, y:event.stageY}//data.cible.globalToLocal(event.stageX, event.stageY);
	}
	else if(event.pointerID==1)
	{
		DOIGT2_ZOOM_POSITION = {x:event.stageX, y:event.stageY}//data.cible.globalToLocal(event.stageX, event.stageY)
	}
	
}

// Fonction qui fait suivre la souris (les données du début du mouvement sont
// passées dans data)
function suivreSouris(event,data)
{
	// Déplacmeent de la souris depuis le départ (souris actuel moins départ)
	var dX = event.stageX - data.mouseDepart.x ;
	var dY = event.stageY - data.mouseDepart.y ;
	
	data.cible.x = data.cibleDepart.x + dX;
	data.cible.y = data.cibleDepart.y + dY;
	
	// On créee l'événement quand on releve la souris
	this.on("stagemouseup",arreteSuivreSouris,null,true)
}
// Fonction qui fait arrêter le suivi
function arreteSuivreSouris(event,data)
{
	this.removeAllEventListeners("stagemousemove");
}



// ----------------------------------
// Doigts
// -------------------------------------

function suivreDoigts(event,data)
{
	if(event.pointerID==0 && DOIGT2_ZOOM_POSITION.x != null )	// Si c'est le doigts 1 qui bouge et qu'on a le doigt 2 appuyé
	{
		var cible = data.cible
		var pos_new = {x:event.stageX,y:event.stageY};

		// Point milieu
		var milieuOld = {x: 0.5*(DOIGT1_ZOOM_POSITION.x+DOIGT2_ZOOM_POSITION.x), y :0.5*(DOIGT1_ZOOM_POSITION.y+DOIGT2_ZOOM_POSITION.y)}
		var milieuNew = {x: 0.5*(pos_new.x+DOIGT2_ZOOM_POSITION.x), y :0.5*(pos_new.y+DOIGT2_ZOOM_POSITION.y)}
		var depMilieu = {x: milieuNew.x-milieuOld.x, y :milieuNew.y-milieuOld.y}

		// Zoom
		var distanceOld = Math.sqrt( Math.pow(DOIGT1_ZOOM_POSITION.x-DOIGT2_ZOOM_POSITION.x,2) +  Math.pow(DOIGT1_ZOOM_POSITION.y-DOIGT2_ZOOM_POSITION.y,2) );
		var distanceNew= Math.sqrt( Math.pow(pos_new.x-DOIGT2_ZOOM_POSITION.x,2) +  Math.pow(pos_new.y-DOIGT2_ZOOM_POSITION.y,2) );
		var facteur = distanceNew/distanceOld
		cible.scale *= facteur;
				
		//Déplacement du calque
		cible.x += depMilieu.x+(1-facteur)*(milieuNew.x-cible.x);
		cible.y += depMilieu.y+(1-facteur)*(milieuNew.y-cible.y);

		DOIGT1_ZOOM_POSITION = pos_new ;
	}
	else if(event.pointerID==1 && DOIGT1_ZOOM_POSITION.x != null)	// Si c'est le doigts 2 qui bouge et qu'on a appuyé sur le 1er doigt
	{
		var cible = data.cible
		var pos_new = {x:event.stageX,y:event.stageY};
		
		// Point milieu
		var milieuOld = {x: 0.5*(DOIGT1_ZOOM_POSITION.x+DOIGT2_ZOOM_POSITION.x), y :0.5*(DOIGT1_ZOOM_POSITION.y+DOIGT2_ZOOM_POSITION.y)}
		var milieuNew = {x: 0.5*(pos_new.x+DOIGT1_ZOOM_POSITION.x), y :0.5*(pos_new.y+DOIGT1_ZOOM_POSITION.y)}

		
		var depMilieu = {x: milieuNew.x-milieuOld.x, y :milieuNew.y-milieuOld.y}

		// Zoom
		var distanceOld = Math.sqrt( Math.pow(DOIGT1_ZOOM_POSITION.x-DOIGT2_ZOOM_POSITION.x,2) +  Math.pow(DOIGT1_ZOOM_POSITION.y-DOIGT2_ZOOM_POSITION.y,2) );
		var distanceNew= Math.sqrt( Math.pow(pos_new.x-DOIGT1_ZOOM_POSITION.x,2) +  Math.pow(pos_new.y-DOIGT1_ZOOM_POSITION.y,2) );
		var facteur = distanceNew/distanceOld
		cible.scale *= facteur;
		
		//Déplacement du calque
		cible.x += depMilieu.x+(1-facteur)*(milieuNew.x-cible.x);
		cible.y += depMilieu.y+(1-facteur)*(milieuNew.y-cible.y);

		DOIGT2_ZOOM_POSITION = pos_new ;
	}
	
}


function releveDoigts(event,data)
{
	
	if(event.pointerID==0)	// Si c'est le doigts 1 qui se leve
	{
		DOIGT1_ZOOM_POSITION = {x:null, y:null};
	}
	else if(event.pointerID==1)	// Si c'est le doigts 2 qui se leve
	{
		DOIGT2_ZOOM_POSITION = {x:null, y:null};
	}
}

// ----------------------------------
// Zoom
// -------------------------------------

function actionMolette(event,data)
{
	// La cible
	var cible = data.cible
	var stage = data.stage

	// La molette
	event.preventDefault(); // Supprime le scrolling d'origine
	var val = event.wheelDelta;
	var facteur = 1+val/1000;
	
	var posSouris = {x:event.x, y:event.y}
	var posCible = {x:cible.x,y:cible.y}


	cible.scaleX *= facteur;
	cible.scaleY *= facteur;
	
	// MAJ de la position du dessin et des axes
	cible.x -= (1-facteur)*(posCible.x-posSouris.x)
	cible.y -= (1-facteur)*(posCible.y-posSouris.y)
}

