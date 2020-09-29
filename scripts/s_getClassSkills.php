<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$classe=$_POST['classe'];
$version=$_POST['version'];
$language=$_POST['language'];

$skills = $pdo->getClassSkills($classe, $version, $language);
echo JSONConstruct("Success", $skills);

?>
