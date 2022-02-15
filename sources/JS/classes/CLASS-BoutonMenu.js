
// Bouton "abstraite", pour le bouton
class BoutonMenu extends createjs.Container
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================
		constructor(__titre__)
		{
			super(); //Constructeur de la classe mère
			this.name = "Bouton Menu"
			
			this._titre=__titre__
			
			
			// GRAPHISMES
			
			this.cursor = "pointer";
			
			this.Gcontenu = new createjs.Container() ; //Groupe qui contient titre, image, etc.
			
			this.Gtitre = new createjs.Text(__titre__, "10px Calibri", "black");
			this.Gtitre.x = 2;
			this.Gtitre.y = 2;
			this.Gcontenu.addChild(this.Gtitre)		
			

			this.GarrierePlan = new createjs.Shape();
			this.addChild(this.GarrierePlan);
			this.GarrierePlan.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 2, 2, 3);
			
			
			this.addChild(this.Gcontenu); // Mis en dernier pour qu'il soit au premier plan
			
			this.redessineArrierePlan() // Dessine / redessine le rectangle


			// EVENEMENTS
			
			
			this.on("click",this.actionClick,null,false,{objet:this});
			
			this.on("mouseover",this.actionMouseOver);
			this.on("mouseout",this.actionMouseOut) ;
			
		}
		
	//==========================
	//Variables Membres
	//==========================
	
		_titre = "";
		_couleurBouton = "yellow";
		_margin = 4;
		_arrondi = 4;
		
		
	//==========================
	//getter/setter
	//==========================
		couleurBouton(c)
			{
				if(typeof(c)!='undefined')
				{
					this._couleurBouton=c;
					this.redessineArrierePlan();
				}
				return this._couleurBouton;
			}

		titre(t)
			{
				if(typeof(t)!='undefined')
					this._titre=t;
				return this._titre;
			}
			
		margin(m)
			{
				if(typeof(m)!='undefined')
					this._margin=m;
				return this._margin;
			}
		
		arrondi(a)
			{
				if(typeof(a)!='undefined')
					this._arrondi=a;
				return this._arrondi;
			}
			
	//==========================
	//Autres fonctions membres
	//==========================


		//Action à réaliser au clic
		actionClick()
		{
			
		}
	
		//Action à réaliser au passage de la souris
		actionMouseOver()
		{
			this.x += 1;
			this.y += 1;
			this.GarrierePlan.shadow.blur = 1;
			this.GarrierePlan.shadow.color = "rgba(0,0,0,0.8)";
			this.GarrierePlan.shadow.offsetX = 1 ;
			this.GarrierePlan.shadow.offsetY = 1 ;
		}
	
		actionMouseOut()
		{
			this.x -= 1;
			this.y -= 1;
			this.GarrierePlan.shadow.blur = 3;
			this.GarrierePlan.shadow.color = "rgba(0,0,0,0.5)";
			this.GarrierePlan.shadow.offsetX = 2 ;
			this.GarrierePlan.shadow.offsetY = 2 ;
		}
		
		
		redessineArrierePlan()
		{
			//console.log(this.Gcontenu.getBounds())		
			this.GarrierePlan.graphics.clear().beginFill(this._couleurBouton).drawRoundRect(0, 0, this.Gcontenu.getBounds().width+this._margin,    this.Gcontenu.getBounds().height+this._margin, this._arrondi,    this._arrondi, this._arrondi, this._arrondi);
		}
	
}


