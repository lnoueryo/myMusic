<template>
  <div>
    <audio ref="audio"></audio>
      <v-row class="fill-height" align="center" justify="center">
        <v-col
          v-for="(playlist, i) in playlists"
          :key="i"
          cols="12"
          md="6"
        >
          <v-card
            :color="playlist.color"
            dark
            @click="changeMusic(playlist)"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="playlist.name"
                ></v-card-title>

                <v-card-subtitle v-text="playlist.description"></v-card-subtitle>

                <!-- <v-card-actions>
                  <v-btn
                    v-if="playlist.name === 'Ellie Goulding'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-play</v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    START RADIO
                  </v-btn>
                </v-card-actions> -->
              </div>

              <v-avatar
                class="ma-3 elevation-24"
                size="125"
                tile
                elevation="24"
              >
                <v-img class="elevation-24" elevation="24" :src="playlist.img" style="filter: grayscale(.7);border-radius: 3px"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    }
  },
  computed: {
    playlists() {
      return this.$store.getters.audio.playlists;
    }
  },
  mounted() {
    this.$nextTick(() => this.$store.dispatch('setAudio', this.$refs.audio))
  },
  methods: {
    changeMusic(music) {
      this.$store.commit('changeMusic', music);
    }
  }
}
</script>