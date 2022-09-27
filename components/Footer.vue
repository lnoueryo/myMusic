<template>
  <v-footer
    fixed
    app
    style="padding: 20px 0;z-index: 203;"
  >
    <div ref="seekbarFrame" class="seekbar-frame" @mousedown="startChangeSeekbar" @touchstart="startChangeSeekbar">
      <div ref="seekbar" class="seekbar" :style="{backgroundColor: selectedMusic.color}"></div>
    </div>
    <div class="drag-display" v-if="isMouse" @mousemove="changeSeekbar" @mouseup="endChangeSeekbar" @mouseout="endChangeSeekbar" @touchmove="changeSeekbar" @touchend="endChangeSeekbar"></div>
    <div  class="buttons-container" style="">
      <div style="width: 100%;display: flex;justify-content: center;align-items: center">
        <div class="mx-3" style="opacity: 0">
          <v-btn large icon>
            <v-icon>mdi-tune-variant</v-icon>
          </v-btn>
        </div>
        <div class="mx-6" style="text-align: center;">
          <div style="font-size: 22px;">{{selectedMusic.name}}</div>
          <div style="font-size: 18px;">{{changeTimeFormat(currentTimeValue)}}/{{changeTimeFormat(durationValue)}}</div>
        </div>
        <div class="mx-3">
          <v-btn large icon @click="changeDialog">
            <v-icon>mdi-tune-variant</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="buttons-container">
      <div>
        <v-btn large class="mx-3" @click="backMusic" icon>
          <v-icon x-large>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn large class="mx-3" icon @click="fastForwardOrRewind(rewindTime)">
          <v-icon x-large>mdi-rewind</v-icon>
        </v-btn>
        <v-btn large class="mx-3" icon @click="play" v-if="paused">
          <v-icon x-large>mdi-play</v-icon>
        </v-btn>
        <v-btn large class="mx-3" icon @click="stop" v-else>
          <v-icon x-large>mdi-pause</v-icon>
        </v-btn>
        <v-btn large class="mx-3" icon @click="fastForwardOrRewind(fastForwardTime)">
          <v-icon x-large>mdi-fast-forward</v-icon>
        </v-btn>
        <v-btn large class="mx-3" @click="nextMusic" icon>
          <v-icon x-large>mdi-skip-next</v-icon>
        </v-btn>
      </div>
    </div>
  </v-footer>
</template>

<script>
const FASTFORWARD = 5;
const REWIND = -5;
export default {
  data: () => ({
    isMouse: false
  }),
  watch: {
    currentTimeValue(v) {
      this.$nextTick(() => {
        this.$refs.seekbar.style.width = (Math.round(v / this.durationValue * 100 * 10) / 10) + '%';
      })
    },
  },
  computed: {
    paused() {
      return this.$store.getters.audio?.paused;
    },
    selectedMusic() {
      const num = this.$store.getters.audio?.musicIndex;
      return this.$store.getters.audio?.playlists[num];
    },
    selectedMusicDuration() {
      const duration = this.$store.getters.audio.duration;
      const minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration - minutes * 60);
      if(seconds < 10) seconds = '0' + seconds;
      return `${minutes}:${seconds}`;
    },
    currentTimeValue() {
      return this.$store.getters.audio.currentTimeValue;
    },
    durationValue() {
      return this.$store.getters.audio.duration;
    },
    fastForwardTime() {
      return FASTFORWARD;
    },
    rewindTime() {
      return REWIND;
    },
  },
  methods: {
    changeTimeFormat(time) {
      const minutes = Math.floor(time / 60);
      let seconds = Math.floor(time - minutes * 60);
      if(seconds < 10) seconds = '0' + seconds;
      return `${minutes}:${seconds}`;
    },
    changeDialog() {
      const isDialog = !this.$store.getters.settingDialog;
      this.$store.commit('changeSettingDialog', isDialog);
    },
    play() {
      this.$store.commit('play');
    },
    stop() {
      this.$store.commit('stop');
    },
    nextMusic() {
      this.$store.commit('nextMusic');
      this.$store.commit('play');
    },
    backMusic() {
      this.$store.commit('backMusic');
      this.$store.commit('play');
    },
    fastForwardOrRewind(time) {
      this.$store.commit('fastForwardOrRewind', time);
    },
    startChangeSeekbar(e) {
      let offsetX;
      if(e.type == 'touchstart') offsetX = e.touches[0].clientX;
      else offsetX = e.offsetX;
      console.log(offsetX)
      console.log(e)
      this.isMouse = true;
      this.$refs.seekbar.style.transition = 'initial';
      const width = this.$refs.seekbarFrame.getBoundingClientRect().width;
      const duration = this.$store.getters.audio.duration;
      this.$store.commit('_setCurrentTime', duration * offsetX / width)
    },
    changeSeekbar(e) {
      let offsetX;
      console.log(e.type)
      if(e.type == 'touchmove') offsetX = e.touches[0].clientX;
      else offsetX = e.offsetX
      const width = this.$refs.seekbarFrame.getBoundingClientRect().width;
      const duration = this.$store.getters.audio.duration;
      this.$refs.seekbar.style.width = offsetX / width * 100, '%';
      this.$store.commit('_setCurrentTime', duration * offsetX / width)
    },
    endChangeSeekbar(e) {
      this.$refs.seekbar.style.transition = 'all .5s';
      this.isMouse = false;
    },
  }
}
</script>

<style lang="scss">
  footer .v-slider--horizontal {
    margin-left: 0!important;
    margin-right: 0;
  }
  .seekbar-frame {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 10px
  }
  .seekbar {
    width: 0%;
    height: 5px;
    transition: all .5s
  }
  .drag-display {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .buttons-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }
</style>