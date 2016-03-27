chrome.storage.sync.get(function(prefs) {
    console.log('stored prefs:', prefs);
    if(prefs.showSecret){
        $('#secret').show();
    }
  
});


jQuery(document).ready(function($) {
    var sounds =  {

        doorbell : {label:"Doorbell", fx:new Audio("/sounds/doorbell.ogg")},
        phone : {label:"Phone", fx:new Audio("/sounds/cellring.ogg")},
        crash : {label:"Crash", fx:new Audio("/sounds/237375_squareal_car-crash.ogg")},

        dive : {label:"Dive", fx:new Audio("/sounds/104882__cgeffex__submarie-dive-horn-better.wav")},

        pop : {label:"Pop", fx:new Audio("/sounds/pop.ogg")},
        ding : {label:"Ding", fx:new Audio("/sounds/ding.ogg")},
        buzz : {label:"Buzz", fx:new Audio("/sounds/buzz.ogg")},
        correct : {label:"Correct", fx:new Audio("/sounds/131660__bertrof__game-sound-correct.wav")},

        fart : {label:"Fart", fx:new Audio("/sounds/249583__ycbcr__short-definite-fart.wav")},
        boo : {label:"Boo", fx:new Audio("/sounds/boo.ogg")},
        cricket : { label:"Crickets", fx:new Audio("/sounds/cricket.ogg")},
        rooster : { label:"Rooster", fx:new Audio("/sounds/166745_cocoricosound_cock-a-doodle-doo.ogg")},
        laughs : {label:"Laughs", fx:new Audio("/sounds/laugh.ogg")},
        price : {label:"The Price Is Wrong", fx:new Audio("/sounds/horns.ogg")},
        actlikeaman : {label:"Act like a man", fx:new Audio("/sounds/actlikeaman.ogg")},

        r2d2 : {label:"R2-D2", fx:new Audio("/sounds/r2d2.ogg")},
        youblewit : { label:"You Blew It", fx:new Audio("/sounds/youblewit.ogg")},
        khan : {label:"Khan!", fx:new Audio("/sounds/khan.ogg")},
        cashregister : {label:"Cha-Ching", fx:new Audio("/sounds/cashregister.ogg")},

        pity : {label:"Mr. T", fx:new Audio("/sounds/pity.ogg")},    
        yay : {label:"Yay!", fx:new Audio("/sounds/yay.ogg")},
        alert : {label:"Red Alert", fx:new Audio("/sounds/alert.wav")},
        flint : {label:"Our Man Flint", fx:new Audio("/sounds/flint.wav")}

    };

    var secretSounds = {
        shinebox : {label:"Shinebox", fx:new Audio("/sounds/shinebox.ogg")},
        myname : {label:"My Name?", fx:new Audio("/sounds/myname.ogg")},
        getlaid : {label:"Hey Everybody", fx:new Audio("/sounds/getlaid.ogg")}
    };

    function makeButtons(sounds, parentId){

        for(var s in sounds){

            var $button = $('#buttonTemplate').clone();
            var $sfx = jQuery.extend({}, sounds[s]);

            var  playSound = function(){
            var $button = $(this),
              $snd = $button.attr('snd');
              sounds[$snd].fx.play();
            };

            $button.
            button().
            html($sfx.label).
            attr({snd:s}).
            click(playSound).
            appendTo(parentId).
            show();
        }
    }

    makeButtons(sounds,'#everything');
    makeButtons(secretSounds,'#secret');

});
