<?php
$rootDefaut="./dossier";	//Dossier-racine par défaut
$autoriseRootParGet=true;	//Autorise (ou non)de rentrer l'emplacement via l'adresse de la page
$ouvrirPremiereBulle=true;	//Indique s'il faut ouvrir la 1ere bulle ou non
$autoriseDossierParent=false;	//Autorise l'utilisation le pointage d'un dossier situé en amont de "index.php" (l'utilisation de "../" de manière générale)
$autoriseOmbres=true;		//Permet de mettre/supprimer les ombres (pour les PC un peu lents...)
$afficheExtensions=false;	//Affiche les extentions des fichiers ou non
$vitesseZoom=1.;		//Vitesse de zoom à chaque coup de molette.
$couleurBullesDossiers="#CCDDFF";//Couleur d'arrière plan des bulles "dossier"
$couleurBullesFichiers="#FFCC99";//Couleur d'arrière plan des bulles "fichier"
$couleurBullesLiens="#BBEEBB";	//Couleur d'arrière plan des bulles "lien"
$couleurBullesTexte="white";	//Couleur d'arrière plan des bulles "texte"
/*$opaciteBulleDossier=0.5;	//Opacité des bulles "dossier"
$opaciteBulleFichiers=0.5;	//Opacité des bulles "dossier"
$opaciteBulleLiens=0.5;		//Opacité des bulles "dossier"*/
$nomBulleRacine="";		//Nom de la bulle centrale (nom du dossier-racine si "")
$autoCentre=true;		//Centre les bulles à leur ouverture
$rayonAutoCentre=200;		//Distance minimale entre une bulle et le centre de l'affichage pour que l'autoCentre fasse effet.
$delaiAutoCentre=200;		//Temps (en ms) que met le programme avant de d'auto-centrer 
$vitesseAutoCentre=700;		//Temps (en ms) que met le programme pour faire l'animation d'auto-centrage
$dureeOuvertureFermeture=200;	//Temps (en ms) que met le programme pour faire l'animation d'ouverture d'une bulle (ou de fermeture)
$autoFermeFreres=false;		//Autorise le programme à fermer automatiquement les frères d'une bulle dossier lorsque celle-ci s'ouvre
$afficheBackground=true;	//Autorise ou non l'affichage de l'arriere plan.
$couleurBackground="#FFFFFF";	//Couleur de l'arriere plan
$couleurConnecteurs="#CCDDFF";	//Couleur de l'arriere plan
$autoriseModifierOptions=true;	//Autorise de modifier les options lors de la navigation (bouton "engrenage")
$autoriseSautLigneTitre=true;	//Formate les titres des bulles en remplaçant (ou non) les caractères indiqués la variable $caractereSautLigneTitre par des sauts de ligne "/n".
$caractereSautLigneTitre="§";	//Lorsque la variable $autoriseSautLigneTitre est à "true", le caractère contenu dans cette variable sert de séparateur de ligne (string)
$titrePage="";			//Titre de la page (html). Si vide (""), le titre sera le nom du dossier racine.
$activeMiroir=true;	//Active la redirection via un "miroir" quand on télécharge une fichier (pour pas voir l'adresse)

$login="";	//Login par défaut (pour une connection auto...)
$mdp="";	//Mot de passe par défaut (idem)
$listeUsers =array(	array(	"root","root",""),
		);

?>
