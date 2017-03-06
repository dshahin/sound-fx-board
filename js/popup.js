var voiceOptions = {
    //voiceName: 'Google UK English Male',
    enqueue: true,
    pitch: 1,
    rate: 1,
    volume: 1
};

var showSecret = false;

chrome.storage.sync.get(function(prefs) {
    console.log('stored prefs:', prefs);
    showSecret = prefs.showSecret;
    if (showSecret) {

        $('#secret').show();
    }

    if (prefs.voiceOptions) {
        voiceOptions = prefs.voiceOptions;
        $("#voicePitch").val(voiceOptions.pitch);
        $('#voicePitchSlider').slider({ value: voiceOptions.pitch });
        $("#voiceRate").val(voiceOptions.rate);
        $('#voiceRateSlider').slider({ value: voiceOptions.rate });
    }

});

chrome.tts.getVoices(
    function(voices) {
        voiceNames = [];
        for (var i = 0; i < voices.length; i++) {
            var vName = voices[i].voiceName;
            voiceNames.push(vName);
            if (vName === voiceOptions.voiceName) {
                $('#voiceName').append('<option selected="selected" value="' + vName + '">' + vName + '</option>');
            } else {
                $('#voiceName').append('<option value="' + vName + '">' + vName + '</option>');
            }

        }
    });



var say = function(quote) {
    chrome.tts.stop();
    chrome.tts.speak(quote, voiceOptions);

};

var saveVoiceOptions = function() {

    var prefs = {
        voiceOptions: voiceOptions,
        showSecret: showSecret
    };

    chrome.storage.sync.set(prefs, function() {
        console.log('saving prefs:', prefs);
    });
};


