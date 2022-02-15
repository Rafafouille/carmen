class BulleFichier extends Bulle
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================
	constructor(_argPath,_argIdLien)
	{
		super(); //Constructeur de la classe mère
		this.name = "Bulle fichier"
		
		this._path = _argPath;	//Chemin relatif à l'objet à afficher OU numero du lien (voir le tableau des liens en PHP)
		this._idLien = _argIdLien;
		this.backgroundColor(couleurBulleFichiers);	//Couleur de la bulle
		this.titre(_argPath.replace(/^.*(\\|\/|\:)/, ''));//Par defaut : on donne le nom du dossie comme titre
		if(!afficheExtensions)
			this.titre(this.formateTitre(this.titre().replace(/\.[a-zA-Z0-9]*/,"")));
		this.margin(5);
		
		this.loadIcone();// Recherche l'icone à partir du nom du fichier
		
		
		// EVENEMENTS *******************
		
		//Action a effectuer lors d'un double click
//		var cceci = this;
		this.groupeBulle.on("click", this.actionClic,null,false,{ceci:this});
	}

	//==========================
	//Variables Membres
	//==========================
	
		//_path = "";	//Chemin relatif à l'objet à afficher OU numero du lien (voir le tableau des liens en PHP)
		_idLien = "";	//
		_type = "fichier"		//Type de bulle
		
		
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

			//Affecte/renvoie le n° id du lien sur la session PHP
		idLien(i)
			{
				if(typeof(i)!='undefined')
					this._idLien=i;
				return this._idLien;
			}
	//==========================
	//Autres fonctions membres
	//==========================
	
		//Redessine la bulle (pour remettre le noms aux dimensions)
		// ECRASE L'ANCIEN (classe mere Bulle)
		//redessine=function()
		//{
		//}
		
		// Fonction qui calcule la position de l'icone dans le cas d'un dossier
		// REMPLACE L'ANCIEN (classe mere Bulle)
		replaceIcone()
		{
			if(this.Gicone.getBounds()) // Si l'image est déjà chargée (?)
			{
				this.Gicone.x = this.Gtitre.x-this.Gicone.getBounds().width-10 ;
 				this.Gicone.y = this.Gtitre.y+this.Gtitre.getBounds().height/2-this.Gicone.getBounds().height/2 ;
			}
		}
		
		
		//Fonction qui définit l'adresse de l'icone, selon le type de bulle utilisé (fonction virtuelle)	
		loadIcone()
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

				var decoupage=this.path().split(".");
				var extension=decoupage[decoupage.length-1];
				extension=extension.toLowerCase();

				var cheminIcone = tabIcone[extension];
				if(cheminIcone == undefined)
					cheminIcone = "./sources/icones/icone-fichier.png";
				this.iconeURL(cheminIcone);

			}
			
			
	actionClic(evt,data)
	{
		var ceci = data.ceci
		if(estCeQueCEstUnVraiClic(evt,ceci))
		{
			if(activeMiroir)
					window.open("sources/PHP/miroir.php?miroir="+ceci.idLien());
			else
					window.open(ceci.path());
			return false;
		}
	}
}



