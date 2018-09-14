blip.sampleLoader().samples({
    'tick': './assets/tick.wav',
    'tickup': './assets/tickup.wav',
    'snare': './assets/snare-noise.wav',
    'hihat': './assets/hihat.wav',
    'kick': './assets/kick.wav',
}).done(main).load();

var button = document.querySelector("#start");
var bpm = document.querySelector("#bpm");

var metronome = blip.loop();

function main() {

    var tick = blip.clip();
    tick.sample('tick');

    var snare = blip.clip();
    snare.sample('snare');

    var hihat = blip.clip();
    hihat.sample('hihat');

    var kick = blip.clip();
    kick.sample('kick');

    var beat = [
        {snare: 0, kick: 1, hihat: 1},
        {snare: 0, kick: 0, hihat: 1},
        {snare: 1, kick: 0, hihat: 1},
        {snare: 0, kick: 0, hihat: 1},
        {snare: 0, kick: 1, hihat: 1},
        {snare: 0, kick: 1, hihat: 1},
        {snare: 1, kick: 0, hihat: 1},
        {snare: 0, kick: 0, hihat: 1},
    ];

    metronome.data(beat);

    // metronome.tick((t) => {tick.play(t);});
    metronome.tick(
        (t, d) => {
            if (d.snare){
                snare.play(t);
            }
            if (d.kick){
                kick.play(t);
            }
            if (d.hihat){
                hihat.play(t);
            }
        });

    var playing = false;
    button.onclick = () => {
        playing = !playing;
        if (playing) {
            button.innerHTML = "Stop Metronome";
            metronome.tempo(bpm.value);
            metronome.start();
        } else {
            button.innerHTML = "Start Metronome";
            metronome.stop();
        }
    };

    bpm.onchange = () => {
        metronome.tempo(bpm.value);
    };
}
