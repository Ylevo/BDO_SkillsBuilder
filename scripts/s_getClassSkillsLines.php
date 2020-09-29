<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$classe=$_POST['classe'];
$version=$_POST['version'];

$skillsLines = $pdo->getClassSkillsLines($classe, $version);
echo JSONConstruct("Success", $skillsLines);

?>