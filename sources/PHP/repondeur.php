<?php
session_start();

include_once("./fonctions.php");


// variables reçues ============================

//Action à exécuter
$action="";
if(isset($_POST['action']))	$action=$_POST['action'];

$pathLock=""; //fichier (ou dossier) à bloquer
if(isset($_POST['pathLock']))	$pathLock="../../".$_POST['pathLock'];
$dossierLock=dirname($pathLock);
$fichierLock=basename($pathLock);

$login="";//Login pour connection
if(isset($_POST['login']))	$login=$_POST['login'];

$mdp="";//Mot de passe pour connection
if(isset($_POST['mdp']))	$mdp=$_POST['mdp'];

$dossierScan="./";//Dossier à scanner
if(isset($_POST['dossierScan']))	$dossierScan=$_POST['dossierScan'];




//On récupere les données =======================
if($action=="loadChildren" || $action=="loadIcone")
{
	//Liste des fichiers/dossiers
	$listeFichiers=scandir("../../".$dossierScan);

	//CONSTITION DE LA LISTE ========================
	header('Content-type: text/xml');	//Dire qu'on envoie du XML
	echo "<?xml version = \"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?>\n";
	echo "<infosDossier>\n" ;
	echo "	<listeFichiers>\n";
	foreach($listeFichiers as $f)
		{

			if(autoriseAffiche($f,"../../".$dossierScan))
				{
					$type="";
					$lien="";
					$nom="";

					$bloque="bloque";
					if(autoriseAffiche($f,"../../".$dossierScan,true))
						$bloque="libre";
				
					//Si c'est un dossier...
					if(is_dir("../../".$dossierScan."/".$f))
						echo "		<fichier nom=\"$f\" type=\"dossier\"  bloque=\"$bloque\"/>\n";
					elseif(is_file("../../".$dossierScan."/".$f) && is_lien($f))	//Si c'est un lien...
						{
							$lien=getLien("../../".$dossierScan."/".$f);
							echo "		<fichier nom=\"$f\" type=\"lien\"  lien=\"".htmlentities($lien)."\" bloque=\"$bloque\"/>\n";
						}
					elseif(is_file("../../".$dossierScan."/".$f) && is_texte($f))	//Si c'est un texte
						{
							$texte=getTexte("../../".$dossierScan."/".$f);
							echo "		<fichier nom=\"$f\" type=\"texte\"  texte=\"$texte\" bloque=\"$bloque\"/>\n";
						}
					elseif(is_file("../../".$dossierScan."/".$f))	//Si c'est un fichier... mais pas un lien ni un texte !
						echo "		<fichier nom=\"$f\" type=\"fichier\"  bloque=\"$bloque\"/>\n";


					/*echo "		<fichier nom=\"".$nom."\" type=\"".$type."\"  ";

					if($lien!="")
						echo "lien=\"".htmlentities($lien)."\" ";

					//Si bloqué ?
					if(autoriseAffiche($f,"../../".$dossierScan,true))
						echo "bloque=\"libre\"";
					else
						echo "bloque=\"bloque\"";
					echo "/>\n";*/
				}
		}
	echo "	</listeFichiers>\n";
	if(iconeExists("../../".$dossierScan))	//S'il y a une icone
		echo "	<icone url=\"".getIconeURL($dossierScan)."\"/>\n";
	echo "</infosDossier>";
}

//=============================================================
if($action=="lock")
{
	if($_SESSION['connecte'])	//Si on est connecté
	{
		if(file_exists($pathLock))//Si le fichier existe...
		{
			createFichierConfig($dossierLock); //Cree le fichier de config, sauf s'il existe deja
			if($xml = simplexml_load_file($dossierLock.'/.carte-mentale'))	//Ouvre le fichier XML
				{
					//Suppression d'un éventuel homonyme
					//echo "\n\n=====================================\n";
					$cpt=0;	//Compteur d'enfant...
					$fichierLocks=$xml->xpath('/config/interdits/fichier');//interdits[0]->fichier; //Liste des fichiers
					foreach($fichierLocks as $fic)	//Pour chaque fichier...
					{
						if($fic->nom==$fichierLock)	//Si le nom correspond à celui qu'on doit supprimer
						{
							//unset($xml->interdits[0]->fichier[$cpt]);	//On le supprime
							break;	//Et on n'en cherche pas d'autre, sinon, c'est la merde...
						}
						$cpt++;	//Enfant suivant
					}

					//Ajout du fichier dans le XML
					$enfant=$xml->interdits->addChild("fichier");
					$enfant->addChild("nom",$fichierLock);
					$enfant->addChild("VIP");
					$xml->asXML($dossierLock.'/.carte-mentale');
					$messageRetour="OK";
				}
			else
				$messageRetour="Impossible de charger '.carte-mentale'";
		}
		else
			$messageRetour="Le fichier à bloquer n'existe pas";
		
	}
	else
		$messageRetour="Action interdite";
	echo $messageRetour;
}

//=============================================================
if($action=="unlock")
{


	if($_SESSION['connecte'])	//Si on est connecté
	{
		if(file_exists($pathLock))//Si le fichier existe...
		{
			if(file_exists($dossierLock."/.carte-mentale"))//S'il existe déjà...
			{	
				if($xml = simplexml_load_file($dossierLock.'/.carte-mentale'))//Si on arrive a charger le XML...
				{
					$cpt=0;	//Compteur d'enfant...
					$fichierLocks=$xml->xpath('/config/interdits/fichier');//interdits[0]->fichier; //Liste des fichiers
					foreach($fichierLocks as $fic)	//Pour chaque fichier...
					{
						if($fic->nom==$fichierLock)	//Si le nom correspond à celui qu'on doit supprimer
						{
							unset($xml->interdits[0]->fichier[$cpt]);	//On le supprime
							break;	//Et on n'en cherche pas d'autre, sinon, c'est la merde...
						}
						$cpt++;	//Enfant suivant
					}
					$messageRetour="OK";
					$xml->asXML($dossierLock.'/.carte-mentale');//On enregistre !
				}
				else
				$messageRetour="Impossible de charger '.carte-mentale'";
			}
			else	//Si .carte-mentale n'existe pas...
				$messageRetour="OK"; //...c'est pas grave
		}
		else
			$messageRetour="Le fichier à bloquer (".$dossierLock.") n'existe pas";
	}
	else
		$messageRetour="Action interdite";	
	echo $messageRetour;
}



//=============================================================
if($action=="login")
{
	if(valideMdp($login,$mdp))
		{
			$_SESSION['connecte']=true;
			if(isAdmin($login))
				$_SESSION['admin']=true;
			$messageRetour="OK";
		}
	else
		$messageRetour="Identifiant ou mot de passe incorrect";	
	echo $messageRetour;
}


//=============================================================
if($action=="unlog")
{
	$_SESSION['connecte']=false;
	$_SESSION['admin']=false;
	$messageRetour="OK";	
	echo $messageRetour;
}


?>
