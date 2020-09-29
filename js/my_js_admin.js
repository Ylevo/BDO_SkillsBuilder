$.fn.hasAttr = function(name) {  
        return typeof(this.data(name)) !== 'undefined' && this.data(name) !== false;
    };
    
function generate_skill(data) {
   var timeout;
   var newSkill = $("<span></span>");
   $.each(data, function(index, value){
      newSkill.data(index, value); 
   });
   newSkill.data('id', data['ID']);
   if (data['STAYCOLORED'] !== null) newSkill.data('staycolored', data['STAYCOLORED']); 
   newSkill.addClass("skill_box");
   newSkill.css( { marginLeft : data["POSITION_X"]+"px", marginTop : data["POSITION_Y"]+"px" } );
   var img = $("<img />", { src : data['IMG'], 'class' : 'skill_img' });
   if (data["AT_CREATION"] == 1) {
       newSkill.data('selected', "");
       newSkill.data('undeselectable', "");
   } else {
       $(img).addClass('grayed');
   }
   var delete_img = $("<span class='delete_icon'></span>");
   newSkill.append(delete_img);
   newSkill.append(img);
   var description_box = $("<div class = 'description_box'></div>");
   $(description_box).html(construct_description(data));
   
   $(description_box).mouseenter(function(){
       clearTimeout(timeout);
   });
   $(description_box).mouseleave(function(){
       $(this).hide();
   });
   newSkill.append(description_box);
   newSkill.data('prerequisite', data['PREREQUISITE']);
   $(newSkill).mouseenter(function(){
       $(this).find(".description_box").show();
   });
   $(newSkill).mouseleave(function(){
       var element = $(this);
       timeout = setTimeout(function(){
           $(element).find(".description_box").hide(); 
       }, 50);
   })
   return newSkill;
}

function generateLine(arr_positions) {
    var firstPos = roundUpArray(arr_positions[0].split('-'));
    var secondPos = roundUpArray(arr_positions[1].split('-'));
    var type, height, width, margin_left, margin_top;
    if (firstPos[0] > secondPos[0]) { firstPos[0] =  secondPos[0] + (secondPos[0] = firstPos[0], 0); }
    if (firstPos[1] > secondPos[1]) { firstPos[1] =  secondPos[1] + (secondPos[1] = firstPos[1], 0); }
    if ( (secondPos[0] - firstPos[0]) > 30) {
        type = "horizontal";
        secondPos[1] = firstPos[1];
        height = "1px";
        width = (secondPos[0] - firstPos[0])+"px";
        margin_left = firstPos[0]+"px";
        margin_top = firstPos[1]+"px";
    }
    else {
        type = "vertical";
        secondPos[0] = firstPos[0];
        height = (secondPos[1] - firstPos[1])+"px";
        width = "1px";
        margin_left = firstPos[0]+"px";
        margin_top = firstPos[1]+"px";
    }

    var newLine = $("<span class='skill_line'></span>");
    $(newLine).css( { marginLeft : margin_left, 
                              marginTop : margin_top,
                              height : height,
                              width : width });
    Requests["insertNewSkillLine"]({
            sender: this
            , data: { classe: $("#selected_portrait").attr('data-id'), version: $("#version_choice option:selected").val(), width : width, height : height, margin_left : margin_left, margin_top : margin_top}
            , onSuccess: function (sender, e) {
                alert("good");
                }
            , onError: function (sender, e) {
                alert("error");
            }
        });
    return newLine;
}
    
function generateLineDB(data) {
    var newLine = $("<span class='skill_line'></span>");
    $(newLine).css( { marginLeft : data['POSITION_X']+"px", 
                              marginTop : data['POSITION_Y']+"px",
                              height : data['HEIGHT'],
                              width : data['WIDTH'] });
    $(newLine).data('line_id', data['ID']);
    return newLine;
}

