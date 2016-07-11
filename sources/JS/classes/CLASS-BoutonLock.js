var BoutonLock = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		BoutonMenu.call(this,"lock");


	//==========================
	//Variables Membres
	//==========================
	
		this._couleurOpen="#55FF55";
		this._couleurClose="#FF0000";
		this._locked=false;

	//==========================
	//getter/setter
	//==========================
	
		this.couleurOpen=function(c)
			{
				if(typeof(c)!='undefined')
					this._couleurOpen=c;
				return this._couleurOpen;
			}	
		this.couleurClose=function(c)
			{
				if(typeof(c)!='undefined')
					this._couleurClose=c;
				return this._couleurClose;
			}
		this.locked=function(l)
			{
				if(typeof(l)!='undefined')
					this._locked=l;
				return this._locked;
			}

	//==========================
	//Autres fonctions membres
	//==========================


		this.unlock=function()
		{
			var ceci=this;
			$.post(		"./sources/PHP/repondeur.php",
					{
						action:"unlock",
						pathLock:ceci.parent.parent.parent.path()
					},
					function(reponse)
						{
							if(reponse=="OK")
								ceci.unlockGraphique();
						},
					"text"
				);
			
			
		}

		this.unlockGraphique=function()
		{
			this.locked(false);//On ouvre
			this.KarrierePlan.fill(this.couleurOpen());
			this.KlockClosed.visible(false);
			this.KlockOpen.visible(true);
			scene.draw();
		}
	
		this.lock=function()
		{
			var ceci=this;
			$.post(		"./sources/PHP/repondeur.php",
					{
						action:"lock",
						pathLock:ceci.parent.parent.parent.path()
					},
					function(reponse)
						{
							if(reponse=="OK")
								ceci.lockGraphique();
						},
					"text"
				);
		}
	

		this.lockGraphique=function()
		{
			this.locked(true);//On ferme
			this.KarrierePlan.fill(this.couleurClose());
			this.KlockClosed.visible(true);
			this.KlockOpen.visible(false);
			scene.draw();
		}

		this.actionClick=function()
		{
			if(this.locked())//Si fermé
				this.unlock();
			else
				this.lock();
		}
	
	//==========================
	//Graphismes
	//==========================

		if(this.locked())
			this.KarrierePlan.fill(this.couleurClose());
		else
			this.KarrierePlan.fill(this.couleurOpen());
		this.KarrierePlan.width(22);
		this.KarrierePlan.height(22);
		this.Ktitre.visible(false);
		
		var ceci=this;
		var imageOpen = new Image();
		imageOpen.onload = function() {
				ceci.KlockOpen= new Kinetic.Image({
					x: 1,
					y: 1,
					image: imageOpen,
					width: 20,
					height: 20,
					visible: !ceci.locked()
				});
				ceci.add(ceci.KlockOpen);
			};
		imageOpen.src = 'sources/icones/unlock.png';
			
		var imageClose = new Image();
		imageClose.onload = function() {
				ceci.KlockClosed= new Kinetic.Image({
					x: 1,
					y: 1,
					image: imageClose,
					width: 20,
					height: 20,
					visible: ceci.locked()
				});
				ceci.add(ceci.KlockClosed);
			};
		imageClose.src = 'sources/icones/lock.png';


	
	//==========================
	//Evenements
	//==========================

		


	//==========================
	//Construction...
	//==========================



}
BoutonLock.prototype = Object.create(BoutonMenu.prototype);//On recopie le prototype de Kinteic.Group
BoutonLock.prototype.constructor = BoutonLock;//On recopie le constructeur de Noeud dans son prototype



