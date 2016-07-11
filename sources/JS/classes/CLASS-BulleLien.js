var BulleLien = function(argPath,_titre_,_lien_)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Bulle.call(this);
		
	//==========================
	//Variables Membres
	//==========================
	
		this._path=argPath;	//Chemin relatif à l'objet à afficher
		this._type="lien"		//Type de bulle
		this.backgroundColor(couleurBulleLiens);	//Couleur de la bulle
		//this._afficheOmbre=true;	//Affiche ombre
				//this.Kcontour.shadowEnabled(this.afficheOmbre());
		this._lien=_lien_;
		this.titre(_titre_);//Par defaut : on donne le nom du dossie comme titre
		
	//==========================
	//getter/setter
	//==========================
	
		//Affecte/renvoie le chemin du lien associé
		this.path=function(p)
			{
				if(typeof(p)!='undefined')
					this._path=p;
				return this._path;
			}
			
		//Affecte/renvoie le chemin du lien associé
		this.lien=function(l)
			{
				if(typeof(l)!='undefined')
					this._lien=l;
				return this._lien;
			}
	//==========================
	//Autres fonctions membres
	//==========================
	
		//Redessine la bulle (pour remettre le noms aux dimensions)
		this.redessine=function()
			{
				this.Kicone.x(0);
				this.Kicone.y(0);
				
				this.Ktexte.text(this.formateTitre(this.titre()));
				this.Ktexte.x(this.Kicone.width()+5);
				this.Ktexte.y((this.Kicone.height()-this.Ktexte.height())/2);
				
				//this.Kicone.x(this.Ktexte.width()/2-this.Kicone.width()/2);
				//this.Kicone.y(this.Ktexte.y()+this.Ktexte.height());

				this.Kcontour.x(this.Kicone.x()-5);
				this.Kcontour.y(Math.min(this.Ktexte.y(),this.Kicone.y())-5);
				this.Kcontour.width(this.Ktexte.width()+this.Kicone.width()+15);
				this.Kcontour.height(Math.max(this.Ktexte.height(),this.Kicone.height())+10);
				
				this.groupeBulle.x(-this.groupeBulle.getWidth()/2);
				this.groupeBulle.y(-this.groupeBulle.getHeight()/2);
			}


		//Fonction qui définit l'adresse de l'icone, selon le type de bulle utilisé (fonction virtuelle)	
		this.loadIcone=function()
			{
				this.iconeURL("./sources/icones/icone-internet.png");
			}
			
	//==========================
	//Evenements
	//==========================
	
		//Action a effectuer lors d'un double click
		this.actionDoubleClick=function()
		{
			window.open(this.lien());
			return false;
		}
		
	//==========================
	//Construction...
	//==========================

	this.loadIcone();
}
BulleLien.prototype = Object.create(Bulle.prototype);//On recopie le prototype de Bulle
BulleLien.prototype.constructor = BulleLien;//On recopie le constructeur de Noeud dans son prototype

