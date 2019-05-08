<template>
  <div>
    <el-button @click="reload">reload</el-button>
    <Skeleton
      :loading="loading"
      active
    >
      <div>
        <h4>{{info.title}}</h4>
        <p v-html="info.content"></p>
        <CustomVideo :options="videoOptions"></CustomVideo>
      </div>
    </Skeleton>
  </div>
</template>

<script>
import { GetArticledetail } from '@/apis/article';
const CustomVideo = () => import('@/components/Video');
const Skeleton = () => import('@/components/Skeleton');
export default {
  name: 'ArticleDetail',
  data () {
    return {
      loading: true,
      info: {
        title: '',
        content: ''
      },
      videoOptions: {
        videoUrl: ''
      }
    };
  },
  components: {
    CustomVideo,
    Skeleton
  },
  mixins: [],
  methods: {
    reload () {
      this.getData();
    },
    getData () {
      this.loading = true;
      GetArticledetail().then((res) => {
        console.log(res);
        this.loading = false;
        this.info.title = res.detail.title;
        this.info.content = res.detail.content;
        this.videoOptions.videoUrl = res.detail.videoUrl;
        this.videoOptions.poster = res.detail.poster;
      });
    }
  },
  mounted () {
    this.getData();
  }
};
</script>

<style>
</style>
