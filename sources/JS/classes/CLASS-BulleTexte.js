class BulleTexte extends Bulle
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
	constructor(_argPath_,_argNom_,_argTexte_)
	{
		super(); //Constructeur de la classe m�re
		this.name = "Bulle texte"
		
		this.backgroundColor(couleurBulleTexte);	//Couleur de la bulle
		this._titre = _argNom_ ;//Par defaut : on donne le nom du dossie comme titre
		this._texte=_argTexte_;
		this._path = _argPath_+"/"+_argNom_
		
		// Graphismes
		this.Gtexte = new createjs.Text(
						this._texte,
						"italic 15px Calibri",
						"black"
					);
		this.groupeBulle.addChild(this.Gtexte);
		
		this.cursor = "default";
		
		this.redessine();
	}
	
	
	
	//==========================
	//Variables Membres
	//==========================
		
		_type="texte" ;		//Type de bulle
		
		_texte= "" ;		// Texte � afficher
		
	//==========================
	//getter/setter
	//==========================
		//Affecte/renvoie le chemin du lien associ�
		texte(t)
			{
				if(typeof(t)!='undefined')
					{
						this._texte=t;
						this.redessine();
					}
				return this._texte;
			}
			
	//==========================
	//Autres fonctions membres
	//==========================
		//Redessine la bulle (pour remettre le noms aux dimensions)
		// ECRASE L'ANCIEN (classe mere Bulle)
		
		
		redessine()
		{
			if(typeof(this.Gtexte)!="undefined")	// <-- N�cessaire pour le premier appel du constructeur parent (Gtexte n'a aps encore �t� cr��)
			{
				//titre
				this.redessineTitre()
				// texte
				this.redessineTexte();
				//rectangle
				this.redessineContour();
				//L'ensemble
				this.recentreGroupeBulle();
				// Recentre le menu
				this.recentreMenu();
			}
			
			
			
		}
		
		redessineTitre()
		{
			this.Gtitre.visible = false;
		}
		
		
		redessineTexte()
		{
			this.Gtexte.text = this._texte;
			this.Gtexte.x = -this.Gtexte.getBounds().width/2;
			this.Gtexte.y = -this.Gtexte.getBounds().height/2;
		}
		
		// ********************************************************************
		// Efface puis redessine une contour.
		redessineContour()
		{
			if(typeof(this.Gtexte)!="undefined")	// <-- N�cessaire pour le premier appel du constructeur parent (Gtexte n'a aps encore �t� cr��)
			{
				var xmin = this.Gtexte.x;
				var ymin = this.Gtexte.y;
				var xmax = xmin + this.Gtexte.getBounds().width;
				var ymax = ymin + this.Gtexte.getBounds().height;
				
				if(this.Gicone.image.currentSrc!="") // Si on a une icone charg�e
				{
					xmin = Math.min(xmin, this.Gicone.x);
					ymin = Math.min(ymin, this.Gicone.y);
					xmax = Math.max(xmax, this.Gicone.x+this.Gicone.getBounds().width);
					ymax = Math.max(ymax, this.Gicone.y+this.Gicone.getBounds().height); // 
				}
				
				//marges
				var width = (xmax-xmin)+2*this.margin();
				var height = (ymax-ymin)+2*this.margin();
				xmin -= this.margin();
				ymin -= this.margin();
				
					this.Gcontour.graphics.clear(); // On efface l'�ventuel contour pr�c�dent
					this.Gcontour.graphics.beginFill(this.backgroundColor());
					this.Gcontour.graphics.drawRoundRect(xmin, ymin, width, height, 10,10, 10, 10 );
					this.Gcontour.graphics.endFill();
					if(this.afficheOmbre())
						this.Gcontour.shadow = new createjs.Shadow("rgba(0,0,0,0.4)", 7, 7, 7);
					else
						this.Gcontour.shadow = null;
						
					//Update des bornes du shape (pour prise en compte dans les calculs ult�rieurs)
					this.Gcontour.setBounds(xmin, ymin, width, height);
			}
		}
		
}




