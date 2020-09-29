<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/JSHelper.js"></script>
        <script src="js/my_js.js"></script>
        <link href="styles/bdo_css.css" rel="stylesheet" type="text/css" />
        
    </head>
    <body>
        <header>
            <div id="header_left_side">

            </div>
            <div id="header_right_side">
                <div id="header_right_side_menu">
                    <select id="language_choice">
                        <option value="FR">FR</option>
                        <option value="ENG">ENG</option>
                    </select>
                </div>
            </div>
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
        </header>
        <div id="main">
            
            <div id="main_right_side">
                <div id="options_window">
                    <div id="reset_wrapper">
                        <div class="options_buttons" id="resetButton">
                            Reset all settings
                        </div> 
                    </div>
                    <div id="version_wrapper">
                        <label>Black Desert version  </label>
                        <select id="version_choice">
                            <option value="BETA">
                                BETA
                            </option>
                        </select>
                    </div>
                    <div id="subwindow">
                        <div id="title">
                            Skills build
                        </div>
                        <div id="restrictions_options">
                            
                        </div>
                        <p>Total skills points spent : 1</p>
                        <p>Level required : 1</p>
                        <p></p>
                        <p>Skills chosen :</p>
                        <div id="chosen_skills_window">
                            
                        </div>
                    </div>
                    <div id="link_wrapper">
                        <div class="options_buttons" id="linkGenerator_button">
                            Generate sharing link
                        </div>
                    </div>
                    <input type="text" id="url_input">
                </div>
            </div>
            <div id="main_center">
                <div id="builder_wrapper">
                    <div id="builder"></div>
                </div>
            </div>
            <div id="main_left_side">
                
            </div>
        </div>
        
            
        