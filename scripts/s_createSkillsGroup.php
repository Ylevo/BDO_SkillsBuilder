<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$id=$_POST['id'];
$version=$_POST['version'];
$name=$_POST['name'];

$pdo->createSkillsGroup($id, $version, $name);

echo JSONConstruct("Success", "{}");

?>
