<?php
session_start();

//===========================================
// VARIABLES DE CONFIGURATION
//===========================================
include_once("./sources/PHP/parametresDefaut.php");	//Par defaut...
include_once("./parametres.php");	//...ecrasée par les parametres perso
$version="16.1.23";


//===========================================
//PASSAGE DE VAIRABLE (Get Post)
//===========================================

//Connection
if(!isset($_SESSION['connecte']))
	$_SESSION['connecte']=false;
if(!isset($_SESSION['admin']))
	$_SESSION['admin']=false;

if(isset($_POST['login-user'])) $login=$_POST['login-user'];
if(isset($_POST['login-mdp'])) $login=$_POST['login-mdp'];

//Redéfinition du root par le Get
$root=$rootDefaut;
if($autoriseRootParGet && isset($_GET['dossier']))
	$root=$_GET['dossier'];
if(!$autoriseDossierParent)
	$root=str_replace('..','./',$root);
if(preg_match("#\./*$#",$root) || preg_match("#^/#",$root))	//Si ca commence par "/"
	$root=$rootDefaut;

//=========================================
//Connection
//======================================

?>
<!doctype html>
<html>
	<head>
		<!-- En-tête de la page -->
		<meta charset="utf-8" />
		<title><?php			
			if($titrePage!="")
				echo $titrePage;
			else if($nomBulleRacine!="")
				echo $nomBulleRacine;
			else{
				$t=explode("/",$root);
				$l=sizeof($t);
				if($t[$l-1]=="")	//Si le explode se termine par un élément vide
					echo $t[$l-2];
				else
					echo $t[$l-1];
			}
		?></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />

		<!-- Style perso -->
		<link rel="stylesheet" href="sources/style.css" />
		
		<!-- Variables d'initialisation -->
		<script>
			<?php
					echo "afficheMenu=";
						echo $_SESSION['admin'] ? "true;\n" : "false;\n";
					echo "\t\t\touvrirPremiereBulle=";
						echo $ouvrirPremiereBulle ? "true;\n" : "false;\n";
					echo "\t\t\troot=\"".$root."\";\n";
					echo "\t\t\tautoriseOmbre=";
						echo $autoriseOmbres ? "true;\n" : "false;\n";
					echo "\t\t\tversion=\"".$version."\";\n";
					echo "\t\t\tvitesseZoom=\"".$vitesseZoom."\";\n";
					echo "\t\t\tcouleurBulleDossiers=\"".$couleurBullesDossiers."\";\n";
					echo "\t\t\tcouleurBulleFichiers=\"".$couleurBullesFichiers."\";\n";
					echo "\t\t\tcouleurBulleLiens=\"".$couleurBullesLiens."\";\n";
					echo "\t\t\tcouleurBulleTexte=\"".$couleurBullesTexte."\";\n";
					/*echo "\t\t\topaciteBulleDossiers=\"".$opaciteBullesDossiers."\";\n";
					echo "\t\t\topaciteBulleFichiers=\"".$opaciteBullesFichiers."\";\n";
					echo "\t\t\topaciteBulleLiens=\"".$opaciteBullesLiens."\";\n";*/
					echo "\t\t\tafficheExtensions=";
						echo $afficheExtensions ? "true;\n" : "false;\n";
					echo "\t\t\tnomBulleRacine=\"".$nomBulleRacine."\";\n";
					echo "\t\t\tautoCentre=";
						echo $autoCentre ? "true;\n" : "false;\n";
					echo "\t\t\trayonAutoCentre=".$rayonAutoCentre.";\n";
					echo "\t\t\tdelaiAutoCentre=".$delaiAutoCentre.";\n";
					echo "\t\t\tvitesseAutoCentre=".$vitesseAutoCentre.";\n";
					echo "\t\t\tdureeOuvertureFermeture=".$dureeOuvertureFermeture.";if(!dureeOuvertureFermeture)dureeOuvertureFermeture=1;\n";
					echo "\t\t\tautoFermeFreres=";
						echo $autoFermeFreres ? "true;\n" : "false;\n";
					echo "\t\t\tafficheBackground=";
						echo $afficheBackground ? "true;\n" : "false;\n";
					echo "\t\t\tcouleurBackground=\"".$couleurBackground."\";\n";
					echo "\t\t\tcouleurConnecteurs=\"".$couleurConnecteurs."\";\n";
					echo "\t\t\tautoriseModifierOptions=";
						echo $autoriseModifierOptions ? "true;\n" : "false;\n";
					echo "\t\t\tautoriseSautLigneTitre=";
						echo ($autoriseSautLigneTitre && $caractereSautLigneTitre!="") ?"true;\n" : "false;\n";
					echo "\t\t\tcaractereSautLigneTitre=\"".$caractereSautLigneTitre."\";\n";
				
			?>

		</script>

		<!-- JQUERY -->
		<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->
		<script src="./sources/JS/libraries/jquery.min.js"></script>
		<!--<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.css" />-->
		<link rel="stylesheet" href="./sources/JS/libraries/jquery-ui.min.css" />
		<!--<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>-->
		<script src="./sources/JS/libraries/jquery-ui.min.js"></script>

		<!-- kineticJs -->
		<script src="./sources/JS/libraries/kinetic-v5.1.0.js"></script>
		<script src="./sources/JS/libraries/kineticPlus.js"></script>
		
		<!-- RaphaelJS -->
		<!--<script src="./sources/JS/libraries/raphael.js"></script>-->
		
		<!-- FabricJS -->
		<!--<script src="./sources/JS/libraries/fabric.min.js"></script>-->
		
		<!-- scripts perso -->
		<script src="./sources/JS/fonctions.js"/></script>
		<script src="./sources/JS/classes/CLASS-Bulle.js"/></script>
		<script src="./sources/JS/classes/CLASS-BulleDossier.js"/></script>
		<script src="./sources/JS/classes/CLASS-BulleFichier.js"/></script>
		<script src="./sources/JS/classes/CLASS-BulleLien.js"/></script>
		<script src="./sources/JS/classes/CLASS-BulleTexte.js"/></script>
		<script src="./sources/JS/classes/CLASS-Menu.js"/></script>
		<script src="./sources/JS/classes/CLASS-BoutonMenu.js"/></script>
		<script src="./sources/JS/classes/CLASS-BoutonLock.js"/></script>
		
		<!-- main script -->
		<script src="./sources/JS/main.js"/></script>

		


	</head>

	<body style="margin:0px;padding:0px;">
		<div id="entete">
		</div>


		<!--------- Scene ou va se dessiner  la carte mentale --------->
		<div id="scene" style="margin:0px;padding:0px;">⌛ Chargement... (Si ce message reste apparent après plusieurs secondes, c'est qu'il y a un problème.
						reportez-vous au site <a href="http://carment.allais.eu">carment.allais.eu</a>)</div>




		<!-- BOUTON LOGIN  ----------------------------------------->
		<div id="bouton-Login">
			<?php
			if($autoriseModifierOptions)
				echo '
			<img src="sources/icones/icone-options.png" onclick="$(\'#dialogOptions\').dialog(\'open\');"/>';
			?><img src="sources/icones/icone-login.png" onclick="$('#dialogLogin').dialog('open');"/>
		</div>
		<!--------- Boite de dialogue de connection --------->
		<div id="dialogLogin" title="Connection...">
			<?php
			if(!$_SESSION['connecte'])	//Si on n'est pas connecté
				{?>
			<div id="messageConnectionReussie">
				Connection réussie !<br/><img src="sources/icones/loading.gif" alt="..."/>
			</div>
			<div id="messageConnectionRatee">
				Erreur de connection : <span></span>
			</div>
			<form id="formLogin">
				<p>
					<label for="login-user">Utilisateur : </label><input type="text" id="login-user" name="login-user"  placeholder="Votre identifiant" size="25"/>
				<br/>
					<label for="login-mdp">Mot de passe : </label><input type="password" id="login-mdp" name="login-mdp" placeholder="Votre mot de passe" size="25"/>
				</p>
			</form>
				<?php }
			else			//Si on est connecté
				{?>
			<div id="messageDeconnectionReussie">
				Déconnection...<br/><img src="sources/icones/loading.gif" alt="..."/>
			</div>
			<div id="messageDeconnectionRatee">
				Erreur de connection : <span></span>
			</div>
				<?php } ?>
		</div>
			<?php
			if(!$_SESSION['connecte'])
				{
					?>
		<script>
				$("#dialogLogin").dialog({
					modal:true,
					autoOpen:false,
					buttons:{"Connection":connection}
				});
		</script>
					<?php
				}
			else
				{ ?>
		<script>
				$("#dialogLogin").dialog({
					modal:true,
					autoOpen:false,
					buttons:{"Déconnection":deconnection}
				});
		</script>
			<?php
				}
			 ?>




		<!-- BOUTONS PARAMETRES --------------------------------->

		<div id="dialogOptions" title="Options de la carte mentale">
			<form id="formOptions">
				<p>
					<label for="options-vitesseZoom">Vitesse Zoom : </label><img src="./sources/icones/tortue.png" alt="[-]"/><input type="range" id="options-vitesseZoom" name="options-vitesseZoom" min="-1" max="1" step="0.01" value="<?php $zoomMin=0.5;$zoomMax=10;echo log($vitesseZoom/sqrt($zoomMin*$zoomMax))/(0.5*log($zoomMax/$zoomMin));?>" onchange="if(autoriseModifierOptions){var zoomMin=0.5;var zoomMax=10;vitesseZoom=Math.sqrt(zoomMin*zoomMax)*Math.exp(0.5*Math.log(zoomMax/zoomMin)*parseFloat($(this).val()))};"/><img src="./sources/icones/lapin.png" alt="[+]"/>
				<br/>
					<label for="options-autoCentre">Auto-centrage : </label><input type="checkbox" id="options-autoCentre" name="options-autoCentre" <?php echo $autoCentre ? "checked=\"checked\"" : "";?> onchange="if(autoriseModifierOptions){autoCentre=$(this).is(':checked')}"/>
				<br/>
					<label for="options-rayonAutoCentre">Rayon d'influence de l'autocentrage : </label><span id="affichageRayonAutoCentre"><?php echo $rayonAutoCentre;?></span>px <input type="range" id="options-rayonAutoCentre" name="options-rayonAutoCentre" min="0" max="1000" step="20" value="<?php echo $rayonAutoCentre;?>" onchange="if(autoriseModifierOptions){rayonAutoCentre=parseFloat($(this).val());$('#affichageRayonAutoCentre').text(rayonAutoCentre)}"/>
				<br/>
					<label for="options-vitesseAutocentre">Durée transition de l'autocentrage : </label><span id="affichageDureeAutoCentre"><?php echo $vitesseAutoCentre;?></span>ms <img src="./sources/icones/lapin.png" alt="[-]"/><input type="range" id="options-vitesseAutocentre" name="options-vitesseAutocentre" min="0" max="2000" step="40" value="<?php echo $vitesseAutoCentre;?>" onchange="if(autoriseModifierOptions){vitesseAutoCentre=parseFloat($(this).val());$('#affichageDureeAutoCentre').text(vitesseAutoCentre);}"/><img src="./sources/icones/tortue.png" alt="[+]"/>
				<br/>				<br/>
					<label for="options-autoFermeFreres">Auto-ferme les bulles "soeurs" : </label><input type="checkbox" id="options-autoFermeFreres" name="options-autoFermeFreres" <?php echo $autoFermeFreres ? "checked=\"checked\"" : "";?> onchange="if(autoriseModifierOptions){autoFermeFreres=$(this).is(':checked')}"/>
				</p>
			</form>
		</div>
		<script>
				$("#dialogOptions").dialog({
					modal:true,
					autoOpen:false,
					width:600,
					buttons:{"Fermer":function(){$( this ).dialog( "close" );}}
				});
		</script>
	</body>
</html>
