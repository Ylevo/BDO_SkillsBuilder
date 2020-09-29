<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();


$classes = $pdo->getClasses();
echo JSONConstruct("Success", $classes);

?>
