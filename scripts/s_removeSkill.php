<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$id = $_POST['id'];
$classe= $_POST['classe'];
$version= $_POST['version'];
$language= $_POST['language'];

$res = $pdo->removeSkill($id, $classe, $version, $language);
echo JSONConstruct($res == true ? "Success" : "Error", "{}");

?>
