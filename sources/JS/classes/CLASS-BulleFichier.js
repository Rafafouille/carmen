var BulleFichier = function(argPath,argIdLien)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Bulle.call(this);
		
	//==========================
	//Variables Membres
	//==========================
	
		this._path=argPath;	//Chemin relatif à l'objet à afficher OU numero du lien (voir le tableau des liens en PHP)
		this._idLien=argIdLien;	//
		this._type="fichier"		//Type de bulle
		this.backgroundColor(couleurBulleFichiers);	//Couleur de la bulle
		//this._afficheOmbre=true;	//Affiche ombre
				//this.Kcontour.shadowEnabled(this.afficheOmbre());
		this.titre(argPath.replace(/^.*(\\|\/|\:)/, ''));//Par defaut : on donne le nom du dossie comme titre
		if(!afficheExtensions)
			this.titre(this.formateTitre(this.titre().replace(/\.[a-zA-Z0-9]*/,"")));
		this.margin(5);
		
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

			//Affecte/renvoie le n° id du lien sur la session PHP
		this.idLien=function(i)
			{
				if(typeof(i)!='undefined')
					this._idLien=i;
				return this._idLien;
			}	
	//==========================
	//Autres fonctions membres
	//==========================
	
		//Redessine la bulle (pour remettre le noms aux dimensions)
		this.redessine=function()
			{
				this.Kicone.x(0);
				this.Kicone.y(0);
				
				this.Ktexte.text(this.formateTitre(this.titre()));
				this.Ktexte.x(this.Kicone.width()+5);
				this.Ktexte.y((this.Kicone.height()-this.Ktexte.height())/2);
				
				//this.Kicone.x(this.Ktexte.width()/2-this.Kicone.width()/2);
				//this.Kicone.y(this.Ktexte.y()+this.Ktexte.height());

				this.Kcontour.x(this.Kicone.x()-this.margin());
				this.Kcontour.y(Math.min(this.Ktexte.y(),this.Kicone.y())-this.margin());
				this.Kcontour.width(this.Ktexte.width()+this.Kicone.width()+2*this.margin()+5);
				this.Kcontour.height(Math.max(this.Ktexte.height(),this.Kicone.height())+2*this.margin());
				
				this.groupeBulle.x(-this.groupeBulle.getWidth()/2);
				this.groupeBulle.y(-this.groupeBulle.getHeight()/2);
			}


		//Fonction qui définit l'adresse de l'icone, selon le type de bulle utilisé (fonction virtuelle)	
		this.loadIcone=function()
			{
				//Tableau contenant les types MIME et l'icone associée
				var tabIcone={
								"aac"		:"./sources/icones/icone-audio.png",
								"ac3"		:"./sources/icones/icone-audio.png",
								"accdb"		:"./sources/icones/icone-access.png",
								"ai"		:"./sources/icones/icone-illustrator.png",
								"aiff"		:"./sources/icones/icone-audio.png",
								"asf"		:"./sources/icones/icone-audio.png",
								"asmdot"	:"./sources/icones/icone-solidworks.png",
								"avc"		:"./sources/icones/icone-video.png",
								"avi"		:"./sources/icones/icone-video.png",
								"au"		:"./sources/icones/icone-audio.png",
								"bmp"		:"./sources/icones/icone-image.png",
								"blend"		:"./sources/icones/icone-blender.png",
								"bwf"		:"./sources/icones/icone-audio.png",
								"caf"		:"./sources/icones/icone-audio.png",
								"cda"		:"./sources/icones/icone-audio.png",
								"dbx"		:"./sources/icones/icone-mail.png",
								"dgw"		:"./sources/icones/icone-inventor.png",
								"dot"		:"./sources/icones/icone-word.png",
								"dotx"		:"./sources/icones/icone-word.png",
								"doc"		:"./sources/icones/icone-word.png",
								"docx"		:"./sources/icones/icone-word.png",
								"drwdot"	:"./sources/icones/icone-solidworks.png",
								"eml"		:"./sources/icones/icone-mail.png",
								"exe"		:"./sources/icones/icone-exe.png",
								"fla"		:"./sources/icones/icone-flash.png",
								"flv"		:"./sources/icones/icone-video.png",
								"gif"		:"./sources/icones/icone-image.png",
								"html"		:"./sources/icones/icone-html.png",
								"htm"		:"./sources/icones/icone-html.png",
								"iam"		:"./sources/icones/icone-inventor.png",
								"ico"		:"./sources/icones/icone-image.png",
								"idw"		:"./sources/icones/icone-inventor.png",
								"ipn"		:"./sources/icones/icone-inventor.png",
								"ipt"		:"./sources/icones/icone-inventor.png",
								"iso"		:"./sources/icones/icone-iso.png",
								"jpg"		:"./sources/icones/icone-image.png",
								"jpeg"		:"./sources/icones/icone-image.png",
								"m4a"		:"./sources/icones/icone-audio.png",
								"mdp"		:"./sources/icones/icone-access.png",
								"mid"		:"./sources/icones/icone-audio.png",
								"mkv"		:"./sources/icones/icone-video.png",
								"mov"		:"./sources/icones/icone-video.png",
								"mp3"		:"./sources/icones/icone-audio.png",
								"mp3pro"	:"./sources/icones/icone-audio.png",
								"mp4"		:"./sources/icones/icone-audio.png",
								"mpg3"		:"./sources/icones/icone-video.png",
								"mpg4"		:"./sources/icones/icone-video.png",
								"mpeg3"		:"./sources/icones/icone-video.png",
								"mpeg4"		:"./sources/icones/icone-video.png",
								"msi"		:"./sources/icones/icone-msi.png",
								"ogg"		:"./sources/icones/icone-audio.png",
								"pdf"		:"./sources/icones/icone-pdf.png",
								"pgf"		:"./sources/icones/icone-image.png",
								"ppt"		:"./sources/icones/icone-powerpoint.png",
								"pptx"		:"./sources/icones/icone-powerpoint.png",
								"ps"		:"./sources/icones/icone-xps.png",
								"psd"		:"./sources/icones/icone-photoshop.png",
								"png"		:"./sources/icones/icone-image.png",
								"prt"		:"./sources/icones/icone-solidworks.png",
								"pub"		:"./sources/icones/icone-publisher.png",
								"rar"		:"./sources/icones/icone-rar.png",
								"rmvb"		:"./sources/icones/icone-video.png",
								"riff"		:"./sources/icones/icone-audio.png",
								"sldasm"	:"./sources/icones/icone-solidworks.png",
								"slddrw"	:"./sources/icones/icone-solidworks.png",
								"slddrt"	:"./sources/icones/icone-solidworks.png",
								"sldprt"	:"./sources/icones/icone-solidworks.png",
								"sty"		:"./sources/icones/icone-tex.png",
								"svg"		:"./sources/icones/icone-inkscape.png",
								"swf"		:"./sources/icones/icone-flash.png",
								"tex"		:"./sources/icones/icone-tex.png",
								"tiff"		:"./sources/icones/icone-image.png",
								"txt"		:"./sources/icones/icone-texte.png",
								"wav"		:"./sources/icones/icone-audio.png",
								"wma"		:"./sources/icones/icone-audio.png",
								"wmv"		:"./sources/icones/icone-video.png",
								"xls"		:"./sources/icones/icone-excel.png",
								"xlsx"		:"./sources/icones/icone-excel.png",
								"xcf"		:"./sources/icones/icone-gimp.png",
								"xhtml"		:"./sources/icones/icone-html.png",
								"xps"		:"./sources/icones/icone-xps.png",
								"xvid"		:"./sources/icones/icone-video.png",
								"zip"		:"./sources/icones/icone-zip.png",
							}
							
							// A faire : step iges ... format sstandart 3D, xml, csv, audimachin (logiciel d'édition de son)

				decoupage=this.path().split(".");
				var extension=decoupage[decoupage.length-1];
				extension=extension.toLowerCase();
				var cheminIcone=tabIcone[extension];
				if(cheminIcone==undefined)
					cheminIcone="./sources/icones/icone-fichier.png";
				this.iconeURL(cheminIcone);

			}
			
	//==========================
	//Evenements
	//==========================
	
		//Action a effectuer lors d'un double click
		this.actionDoubleClick=function()
		{
			if(activeMiroir)
					window.open("sources/PHP/miroir.php?miroir="+this.idLien());
			else
					window.open(this.path());
			return false;
		}
		
	//==========================
	//Construction...
	//==========================

	this.loadIcone();
}
BulleFichier.prototype = Object.create(Bulle.prototype);//On recopie le prototype de Bulle
BulleFichier.prototype.constructor = BulleFichier;//On recopie le constructeur de Noeud dans son prototype

