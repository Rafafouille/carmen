var Menu = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Kinetic.Group.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		

	//==========================
	//getter/setter
	//==========================

	

	//==========================
	//Autres fonctions membres
	//==========================


		//Ajoute un bouton à la bonne place
		this.addBouton=function(bouton)
		{
			if(this.children.length)
			{
				var pos=this.children[this.children.length-1].x()+this.children[this.children.length-1].width();
				bouton.x(pos);
			}
			bouton.y(-bouton.height());
			this.add(bouton);
		}
	
	//==========================
	//Graphismes
	//==========================



	//==========================
	//Evenements
	//==========================

	
		

	//==========================
	//Construction...
	//==========================



}
Menu.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Menu.prototype.constructor = Menu;//On recopie le constructeur de Noeud dans son prototype



