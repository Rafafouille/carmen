var BulleTexte = function(argNom,argTexte)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Bulle.call(this);
		
	//==========================
	//Variables Membres
	//==========================
	
		this.backgroundColor(couleurBulleTexte);	//Couleur de la bulle
		this._type="texte"		//Type de bulle
		this.titre(argNom);//Par defaut : on donne le nom du dossie comme titre
		this._texte=argTexte;
		this.margin(5);
		
	//==========================
	//getter/setter
	//==========================
	
		//Affecte/renvoie le chemin du lien associé
		this.texte=function(t)
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
		this.redessine=function()
			{				
				this.Ktexte.text(this.texte());
				this.Ktexte.x(0);
				this.Ktexte.y(0);

				this.Kcontour.x(this.Ktexte.x()-this.margin());
				this.Kcontour.y(this.Ktexte.y()-this.margin());
				this.Kcontour.width(this.Ktexte.width()+2*this.margin());
				this.Kcontour.height(this.Ktexte.height()+2*this.margin());
				
				this.groupeBulle.x(-this.groupeBulle.getWidth()/2);
				this.groupeBulle.y(-this.groupeBulle.getHeight()/2);
			}


			
	//==========================
	//Evenements
	//==========================	

	//==========================
	//Construction...
	//==========================
	
	this.redessine();
}
BulleTexte.prototype = Object.create(Bulle.prototype);//On recopie le prototype de Bulle
BulleTexte.prototype.constructor = BulleTexte;//On recopie le constructeur de Noeud dans son prototype

