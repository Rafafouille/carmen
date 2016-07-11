//Version du 24/03/15



//===========================================================
//Fonctions modifiée de Kinetic
//============================================================

//Largeur d'un groupe *****************************************
Kinetic.Group.prototype.getWidth=function()
{
	var enfants=this.getChildren();	//Liste des enfants
	if(enfants.length==0) return 0; //Si ps d'enfant dans le groupe
	var XMIN=enfants[0].getX();		//Borne du 1er enfant ...
	var XMAX=enfants[0].getX()+enfants[0].getWidth();	//...
	for(var i=1;i<enfants.length;i++)	//Pour chaque autre enfant ...
		{
			if(enfants[i].getX()<XMIN) {XMIN=enfants[i].getX();}	//On compare la borne inf (et on l'enrregistre le cas echeant)
			if(enfants[i].getX()+enfants[i].getWidth()>XMAX) {XMAX=enfants[i].getWidth();}	//On compare la borne sup (et on l'enrregistre le cas echeant)
		}
	return(XMAX-XMIN);	//on retourne la différence des bornes
}

Kinetic.Group.prototype.width=Kinetic.Group.prototype.getWidth;


//Hauteur d'un groupe ******************************************
Kinetic.Group.prototype.getHeight=function()
{
	var enfants=this.getChildren();	//Liste des enfants
	if(enfants.length==0) return 0; //Si ps d'enfant dans le groupe
	var YMIN=enfants[0].getY();		//Borne du 1er enfant ...
	var YMAX=enfants[0].getY()+enfants[0].getHeight();	//...
	for(var i=1;i<enfants.length;i++)	//Pour chaque autre enfant ...
		{
			var enfant=enfants[i];
			if(enfant.getY()<YMIN) {YMIN=enfant.getY();}	//On compare la borne inf (et on l'enrregistre le cas echeant)
			if(enfant.getY()+enfant.getHeight()>YMAX) {YMAX=enfant.getY()+enfant.getHeight();}	//On compare la borne sup (et on l'enrregistre le cas echeant)
		}
	return(YMAX-YMIN);	//on retourne la différence des bornes
}


Kinetic.Group.prototype.height=Kinetic.Group.prototype.getHeight;

//Taille d'un groupe ******************************************
Kinetic.Group.prototype.getSize=function()
{
	return {width:this.getWidth(),height:this.getHeight()};
}



//Points cardinaux ***********************************************
Kinetic.Group.prototype.getNorth=function() {return {x:this.getX()+this.getWidth()/2.,y:this.getY()};}
Kinetic.Group.prototype.getWest=function() {return {x:this.getX(),y:this.getY()+this.getHeight()/2.};}
Kinetic.Group.prototype.getSouth=function() {return {x:this.getX()+this.getWidth()/2.,y:this.getY()+this.getHeight()};}
Kinetic.Group.prototype.getEast=function() {return {x:this.getX()+this.getWidth(),y:this.getY()+this.getHeight()/2.};}

Kinetic.Group.prototype.getNorthEast=function() {return {x:this.getX()+this.getWidth(),y:this.getY()};}
Kinetic.Group.prototype.getNorthWest=function() {return this.getPosition();}
Kinetic.Group.prototype.getSouthEast=function() {return {x:this.getX()+this.getWidth(),y:this.getY()+this.getHeight()};}
Kinetic.Group.prototype.getSouthWest=function() {return {x:this.getX(),y:this.getY()+this.getHeight()};}

Kinetic.Group.prototype.getCenter=function() {return {x:this.getX()+this.getWidth()/2.,y:this.getY()+this.getHeight()/2.};}

