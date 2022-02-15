var Bulle = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Kinetic.Group.call(this);
		this.draggable(true);	//Rendre l'objet draggable


	//==========================
	//Variables Membres
	//==========================
	
		this._id=id; id++;	//Nouvelle bulle (id = variable compteur globale)
		this._type="generique"		//Type de bulle
		this._niveau=0;	//Niveau dans l'arborescence
		this._titre="";	// Rien par defaut
		this._backgroundColor="#FFFFFF";	//Couleur de la bulle
		this._connectorColor=couleurConnecteurs;	//Couleur de la bulle
		this._connectorWidth=2;	//Couleur de la bulle
		this._strokeColor="#000000";	//Couleur des lignes
		this._lastPosition={x:0,y:0};	//Position relative de la bulle par rapport à son parent quans elle est ouverte
		this._dureeOuvertureFermeture=dureeOuvertureFermeture/1000;	//Temps de transition entre ouvert et fermé
		this._ouvert=true;	//Est-ce que la bulle est ouverte (en tant que fille) ou non
       		this._afficheOmbre=autoriseOmbre; //Autorise l'affichage des ombres
		this._iconeURL="";
		this._margin=10;

	//==========================
	//getter/setter
	//==========================

		//Affecte/renvoie le n°Id de la bulle
		this.id=function(i)
			{
				if(typeof(i)!='undefined')
					this._id=i;
				return this._id;
			}

		//Affecte/renvoie le n°Id de la bulle
		this.type=function()
			{
				return this._type;
			}

		//Affecte/renvoie le n°Id de la bulle
		this.niveau=function(n)
			{
				if(typeof(n)!='undefined')
					this._niveau=n;
				return this._niveau;
			}
			
		//Affecte/renvoie le titre de la bulle
		this.titre=function(t)
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
		this.backgroundColor=function(c)
			{
				if(typeof(c)!='undefined')
					{
						this._backgroundColor=c;
						this.Kcontour.fill(c);
					}
				return this._backgroundColor;
			}

		//Affecte/renvoie le n°Id de la bulle
		this.connectorColor=function(c)
			{
				if(typeof(c)!='undefined')
					this._connectorColor=c;
				return this._connectorColor;
			}

		//Affecte/renvoie le n°Id de la bulle
		this.connectorWidth=function(w)
			{
				if(typeof(w)!='undefined')
					this._connectorWidth=w;
				return this._connectorWidth;
			}

		//Affect/renvoie la couleur des bordures
		this.strokeColor=function(c)
			{
				if(typeof(c)!='undefined')
					this._strokeColor=c;
				return this._strokeColor;
			}

		//Affecte/renvoie la position en mode "ouvert" {x:,y:}
		this.lastPosition=function(p)
			{
				if(typeof(p)!='undefined')
					this._lastPosition=p;
				return this._lastPosition;
			}
		
		//renvoie la bulle parente
		this.bulleParent=function()
			{
				return this.parent.parent;
			}
		
		//Affecte/renvoie la position en mode "ouvert" sur x
		this.lastPositionX=function(p)
			{
				if(typeof(p)!='undefined')
					this._lastPosition.x=p;
				return this._lastPosition.x;
			}
			
		//Affecte/renvoie la position en mode "ouvert" sur y
		this.lastPositionY=function(p)
			{
				if(typeof(p)!='undefined')
					this._lastPosition.y=p;
				return this._lastPosition.y;
			}

		//Affecte/renvoie durée d'ouverture/fermeture
		this.dureeOuvertureFermeture=function(p)
			{
				if(typeof(p)!='undefined')
					this._dureeOuvertureFermeture=p;
				return this._dureeOuvertureFermeture;
			}


		//Dit si la bulle est ouverte
		// Faut-il autoriser l'écriture ?????????????????
		this.ouvert=function(o)
			{
				if(typeof(o)!='undefined')
					this._ouvert=o;
				return this._ouvert;
			}

		//Affect-Renvoie le lien vers l'icone
		this.iconeURL=function(i)
			{
				if(typeof(i)!='undefined')
					{
						this._iconeURL=i;
						this.icone.src=this._iconeURL;
					}
				return this._iconeURL;
			}

		//Affect-Renvoie si on affiche un ombre ou pas
		this.afficheOmbre=function(ao)
			{
				if(typeof(ao)!='undefined')
				{
					this._afficheOmbre=ao;
					this.Kcontour.shadowEnabled(ao);
				}
				return this._afficheOmbre;
			}

		//Affecte/renvoie durée d'ouverture/fermeture
		this.margin=function(m)
			{
				if(typeof(m)!='undefined')
					this._margin=m;
				return this._margin;
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

				this.Kcontour.x(this.Ktexte.x()-this.margin());
				this.Kcontour.y(this.Ktexte.y()-this.margin());
				this.Kcontour.width(this.Ktexte.width()+2*this.margin());
				this.Kcontour.height(this.Ktexte.height()+2*this.margin());

				this.groupeBulle.x(-this.groupeBulle.getWidth()/2-this.Kcontour.x());	//Le Kcontour est du au fait que l'origine du groupeBulle est le texte (et non le bord de la bulle)
				this.groupeBulle.y(-this.groupeBulle.getHeight()/2-this.Kcontour.y());
				//this.groupeBulle.x(-this.groupeBulle.getWidth()/2);
				//this.groupeBulle.y(-this.groupeBulle.getHeight()/2);
			}

			
		//Fonction qui fait l'animation de s'étendre et met à j les variables associées (utilisé par la fonction sEtendre())
		this._Extension=function()
		{
			this.visible(true);	//On le rend visible
			this.Kconnecteur.visible(true);//Obligé car les connecteurs sont cachés au debut pour ne pas afficher le connecteur de bulle0
			//Transition des bulles
			var transition=new Kinetic.Tween({	//Animation...
				node:this,
				x:this.lastPositionX(),
				y:this.lastPositionY(),
				opacity:1,
				scale:1,
				duration:this.dureeOuvertureFermeture()
				});
			transition.play();	//Execute l'animation
			//Transition du déplacement du connecteur
			/*var transitionConnecteur=new Kinetic.Tween({
				node:this.Kconnecteur,
				points:[0,0,-this.lastPositionX(),-this.lastPositionY()],
				duration:this.dureeOuvertureFermeture()
				});
			transitionConnecteur.play();*/
			this.ouvert(true);	//On met la variable à True
		}
			
			
		//Fonction qui ouvre la bulle (en tant que fille)
		this.sEtendre=function()
			{
				if(!this.ouvert())	//S'il n'est pas ouvert...
					this._Extension();	//On étend la bulle (animation...)
			}


		//Fonction qui fait l'animation de s'étendre et met à j les variables associées (utilisé par la fonction seRefermer())
		this._Refermeture=function()
		{
			this.lastPosition({x:this.x(),y:this.y()});	//On enregistre la derniere position
			//Transition du déplacement de la bulle
			var transitionBulle=new Kinetic.Tween({
					node:this,
					x:0,
					y:0,
					opacity:0,
					scale:0,
					duration:this.dureeOuvertureFermeture()
				});
			transitionBulle.play();
			//Transition du déplacement du connecteur
			/*var transitionConnecteur=new Kinetic.Tween({
				node:this.Kconnecteur,
				points:[0,0,0,0],
				duration:this.dureeOuvertureFermeture()
				});
			transitionConnecteur.play();*/
			var cela=this;
			setTimeout(function(){cela.visible(false);},cela.dureeOuvertureFermeture()*1000);
			this.ouvert(false);
		}
			
			
		//Fonction qui ferme la bulle (en tant que fille)
		this.seRefermer=function(time)
			{
				if(this.ouvert())
				{
					this._Refermeture();
				}
			}

		//Fonction qui définit l'adresse de l'icone, selon le type de bulle utilisé (fonction virtuelle)	
		this.loadIcone=function()
			{
				this.iconeURL("");
			}


		//Fonction qui centre le calque sur la bulle
		this.centreBulle=function()
		{
			var dx=scene.width()/2-this.getAbsolutePosition().x;
			var dy=scene.height()/2-this.getAbsolutePosition().y;
			//scene.calquePrincipal.position({x:scene.calquePrincipal.x()+dx,y:scene.calquePrincipal.y()+dy});
			var tweenCentre = new Kinetic.Tween({
			        node: scene.calquePrincipal,
			        x: scene.calquePrincipal.x()+dx,
			        y: scene.calquePrincipal.y()+dy,
			        duration:vitesseAutoCentre/1000,
				easing:Kinetic.Easings.EaseInOut
			    });
			tweenCentre.play();
		}

		//Formate le titre de la bulle
		this.formateTitre=function(t)
			{
				if(autoriseSautLigneTitre)
					{
						var reg=new RegExp(caractereSautLigneTitre,"g")
						t=t.replace(reg,"\n");
					}
				return t;
			}

	//==========================
	//Graphismes
	//==========================

		//Groupe qui contien le rectangle, le titre et l'icone
		this.groupeBulle=new Kinetic.Group()
	
		//Titre de la bulle
		this.Ktexte=    new  Kinetic.Text({
					   text: this.formateTitre(this.titre()),
					   fontSize: 15,
						   fontFamily: 'Calibri',
					   fill: 'black',
					   align:"center",
					   x:0,
					   y:0
					});



		//Rectangle qui forme la bulle
		this.Kcontour=	new Kinetic.Rect({
					width: this.Ktexte.width()+20,
					height: this.Ktexte.height()+20,
					fill: this.backgroundColor(),
					stroke: null,//this.strokeColor(),
					strokeWidth: 2,
					cornerRadius: 10,
					x:this.Ktexte.x()-10,
					y:this.Ktexte.y()-10,
					shadowColor: 'black',
					shadowBlur: 10,
					shadowOffset: {x:10,y:10},
					shadowOpacity: 0.5,
					shadowEnabled:this.afficheOmbre()
				});


		var ceci=this;	
		this.Kconnecteur=	new Kinetic.Shape({
					drawFunc:function(context){
						context.beginPath();
						context.moveTo(0, 0);
						context.bezierCurveTo(-ceci.x()/2, 0, -ceci.x()/2, -ceci.y(), -ceci.x(), -ceci.y());
						//context.closePath();
						context.lineWidth = 5;
						context.strokeStyle ="red";
						context.fillStrokeShape(this);},
					stroke:this.connectorColor(),
					strokeWidth:this.connectorWidth(),
					visible:false,
					shadowColor: 'black',
					shadowBlur: 10,
					shadowOffset: {x:10,y:10},
					shadowOpacity: 0.5,
					shadowEnabled:false//this.afficheOmbre()
				});


		//Icone associée
		this.icone=new Image();	//nouvelle image (au sens de JS)
		this.icone.kineticParent=this;	//On lui ajoute son parent (plus rapide à retrouver...)
		
		this.Kicone=new Kinetic.Image({x:0,y:this.Ktexte.y()+this.Ktexte.height()}); //Par defaut : sous le titre
		this.icone.onload=function()	//Une fois l'image chargée, on l'inclue dans Kinetic
			{
				var ceci=this.kineticParent;
				ceci.Kicone.setImage(ceci.icone);
				ceci.redessine();
				scene.draw();
			}

			
		
		
		//Menu
		if(afficheMenu)	//Variable globale
			{
				this.menu=new Menu({x:this.Kcontour.x(),y:this.Kcontour.y()});
				this.menu.boutonLock=new BoutonLock("B");
				
				this.menu.addBouton(this.menu.boutonLock);
			}
		
		this.add(this.Kconnecteur);	//A mettre en premier pour le cacher derriere
		this.groupeBulle.add(this.Kcontour);
		this.groupeBulle.add(this.Ktexte);
		this.groupeBulle.add(this.Kicone);
		if(afficheMenu)this.groupeBulle.add(this.menu);
		this.add(this.groupeBulle);
		

	//==========================
	//Evenements
	//==========================

		//Action a effectuer lors d'un double click (virtuel)
		this.actionDoubleClick=function(){};
		this.actionDrag=function(){this.lastPosition({x:this.x(),y:this.y()});	};//Quand on drag/drop, on enregistre au fur et à mesure la derniere position de la boite.

		var cela=this;
		this.Ktexte.on("dblclick",function(){cela.actionDoubleClick();});
		this.Ktexte.on("touchend",function(){cela.actionDoubleClick();});
		this.Kcontour.on("dblclick",function(){cela.actionDoubleClick();});
		this.Kcontour.on("touchend",function(){cela.actionDoubleClick();});
		this.Kicone.on("dblclick",function(){cela.actionDoubleClick();});
		this.Kicone.on("touchend",function(){cela.actionDoubleClick();});
		
		this.on("dragmove",this.actionDrag);
		this.on("mouseover",function(){$('body').css('cursor', 'pointer');})
		this.on("mouseout",function(){$('body').css('cursor', 'default');})
		


		

	//==========================
	//Construction...
	//==========================



}
Bulle.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Bulle.prototype.constructor = Bulle;//On recopie le constructeur de Noeud dans son prototype



