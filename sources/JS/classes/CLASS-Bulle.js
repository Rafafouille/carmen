

// Bulle "abstraite", qui sert de modèle à toutes les autres
class Bulle extends createjs.Container
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		constructor()
		{
			super(); //Constructeur de la classe mère
			this.name = "Bulle générique"
			
			this._id = ID;// N° de bulle courante
			ID++; // N° de bulle suivante
			
			this.cursor = "pointer";
			
			// Construction des objets graphique inclus dedans ------------
			

				this.Gtitre= new createjs.Text(
								this.formateTitre(this.titre()),
								"15px Calibri",
								"black");
				this.Gtitre.name = "Gtitre"
				
				this.Gcontour = new createjs.Shape();
				this.Gcontour.name = "Groupe Bulle"
				
				this.Gconnecteur = new createjs.Shape();
				this.Gconnecteur.name = "Gconnecteur"
							
				this.Gicone = new createjs.Bitmap("");//Image vide (générique). Il suffira de renseigner le chemin de l'image
				this.Gicone.name = "Gicone"
					var ceciii=this;
					this.Gicone.image.onload=function(eve){ceciii.redessine();}
				
				

				
				
				this.addChild(this.Gconnecteur);
				this.groupeBulle.addChild(this.Gcontour);
				this.groupeBulle.addChild(this.Gtitre);
				this.groupeBulle.addChild(this.Gicone);
				this.addChild(this.groupeBulle);
				this.groupeBulle.name = "Groupe Bulle"
				
				
				
			
			// Interactions ---------------------------------
			
				var ceci=this.groupeBulle;
				this.groupeBulle.on("mouseover", function(evt)
							{
								ceci.parent.redessineConnecteurEnEvidence();
								createjs.Tween.get(ceci).to({ scale: 1.1,  }, 50);	
							});
				
				
				this.groupeBulle.on("mouseout", function(evt)
							{
								ceci.parent.redessineConnecteur();
								createjs.Tween.get(ceci).to({ scale: 1.0 }, 50);	
							});
							
				// Drag and Drop
				this.groupeBulle.on("mousedown", function(evt)
							{
								// Quand on click, on créee un évenement de déplacement (drag) et un évenement qui supprime le premier (drop)
								if(evt.nativeEvent.which==1) // Si c'est un click gauche
								{
									
									// Drag
									var listenerDrag = SCENE.on("stagemousemove",function(event,data)
										{
											var bulle = data.refBulle
											bulle.parent.x = data.bulleInitiale.x+(event.stageX-data.sourisInitiale.x)/this.calquePrincipal.scaleX;
											bulle.parent.y = data.bulleInitiale.y+(event.stageY-data.sourisInitiale.y)/this.calquePrincipal.scaleY;
											bulle.parent._lastPosition.x = bulle.parent.x; // Update (pour redessiner les connecteurs)
											bulle.parent._lastPosition.y = bulle.parent.y;
											bulle.parent.redessineConnecteur();
											var distanceDeplacement = Math.sqrt((data.bulleInitiale.x-bulle.parent.x)*(data.bulleInitiale.x-bulle.parent.x)+(data.bulleInitiale.y-bulle.parent.y)*(data.bulleInitiale.y-bulle.parent.y))
											bulle.parent._vientDeBouger = distanceDeplacement > 15 // Distance max (en px) pour déclarer que le mouvement est significatif (utile pour pas ouvrir les bulles dossiers)
										},
										null,false,
										{	// Datas
											sourisInitiale:{x:evt.stageX, y:evt.stageY},
											bulleInitiale:{x:this.parent.x, y:this.parent.y},
											refBulle:this
										})
									
									
									//drop
									SCENE.on("stagemouseup", function(evt,data)
										{
											SCENE.off("stagemousemove", data.listenerASupprimer);
										},
										null,
										true,	//execution once et l'evenement s'autosupprime
										{listenerASupprimer : listenerDrag}
									)
								}
							});
							
							
				
				//Menu
				if(AFFICHE_MENU)	//Variable globale
					{
						this.menu = new Menu();
						this.menu.x = 0;// UPDATE DANS REDESSINE 
						this.menu.y = 0;//this.Gcontour.getBounds().height/2//this.Gcontour.y;
						this.menu.boutonLock = new BoutonLock();
						this.addChild(this.menu);
						this.menu.addBouton(this.menu.boutonLock);
					}
					
					
				
				this.redessine();
			
		}
	


	//==========================
	//Variables Membres
	//==========================
	
		_id = 0; 	//Nouvelle bulle (id = variable compteur globale)
		_type = "generique"		//Type de bulle
		_niveau = 0;	//Niveau dans l'arborescence
		_titre = "test";	// Rien par defaut
		_backgroundColor = "#FF0000";	//Couleur de la bulle
		_connectorColor = couleurConnecteurs;	//Couleur du connecteur
		_connectorWidth = 2;	//Couleur longueur du connecteur
		_strokeColor = "#000000";	//Couleur des lignes
		_lastPosition = {x:0,y:0};	//Position relative de la bulle par rapport à son parent quand elle est ouverte
		_dureeOuvertureFermeture = dureeOuvertureFermeture;	//Temps de transition entre ouvert et fermé (en s)
		_ouvert = true;	//Est-ce que la bulle est ouverte (en tant que fille) ou non
       		_afficheOmbre = autoriseOmbre; //Autorise l'affichage des ombres
		_iconeURL = "";
		_margin = 10;
		_vientDeBouger = false ;	//Cette variable permet d'éviter les click en meme temps que les pressmove. true apres un pressmove. Remis à false si c'est un dossier.
		_path = "" // Lien où est le ficheir
		
		// Objects graphiques
		
		groupeBulle = new createjs.Container() ; //Groupe qui contient le rectangle, le titre et l'icone
		
	//==========================
	//getter/setter
	//==========================

		//Affecte/renvoie le n°Id de la bulle
		id(i)
			{
				if(typeof(i)!='undefined')
					this._id=i;
				return this._id;
			}

		//Affecte/renvoie le n°Id de la bulle
		type()
			{
				return this._type;
			}

		//Affecte/renvoie le n°Id de la bulle
		niveau(n)
			{
				if(typeof(n)!='undefined')
					this._niveau=n;
				return this._niveau;
			}
			
		//Affecte/renvoie le titre de la bulle
		titre(t)
			{
				if(typeof(t)!='undefined')
					{
						this._titre=t;
						this.redessine();
					}
				if(this._titre!="")//Si on a un titre...
					return this._titre;	//On le renvoie
				return "Bulle";
				//return this.path().replace(/^.*(\\|\/|\:)/, '')	//Sinon, on renvoie le nom du fichier/dossier
				
			}

		//Affect/renvoie la couleur d'arriere plan
		backgroundColor(c)
			{
				if(typeof(c)!='undefined')
					{
						this._backgroundColor = c;
						this.redessineContour();
					}
				return this._backgroundColor;
			}

		//Affecte/renvoie la couleur du lien (connecteur)
		connectorColor(c)
			{
				if(typeof(c)!='undefined')
					this._connectorColor=c;
				return this._connectorColor;
			}

		//Affecte/renvoie la largeur du lien (connecteur)
		connectorWidth(w)
			{
				if(typeof(w)!='undefined')
					this._connectorWidth=w;
				return this._connectorWidth;
			}

		//Affect/renvoie la couleur des bordures
		strokeColor(c)
			{
				if(typeof(c)!='undefined')
					this._strokeColor=c;
				return this._strokeColor;
			}

		//Affecte/renvoie la position en mode "ouvert" {x:,y:}
		lastPosition(p)
			{
				if(typeof(p)!='undefined')
					this._lastPosition=p;
				return this._lastPosition;
			}
		
		//renvoie la bulle parente
		bulleParent()
			{
				return this.parent.parent;
			}
		
		//Affecte/renvoie la position en mode "ouvert" sur x
		lastPositionX(p)
			{
				if(typeof(p)!='undefined')
					this._lastPosition.x=p;
				return this._lastPosition.x;
			}
			
		//Affecte/renvoie la position en mode "ouvert" sur y
		lastPositionY(p)
			{
				if(typeof(p)!='undefined')
					this._lastPosition.y=p;
				return this._lastPosition.y;
			}

		//Affecte/renvoie durée d'ouverture/fermeture
		dureeOuvertureFermeture(p)
			{
				if(typeof(p)!='undefined')
					this._dureeOuvertureFermeture=p;
				return this._dureeOuvertureFermeture;
			}


		//Dit si la bulle est ouverte
		// Faut-il autoriser l'écriture ?????????????????
		ouvert(o)
			{
				if(typeof(o)!='undefined')
					this._ouvert=o;
				return this._ouvert;
			}

		//Affect-Renvoie le lien vers l'icone
		iconeURL(i)
			{
				if(typeof(i)!='undefined')
					{
						this._iconeURL=i;
						this.Gicone.image.src=this._iconeURL;
					}
				return this._iconeURL;
			}

		//Affect-Renvoie si on affiche un ombre ou pas
		afficheOmbre(ao)
			{
				if(typeof(ao)!='undefined')
				{
					this._afficheOmbre=ao;
					this.redessineContour();
					SCENE.update();
				}
				return this._afficheOmbre;
			}

		//Affecte/renvoie durée d'ouverture/fermeture
		margin(m)
			{
				if(typeof(m)!='undefined')
					this._margin=m;
				return this._margin;
			}
				
		//Affecte/renvoie le chemin du lien associé
		path(p)
			{
				if(typeof(p)!='undefined')
					this._path=p;
				return this._path;
			}
			
	//==========================
	//Autres fonctions membres
	//==========================

		// ********************************************************************
		//Redessine la bulle (pour remettre le noms aux dimensions)
		redessine()
			{
				//Texte
				this.redessineTitre()
				//Image (si elle existe)
				this.replaceIcone()
				//rectangle
				this.redessineContour();
				
				//L'ensemble
				this.recentreGroupeBulle();
				// Recentre le menu
				this.recentreMenu();
				
				
			}
			
			
		// *****************************************************************
		// Recalcule la position du menu
		recentreMenu()
			{
				if(AFFICHE_MENU)
				{
					this.menu.x = this.groupeBulle.x+this.groupeBulle.getBounds().x-0.5*this.menu.getBounds().width+this.groupeBulle.getBounds().width;//this.Gcontour.x;
					this.menu.y = this.groupeBulle.y+this.groupeBulle.getBounds().y+0.5*this.menu.getBounds().height;//this.Gcontour.y;
				}
			}
			
		// ********************************************************************
		// Recentre / redessine le texte
		redessineTitre()
			{
				this.Gtitre.text = this.formateTitre(this.titre());
				this.Gtitre.x = -this.Gtitre.getBounds().width/2;
				this.Gtitre.y = -this.Gtitre.getBounds().height/2;
			}
		
		
		// Fonction (abstraite) qui calcule la position de l'icone dans le cas d'un dossier
		replaceIcone()
		{
		}
		
		// ********************************************************************
		// Efface puis redessine une contour.
		redessineContour()
		{
			var xmin = this.Gtitre.x;
			var ymin = this.Gtitre.y;
			var xmax = xmin + this.Gtitre.getBounds().width;
			var ymax = ymin + this.Gtitre.getBounds().height;
			
			if(this.Gicone.image.currentSrc!="") // Si on a une icone chargée
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
			
				this.Gcontour.graphics.clear(); // On efface l'éventuel contour précédent
				this.Gcontour.graphics.beginFill(this.backgroundColor());
				this.Gcontour.graphics.drawRoundRect(xmin, ymin, width, height, 10,10, 10, 10 );
				this.Gcontour.graphics.endFill();
				if(this.afficheOmbre())
					this.Gcontour.shadow = new createjs.Shadow("rgba(0,0,0,0.4)", 7, 7, 7);
				else
					this.Gcontour.shadow = null;
					
				//Update des bornes du shape (pour prise en compte dans les calculs ultérieurs)
				this.Gcontour.setBounds(xmin, ymin, width, height);
				
		}
		
		// *******************************************************************
		// Redessine connecteur (utile notamment à la 1ere ouverture)
		redessineConnecteur()
		{
			this.Gconnecteur.graphics.clear();
			this.Gconnecteur.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
			this.Gconnecteur.graphics.moveTo(0,0).bezierCurveTo(-this._lastPosition.x/2,0,-this._lastPosition.x/2,-this._lastPosition.y,-this._lastPosition.x, -this._lastPosition.y);
			this.Gconnecteur.shadow = null;
		}
		
		
		// *******************************************************************
		// idemn que redessineConnecteur(), mais en évidence (plus gras, etc.)
		redessineConnecteurEnEvidence()
		{
			this.Gconnecteur.graphics.clear();
			this.Gconnecteur.graphics.setStrokeStyle(3).beginStroke("#DDDD00");
			this.Gconnecteur.graphics.moveTo(0,0).bezierCurveTo(-this._lastPosition.x/2,0,-this._lastPosition.x/2,-this._lastPosition.y,-this._lastPosition.x, -this._lastPosition.y);
			this.Gconnecteur.shadow = new createjs.Shadow("#AAAA00", 0, 0, 5);
		}
		
		// ********************************************************************
		//Fonction qui rencentre le groupe de la bulle
		recentreGroupeBulle()
		{
			this.groupeBulle.x = -this.groupeBulle.getBounds().width/2 - this.groupeBulle.getBounds().x ;
			this.groupeBulle.y = -this.groupeBulle.getBounds().height/2 - this.groupeBulle.getBounds().y ;
		}
		
		
		// ********************************************************************	
		//Fonction qui fait l'animation de s'étendre et met à j les variables associées (utilisé par la fonction sEtendre())
		_Extension()
		{
			this.alpha = 0
			this.visible = true;	//On le rend visible
			this.Gconnecteur.visible = true;//Obligé car les connecteurs sont cachés au debut pour ne pas afficher le connecteur de BULLE0
			createjs.Tween.get(this).to({x:this.lastPositionX(), y:this.lastPositionY(), alpha:1, scale:1}, this.dureeOuvertureFermeture())
			this.ouvert(true);	//On met la variable à Truex-files revanche nymphomane 
		}
			
			
		// *****************************http://carmen.allais.eu/develop/*******************************************
		//Fonction qui ouvre la bulle (en tant que fille)
		sEtendre()
		{
			if(!this.ouvert())	//S'il n'est pas ouvert...
				this._Extension();	//On étend la bulle (animation...)
		}


		// ************************************************************************
		//Fonction qui fait l'animation de s'étendre et met à j les variables associées (utilisé par la fonction seRefermer())
		_Refermeture()
		{
			this.lastPosition({x:this.x,y:this.y});	//On enregistre la derniere position
			//Transition du déplacement de la bulle
			createjs.Tween.get(this).to({x:0, y:0, alpha:0, scale:0}, this.dureeOuvertureFermeture());
			var cela=this;
			setTimeout(function(){cela.visible = false;},cela.dureeOuvertureFermeture());
			this.ouvert(false);
		}
			
			
		// ************************************************************************
		//Fonction qui ferme la bulle (en tant que fille)
		seRefermer() //time)
			{
				if(this.ouvert())
				{
					this._Refermeture();
				}
			}

		// ************************************************************************
		//Fonction qui définit l'adresse de l'icone, selon le type de bulle utilisé (fonction virtuelle)	
		loadIcone()
			{
				this.iconeURL("");
			}


		// ************************************************************************
		//Fonction qui FAIT l'ANIMATION centre le calque sur la bulle (à ne pas confondre avec recentreBulle())
		centreBulle()
		{
			var dx = $('#scene').attr("width")/2-this.getAbsolutePosition().x;
			var dy = $('#scene').attr("height")/2-this.getAbsolutePosition().y;

			createjs.Tween.get(SCENE.calquePrincipal)
				.to({x:SCENE.calquePrincipal.x+dx, y:SCENE.calquePrincipal.y+dy}, vitesseAutoCentre, createjs.Ease.sineInOut);
			    
		}

		// ************************************************************************
		//Formate le titre de la bulle
		formateTitre(t)
			{
				if(autoriseSautLigneTitre)
					{
						var reg=new RegExp(caractereSautLigneTitre,"g")
						t=t.replace(reg,"\n");
					}
				return t;
			}
			
		// ************************************************************************
		// Fonction qui calcule les coordonnées de la bulle, dans la SCENE
		getAbsolutePosition()
			{
				return  this.localToLocal(0, 0, SCENE)
			}
			
		// ************************************************************************
		// Donne la distance absolue entre la bulle et le centre de la scene
		getRayonToCenter()
		{
			var posAbs = this.getAbsolutePosition();
			return Math.pow(posAbs.x-$(window).width()/2,2)+Math.pow(posAbs.y-$(window).height()/2,2)
		}
			
			
	//==========================
	//Graphismes
	//==========================



}



