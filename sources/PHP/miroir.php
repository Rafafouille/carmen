<?php
session_start();
include_once("./fonctions.php");
include_once("./parametresDefaut.php");	//Par defaut...
include_once("./../../parametres.php");	//...ecrasée par les parametres perso


$idLien=-1;
if(isset($_GET['miroir'])) $idLien=$_GET['miroir'];

if($activeMiroir)
{
	if(isset($_SESSION['listeDesLiens'][$idLien]))
	{
		$tabLien=$_SESSION['listeDesLiens'][$idLien];//On recupere le dossier et le nom precedemment enregistre
		$lien=$tabLien["dos"].$tabLien["nom"];//On les concatene
		if(file_exists($tabLien["dos"].$tabLien["nom"]))	//On verifie qu'il existe
		{
			if(autoriseAffiche($tabLien['nom'],$tabLien['dos']))	//On verifie qu'on a le droit d'afficher
			{
				$fp = fopen($tabLien["dos"].$tabLien["nom"], 'r');	//On ouvre le fichier
				header("Content-Type:".mime_content_type($lien));
				header("Content-Length: " . filesize($lien));
				header('Content-Disposition: attachment; filename="'.$tabLien["nom"].'"');
				fpassthru($fp);
				exit;
			}
			else
				echo "Inderdit de télécharger";
		}
		else
			echo "Le fichier n'existe pas";
	}
	else
		echo "Le lien n'existe pas.";
}
else
	echo "Vous ne pouvez pas utiliser ce miroir."
?>
