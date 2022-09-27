import playlists from '@/assets/playlists'
export class Audio {
  peakings = []
  paused = true
  playlists = playlists
  _duration = 0
  _currentTime = 0
  el = ''
  audioContext = ''
  track = ''
  gainNode = ''
  panner = ''
  musicIndex = 0
  constructor(audioEl) {
    this.el = audioEl;
    this.audioContext = new AudioContext();
    this.track = this.audioContext.createMediaElementSource(this.el);
    this.gainNode = this.audioContext.createGain();
    const pannerOptions = { pan: 0 };
    this.panner = new StereoPannerNode(this.audioContext, pannerOptions);
    this.createEQ();
    this.createConnect();
    this.musicIndex = Math.floor(Math.random() * this.playlists.length);
    this.el.src = this.playlists[this.musicIndex].src;
  }
  createEQ() {
    let frequency = 31.25;
    for (var i = 0; i < 10; i++) {
      // Create the instance of BiquadFilterNode
      const peaking = this.audioContext.createBiquadFilter();
      // Calculate center frequency
      if (i !== 0) {
          frequency *= 2;
      }
      // Set parameters
      peaking.type = (typeof peaking.type === 'string') ? 'peaking' : 5;
      peaking.frequency.value = frequency;
      peaking.Q.value = 2;
      peaking.gain.value = 0;  // The defaul value
      this.peakings[i] = {frequency, peaking};
    }
  }
  createConnect() {
    this.track.connect(this.gainNode).connect(this.panner).connect(this.peakings[0].peaking);
    this.peakings.forEach((obj, index) => {
        if (index < (10 - 1)) {
            obj.peaking.connect(this.peakings[index + 1].peaking);
        } else {
            obj.peaking.connect(this.audioContext.destination);
        }
    });
  }
  changeVolume(v) {
    this.gainNode.gain.value = v;
  }
  changePanner(v) {
    this.panner.gain.value = v;
  }
  setPeakingValue(obj) {
    this.peakings[obj.index].peaking.gain.value = obj.value;
  }
  play() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    this.el.play();
  }
  stop() {
    this.el.pause();
  }
  changePaused(paused) {
    this.paused = paused;
  }
  nextMusic() {
    this.musicIndex++;
    if(this.musicIndex == this.playlists.length - 1) {
      this.musicIndex = 0;
    }
    this.el.src = this.playlists[this.musicIndex].src;
  }
  backMusic() {
    this.musicIndex--;
    if(this.musicIndex == -1) {
      this.musicIndex = this.playlists.length - 1;
    }
    this.el.src = this.playlists[this.musicIndex].src;
  }
  setDuration(duration) {
    this._duration = duration;
  }
  setCurrentTime(currentTime) {
    this._currentTime = currentTime;
  }
  _setCurrentTime(currentTime) {
    this._currentTime = currentTime;
    this.el.currentTime = currentTime;
  }
  fastForwardOrRewind(time) {
    this._currentTime += time;
    this.el.currentTime += time;
  }
  changeMusic(music) {
    this.musicIndex = this.playlists.findIndex(playlist => playlist.id == music.id);
    this.el.src = this.playlists[this.musicIndex].src;
    this.play()
  }
  get duration() {
    return this._duration
  }
  get currentTimeValue() {
    return this._currentTime;
  }
}