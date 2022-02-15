
// Bouton lock
class BoutonLock extends BoutonMenu
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================
		constructor()
		{
		
			super("lock"); //Constructeur de la classe mère
			this.name = "Bouton Lock"
			
			
			// GRAPHISME
				
			this.Gtitre.visible = false ;
			this.GlockOpen = new createjs.Bitmap("./sources/icones/unlock.png");
			this.GlockOpen.scale = 20/64. ;
			this.GlockOpen.x = 2 ;
			this.GlockOpen.y = 2 ;
			this.Gcontenu.addChild(this.GlockOpen) ;
			this.GlockOpen.setBounds(2,2,64,64) ; // Dimesions de l'image (pour qu'elle soit accessible, meme si elle est pas encore chargée)
			
			this.GlockClosed = new createjs.Bitmap("./sources/icones/lock.png") ;
			this.GlockClosed.scale = 20/64. ;
			this.GlockClosed.x = 2 ;
			this.GlockClosed.y = 2 ;
			this.Gcontenu.addChild(this.GlockClosed) ;
			this.GlockClosed.setBounds(2,2,64,64) ; // Dimesions de l'image (pour qu'elle soit accessible, meme si elle est pas encore chargée)
			
			this.redessineArrierePlan() // Dessine / redessine le rectangle
			
			this.locked(false); // Par defaut
			
			
			this.on("mouseover",this.inverseGraphique);
			this.on("mouseout",this.retablitGraphique) ;
			

		}
		
		
	//==========================
	//Variables Membres
	//==========================
	
		_couleurOpen="#55FF55";
		_couleurClose="#FF0000";
		_locked=false;
		
	//==========================
	//getter/setter
	//==========================
	
		couleurOpen(c)
			{
				if(typeof(c)!='undefined')
					this._couleurOpen=c;
				return this._couleurOpen;
			}	
		couleurClose(c)
			{
				if(typeof(c)!='undefined')
					this._couleurClose=c;
				return this._couleurClose;
			}
		locked(l)
			{
				if(typeof(l)!='undefined')
				{
					this._locked=l;
					if(l) // Si bloqué
					{
						this.lockGraphique(); // Change l'allure du bouton
					}
					else // Si débloqué
					{
						this.unlockGraphique();
					}
				}
				return this._locked;
			}

	//==========================
	//Autres fonctions membres
	//==========================

		//Envoie une requete pour débloquer la bulle sur le serveur
		unlock()
		{
			var ceci=this;
			$.post(		"./sources/PHP/repondeur.php",
					{
						action:"unlock",
						pathLock:ceci.parent.parent.path()
					},
					function(reponse)
						{
							if(reponse=="OK")
								ceci.locked(false);
						},
					"text"
				);
			
			
		}
		//callback de this.unlock()
		unlockGraphique()
		{
			this.couleurBouton(this.couleurOpen());
			this.GlockOpen.visible = true;
			this.GlockClosed.visible = false;
		}
	
		//Envoie une requete pour bloquer la bulle sur le serveur
		lock()
		{
			console.log(this)
			var ceci=this;
			$.post(		"./sources/PHP/repondeur.php",
					{
						action:"lock",
						pathLock:this.parent.parent.path()
					},
					function(reponse)
						{
							if(reponse=="OK")
								ceci.locked(true);
						},
					"text"
				);
		}
	
		//callback de this.lock()
		lockGraphique=function()
		{
			this.couleurBouton(this.couleurClose());
			this.GlockOpen.visible = false;
			this.GlockClosed.visible = true;
		}


		actionClick(event,data)
		{
			var ceci = data.objet
			if(ceci.locked())//Si fermé
				ceci.unlock();
			else
				ceci.lock();
		}
		
		
		// Change le vert en rouge et vis et versa (utile quand on passe la souris)
		inverseGraphique()
		{
			if(this._locked)
				this.unlockGraphique();
			else
				this.lockGraphique();
		}
		
		
		// remets le vert en rouge et vis et versa (utile quand on passe la souris)
		retablitGraphique()
		{
			if(this._locked)
				this.lockGraphique();
			else
				this.unlockGraphique();
		}
		
}

