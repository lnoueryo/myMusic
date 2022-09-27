<template>
  <div>
    <audio ref="audio" src="/Dimension.mp3"></audio>
    <v-btn @click="play">play</v-btn>
    <v-slider
      v-model="gainNode.gain.value"
      color="orange"
      label="volume"
      max="1"
      min="0"
      step="0.05"
      v-if="gainNode"
    ></v-slider>
    <div class="d-flex align-center">
      <v-slider
        v-model="panner.pan.value"
        color="purple"
        max="1"
        min="-1"
        step="0.05"
        v-if="panner"
      >
          <template v-slot:prepend>
            <div class="mr-3" style="color: rgba(255, 255, 255, 0.7);">
              pan
            </div>
            <div class="mr-1" style="color: rgba(255, 255, 255, 0.7);">
              left
            </div>
            <!-- <v-icon
              :color="color"
              @click="decrement"
            >
              mdi-minus
            </v-icon> -->
          </template>

          <template v-slot:append>
            <div class="mr-1" style="color: rgba(255, 255, 255, 0.7);">
              right
            </div>
            <!-- <v-icon
              :color="color"
              @click="increment"
            >
              mdi-plus
            </v-icon> -->
          </template>
      </v-slider>
    </div>
    <v-slider
      v-model="obj.peaking.gain.value"
      color="purple"
      :label="String(obj.frequency) + ' Hz'"
      max="5"
      min="-10"
      step="1"
      v-for="(obj, i) in peakings"
      :key="i"
    ></v-slider>

  </div>
</template>

<script>
export default {
  data() {
    return {
      audioContext: '',
      track: '',
      gainNode: '',
      panner: '',
      peakings: []
    }
  },
  mounted() {
    this.audioContext = new AudioContext();
    this.track = this.audioContext.createMediaElementSource(this.$refs.audio);
    this.gainNode = this.audioContext.createGain();
    const pannerOptions = { pan: 0 };
    this.panner = new StereoPannerNode(this.audioContext, pannerOptions);
    this.createEQ()
    this.createConnect()
  },
  methods: {
    play() {
    if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
    }
      this.$refs.audio.play();
    },
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
    },
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
  }
}
</script>