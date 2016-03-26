


jQuery(document).ready(function($) {
  var snds =  {

    doorbell : {label:"Doorbell", fx:new Audio("/sounds/doorbell.ogg")},
    phone : {label:"Phone", fx:new Audio("/sounds/cellring.ogg")},

    pop : {label:"Pop", fx:new Audio("/sounds/pop.ogg")},
    ding : {label:"Ding", fx:new Audio("/sounds/ding.ogg")},
    buzz : {label:"Buzz", fx:new Audio("/sounds/buzz.ogg")},
    correct : {label:"Correct", fx:new Audio("/sounds/131660__bertrof__game-sound-correct.wav")},

    boo : {label:"Boo", fx:new Audio("/sounds/boo.ogg")},
    cricket : { label:"Crickets", fx:new Audio("/sounds/cricket.ogg")},
    laughs : {label:"Laughs", fx:new Audio("/sounds/laugh.ogg")},
    price : {label:"The Price Is Wrong", fx:new Audio("/sounds/horns.ogg")},
    actlikeaman : {label:"Act like a man", fx:new Audio("/sounds/actlikeaman.ogg")},

    r2d2 : {label:"R2-D2", fx:new Audio("/sounds/r2d2.ogg")},
    youblewit : { label:"You Blew It", fx:new Audio("/sounds/youblewit.ogg")},
    khan : {label:"Khan!", fx:new Audio("/sounds/khan.ogg")},
    cashregister : {label:"Cha-Ching", fx:new Audio("/sounds/cashregister.ogg")},

    pity : {label:"Mr. T", fx:new Audio("/sounds/pity.ogg")},
    getlaid : {label:"Hey Everybody", fx:new Audio("/sounds/getlaid.ogg")},
    yay : {label:"Yay!", fx:new Audio("/sounds/yay.ogg")},
    shinebox : {label:"Shinebox", fx:new Audio("/sounds/shinebox.ogg")},
    myname : {label:"My Name?", fx:new Audio("/sounds/myname.ogg")},
    alert : {label:"Red Alert", fx:new Audio("/sounds/alert.wav")},
    flint : {label:"Our Man Flint", fx:new Audio("/sounds/flint.wav")}

  };


  for(var s in snds){

    var $button = $('button.template').clone().removeClass('template');
      var $sfx = jQuery.extend({}, snds[s]);

    var  playSound = function(){
      var $button = $(this),
        $snd = $button.attr('snd');
        snds[$snd].fx.play();
    }

    $button.
      button().
      html($sfx.label).
      attr({snd:s}).
      click(playSound).
      appendTo('#everything').
      show();
  }

});
