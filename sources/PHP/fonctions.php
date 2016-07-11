<?php

include_once("./parametresDefaut.php");
include_once("../../parametres.php");

//Fonction qui dit si un fichier a le droit d'etre affiché========================
function autoriseAffiche($f,$dos,$forcerPublic=false) //Le dernier parametre permet de tester si le fichier est censé etre affiche en mode public
	{
		if($f=="." || $f==".." ||$f=="Thumbs.db"||$f=="desktop.ini"||$f==".htaccess"||$f==".htpasswd")	//Liste des noms interdits 
			return false;

		if(strtolower($f)=="icone.jpg" || strtolower($f)=="icone.jpeg"  || strtolower($f)=="icone.png" || strtolower($f)=="icone.gif")
			return false;
		
		if(strtolower($f)==".carte-mentale")
			return false;
		
		if($_SESSION['connecte'] && !$forcerPublic)		//Sinon (pour les autres fichier), si on est connecté, on affiche !
			return true;

		if(file_exists($dos."/.carte-mentale"))	//S'il y a un fichier de config
			{
				$config = simplexml_load_file($dos."/.carte-mentale");//On le parse
				foreach($config->interdits->fichier as $fichier)	//Pour chaque fichier interdit
					{
						if($f==$fichier->nom)	//Si on a le nom
							return false;		//On l'interdit...
					}
			}

		return true;
	}



//Fonction qui vérifie s'il existe une icone dans le dossier (ou dans le XML ????)
function iconeExists($dos)
	{
		return (file_exists($dos."/icone.jpg")||file_exists($dos."/icone.png")||file_exists($dos."/icone.gif"));
	}


//Vérifie si un fichier est un lien
function is_lien($f)
{
	return strtolower(substr(strrchr($f,'.'),1))=="rac";
}


//Vérifie si un fichier un texte
function is_texte($f)
{
	return strtolower(substr(strrchr($f,'.'),1))=="texte";
}

//Lit le fichier lien et renvoie le lien
function getLien($f)
{
	$monfichier = fopen($f, 'r');
	$lien=fgets($monfichier);
	fclose($monfichier);
	$lien=str_replace(array("\n","\r"), '', $lien);
	return $lien;
}

//Lit le fichier lien et renvoie le lien
function getTexte($f)
{
	$monfichier = fopen($f, 'r');
	$texte="";
	while($ligne=fgets($monfichier))
		$texte.=$ligne;
	fclose($monfichier);
	return $texte;
}


//Renvoie le chemin de l'icone d'un dossier (si elle existe)
function getIconeURL($dos)
	{
		if(file_exists("../../".$dos."/icone.jpg"))
			return $dos."/icone.jpg";
		if(file_exists("../../".$dos."/icone.png"))
			return $dos."/icone.png";
		if(file_exists("../../".$dos."/icone.gif"))
			return $dos."/icone.gif";
		return "";
	}


function makeEntete()
	{
		
	}



function createFichierConfig($dossier)
	{
		if(file_exists($dossier."/.carte-mentale"))//S'il existe déjà...
			return;//On ne le crée pas

		$monfichier = fopen($dossier."/.carte-mentale", 'a+');
		$texte='<?xml version = "1.0" encoding="UTF-8" standalone="yes" ?>
<config>
	<interdits>
	</interdits>
	<renommage>
	</renommage>
</config>';
		fputs($monfichier,$texte);
		fclose($monfichier);
	}



function valideMdp($user,$mdp)
{
	global $listeUsers;
	foreach($listeUsers as $u)
		{
			if($user==$u[0] && $mdp==$u[1])
				return true;
		}
	return false;
}

function isAdmin($user)
{
	global $listeUsers;
	foreach($listeUsers as $u)
		{
			if($user==$u[0] && $u[2]=="admin")
				return true;
		}
	return false;
}

?>