function construct_description(data) {
   var descr_construct;
   descr_construct = "<div class='description_box_wrapper'>";
   // Nom du skill en haut
   descr_construct += "<div class='description_box_skill_title'>"+data['NAME']+"</div>";
   // Alignement icône du skill et description
   descr_construct += "<div class='description_box_icone'><span style='float:left'><img src='"+data['IMG']+"' /></span><span style='float:left;width:230px;padding-top: 5px;'>"+data['DESCRIPTION']+"</span></div>";
   // Contrôles
   descr_construct +=  "<div class='description_box_categ' style='clear:both;padding-top:10px'>";
   descr_construct +=  "<span class='description_box_categ_title'>Controls :</span><div>"+data['CONTROLS']+"</div>";
   descr_construct += "</div>";
   // Conditions et coûts
   descr_construct +=  "<div class='description_box_categ'>";
   descr_construct +=  "<span class='description_box_categ_title'>Requirements and costs :</span>";
   if (data['LEVEL_REQUIRED'] !== null) {
       descr_construct += "<div>Level :<span class='description_box_value floated'>"+data['LEVEL_REQUIRED']+"</span></div>";
   }
   if (data['SP_COST'] !== null) {
       descr_construct += "<div>SP Cost :<span class='description_box_value floated'>"+data['SP_COST']+"</span></div>";
   }
   if (data['COST'] !== null) {
       descr_construct += "<div>Cost :<span class='description_box_value floated'>"+data['COST']+"</span></div>";
   }
   if (data['COOLDOWN'] !== null) {
       descr_construct += "<div>Cooldown :<span class='description_box_value floated'>"+data['COOLDOWN']+"</span></div>";
   }
   descr_construct += "</div>";
   // Effects
   var effects = data['EFFECTS'].split("[c]").join("<span class='description_box_value'>").split("[/c]").join("</span>");
   descr_construct +=  "<div class='description_box_categ'>";
   descr_construct +=  "<span class='description_box_categ_title'>Effects :</span><div>"+effects+"</div>";
   descr_construct += "</div>";
   if (data['AWAKEN'] == "1") {
       descr_construct +=  "<div class='description_box_categ'>";
       descr_construct +=  "<span class='description_box_awaken'>Awakening skill</span>";
       descr_construct += "</div>";
   }
   // Fin wrapper
   descr_construct += "</div>";
   // Webm
   descr_construct += "<video width='320' height='240' style='margin-top:10px;' loop='' autoplay=''><source type='video/webm;' src='"+data['WEBM']+"'></source></video>";
   return descr_construct;
}
    
function roundUpArray(arr) {
    var x = 0;
    var len = arr.length
    while(x < len){ 
        arr[x] = Math.floor(arr[x])
        x++
    }
    return arr;
}

function allow_drag_and_drop(e) {
   $(this).css("width", "100px");
   $(this).css("height", "100px");
   var mouse_x = e.pageX;
   var mouse_y = e.pageY;
   var starting_left = parseInt($(this).css("margin-left").replace("px", ""));
   var starting_top = parseInt($(this).css("margin-top").replace("px", "")); 
   $(this).find('img').removeClass('grayed');
   $(this).mousemove(function(event){
       var marginLeft = starting_left+event.pageX-mouse_x+'px';
       var marginTop = starting_top+event.pageY-mouse_y+'px';
       $(this).css({ marginLeft : marginLeft, marginTop : marginTop});
       $("#newSkill_left").val(marginLeft);
       $("#newSkill_top").val(marginTop);
       return false;
   })
}

function disable_drag_and_drop() {
   $(this).find('img').addClass('grayed');
   $(this).off('mousemove');
}

// Left-click event on skill
function select_skill_event(event) {
    if ($(this).hasAttr('selected')) { console.log("Skill already selected."); return false; }
        // Checking required skills are well selected
        var keep_going;
        if ($(this).data('prerequisite') != "") {
            keep_going = true;
            var arr_prerequis = $(this).data('prerequisite').split(",");
            $.each(arr_prerequis, function(key, value){
                if (!$("span:data(id=" + value +")").hasAttr('selected')) {
                    keep_going = false;
                    return false;
                }
            })
            if (!keep_going) { console.log("Required skill(s) not selected"); return false; }
        }
        $(this).data("selected", "");
        $(this).find("img").removeClass("grayed");
        console.log("Skill "+$(this).data("id")+" successfully selected.");

        // Required skills back to grayed
        if (keep_going) {
            $.each(arr_prerequis, function(key, value){
                keep_going = true;
                if ($("span:data(id=" + value +")").hasAttr('staycolored')) {
                        var staycolored = $("span:data(id=" + value +")").data('staycolored');
                        staycolored = staycolored.split(',');
                        $.each(staycolored, function(keycolor, valuecolor){
                            if (!$("span:data(id=" + valuecolor +")").hasAttr('selected') && valuecolor !== $(this).data('id')) {
                                keep_going = false;
                                return false;
                            }
                        })

                    }
                 if (keep_going) $("span:data(id=" + value +")").find("img").addClass("grayed");
                 $("span:data(id=" + value +")").data("undeselectable", "");
                }
            )
        }
    }

