<?php
/*================================================

	CONFIGURATION DE LA CARTE MENTALE

================================================*/

//****************************************************
// Chemin du dossier-racine de la carte (par défaut)
// Type : chaîne de caractère (avec des guillemets)

$rootDefaut="./dossier";

//****************************************************
// Autorise (ou non) de rentrer l'emplacement du dossier-racine via l'adresse de la page (méthode GET)
// (par exemple : url_de_la_carte?dossier=un_dossier)
// type : Booléen (true ou false)

$autoriseRootParGet=true;

//****************************************************
// Indique s'il faut développer la 1ere bulle ou non
// Type : booléen (true ou false)

$ouvrirPremiereBulle=true;	

//****************************************************
// Autorise l'utilisation le pointage d'un dossier situé en amont
// de "index.php" (l'utilisation de "../" de manière générale)
// Type : booléen (true ou false)

$autoriseDossierParent=false;	

//****************************************************
// Permet de mettre/supprimer les ombres (pour les PC un peu lents...)
// Type : booléen (true ou false)

$autoriseOmbres=true;

//****************************************************
// Afficher ou non l'extension des fichiers
// Type : booléen (true ou false)

$afficheExtensions=false;

//****************************************************
// Vitesse de zoom à chaque coup de molette.
// Type : Nombre flottant (à virgule), positif ou négatif (pour inverser l'effet de la molette)

$vitesseZoom=1.5;		

//****************************************************
// Liste des utilisateurs/mots de passe
$listeUsers =array(	array(	"root","root",""),
		);


//****************************************************
// Paramètres de connection par défaut
// Type : Chaînes de caractères (avec des guillemets)
$login="";	// Login par défaut (pour une connection auto...)
$mdp="";	// Mot de passe par défaut (idem)


//****************************************************
// Couleur des bulles, selon leur type :
$couleurBullesDossiers="#CCDDFF";	// Bulles "dossier"
$couleurBullesFichiers="#FFCC99";	// Bulles "fichier"
$couleurBullesLiens="#BBEEBB";		// Bulles "lien"
$couleurBullesTexte="white";		// Bulles "texte"



//****************************************************
// Nom de la bulle principale ("" --> nom du dossier)
// type : chaîne de caractère
$nomBulleRacine="";

//****************************************************
// Centre les bulles-dossier à leur ouverture
// type : booléen
$autoCentre=true;

//****************************************************
//Distance minimale entre une bulle et le centre de l'affichage pour que l'autoCentre fasse effet.
// type : entier (pixel)
$rayonAutoCentre=200;	

//****************************************************
//Temps (en ms) que met le programme avant de s'auto-centrer (ça donne un coté un peu style... mais tout le monde n'a pas les même goûts)
$delaiAutoCentre=200;

//*******************************************************
//Temps (en ms) que met le programme pour faire l'animation d'auto-centrage
$vitesseAutoCentre=700;

//***********************************************************
//Temps (en ms) que met le programme pour faire l'animation d'ouverture d'une bulle (ou de fermeture)
$dureeOuvertureFermeture=200;

//************************************************************
//Autorise le programme à fermer automatiquement les frères d'une bulle dossier lorsque celle-ci s'ouvre
$autoFermeFreres=true;

//************************************************************
//Autorise l'affichage du fond
//(Booléen)
$afficheBackground=true;

//************************************************************
//Couleur du fond uni
//(Chaine de caractère contenant une couleur)
$couleurBackground="#FFFFFF";	//Couleur de l'arriere plan

//************************************************************
//Couleur connecteurs
//(Chaine de caractère contenant une couleur)
$couleurConnecteurs="#CCDDFF";	//Couleur de l'arriere plan


//************************************************************
// Autorise de modifier quelques options par l'utilisateur
// durant la navigation (juste le temps de la navigation)
//(Booléen)
$autoriseModifierOptions=true;

//************************************************************
// Formate les titres des bulles en remplaçant (ou non)
// les caractères indiqués la variable $caractereSautLigneTitre
// par des sauts de ligne "/n".
//(Booléen)
$autoriseSautLigneTitre=true;

//************************************************************
// Lorsque la variable $autoriseSautLigneTitre est à "true",
// le caractère contenu dans cette variable sert de séparateur de ligne
//(string)
$caractereSautLigneTitre="§";

//************************************************************
// Titre de la page (html).
// Si vide (""), le titre sera le nom du dossier racine.
//(string)
$titrePage="";
?>
