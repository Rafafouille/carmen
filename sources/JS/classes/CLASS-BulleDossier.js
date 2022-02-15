class BulleDossier extends Bulle
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================
	constructor(_argPath)
	{
		super(); //Constructeur de la classe mère
		this.name = "Bulle dossier"
		
		this._path = _argPath ;	//Chemin du dossier
		this.backgroundColor(couleurBulleDossiers);	//Couleur de la bulle (voir dans le index.php)
		this.strokeColor("#000000");	//Couleur des lignes
		this.titre(_argPath.replace(/^.*(\\|\/|\:)/, ''));//Par defaut : on donne le nom du dossie comme titre
		
		
		// Graphismes
		this.addChild(this.groupeEnfants);
		this.setChildIndex(this.groupeEnfants,0) // On met les enfants en arrière plan (position 0 dans le z-index)
		
		this.chercheIcone(); // Cherche une icone sur le serveur
		
		//Evévements

		this.groupeBulle.on("click", this.actionClic,null,false,{ceci:this});
					
		this.groupeEnfants.name = "groupeEnfants"
	}



	//==========================
	//Variables Membres
	//==========================
	
		//_path = "";	//Chemin relatif à l'objet à afficher
		_type = "dossier";
		_enfantsOuverts = false;	//Est-ce que les enfants sont ouverts
		_dejaOuvert=false;	//Vaut faux tant qu'on n'a pas ouvert le dossier au moins une fois (notament avec les images qui viennent d'être chargée)
		_espaceEntreBoite = 20;	//espace entre 2 boites (enfants ?) verticalement

		groupeEnfants = new createjs.Container();
		
		
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
	
		//Dit si les bulles-enfant sont ouvertes
		// Faut-il autoriser l'écriture ?????????????????
		enfantsOuverts(o)
			{
				if(typeof(o)!='undefined')
					this._enfantsOuverts=o;

				return this._enfantsOuverts;

			}
		
		//renvoi le nombre d'enfants (0 si non chargé)
		childrenLoaded()
			{
				return this.groupeEnfants.children.length;
			}
		

		//Renvoie la liste des enfants		
		getListeEnfants()

			{
				return this.groupeEnfants.children;
			}
			

		//Renvoie la liste des enfants		
		dejaOuvert(d)
			{
				if(typeof(d)!='undefined')
					this._dejaOuvert=d;
				return this._dejaOuvert;
			}
			
		//Renvoie la liste des enfants
		espaceEntreBoite(e)
			{
				if(typeof(e)!='undefined')
					this._espaceEntreBoite=e;

				return this._espaceEntreBoite;
			}
			
			
			
	//==========================
	//Autres fonctions membres
	//==========================
	

		// Fonction qui calcule la position de l'icone dans le cas d'un dossier
		// REMPLACE L'ANCIEN (classe mere Bulle)
		replaceIcone()
		{
			if(this.Gicone.getBounds()) // Si l'image est déjà chargée (?)
			{
				this.Gicone.x = -this.Gicone.getBounds().width/2 ;
 				this.Gicone.y = this.Gtitre.y+this.Gtitre.getBounds().height ;
			}
		}
		
		//Fonction qui ouvre la bulle (en tant que fille).
		// Ici, on charge les futurs dossiers enfants
		// Ecrase la fonction fille
		sEtendre()
			{
				if(!this.ouvert())	//S'il n'est pas ouvert...
				{
					this._Extension();	//On étend la bulle (animation...)
					if(!this.childrenLoaded())	//Si les enfants ne sont pas encore chargés
						{
					  		var cela=this;
							setTimeout(function(){cela.loadChildren();},this.dureeOuvertureFermeture());	//on charge APRES que la bulle parent soit ouverte

						}
				}
			}
			
			
		// ******************************************************************************************************
		//Fonction qui interroge le serveur et créer les enfants dans le groupe groupeEnfants
		// open = true : le dossier sera automatiquement ouvert à sa création
		loadChildren(open)
			{
				var ceci=this;	//Reference vers le parent (probleme de contexte...)
				$.post("./sources/PHP/repondeur.php",		//URL de la requete
						{

							action:"loadChildren",	//Action a executer par le post
							dossierScan:this.path()	//chemin
						},
						function (reponse)//fonction callback
							{
								//Les enfants *******
								var listeFichiers=reponse.getElementsByTagName("fichier"); //Liste des bulles a afficher

								//Initialisation de la position du 1er enfant
								if(ceci.niveau()==0)	//Si c'est le parent bulle racine
									{
										var ecartHauteur=$(window).height()/(Math.floor((listeFichiers.length-1)/2)+1);	//On calcule l'ecart vertical entre chaque enfant (hauteur divisé par nombre de bulle)
										var hauteurPrecedent=-ecartHauteur*((Math.floor((listeFichiers.length+1)/2)-1)/2);//On placela 1ere bulle (verticalement)
									}
								else
									var hauteurPrecedent=-200;	//On se place à -200 par rapport au parent
								var droite=1;	//tag qui dit si la bulle enfant doit être à droite (1) ou a gauche (-1)
								for(var i=0 ; i<listeFichiers.length ; i++)	//Pour chaque enfant récupéré...
									{
										var file=listeFichiers[i]	//...on recupere l'enfant
										var nom=file.getAttribute("nom")	//...son nom
										var type=file.getAttribute("type");	//...son type
										var lien=file.getAttribute("lien");	//...son lien (s'il existe)
										var bloque=file.getAttribute("bloque");	//...S'il est bloqué
										var texte=file.getAttribute("texte");	//...son texte
										var idLien=file.getAttribute("idLien");	//...son n° de lien (voir Session PHP)
										var dos=ceci.path();		//...on recupère son emplacement
											if(type=="dossier")	//Si c'est de type dossier...
												var bulleEnfant=new BulleDossier(dos+"/"+nom);
											else if(type=="fichier")	//Si c'est de type fichier...
												{
													if(activeMiroir)
															var bulleEnfant=new BulleFichier(dos+"/"+nom,idLien);
													else
															var bulleEnfant=new BulleFichier(dos+"/"+nom,-1);
												}
											else if(type=="lien")	//Si c'est de type lien...
												var bulleEnfant=new BulleLien(dos+"/"+nom,nom.replace(".rac",""),lien);
											else if(type=="texte")	//Si c'est de type texte...
												var bulleEnfant=new BulleTexte(dos,nom,texte);
											else
												var bulleEnfant=new Bulle();	//par défaut...
											bulleEnfant.niveau(ceci.niveau()+1);//Niveau dans l'arborescence
											bulleEnfant.visible = false;//...Par defaut les enfants sont invisibles
											//position
											if(ceci.niveau()==0)	//Si c'est la racine
												{
													droite*=-1;	//On alterne la position de l'enfant
													bulleEnfant.lastPosition({x:droite*200,y:hauteurPrecedent});	//On le place
													if(droite==1)	//Si on est à droite...
														hauteurPrecedent+=ecartHauteur;//On décale la hauteur pour l'enfant suivant
												}
											else		//Si c'est pas la racine
												{
													droite = signe(ceci.lastPositionX());	//On définit le coté en fonction de la position du parent (droite ou gauche)

													bulleEnfant.lastPosition({x:droite*200,y:hauteurPrecedent+50});//Par defaut, on place l'enfant, décalé de 50px
													hauteurPrecedent = bulleEnfant.lastPositionY()+bulleEnfant.getBounds().height;//On décale la hauteur pour l'enfant suivant
												}
											bulleEnfant.alpha = 0 ;
											bulleEnfant.scale = 0 ;
											bulleEnfant.ouvert(false);
											bulleEnfant.redessineConnecteur(); // Utile apres modification de lastPosition
											if(AFFICHE_MENU) // Si c'est bloqué, on le met "bloqué" (dans le cas où on affiche le menu et qu'on n'est pas la racine)
												{
													if(bloque=="bloque")
														bulleEnfant.menu.boutonLock.locked(true);
													else
														bulleEnfant.menu.boutonLock.locked(false);
												}
										ceci.groupeEnfants.addChild(bulleEnfant);//On ajoute l'enfant au groupe Kenfants
									}
									if(open)
										ceci.ouvrirEnfants();
							},//fin de la fonction callback
						"xml"//mode de réception
					);//Fin du post
			}
			
			
			
			
			
			
		//Fonction qui interroge le serveur et vérifie qu'il y a une icone parmi les fichiers	

		chercheIcone()
			{
				var ceci=this;
				$.post(		"./sources/PHP/repondeur.php",		//URL de la requete
						{
							action:"loadIcone",
							dossierScan:this.path()	//paramètres d'envoi
						},
						function (reponse){
							var listeIcones=reponse.getElementsByTagName("icone");
							if(listeIcones.length>0)	//Si on trouve une icone... (au moins)
								ceci.iconeURL(listeIcones[0].getAttribute("url"));
						},
						"xml"						
					);
			}
			
		//Fonction qui ouvre ou ferme (qui inverse l'état) les enfants *********************************************
		ouvrirOuFermerEnfants()
			{

				if(this.enfantsOuverts())
					this.fermerEnfants();
				else
					this.ouvrirEnfants();
			}




		//Fonction qui ouvre les enfants ***************************************************************
		ouvrirEnfants(autocentrage)
			{
				if(!this.enfantsOuverts())
					{
						var ceci=this;
						var listeEnfants = this.getListeEnfants();
						if(!this.dejaOuvert())// Si c'est la 1ere ouverture, on replace les enfants avant d'ouvrir (on fait cela au clic, car ça devrait laisser le temps de charger les images)
							{
								if(this.niveau()!=0)
									{

										var tailleTotale=-this.espaceEntreBoite();
										for (var i=0 ; i<listeEnfants.length ; i++) // On additionne les dimentsions pour connaitre la taille totale
											{
												tailleTotale+=listeEnfants[i].getBounds().height+this.espaceEntreBoite();
											}
										var positionY=-tailleTotale/2; // On en déduit la position du début de la lsite des bulles
										for (var i=0 ; i<listeEnfants.length ; i++) // On place les bulle
											{
												var enfant = listeEnfants[i];
												positionY += enfant.getBounds().height/2;
												enfant.lastPositionY(positionY);
												positionY += enfant.getBounds().height/2 + this.espaceEntreBoite();
												enfant.redessineConnecteur();
											}
									}
								this.dejaOuvert(true);
							}
						for (var i=0 ; i<listeEnfants.length ; i++)
							{
								var enfant=listeEnfants[i];
								enfant.sEtendre();
							}
						this.enfantsOuverts(true);


						//Autocentrage
						if(autocentrage == undefined)	//Si pas passé en argument
							var autocentrage=autoCentre;	//...on prend la variable globale
							
						if(autocentrage && this.getRayonToCenter()>rayonAutoCentre*rayonAutoCentre)
							setTimeout(function(){ceci.centreBulle();},delaiAutoCentre);


						//Fermeture des freres
						if(autoFermeFreres && this.niveau()!=0)	//Si on autorise l'autofermeture des freres, et que c'est pas la 1ere bulle..
							{

								var listeFreres=this.parent.children;	//y compris soit-meme

								for(var i=0;i<listeFreres.length;i++)
									{
										var enfant=listeFreres[i];
										if(enfant!=this && enfant.type()=="dossier")	//Si c'est pas nous meme et que c'est un dossier
											{
												enfant.fermerEnfants(false);//Le false permet de ne pas centrer sur le parent...
											}
									}
							}
					}//if !enfantsouverts
			}
			
			
			
			
		//Fonction qui ferme les enfants ****************************
		fermerEnfants(autocentrage)

			{
				if(this.enfantsOuverts())
					{
						var ceci = this;
						var listeEnfants = this.getListeEnfants();
						for(var i = 0 ; i<listeEnfants.length ; i++)
							{
								var enfant = listeEnfants[i];
								enfant.seRefermer();
							}
						this.enfantsOuverts(false);

						//Autocentrage
						if(autocentrage == undefined)	//Si pas passé en argument
							var autocentrage = autoCentre;	//...on prend la variable globale
						if(autocentrage && this.niveau() && this.parent.parent.getRayonToCenter()>rayonAutoCentre*rayonAutoCentre)
							setTimeout(function(){ceci.parent.parent.centreBulle();},delaiAutoCentre);
					}
			}


		// Evenement associé au clic pour ouvrir
		actionClic(evt,data)
		{
			var ceci = data.ceci
			if(estCeQueCEstUnVraiClic(evt,ceci))
			{
				ceci.ouvrirOuFermerEnfants();	
			}
		}


}

