<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$version = $_POST['version'];

$icones = $pdo->getSkillsGroups($version);
echo JSONConstruct("Success", $icones);

?>