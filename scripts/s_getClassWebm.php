<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$classe=$_POST['classe'];

$webm = $pdo->getClassWebm($classe);
echo JSONConstruct("Success", $webm);

?>
