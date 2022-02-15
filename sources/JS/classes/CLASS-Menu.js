// Menu qui contient des boutons
class Menu extends createjs.Container
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		constructor()
		{
			super(); //Constructeur de la classe mère
			this.name = "Menu"
		}
		
		
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
		addBouton(bouton)
		{
			if(this.children.length)
			{
				var pos = this.children[this.children.length-1].x + this.children[this.children.length-1].getBounds().width;
				bouton.x = pos;
			}
			bouton.y = -bouton.getBounds().height;
			this.addChild(bouton);
		}
	
	//==========================
	//Graphismes
	//==========================



	//==========================
	//Evenements
	//==========================
		
}


