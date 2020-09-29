<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();



$icones = $pdo->getIcons();
echo JSONConstruct("Success", $icones);

?>