// Right-click event on skill
function unselect_skill_event(element) {

   // Check if skill is deselectable and selected
   if ($(element).hasAttr("undeselectable") || !$(element).hasAttr("selected")) { console.log("Skill not selected or linked skills selected."); return false; }
   $(element).find("img").addClass("grayed");
   $(element).removeData("selected");
   // Check if skill has required skills
   if ($(element).data('prerequisite') != "") {
       var arr_prerequis = $(element).data('prerequisite').split(",");
       var keep_going = true;
       // And whether they can now be deselectable or not (if they still have linked skills selected)
       $.each(arr_prerequis, function(key, value){
           if ($("span:data(id=" + value +")").hasAttr('staycolored')) {
                        var staycolored = $("span:data(id=" + value +")").data('staycolored');
                        staycolored = staycolored.split(',');
                        $.each(staycolored, function(keycolor, valuecolor){
                            if ($("span:data(id=" + valuecolor +")").hasAttr('selected')) {
                                keep_going = false;
                                return false;
                            }
                        })
            }
            if (keep_going) $("span:data(id=" + value +")").removeData("undeselectable"); 
            $("span:data(id=" + value +")").find("img").removeClass("grayed");
            })
   }

}

function admin_skill_click(e) {
    alert($(this).data('id'));
}

function delete_skill_line_mode() {
    var check = $._data($("span.skill_line").first(), 'events');
    if (check && check.click) {
        $("span.skill_line").off('click');
        $("span.skill_line").css('box-shadow',"");
        return false;
    }
    $("span.skill_line").css('box-shadow', "0px 0px 5px 8px rgba(168,30,168,1)");
    $("span.skill_line").on('click', function(){
        var line = $(this);
        if (confirm("Supprimer ligne ?")) {
            Requests["removeSkillLine"]({
            sender: this
            , data: { classe : $("#selected_portrait").attr('data-id'),
                      version : $("#version_choice option:selected").val(),
                      id : $(line).data('line_id')
                    }
            , onSuccess: function (sender, e) {
                alert("ALL GOOD");
                $(line).remove();
              }
            , onError: function (sender, e) {
                alert("error");
              }
            });
        }
    })
}

