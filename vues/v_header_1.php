<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/JSHelper.js"></script>
        <script src="js/my_js_admin.js"></script>
        <link href="styles/bdo_css_1.css" rel="stylesheet" type="text/css" />
        
    </head>
    <body>
        <div id="header">
            <div id="header_left_side">

            </div>
            <div id="header_right_side">
                <div id="header_right_side_menu">
                    <label>WORKING ON : </label>
                        <select id="version_choice">
                             <option value="BETA">BETA</option>
                             <option value="V1.2.3">V1.2.3</option>
                         </select>
                    <label>WORKING ON :  </label>
                        <select id="language_choice">
                            <option value="FR">FR</option>
                            <option value="ENG">ENG</option>
                        </select>
                </div>
            </div>
            <div id="header_center">

                <div id="header_center">
                <div id="header_portraits">
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/warrior.jpg" class="grayed_portrait" data-id="WAR">
                    </div>
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/archer.jpg" class="grayed_portrait" data-id="RANG">
                    </div>
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/sorcerer.jpg" class="grayed_portrait" data-id="SORC">
                    </div>
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/giant.jpg" class="grayed_portrait" data-id="GIAN">
                    </div>
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/blader.jpg" data-id="BLAD">
                    </div>
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/tamer.jpg" data-id="TAM" >
                    </div>
                    <div class="header_portraits_img_wrapper">
                        <img src="images/portraits/valkyrie.jpg" data-id="VALK">
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div id="main">
            
            <div id="main_right_side">
                <input type="button" id="mode1" value="Mode libre"/> 
                <input type="button" id="mode2" value="Mode skills"/> 
                <input type="button" id="stop" value="Stop"/>
                <input type="button" id="delete_skill_line_mode" value="Skill line mode">
                </br>
                <p>Créer groupe de skills :</p>
                <label style="display:inline-block;width:50px;">Nom : </label>
                <input type="text" id="group_name">
                </br>
                <label style="display:inline-block;width:50px;">ID : </label>
                <input type="text" id="group_id">
                </br>
                <input type="button" id="group_submit" value="Valider">
                </br>
                <input type="button" id="modif_mode" value="Mode modifier"> <input type="button" id="stop_modif" value="Stop modif">
                </br>
                <div style="margin-top:40px"><textarea rows="10" cols="45" id="skill_summary">Test</textarea></div>
                <div style="margin-top:20px">
                    <p><label>Left : </label><input type="text" id="newSkill_left"></p>
                    <p><label>Top : </label><input type="text" id="newSkill_top"></p>
                </div>
            </div>
            <div id="main_center">
                <div id="builder_wrapper">
                    <div id="builder"></div>
                </div>
                
                
            </div>
            <div id="main_left_side">
                <div>
                    <input type="button" id="createSkill" value="New skill" /> <input type="button" disabled id="validateSkill" value="Valider" />  <input type="button" disabled id="apply_modif" value="Apply modif" /> <input type="button" id="abortNewSkill" value="Annuler"> 
                </div>
                <div>
                    <select name="newSkill_icone" id="newSkill_icone">
                    </select>
                </div>
                <div>
                    <select name="newSkill_webm" id="newSkill_webm">
                    </select>
                    <div>
                        <video id="new_webm" width='320' height='240' style='margin-right:15px;' loop='' autoplay=''><source type='video/webm;' src=''></source></video>
                    </div>
                    <p>
                        <label>ID : </label><input type="text" id="newSkill_id" class="admin_input">
                    </p>
                    <p>
                        <label>Name : </label><input type="text" id="newSkill_name" class="admin_input">
                    </p>
                    <p>
                        <label>Coûts : </label><input type="text" id="newSkill_cost" class="admin_input">
                    </p>
                    <p>
                        <label>SP Cost : </label><input type="text" id="newSkill_SPcost" class="admin_input">
                    </p>
                    <p>
                        <label>Cooldown : </label><input type="text" id="newSkill_cooldown" class="admin_input">
                    </p>
                    <p>
                        <label>Level requis : </label><input type="text" id="newSkill_levelRequired" class="admin_input">
                    </p>
                    <p>
                        <label>Skills prérequis : </label><input type="text" id="newSkill_prerequisite" class="admin_input" placeholder="séparés par une virgule">
                    </p>
                    <p>
                        <label>Level du skill : </label><input type="text" id="newSkill_level" class="admin_input">
                    </p>
                    <p>
                        <label>Effets : </label><textarea rows="4" cols="30" id="newSkill_effects"></textarea>
                    </p>
                    <p>
                        <label>Contrôles : </label><input type="text" id="newSkill_controls" class="admin_input">
                    </p>
                    <p>
                        <label>Description : </label><input type="text" id="newSkill_description" class="admin_input">
                    </p>
                    <p>
                        <label>Staycolored</label><input type="text" id="newSkill_staycolored" placeholder="séparés par une virgule" class="admin_input">
                    </p>
                    <p>
                        <label>At_creation</label><input type="checkbox" id="newSkill_atCreation">
                    </p>
                    <p>
                        <label>Awaken</label><input type="checkbox" id="newSkill_awaken">
                    </p>
                    <p>
                        <select id="newSkill_group">
                        </select>
                    </p>
                </div>
            </div>
            
        