<template>
  <v-row justify="center">
    <audio ref="audio" src="/Dimension.mp3"></audio>
    <v-dialog
      :value="$store.getters.settingDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
      no-click-animation
    >
      <v-card>
        <v-toolbar
          dark
          color="indigo darken-4"
        >
          <v-btn
            icon
            dark
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn
              dark
              text
              @click="closeDialog"
            >
              Save
            </v-btn> -->
          </v-toolbar-items>
        </v-toolbar>
        <div class="bar-wrapper">
          <!-- <v-col cols="12">
            <v-subheader class="pl-0">
              volume
            </v-subheader>
            <v-slider
              v-model="audioGain.gain.value"
              color="orange"
              max="1"
              min="0"
              step="0.05"
              v-if="audioGain"
            ></v-slider>
          </v-col>
          <v-col cols="12">
            <v-subheader class="pl-0">
              pan
            </v-subheader>
            <v-slider
              v-model="audioPanner.pan.value"
              color="purple"
              max="1"
              min="-1"
              step="0.05"
              v-if="audioPanner"
            >
            </v-slider>
          </v-col> -->
          <div class="d-flex justify-space-around flex-wrap" style="width: 100%;">
            <div v-for="(obj, i) in audioPeakings" :key="i">
              <v-slider
                color="purple"
                max="5"
                min="-10"
                step="1"
                :value="obj.peaking.gain.value"
                @input="changePeaking($event, i)"
                vertical
              ></v-slider>
              <v-subheader class="px-2">
                {{ String(obj.frequency) + ' Hz' }}
              </v-subheader>
            </div>
            <div>
              <v-slider
                v-model="audioPanner.pan.value"
                color="purple"
                max="1"
                min="-1"
                step="0.05"
                vertical
                v-if="audioPanner"
              >
              </v-slider>
              <v-subheader class="px-2">
                pan
              </v-subheader>
            </div>
            <div>
              <v-slider
                v-model="audioGain.gain.value"
                color="orange"
                max="1"
                min="0"
                step="0.05"
                vertical
                v-if="audioGain"
              ></v-slider>
              <v-subheader class="px-2">
                value
              </v-subheader>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {

  computed: {
    // settingDialog: {
    //   get() {
    //     return this.$store.getters.settingDialog;
    //   },
    //   set(v) {

    //   }
    // },
    audioGain: {
      get() {
        return this.$store.getters.audio?.gainNode;
      },
      set(v) {
        this.$store.commit('changeVolume', v)
      }
    },
    audioPanner: {
      get() {
        return this.$store.getters.audio?.panner;
      },
      set(v) {
        this.$store.commit('changePanner', v)
      }
    },
    audioPeakings() {
      return this.$store.getters.audio?.peakings || [];
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit('changeSettingDialog', false);
    },
    changePeaking(value, index) {
      this.$store.commit('changePeaking', {value, index})
    }
  }
}
</script>

<style lang="scss">
.bar-wrapper {
  padding: 24px 48px 204px  48px;
}
@media screen and (max-width:480px) {
  .bar-wrapper {
    padding: 24px 8px 204px  8px;
  }
}
</style>