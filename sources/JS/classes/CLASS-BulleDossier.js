var BulleDossier = function(argPath)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Bulle.call(this);
		
		
	//==========================
	//Variables Membres
	//==========================
	
		this._path=argPath;	//Chemin relatif à l'objet à afficher
		this._type="dossier";
		this.backgroundColor(couleurBulleDossiers);	//Couleur de la bulle
		this.strokeColor("#000000");	//Couleur des lignes
		this._enfantsOuverts=false;	//Est-ce que les enfants sont ouverts
		//this.afficheOmbre(true);	//Affiche ombre
		this.titre(argPath.replace(/^.*(\\|\/|\:)/, ''));//Par defaut : on donne le nom du dossie comme titre
		this._dejaOuvert=false;	//Vaut faux tant qu'on n'a pas ouvert le dossier
		this._espaceEntreBoite=20;	//espace entre 2 boites verticalement
		
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
	
		//Dit si les bulles-enfant sont ouvertes
		// Faut-il autoriser l'écriture ?????????????????
		this.enfantsOuverts=function(o)
			{
				if(typeof(o)!='undefined')
					this._enfantsOuverts=o;
				return this._enfantsOuverts;
			}
		
		//renvoi le nombre d'enfants (0 si non chargé)
		this.childrenLoaded=function()
			{
				return this.Kenfants.children.length;
			}
		
		//Renvoie la liste des enfants		
		this.getListeEnfants=function()
			{
				return this.Kenfants.children;
			}
			
		//Renvoie la liste des enfants		
		this.dejaOuvert=function(d)
			{
				if(typeof(d)!='undefined')
					this._dejaOuvert=d;
				return this._dejaOuvert;
			}
			
		//Renvoie la liste des enfants		
		this.espaceEntreBoite=function(e)
			{
				if(typeof(e)!='undefined')
					this._espaceEntreBoite=e;
				return this._espaceEntreBoite;
			}


	//==========================
	//Autres fonctions membres
	//==========================
		//Redessine la bulle (pour remettre le noms aux dimensions)
		this.redessine=function()
			{
				this.Ktexte.text(this.formateTitre(this.titre()));
				this.Ktexte.x(0);
				this.Ktexte.y(0);
				
				this.Kicone.x(this.Ktexte.width()/2-this.Kicone.width()/2);
				this.Kicone.y(this.Ktexte.y()+this.Ktexte.height());

				this.Kcontour.x(Math.min(this.Ktexte.x(),this.Kicone.x())-this.margin());
				this.Kcontour.y(this.Ktexte.y()-this.margin());
				this.Kcontour.width(Math.max(this.Ktexte.width(),this.Kicone.width())+2*this.margin());
				this.Kcontour.height(this.Ktexte.height()+this.Kicone.height()+2*this.margin());
				
				this.groupeBulle.x(-this.groupeBulle.getWidth()/2-this.Kcontour.x());	//Le Kcontour est du au fait que l'origine du groupeBulle est le texte (et non le bord de la bulle)
				this.groupeBulle.y(-this.groupeBulle.getHeight()/2-this.Kcontour.y());
			}
			
		//Fonction qui ouvre la bulle (en tant que fille)
		this.sEtendre=function()
			{
				if(!this.ouvert())	//S'il n'est pas ouvert...
				{
					this._Extension();	//On étend la bulle (animation...)
					if(!this.childrenLoaded())	//Si les enfants ne sont pas encore chargés
						{
					  		var cela=this;
							setTimeout(function(){cela.loadChildren();},this.dureeOuvertureFermeture()*1000);	//on charge APRES que la bulle parent soit ouverte
						}
				}
			}
			
		//Fonction qui interroge le serveur et créer les enfants dans le groupe Kchildren
		this.loadChildren=function(open)
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
								droite=1;	//tag qui dit si la bulle enfant doit être à droite (1) ou a gauche (-1)
								for(i=0;i<listeFichiers.length;i++)	//Pour chaque enfant récupéré...
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
												var bulleEnfant=new BulleTexte(nom,texte);
											else
												var bulleEnfant=new Bulle();	//par défaut...
											bulleEnfant.niveau(ceci.niveau()+1);//Niveau dans l'arborescence
											bulleEnfant.visible(false);//...Par defaut les enfants sont invisibles
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
													droite=signe(ceci.lastPositionX());	//On définit le coté en fonction de la position du parent (droite ou gauche)
													bulleEnfant.lastPosition({x:droite*200,y:hauteurPrecedent+50});//Par defaut, on place l'enfant, décalé de 50px
													hauteurPrecedent=bulleEnfant.lastPositionY()+bulleEnfant.height();//On décale la hauteur pour l'enfant suivant
												}
											bulleEnfant.opacity(0);
											bulleEnfant.scale(0);
											bulleEnfant.ouvert(false);
											if(bloque=="bloque" && afficheMenu)
												{
													bulleEnfant.menu.boutonLock.locked(true);
													bulleEnfant.menu.boutonLock.KarrierePlan.fill(bulleEnfant.menu.boutonLock.couleurClose());
												}
										ceci.Kenfants.add(bulleEnfant);//On ajoute l'enfant au groupe Kenfants
									}
									if(open)
										ceci.ouvrirEnfants();
							},//fin de la fonction callback
						"xml"//mode de réception
					);//Fin du post
			}
			
		//Fonction qui interroge le serveur et vérifie qu'il y a une icone parmi les fichiers	
		this.loadIcone=function()
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
			
			
		//Fonction qui ouvre ou ferme (qui inverse l'état) les enfants
		this.ouvrirOuFermerEnfants=function()
			{
				if(this.enfantsOuverts())
					this.fermerEnfants();
				else
					this.ouvrirEnfants();
			}

		//Fonction qui ouvre les enfants
		this.ouvrirEnfants=function(autocentrage)
			{
				if(!this.enfantsOuverts())
					{
						var ceci=this;
						var listeEnfants=this.getListeEnfants();
						if(!this.dejaOuvert())// Si c'est la 1ere ouverture, on replace les enfants avant d'ouvrir (on fait cela au clic, car ça devrait laisser le temps de charger les images)
							{
								if(this.niveau()!=0)
									{
										var tailleTotale=-this.espaceEntreBoite();
										for (i=0;i<listeEnfants.length;i++)
											{
												tailleTotale+=listeEnfants[i].getHeight()+this.espaceEntreBoite();
											}
										var positionY=-tailleTotale/2;
										for (i=0;i<listeEnfants.length;i++)
											{
												var enfant=listeEnfants[i];
												positionY+=enfant.getHeight()/2;
												enfant.lastPositionY(positionY);
												positionY+=enfant.getHeight()/2+this.espaceEntreBoite();
											}
									}
								this.dejaOuvert(true);
							}
						for (i=0;i<listeEnfants.length;i++)
							{
								var enfant=listeEnfants[i];
								enfant.sEtendre();
							}
						this.enfantsOuverts(true);


						//Autocentrage
						if(autocentrage == undefined)	//Si pas passé en argument
							var autocentrage=autoCentre;	//...on prend la variable globale
						if(/*this.niveau() &&*/ autocentrage && Math.pow(this.getAbsolutePosition().x-scene.width()/2,2)+Math.pow(this.getAbsolutePosition().y-scene.height()/2,2)>rayonAutoCentre*rayonAutoCentre)
							setTimeout(function(){ceci.centreBulle();},delaiAutoCentre);


						//Fermeture des freres
						if(autoFermeFreres && this.niveau()!=0)	//Si on autorise l'autofermeture des freres, et que c'est pas la 1ere bulle..
							{
								var listeFreres=this.parent.children;	//y compris soit-meme
								for(i=0;i<listeFreres.length;i++)
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

		//Fonction qui ferme les enfants
		this.fermerEnfants=function(autocentrage)
			{
				if(this.enfantsOuverts())
					{
						var ceci=this;
						var listeEnfants=this.getListeEnfants();
						for (i=0;i<listeEnfants.length;i++)
							{
								var enfant=listeEnfants[i];
								enfant.seRefermer();
							}
						this.enfantsOuverts(false);

						//Autocentrage
						if(autocentrage == undefined)	//Si pas passé en argument
							var autocentrage=autoCentre;	//...on prend la variable globale
						if(autocentrage && this.niveau() && Math.pow(this.parent.parent.getAbsolutePosition().x-scene.width()/2,2)+Math.pow(this.parent.parent.getAbsolutePosition().y-scene.height()/2,2)>rayonAutoCentre*rayonAutoCentre)
							setTimeout(function(){ceci.parent.parent.centreBulle();},delaiAutoCentre);
					}
			}
			
	//==========================
	//Graphismes
	//==========================
		
		//Icone (deja chargée par héritage) on se contenten juste de bien la placer
		this.Kicone.x(-200);
		this.Kicone.y(this.Ktexte.y()+this.Ktexte.height());
		
		//Groupe Kinetic contenant les enfants (autres bulles...)
		this.Kenfants=new Kinetic.Group();
		
				
		this.add(this.Kenfants);
		this.Kenfants.setZIndex(0);//Mis en arreire plan pour cacher les connecteurs des enfants derriere le parent
		
		
	//==========================
	//Evenements
	//==========================
	
		//Action a effectuer lors d'un double click
		this.actionDoubleClick=function()
		{
			this.ouvrirOuFermerEnfants();
		}


		
		
	//==========================
	//Construction...
	//==========================

	this.loadIcone();
		
}
BulleDossier.prototype = Object.create(Bulle.prototype);//On recopie le prototype de Bulle
BulleDossier.prototype.constructor = BulleDossier;//On recopie le constructeur de Noeud dans son prototype