$(document).ready(function () {
    var positions = [];
    var builderElement = $("#builder");
    /*$(builderElement).on( {
        click: select_skill_event,
        mousedown: function(event) {
            if (event.which == 3) {
            unselect_skill_event(this);
            }
        }
    }, "span.skill_box");*/
    $(builderElement).bind("contextmenu",function(e){
        return false;
    });
    
    $(builderElement).on('mousedown', 'span.delete_icon', function(e){
       e.stopPropagation();
       var selectedSkill = $(this).parent();
       if (confirm("Confirmer")) {
           Requests["removeSkill"]({
            sender: this
            , data: { classe : $("#selected_portrait").attr('data-id'),
                      version : $("#version_choice option:selected").val(),
                      language : $("#language_choice option:selected").val(),
                      id : selectedSkill.data('ID')
                    }
            , onSuccess: function (sender, e) {
                alert("ALL GOOD");
                selectedSkill.remove();
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
       }
   });
    
    $("img.grayed_portrait").click(function(){
       if ($("#selected_portrait").length > 0){
           $("#selected_portrait").addClass("grayed_portrait")
           $("#selected_portrait").removeAttr('id');
           $("#builder").empty();
       }
       $(this).removeClass("grayed_portrait");
       $(this).attr('id', 'selected_portrait');
       var classe = $(this).attr('data-id');
       var version = $("#version_choice option:selected").val();
       var language = $("#language_choice option:selected").val();
       Requests["getClassSkills"]({
                sender: this
                , data: { classe: classe, version: version, language: language}
                , onSuccess: function (sender, e) {
                    $.each(e.response.data, function (key, data) {
                        builderElement.append(generate_skill(data)); 
                  });
                }
                , onError: function (sender, e) {
                    alert("error");
                }
            });
       Requests["getClassSkillsLines"]({
            sender: this
            , data: { classe: classe, version: version}
            , onSuccess: function (sender, e) {
                $.each(e.response.data, function (key, data) {
                    builderElement.append(generateLineDB(data));
                });
            }
            , onError: function (sender, e) {
                alert("error");
            }
        });
       Requests["getClassWebm"]({
            sender: this
            , data: {classe: classe }
            , onSuccess: function (sender, e) {
                var select_to_append = $("#newSkill_webm");
                $("#newSkill_webm").empty();
                $.each(e.response.data, function (key, data) {
                    $("<option value='"+data['PATH']+"'>"+data['PATH']+"</option>").appendTo(select_to_append);
                });
                $("#new_webm").attr('src', $("#newSkill_webm option:selected").val());
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
    });
        
    Requests["getIcons"]({
            sender: this
            , data: {}
            , onSuccess: function (sender, e) {
                var select_to_append = $("#newSkill_icone");
                $.each(e.response.data, function (key, data) {
                $("<option value='"+data['PATH']+"'>"+data['PATH']+"</option>").appendTo(select_to_append);
            });
            $("#newSkill").find('img').attr('src', $("#newSkill_icone option:selected").val());
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
    Requests["getSkillsGroups"]({
            sender: this
            , data: {version : $("#version_choice option:selected").val()}
            , onSuccess: function (sender, e) {
                var select_to_append = $("#newSkill_group");
                $(select_to_append).html("");
                $.each(e.response.data, function (key, data) {
                $("<option value='"+data['ID']+"'>"+data['ID']+"</option>").appendTo(select_to_append);
            });
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
    
    $("#newSkill_icone").on('mouseenter', 'option', function(){
        $("#newSkill").find('img').attr('src', $(this).val()); //$("#newSkill_icone option:selected")
    });
    
    $("#newSkill_webm").on('mouseenter', 'option', function(){
        $("#new_webm").attr('src', $(this).val());
    });
    
    $("#mode2").click(function(){
        $("span.skill_box").off('click');
        $(builderElement).off('click');
        positions = [];
        $("span.skill_box").click(function(e){
            positions.push((parseFloat($(this).css('margin-left'), 10))+21+"-"+(parseFloat($(this).css('margin-top'), 10)+21));
            if (positions.length == 2) {
                 var newLine = generateLine(positions);
                 $(builderElement).append(newLine);
                 positions = [];
             }
        })
    });
    $("#mode1").click(function(){
        $("span:data(id)").off('click');
        positions = [];
        $(builderElement).off('click');
        $(builderElement).click(function(e){
             var parentOffset = $(this).offset(); 
             var relX = e.pageX - parentOffset.left;
             var relY = e.pageY - parentOffset.top;
             positions.push(relX+"-"+relY);
             if (positions.length == 2) {
                 var newLine = generateLine(positions);
                 $(builderElement).append(newLine);
                 positions = [];
             }
         })
    });
    
    $("#stop").click(function(){
        $(builderElement).off('click');
        $("span:data(id)").off('click');
        positions = [];
    });
    
   $("#createSkill").click(function(){
       if ($("#selected_portrait").length == 0) { alert ("No class selected."); return false;}
       $(this).attr('disabled', true);
       $("#validateSkill").removeAttr('disabled');
       var newSkill = $("<div id='newSkill' draggable=false ></div>")
       newSkill.addClass("skill_box");
       var img = $("<img  />", { src : "images/warrior/warrior_skills/war_17.png", 'class' : 'skill_img grayed', draggable : 'false' });
       $(img).css('filter', 'none');
       newSkill.append(img);
       $("<div class = 'description_box'>New</div>").appendTo(newSkill);
       $(newSkill).on('mousedown',allow_drag_and_drop);
       $(newSkill).on('mouseup',disable_drag_and_drop);
       $(builderElement).append(newSkill);
       $("#abortNewSkill").attr('disabled', false);
   });
   
   $("#validateSkill").click(function(){
       var id = $("#newSkill_id").val();
       var id_group = $("#newSkill_group option:selected").val();
       var id_classe = $("#selected_portrait").attr('data-id');
       var id_version = $("#version_choice option:selected").val();
       var id_langue = $("#language_choice option:selected").val();
       var name = $("#newSkill_name").val();
       var cost = $("#newSkill_cost").val();
       var spcost = $("#newSkill_SPcost").val();
       var cooldown = $("#newSkill_cooldown").val();
       var levelRequired = $("#newSkill_levelRequired").val();
       var prerequisite = $("#newSkill_prerequisite").val();
       var skillLevel = $("#newSkill_level").val();
       var effects = $("#newSkill_effects").val();
       var controls = $("#newSkill_controls").val();
       var description = $("#newSkill_description").val();
       var staycolored = $("#newSkill_staycolored").val();
       var atCreation = $("#newSkill_atCreation").is(':checked') ? "1" : "0";
       var awaken = $("#newSkill_awaken").is(':checked') ? "1" : "0";
       var img = $("#newSkill_icone option:selected").val();
       var webm = $("#newSkill_webm option:selected").val();
       var position_x = $("#newSkill_left").val().replace("px", "");
       var position_y = $("#newSkill_top").val().replace("px", "");
       Requests["createSkill"]({
            sender: this
            , data: { id : id,
                      id_group : id_group,
                      id_classe : id_classe,
                      id_version : id_version,
                      id_langue : id_langue,
                      name : name,
                      cost : cost,
                      spcost : spcost,
                      cooldown : cooldown,
                      levelRequired : levelRequired,
                      prerequisite : prerequisite,
                      skillLevel : skillLevel,
                      effects : effects,
                      controls : controls,
                      description : description,
                      staycolored : staycolored,
                      atCreation : atCreation,
                      img : img,
                      webm : webm,
                      position_x : position_x,
                      position_y : position_y,
                      awaken : awaken
                    }
            , onSuccess: function (sender, e) {
                alert("ALL GOOD");
                $("#abortNewSkill").attr('disabled', true);
                $("#newSkill").off('mousedown');
                $("#newSkill").off('mouseup');
                $("#newSkill").removeAttr('id');
                $("#createSkill").attr('disabled', false);
                $("#validateSkill").attr('disabled', true);
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
       
       
   });
   
   $("#group_submit").click(function(){
       Requests["createSkillsGroup"]({
            sender: this
            , data: { version : $("#version_choice option:selected").val(),
                      name : $("#group_name").val(),
                      id : $("#group_id").val()
                    }
            , onSuccess: function (sender, e) {
                var select_to_append = $("#newSkill_group");
                $("<option value='"+$("#group_id").val()+"'>"+$("#group_id").val()+"</option>").appendTo(select_to_append);
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
   })
   $("#createSkill").attr('disabled', false);
   $("#apply_modif").attr('disabled', true);
   $("#validateSkill").attr('disabled', true);
   $("#abortNewSkill").attr('disabled', true);
   
   $("#abortNewSkill").click(function() {
       $("#newSkill").remove();
       $("#validateSkill").attr('disabled', true);
       $("#main_left_side input:text").val("");
       $("#main_right_side input:text").val("");
       $("#createSkill").attr('disabled', false);
       $(this).attr('disabled', true);
       
   });
   $("#modif_mode").click(function(){
       $("span.skill_box").off('click');
       $("span.skill_box").click(admin_modif_skill);
   });
   $("#stop_modif").click(function(){
      $("span.skill_box").off('click');
      $("#apply_modif").attr('disabled', true);
      $("#apply_modif").off('click');
      $("#main_left_side input:text").val("");
      $("#main_right_side input:text").val("");
      $("#newSkill").off('mousedown');
      $("#newSkill").off('mouseup');
      $("#newSkill").removeAttr('id');
   });
   $(builderElement).on('mouseenter', 'span.skill_box', function(){
       $("textarea#skill_summary").val("Skill ID : "+$(this).data('ID')+"\nName : "+$(this).data('NAME')+"\nPrerequis : "+$(this).data('PREREQUISITE')+"\nLeft : "+$(this).css('margin-left')+"\nTop : "+$(this).css('margin-top'));
   });
   
   
   function admin_modif_skill (e) {
       $("#newSkill").removeAttr('id');
       $(this).find('img').attr('draggable', false);
       $(this).attr('id', "newSkill");
       $("#apply_modif").attr('disabled', false);
       $("#newSkill_id").val($(this).data('ID'));
       $("#newSkill_name").val($(this).data('NAME'));
       $("#newSkill_cost").val($(this).data('COST'));
       $("#newSkill_SPcost").val($(this).data('SP_COST'));
       $("#newSkill_cooldown").val($(this).data('COOLDOWN'));
       $("#newSkill_levelRequired").val($(this).data('LEVEL_REQUIRED'));
       $("#newSkill_prerequisite").val($(this).data('PREREQUISITE'));
       $("#newSkill_level").val($(this).data('LEVEL'));
       $("#newSkill_effects").val($(this).data('EFFECTS'));
       $("#newSkill_controls").val($(this).data('CONTROLS'));
       $("#newSkill_description").val($(this).data('DESCRIPTION'));
       $("#newSkill_staycolored").val($(this).data('STAYCOLORED'));
       $(this).data('AT_CREATION') == "1" ? $("#newSkill_atCreation").prop("checked", true) : $("#newSkill_atCreation").prop("checked", false);
       $(this).data('AWAKEN') == "1" ? $("#newSkill_awaken").prop("checked", true) : $("#newSkill_awaken").prop("checked", false);
       $("#newSkill_group").val($(this).data('ID_GROUPE'));
       $("#newSkill_left").val($(this).css("margin-left"));
       $("#newSkill_top").val($(this).css("margin-top"));
       $("#newSkill_icone ").val($(this).data('IMG'));
       $("#newSkill_webm").val($(this).data('WEBM'));
       $(this).on('mousedown',allow_drag_and_drop);
       $(this).on('mouseup', disable_drag_and_drop);
   }
   $("#apply_modif").click(function(){
       $("#apply_modif").attr('disabled', true);
       var id = $("#newSkill_id").val();
       var id_group = $("#newSkill_group option:selected").val();
       var id_classe = $("#selected_portrait").attr('data-id');
       var id_version = $("#version_choice option:selected").val();
       var id_langue = $("#language_choice option:selected").val();
       var name = $("#newSkill_name").val();
       var cost = $("#newSkill_cost").val();
       var spcost = $("#newSkill_SPcost").val();
       var cooldown = $("#newSkill_cooldown").val();
       var levelRequired = $("#newSkill_levelRequired").val();
       var prerequisite = $("#newSkill_prerequisite").val();
       var skillLevel = $("#newSkill_level").val();
       var effects = $("#newSkill_effects").val();
       var controls = $("#newSkill_controls").val();
       var description = $("#newSkill_description").val();
       var staycolored = $("#newSkill_staycolored").val();
       var atCreation = $("#newSkill_atCreation").is(':checked') ? "1" : "0";
       var awaken = $("#newSkill_awaken").is(':checked') ? "1" : "0";
       var img = $("#newSkill_icone option:selected").val();
       var webm = $("#newSkill_webm option:selected").val();
       var position_x = $("#newSkill_left").val().replace("px", "");
       var position_y = $("#newSkill_top").val().replace("px", "");
       Requests["updateSkill"]({
            sender: this
            , data: { id : id,
                      id_group : id_group,
                      id_classe : id_classe,
                      id_version : id_version,
                      id_langue : id_langue,
                      name : name,
                      cost : cost,
                      spcost : spcost,
                      cooldown : cooldown,
                      levelRequired : levelRequired,
                      prerequisite : prerequisite,
                      skillLevel : skillLevel,
                      effects : effects,
                      controls : controls,
                      description : description,
                      staycolored : staycolored,
                      atCreation : atCreation,
                      img : img,
                      webm : webm,
                      position_x : position_x,
                      position_y : position_y,
                      awaken : awaken
                    }
            , onSuccess: function (sender, e) {
                alert("ALL GOOD");
                var newSkill = $("#newSkill");
                newSkill.find('div.description_box').html(construct_description({ NAME : name, CONTROLS : controls,
                                                                                  IMG : img, DESCRIPTION : description,
                                                                                  LEVEL_REQUIRED : levelRequired, SP_COST : spcost,
                                                                                  COST : cost, EFFECTS : effects, 
                                                                                  AWAKEN : awaken, WEBM : webm}));
                $("span.skill_box").off('click');
                $("span.skill_box").click(admin_skill_click);
                $("#newSkill").off('mousedown');
                $("#newSkill").off('mouseup');
                $("#newSkill").removeAttr('id');
        }
            , onError: function (sender, e) {
                alert("error");
            }
        });
   });
   $("#delete_skill_line_mode").click(delete_skill_line_mode);
})