jQuery(document).ready(function($) {
    var sounds = {

        doorbell: { label: "Doorbell", fx: new Audio("/sounds/doorbell.ogg") },
        phone: { label: "Phone", fx: new Audio("/sounds/cellring.ogg") },
        crash: { label: "Crash", fx: new Audio("/sounds/237375_squareal_car-crash.ogg") },

        dive: { label: "Dive", fx: new Audio("/sounds/104882__cgeffex__submarie-dive-horn-better.wav") },

        pop: { label: "Pop", fx: new Audio("/sounds/pop.ogg") },
        ding: { label: "Ding", fx: new Audio("/sounds/ding.ogg") },
        buzz: { label: "Buzz", fx: new Audio("/sounds/buzz.ogg") },
        correct: { label: "Correct", fx: new Audio("/sounds/131660__bertrof__game-sound-correct.wav") },

        fart: { label: "Fart", fx: new Audio("/sounds/249583__ycbcr__short-definite-fart.wav") },
        boo: { label: "Boo", fx: new Audio("/sounds/boo.ogg") },
        cricket: { label: "Crickets", fx: new Audio("/sounds/cricket.ogg") },
        rooster: { label: "Rooster", fx: new Audio("/sounds/166745_cocoricosound_cock-a-doodle-doo.ogg") },
        laughs: { label: "Laughs", fx: new Audio("/sounds/laugh.ogg") },
        price: { label: "The Price Is Wrong", fx: new Audio("/sounds/horns.ogg") },
        actlikeaman: { label: "Act like a man", fx: new Audio("/sounds/actlikeaman.ogg") },

        r2d2: { label: "R2-D2", fx: new Audio("/sounds/r2d2.ogg") },
        youblewit: { label: "You Blew It", fx: new Audio("/sounds/youblewit.ogg") },
        khan: { label: "Khan!", fx: new Audio("/sounds/khan.ogg") },
        cashregister: { label: "Cha-Ching", fx: new Audio("/sounds/cashregister.ogg") },

        pity: { label: "Mr. T", fx: new Audio("/sounds/pity.ogg") },
        yay: { label: "Yay!", fx: new Audio("/sounds/yay.ogg") },
        alert: { label: "Red Alert", fx: new Audio("/sounds/alert.wav") },
        flint: { label: "Our Man Flint", fx: new Audio("/sounds/flint.wav") }

    };

    var secretSounds = {
        shinebox: { label: "Shinebox", fx: new Audio("/sounds/shinebox.ogg") },
        myname: { label: "My Name?", fx: new Audio("/sounds/myname.ogg") },
        getlaid: { label: "Hey Everybody", fx: new Audio("/sounds/getlaid.ogg") }
    };

    function makeButtons(sounds, parentId) {

        for (var s in sounds) {

            var $button = $('#buttonTemplate').clone();
            var $sfx = jQuery.extend({}, sounds[s]);

            var playSound = function() {
                var $button = $(this),
                    $snd = $button.attr('snd');
                sounds[$snd].fx.play();
            };

            $button.
            button().
            html($sfx.label).
            attr({ snd: s }).
            click(playSound).
            appendTo(parentId).
            show();
        }
    }

    $('#quote').button().css({
        'font': 'inherit',
        'color': 'inherit',
        'text-align': 'left',
        'outline': 'none',
        'cursor': 'text',
        'width': '50%'
    }).keypress(function(e) {
        if (e.keyCode === 13) {
            $('#say').click();
        }
    });

    $('#say').button().click(function() {
        var quote = $('#quote').val();
        say(quote);
        $('#quote').select();

    });

    $('#clear').button().click(function() {
        $('#quote').val('').focus();
    });

    $('#voiceName').val(voiceOptions.voiceName).change(function() {
        voiceOptions.voiceName = $(this).val();
        saveVoiceOptions();

    });

    $('#voiceRateSlider').slider({
        value: voiceOptions.rate,
        min: 0.1,
        max: 2,
        step: 0.01,
        slide: function(event, ui) {
            voiceOptions.rate = ui.value;
            $("#voiceRate").val(ui.value);
            saveVoiceOptions();

        }
    });

    $('#rateLabel').addClass('small').button().click(function() {
        voiceOptions.rate = 1;
        $("#voiceRate").val(1);
        $('#voiceRateSlider').slider({ value: 1 });

    });

    $("#voiceRate").val(voiceOptions.rate);


    $('#voicePitchSlider').slider({
        value: voiceOptions.pitch,
        min: 0.1,
        max: 2,
        step: 0.01,
        slide: function(event, ui) {
            voiceOptions.pitch = ui.value;
            $("#voicePitch").val(ui.value);
            saveVoiceOptions();

        }
    });

    $('#pitchLabel').button().click(function() {
        voiceOptions.pitch = 1;
        $("#voicePitch").val(1);
        $('#voicePitchSlider').slider({ value: 1 });

    });

    $("#voicePitch").val(voiceOptions.pitch);

    $('#hideSecret').click(function() {
        $('#secret').hide();
        var prefs = {
            showSecret: false,
            voiceOptions: voiceOptions
        };

        chrome.storage.sync.set(prefs, function() {
            console.log('saving prefs:', prefs);
        });
    });

    $("#sound-input").change(function() {
        readURL(this);
    });

    makeButtons(sounds, '#everything');
    makeButtons(secretSounds, '#secret');

    chrome.storage.local.get('userSound', function(result) {
        var userSound = result.userSound;
        if (userSound) {
            $('#sound-control').attr('src', userSound).show();
            $("#sound-input").hide();
            $('.removeSound').show();
        } else {
            $("#sound-input").show();
            $('#sound-control').hide();
            $('.removeSound').hide();
        }
    });

    $('.removeSound').click(function() {
        var $btn = $(this);
        $('.sound-control').hide();
        $('.sound-input').show();
        $btn.hide();
    });


});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#sound-control').attr('src', e.target.result).show();
            chrome.storage.local.set({ 'userSound': e.target.result });
            $("#sound-input").hide();
            $('.removeSound').show();
        }

        reader.readAsDataURL(input.files[0]);
    }
}