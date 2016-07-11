var BoutonMenu = function(__titre__)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Kinetic.Group.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		this._titre=__titre__
		this._couleurBouton="yellow";

	//==========================
	//getter/setter
	//==========================

		this.couleurBouton=function(c)
			{
				if(typeof(c)!='undefined')
					this._couleurBouton=c;
				return this._couleurBouton;
			}

		this.titre=function(t)
			{
				if(typeof(t)!='undefined')
					this._titre=t;
				return this._titre;
			}
	//==========================
	//Autres fonctions membres
	//==========================

		this.actionClick=function()
		{
			
		}
	
		this.actionMouseOver=function()
		{
			this.x(this.x()+1);
			this.y(this.y()+1);
			this.KarrierePlan.shadowBlur(1);
			this.KarrierePlan.shadowOpacity(0.8);
			this.KarrierePlan.shadowOffset({x:1,y:1});
			scene.draw()
		}
	
		this.actionMouseOut=function()
		{
			this.x(this.x()-1);
			this.y(this.y()-1);
			this.KarrierePlan.shadowBlur(3);
			this.KarrierePlan.shadowOpacity(0.5);
			this.KarrierePlan.shadowOffset({x:2,y:2});
			scene.draw()
		}
		
	//==========================
	//Graphismes
	//==========================

		this.Ktitre=new  Kinetic.Text({
					   text: this.titre(),
					   fontSize: 10,
						   fontFamily: 'Calibri',
					   fill: 'black',
					   align:"left",
					   x:2,
					   y:2
					});
					
		this.KarrierePlan=new Kinetic.Rect({
								width: this.Ktitre.width()+4,
								height: this.Ktitre.height()+4,
								fill: this.couleurBouton(),
								stroke: null,//this.strokeColor(),
								cornerRadius: 4,
								x:0,
								y:0,
								shadowColor: 'black',
								shadowBlur: 3,
								shadowOffset: {x:2,y:2},
								shadowOpacity: 0.5,
								shadowEnabled:true
							});
							
							
		this.add(this.KarrierePlan);
		this.add(this.Ktitre);

	//==========================
	//Evenements
	//==========================

		
		var cela=this;
		this.on("click",function(){cela.actionClick();});
		
		this.on("mouseover",function(){cela.actionMouseOver();});
		this.on("mouseout",function(){cela.actionMouseOut();});

	//==========================
	//Construction...
	//==========================



}
BoutonMenu.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
BoutonMenu.prototype.constructor = BoutonMenu;//On recopie le constructeur de Noeud dans son prototype



