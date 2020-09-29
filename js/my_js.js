$.fn.hasAttr = function(name) {  
        return typeof(this.data(name)) !== 'undefined' && this.data(name) !== false;
    };
   
function generate_skill(data) {
   var newSkill = $("<span></span>"); 
   $(newSkill).data({ 'id' : data['ID'], 'sp_cost' : data['SP_COST'], 'level_required' : data['LEVEL_REQUIRED']});
   if (data['STAYCOLORED'] !== null) newSkill.data('staycolored',data['STAYCOLORED']);
   if (data['PREREQUISITE'] !== null) newSkill.data('prerequisite', data['PREREQUISITE']); 
   newSkill.addClass("skill_box");
   newSkill.css( { marginLeft : data["POSITION_X"]+"px", marginTop : data["POSITION_Y"]+"px" } );
   var img = $("<img />", { src : data['IMG'], 'class' : 'skill_img' });
   if (data["AT_CREATION"] == 1) {
       newSkill.data('selected', "");
       newSkill.data('undeselectable', "");
       newSkill.data('at_creation', "");
   } else {
       $(img).addClass('grayed');
   }
   newSkill.append(img);
   var description_box = $("<div class = 'description_box'></div>");
   $(description_box).html(construct_description(data));
   newSkill.append(description_box);
   if (newSkill.hasAttr('at_creation')) add_chosen_skill(newSkill);
   return newSkill;
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

function display_description() {
    var desc_box = $(this).find("div.description_box");
    $(desc_box).css( { 'margin-left' : "0px", 'margin-top' : "0px"});
    var b_wrapper = $("#builder_wrapper");
    var b_wrapper_right = $(b_wrapper).offset().left + $(b_wrapper).width();
    var b_wrapper_top = $(b_wrapper).offset().top;
    var b_wrapper_bottom = b_wrapper_top + $(b_wrapper).height();
    
    $(desc_box).show();
    var desc_top = $(desc_box).offset().top;
    var desc_x = parseInt($(desc_box).css('width'),10) + $(desc_box).offset().left;
    var desc_y = parseInt($(desc_box).css('height'),10) + desc_top;
    if (desc_y > b_wrapper_bottom) {
        if (( b_wrapper_right - desc_x ) < 50) {
            
            $(desc_box).css( { 'margin-top' : "-"+((desc_y - b_wrapper_bottom))+"px" ,
                               'margin-left' : "-330px"});
        } else {
            $(desc_box).css( { 'margin-top' : "-"+((desc_y - b_wrapper_bottom))+"px" ,
                               'margin-left' : "50px"});
        }
    }
    if (desc_x > b_wrapper_right) {
        $(desc_box).css({ 'margin-left' : "-"+((desc_x - b_wrapper_right)+40)+"px" })
    }
    if (desc_top < b_wrapper_top) {
        (desc_box).css( { 'margin-top' : ((b_wrapper_top - desc_top))+"px" } );
    }
}
    
function roundUpArray(arr){
    var x = 0;
    var len = arr.length
    while(x < len){ 
        arr[x] = Math.floor(arr[x])
        x++
    }
    return arr;
} 


// Left-click event on skill
function select_skill_event(event) {
    if ($(this).hasAttr('selected')) { console.log("Skill already selected."); return false; }
        // Checking required skills are well selected
        var keep_going;
        if ($(this).hasAttr('prerequisite')) {
            keep_going = true;
            var arr_prerequis = $(this).data('prerequisite').split(",");
            $.each(arr_prerequis, function(key, value){
                if (!$("#builder span:data(id=" + value +")").hasAttr('selected')) {
                    keep_going = false;
                    return false;
                }
            })
            if (!keep_going) { console.log("Required skill(s) not selected"); return false; }
        }
        $(this).data("selected", "");
        $(this).find("img").removeClass("grayed");
        $("#sp_spent").text(Math.floor($("#sp_spent").text())+Math.floor($(this).data('sp_cost')));
        console.log("Skill "+$(this).data("id")+" successfully selected.");
        if (Math.floor($("#level_required").text()) < Math.floor($(this).data('level_required'))){
            $("#level_required").text($(this).data('level_required'));  
        }
        add_chosen_skill($(this));

        // Required skills back to grayed
        if (keep_going) {
            $.each(arr_prerequis, function(key, value){
                keep_going = true;
                if ($("#builder span:data(id=" + value +")").hasAttr('staycolored')) {
                        var staycolored = $("#builder span:data(id=" + value +")").data('staycolored');
                        staycolored = staycolored.split(',');
                        $.each(staycolored, function(keycolor, valuecolor){
                            if (!$("#builder span:data(id=" + valuecolor +")").hasAttr('selected') && valuecolor !== $(this).data('id')) {
                                keep_going = false;
                                return false;
                            }
                        })

                    }
                 if (keep_going) $("#builder span:data(id=" + value +")").find("img").first().addClass("grayed");
                 $("#builder span:data(id=" + value +")").data("undeselectable", "");
                }
            )
        }
    }
    


// Right-click event on skill
function unselect_skill_event(element) {
   // Check if skill is deselectable and selected
   if ($(element).hasAttr("undeselectable") || !$(element).hasAttr("selected")) { console.log("Skill not selected or linked skills selected."); return false; }
   $(element).find("img").first().addClass("grayed");
   $(element).removeData("selected");
   $("#sp_spent").text(Math.floor($("#sp_spent").text())-Math.floor($(element).data('sp_cost')));
   var lvl_required = 1;
   var lvl_current;
   $("#builder span.skill_box").filter(function(){
       return $(this).hasAttr('selected');
   }).each(function(){
       lvl_current = Math.floor($(this).data('level_required'))
       if (lvl_current > lvl_required) {
           lvl_required = lvl_current;
       }
   });
   remove_chosen_skill(element);
   $("#level_required").text(lvl_required);
   // Check if skill has required skills
   if ($(element).hasAttr('prerequisite')) {
       var arr_prerequis = $(element).data('prerequisite').split(",");
       var keep_going;
       var prereq_element;
       // And whether they can now be deselectable or not (if they still have linked skills selected)
       $.each(arr_prerequis, function(key, value){
           keep_going = true;
           prereq_element = $("#builder span:data(id=" + value +")");
           if ($(prereq_element).hasAttr('staycolored')) {
                        var staycolored = $(prereq_element).data('staycolored');
                        staycolored = staycolored.split(',');
                        $.each(staycolored, function(keycolor, valuecolor){
                            if ($("#builder span:data(id=" + valuecolor +")").hasAttr('selected')) {
                                keep_going = false;
                                return false;
                            }
                        })
                    }
            if ($(prereq_element).hasAttr('at_creation')) keep_going = false;        
            if (keep_going) { $(prereq_element).removeData("undeselectable"); }
            $(prereq_element).find("img").first().removeClass("grayed");
            })
   }
}

function select_class_builder(e) {
    if (typeof($(this).attr('id')) !== 'undefined') { return false;}
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
                        $("#builder").append(generate_skill(data)); 
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
                    $("#builder").append(generateLineDB(data));
                });
            }
            , onError: function (sender, e) {
                alert("error");
            }
        });
}

