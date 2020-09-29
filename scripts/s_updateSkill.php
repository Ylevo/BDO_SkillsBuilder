<?php
require_once("../modele/classPDO.php");
$pdo=PdoBDOBuilder::getPdoBDOBuilder();

$id = $_POST['id'];
$id_group = $_POST['id_group'];
$id_classe = $_POST['id_classe'];
$id_version = $_POST['id_version'];
$id_langue = $_POST['id_langue'];
$name = $_POST['name'];
$cost = $_POST['cost'] == "" ? null : $_POST['cost'];
$spcost = $_POST['spcost'] == "" ? null : $_POST['spcost'];
$cooldown = $_POST['cooldown'] == "" ? null : $_POST['cooldown'];
$levelRequired = $_POST['levelRequired'] == "" ? null : $_POST['levelRequired'];
$prerequisite = $_POST['prerequisite'] == "" ? null : $_POST['prerequisite'];
$skillLevel = $_POST['skillLevel'];
$effects = $_POST['effects'];
$controls = $_POST['controls'];
$description = $_POST['description'];
$staycolored = $_POST['staycolored'] == "" ? null : $_POST['staycolored'];
$atCreation = $_POST['atCreation'];
$awaken = $_POST['awaken'];
$img = $_POST['img'];
$webm = $_POST['webm'];
$position_x = $_POST['position_x'];
$position_y = $_POST['position_y'];

$response = $pdo->updateSkill($id, $id_group, $id_classe, $id_version, $id_langue, $name, $cost, $spcost, $cooldown, $levelRequired, $prerequisite, $skillLevel, $effects, $controls, $description, $staycolored, $atCreation, $img, $webm, $position_x, $position_y, $awaken);
if (!$response) { $response = "Error"; } else { $response = "Success"; }

echo JSONConstruct($response, "{}");


?>