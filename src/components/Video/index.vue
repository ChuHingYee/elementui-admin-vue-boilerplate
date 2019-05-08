<template>
  <div class="video">
    <video-player
      v-if="options.videoUrl"
      class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
    ></video-player>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
export default {
  name: 'Video',
  components: {
    videoPlayer
  },
  data () {
    return {
      // videojs options
      playerOptions: {
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        height: '360',
        autoplay: false,
        muted: true,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: ''
      }
    };
  },
  props: {
    options: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    options: {
      handler: function (val) {
        this.$set(this.playerOptions.sources, 0, {
          type: 'video/mp4',
          src: val.videoUrl
        });
        this.playerOptions.poster = val.videoPhoto;
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    if (!window.videojs) {
      window.videojs = require('video.js');
      require('video.js/dist/lang/zh-CN');
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata (player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting (player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied (player) {
      // seek to 10s
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    }
  },
  beforeDestroy () {
    this.$refs.videoPlayer.dispose();
    window.videojs = null;
  }
};
</script>

<style lang="scss">
.video-js {
  min-width: 300px;
  max-width: 630px;
}
</style>
