<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$classe = $_POST['classe'];
$version = $_POST['version'];

$height = $_POST['height'];
$width = $_POST['width'];
$position_x = $_POST['margin_left'];
$position_y = $_POST['margin_top'];

$response = $pdo->insertNewSkillLine($classe, $version, $height, $width, $position_x, $position_y);
if ($response) echo JSONConstruct("Success"); else echo JSONConstruct("Error");
?>
