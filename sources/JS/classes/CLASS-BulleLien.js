class BulleLien extends Bulle
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================
	constructor(_argPath,_titre_,_lien_)
	{
		super();  //Constructeur de la classe mère
		this.name = "Bulle Lien"
		
		this._path = _argPath;	//Chemin relatif à l'objet à afficher
		this.backgroundColor(couleurBulleLiens);	//Couleur de la bulle
		this._lien = _lien_;
		this.titre(_titre_);//Par defaut : on donne le nom du dossie comme titre
		
		this.loadIcone();

		// Evenements
		// ---------------------------
	
		//Action a effectuer lors d'un double click
		this.groupeBulle.on("click", this.actionClic,null,false,{ceci:this});
		
		
	}
	
	
	
	//==========================
	//Variables Membres
	//==========================
	
		//_path = "" ; //Chemin relatif à l'objet à afficher 
		_type = "lien" ; //Type de bulle
		_lien = "" ; // Adresse du lien
		
		
	//==========================
	//getter/setter
	//==========================
		
		//Affecte/renvoie le chemin du lien associé
		/*path(p)
			{
				if(typeof(p)!='undefined')
					this._path=p;
				return this._path;
			}*/
		
		//Affecte/renvoie le chemin du lien associé
		lien(l)
			{
				if(typeof(l)!='undefined')
					this._lien=l;
				return this._lien;
			}
		
		
	//==========================
	//Autres fonctions membres
	//==========================
		
		
		//Redessine la bulle (pour remettre le noms aux dimensions)
		// ECRASE L'ANCIEN (classe mere Bulle)
		//redessine=function()
		//{
		//}
		
		// Fonction qui calcule la position de l'icone dans le cas d'un dossier
		// REMPLACE L'ANCIEN (classe mere Bulle)
		replaceIcone()
		{
			if(this.Gicone.getBounds()) // Si l'image est déjà chargée (?)
			{
				this.Gicone.x = this.Gtitre.x-this.Gicone.getBounds().width-10 ;
 				this.Gicone.y = this.Gtitre.y+this.Gtitre.getBounds().height/2-this.Gicone.getBounds().height/2 ;
			}
		}
		
		
		//Fonction qui définit l'adresse de l'icone, selon le type de bulle utilisé	
		loadIcone()
			{
				this.iconeURL("./sources/icones/icone-internet.png");
			}
		
		
		
		
		actionClic(event,data)
		{
			if(estCeQueCEstUnVraiClic(event,data.ceci))
				window.open(this.parent.lien());
		}
		
		
		
		
}

