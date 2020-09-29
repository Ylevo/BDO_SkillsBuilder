<?php

class PdoBDOBuilder
{   		
    private static $serveur='mysql:host=localhost';
    private static $bdd='dbname=builder_bdo';   		
    private static $user='root' ;    		
    private static $mdp='' ;	
    private static $myPdo;
    private static $PdoBDOBuilder = null;

    private function __construct()
    {
        PdoBDOBuilder::$myPdo = new PDO(PdoBDOBuilder::$serveur.';'.PdoBDOBuilder::$bdd, PdoBDOBuilder::$user, PdoBDOBuilder::$mdp); 
        PdoBDOBuilder::$myPdo->query("SET CHARACTER SET utf8");
    }
    public function _destruct()
    {
        PdoBDOBuilder::$myPdo = null;
    }
    public static function getPdoBDOBuilder()
    {
        if(PdoBDOBuilder::$PdoBDOBuilder == null)
        {
                PdoBDOBuilder::$PdoBDOBuilder=new PdoBDOBuilder();
        }
        return PdoBDOBuilder::$PdoBDOBuilder;  
        
    }
    
    /*-----------------------------------------------------  REQUETES SELECT  ---------------------------------------------------------------------*/
    
    
    public function getClassSkills($classe, $version, $language)
    {
        $req = PdoBDOBuilder::$myPdo->prepare("SELECT ID_GROUPE, ID, NAME, DESCRIPTION, COST, EFFECTS, CONTROLS, LEVEL, PREREQUISITE, LEVEL_REQUIRED, COOLDOWN, SP_COST, AT_CREATION, IMG, WEBM, STAYCOLORED, AWAKEN, POSITION_X, POSITION_Y
                                                FROM SKILL
                                                WHERE ID_CLASSE = :classe
                                                AND ID_VERSION = :version
                                                AND ID_LANGUE = :language ;
                                                ");
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $req->bindValue(':language', $language, PDO::PARAM_STR);
        $req->execute();
        $results = $req->fetchAll(PDO::FETCH_ASSOC);
        return $results; 
    }
    
    public function insertNewSkillLine($classe, $version, $height, $width, $position_x, $position_y)
    {
        $req = PdoBDOBuilder::$myPdo->prepare("INSERT INTO SKILL_LINE (ID, ID_CLASSE, ID_VERSION, HEIGHT, WIDTH, POSITION_X, POSITION_Y) 
                                                VALUES (NULL, :classe, :version, :height, :width, :position_x, :position_y);
                                                ");
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $req->bindValue(':height', $height, PDO::PARAM_INT);
        $req->bindValue(':width', $width, PDO::PARAM_INT);
        $req->bindValue(':position_x', $position_x, PDO::PARAM_INT);
        $req->bindValue(':position_y', $position_y, PDO::PARAM_INT);
        $res = $req->execute();
        return $res;
    }
    
    public function getClassSkillsLines($classe, $version)
    {
        $req = PdoBDOBuilder::$myPdo->prepare("SELECT ID, HEIGHT, WIDTH, POSITION_X, POSITION_Y
                                                FROM SKILL_LINE
                                                WHERE ID_CLASSE = :classe
                                                AND ID_VERSION = :version;
                                                ");
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $req->execute();
        $results = $req->fetchAll(PDO::FETCH_ASSOC);
        return $results; 
    }
    
    public function getIcons()
    {
        $req = PdoBDOBuilder::$myPdo->prepare("SELECT PATH
                                                FROM SKILL_ICONE;
                                                ");
        $req->execute();
        $results = $req->fetchAll(PDO::FETCH_ASSOC);
        return $results; 
    }
    
    public function getSkillsGroups($version) {
        $req = PdoBDOBuilder::$myPdo->prepare("SELECT ID
                                                FROM SKILL_GROUP
                                                WHERE ID_VERSION_BIS = :version;
                                                ");
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $req->execute();
        $results = $req->fetchAll(PDO::FETCH_ASSOC);
        return $results; 
    }
    
    public function getClassWebm($classe)
    {
        $req = PdoBDOBuilder::$myPdo->prepare("SELECT PATH
                                                FROM SKILL_WEBM
                                                WHERE ID_CLASSE = :classe;
                                                ");
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->execute();
        $results = $req->fetchAll(PDO::FETCH_ASSOC);
        return $results; 
    }
    
    public function getClasses()
    {
        $req = PdoBDOBuilder::$myPdo->prepare("SELECT ID, NAME
                                                FROM CLASSE
                                                ");
        $req->execute();
        $results = $req->fetchAll(PDO::FETCH_ASSOC);
        return $results; 
    }
    
    public function createSkillsGroup($id, $version, $name) 
    {
        $req = PdoBDOBuilder::$myPdo->prepare("INSERT INTO SKILL_GROUP (ID, ID_VERSION_BIS, NAME) 
                                                VALUES (:id, :version, :name);
                                                ");
        $req->bindValue(':id', $id, PDO::PARAM_STR);
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $req->bindValue(':name', $name, PDO::PARAM_STR);
        $req->execute();
    }
    
    public function createSkill($id, $id_group, $id_classe, $id_version, $id_langue, $name, $cost, $spcost, $cooldown, $levelRequired, $prerequisite, $skillLevel, $effects, $controls, $description, $staycolored, $atCreation, $img, $webm, $position_x, $position_y, $awaken) 
    {
        $req = PdoBDOBuilder::$myPdo->prepare("INSERT INTO SKILL (ID_GROUPE, ID_CLASSE, ID_VERSION, ID_LANGUE, ID, NAME, DESCRIPTION, COST, COOLDOWN, EFFECTS, CONTROLS, LEVEL, PREREQUISITE, LEVEL_REQUIRED, SP_COST, AT_CREATION, IMG, WEBM, STAYCOLORED, AWAKEN, POSITION_X, POSITION_Y) 
                                                VALUES (:id_group, :id_classe, :id_version, :id_langue, :id, :name, :description, :cost, :cooldown, :effects, :controls, :skillLevel, :prerequisite, :levelRequired, :spcost, :atCreation, :img, :webm, :staycolored, :awaken, :position_x, :position_y);
                                                ");
        $req->bindValue(':id', $id, PDO::PARAM_STR);
        $req->bindValue(':id_group', $id_group, PDO::PARAM_STR);
        $req->bindValue(':id_classe', $id_classe, PDO::PARAM_STR);
        $req->bindValue(':id_version', $id_version, PDO::PARAM_STR);
        $req->bindValue(':id_langue', $id_langue, PDO::PARAM_STR);
        $req->bindValue(':name', $name, PDO::PARAM_STR);
        $req->bindValue(':cost', $cost, PDO::PARAM_STR);
        $req->bindValue(':spcost', $spcost, PDO::PARAM_INT);
        $req->bindValue(':cooldown', $cooldown, PDO::PARAM_STR);
        $req->bindValue(':levelRequired', $levelRequired, PDO::PARAM_INT);
        $req->bindValue(':prerequisite', $prerequisite, PDO::PARAM_STR);
        $req->bindValue(':skillLevel', $skillLevel, PDO::PARAM_INT);
        $req->bindValue(':effects', $effects, PDO::PARAM_STR);
        $req->bindValue(':controls', $controls, PDO::PARAM_STR);
        $req->bindValue(':description', $description, PDO::PARAM_STR);
        $req->bindValue(':staycolored', $staycolored, PDO::PARAM_STR);
        $req->bindValue(':atCreation', $atCreation, PDO::PARAM_INT);
        $req->bindValue(':img', $img, PDO::PARAM_STR);
        $req->bindValue(':webm', $webm, PDO::PARAM_STR);
        $req->bindValue(':position_x', $position_x, PDO::PARAM_INT);
        $req->bindValue(':position_y', $position_y, PDO::PARAM_INT);
        $req->bindValue(':awaken', $awaken, PDO::PARAM_INT);
        $res = $req->execute();
        return $res;
    }
    
    public function updateSkill($id, $id_group, $id_classe, $id_version, $id_langue, $name, $cost, $spcost, $cooldown, $levelRequired, $prerequisite, $skillLevel, $effects, $controls, $description, $staycolored, $atCreation, $img, $webm, $position_x, $position_y, $awaken) 
    {
        $req = PdoBDOBuilder::$myPdo->prepare("UPDATE SKILL SET ID_GROUPE = :id_group, ID = :id, NAME = :name, DESCRIPTION = :description, COST = :cost, EFFECTS = :effects, CONTROLS = :controls,  LEVEL = :skillLevel, PREREQUISITE = :prerequisite, LEVEL_REQUIRED = :levelRequired, SP_COST = :spcost, COOLDOWN = :cooldown, AT_CREATION = :atCreation,  IMG = :img, WEBM = :webm, STAYCOLORED = :staycolored, POSITION_X = :position_x,  POSITION_Y = :position_y, AWAKEN = :awaken
                                                WHERE ID_CLASSE = :id_classe
                                                AND ID_VERSION = :id_version
                                                AND ID_LANGUE = :id_langue
                                                AND ID = :id ;
                                                ");
        $req->bindValue(':id', $id, PDO::PARAM_STR);
        $req->bindValue(':id_group', $id_group, PDO::PARAM_STR);
        $req->bindValue(':id_classe', $id_classe, PDO::PARAM_STR);
        $req->bindValue(':id_version', $id_version, PDO::PARAM_STR);
        $req->bindValue(':id_langue', $id_langue, PDO::PARAM_STR);
        $req->bindValue(':name', $name, PDO::PARAM_STR);
        $req->bindValue(':cost', $cost, PDO::PARAM_STR);
        $req->bindValue(':spcost', $spcost, PDO::PARAM_INT);
        $req->bindValue(':cooldown', $cooldown, PDO::PARAM_STR);
        $req->bindValue(':levelRequired', $levelRequired, PDO::PARAM_INT);
        $req->bindValue(':prerequisite', $prerequisite, PDO::PARAM_STR);
        $req->bindValue(':skillLevel', $skillLevel, PDO::PARAM_INT);
        $req->bindValue(':effects', $effects, PDO::PARAM_STR);
        $req->bindValue(':controls', $controls, PDO::PARAM_STR);
        $req->bindValue(':description', $description, PDO::PARAM_STR);
        $req->bindValue(':staycolored', $staycolored, PDO::PARAM_STR);
        $req->bindValue(':atCreation', $atCreation, PDO::PARAM_INT);
        $req->bindValue(':img', $img, PDO::PARAM_STR);
        $req->bindValue(':webm', $webm, PDO::PARAM_STR);
        $req->bindValue(':position_x', $position_x, PDO::PARAM_INT);
        $req->bindValue(':position_y', $position_y, PDO::PARAM_INT);
        $req->bindValue(':awaken', $awaken, PDO::PARAM_INT);
        $res = $req->execute();
        return $res;
    }
    
    public function insertNewIcone($classe, $path)
    {
        $req = PdoBDOBuilder::$myPdo->prepare("INSERT INTO SKILL_ICONE (ID_CLASSE, PATH) 
                                                VALUES (:classe, :path);
                                               ");
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':path', $path, PDO::PARAM_STR);
        $res = $req->execute();
        return $res;
    }
    
    public function insertNewWebm($classe, $path)
    {
        $req = PdoBDOBuilder::$myPdo->prepare("INSERT INTO SKILL_WEBM (ID_CLASSE, PATH) 
                                                VALUES (:classe, :path);
                                               ");
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':path', $path, PDO::PARAM_STR);
        $res = $req->execute();
        return $res;
    }
    
    public function removeSkill($id, $classe, $version, $langue) {
        $req = PdoBDOBuilder::$myPdo->prepare("DELETE FROM SKILL 
                                                WHERE ID = :id
                                                AND ID_CLASSE = :classe
                                                AND ID_VERSION = :version
                                                AND ID_LANGUE = :langue
                                               ");
        $req->bindValue(':id', $id, PDO::PARAM_STR);
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $req->bindValue(':langue', $langue, PDO::PARAM_STR);
        $res = $req->execute();
        return $res;
    }
    
    public function removeSkillLine($id, $classe, $version) {
        $req = PdoBDOBuilder::$myPdo->prepare("DELETE FROM SKILL_LINE 
                                                WHERE ID = :id
                                                AND ID_CLASSE = :classe
                                                AND ID_VERSION = :version
                                               ");
        $req->bindValue(':id', $id, PDO::PARAM_STR);
        $req->bindValue(':classe', $classe, PDO::PARAM_STR);
        $req->bindValue(':version', $version, PDO::PARAM_STR);
        $res = $req->execute();
        return $res;
    }
}

function JSONConstruct($status, $data = "{}")
{
    return json_encode(array('status' => $status, 'message' => 'derp', 'data' => $data ));
}

?>