function add_chosen_skill(elem){
    var is_present = false;
    var img_src = $(elem).find('img').first().attr('src');
    $("#chosen_skills_window img").each(function(){
        if ($(this).attr('src') == img_src) {
            is_present = true;
            return false;
        }
    })
    if (!is_present) {
        $("<img src='"+img_src+"'></img>").appendTo("#chosen_skills_window"); 
    }
    
}

function remove_chosen_skill(elem) {
    var another_level_present = false;
    var img_src = $(elem).find('img').first().attr('src');
     $("#builder span.skill_box").filter(function(){
       return $(this).hasAttr('selected');
     }).each(function(){
        if ($(this).find('img').first().attr('src') == img_src) {
            another_level_present = true;
            return false;
        }
    })
    if (!another_level_present) {
        $("#chosen_skills_window img").filter(function(){
            return $(this).attr('src') == img_src;
        }).remove();
    }
}

$.fn.addHandlers = function() {
   $("#builder").on( {
        click: select_skill_event,
        mousedown: function(event) {
            if (event.which == 3) {
            unselect_skill_event(this);
            }
        },
        mouseenter: display_description,
        mouseleave: function(){
            var element = $(this);
            setTimeout(function(){
                $(element).find(".description_box").hide(); 
            }, 50);
        }
    }, "span.skill_box");
   $("#builder").bind("contextmenu",function(e){
        return false;
   }); 
   $("img.grayed_portrait").click(select_class_builder);
   $("#resetButton").click(function(){
       $("#builder").find('div.skill_box').each(function(index, element){
           if (!$(element).hasAttr('AT_CREATION')) {
               $(element).removeData('selected');
               $(element).removeData('undeselectable');
               $(element).find("img").addClass("grayed");
           }
       });
       $("#sp_spent").text("0");
       $("#level_required").text("1");
       $("#chosen_skills_window").empty();
   });
   $("div.options_buttons").mousedown(function() {
        $(this).addClass('shrink');
   });
   $("div.options_buttons").mouseup(function() {
        $(this).removeClass('shrink');
   });
   $("div.options_buttons").mouseout(function() {
        $(this).removeClass('shrink');
   });
 }

$(document).ready(function () {
   $.fn.addHandlers();
})


