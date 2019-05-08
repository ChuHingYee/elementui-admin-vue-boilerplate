<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
  >
    <div class="detail-wrap">
      <h3 class="detail-wrap-title">选择产品信息</h3>
      <el-form-item
        label="审批人"
        prop="user"
      >
        <el-input
          v-model="form.user"
          placeholder="审批人"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="活动区域"
        prop="region"
      >
        <el-select
          v-model="form.region"
          placeholder="活动区域"
          size="small"
        >
          <el-option
            label="区域一"
            value="shanghai"
          ></el-option>
          <el-option
            label="区域二"
            value="beijing"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="detail-wrap">
      <h3 class="detail-wrap-title">上传图片信息</h3>
      <el-form-item prop="fileList">
        <UploadWall :fileList.sync="form.fileList"></UploadWall>
      </el-form-item>
    </div>
    <div class="detail-wrap">
      <h3 class="detail-wrap-title">输入产品介绍文本</h3>
      <el-form-item prop="richTxt">
        <Tinymce :tinymceHtml.sync="form.richTxt"></Tinymce>
      </el-form-item>
    </div>
    <div class="custom-footer-btn">
      <el-button
        type="primary"
        size="small"
        @click="submit"
      >sumbit</el-button>
    </div>
  </el-form>
</template>

<script>
import UploadWall from '@/components/UploadWall';
import Tinymce from '@/components/Tinymce';
import { mapActions } from 'vuex';
export default {
  name: 'FormSimple',
  data () {
    return {
      form: {
        user: '',
        region: '',
        fileList: [],
        richTxt: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        fileList: [
          { type: 'array', required: true, message: '请至少选择上传一张图片', trigger: 'change' }
        ],
        richTxt: [
          { required: true, message: '请输入富文本', trigger: 'change' }
        ]
      },
      uploadShow: true
    };
  },
  components: {
    Tinymce,
    UploadWall
  },
  methods: {
    ...mapActions(['CloseVisitedRoutes']),
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form.richTxt);
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  beforeDestroy () {
    this.CloseVisitedRoutes({
      name: 'FormSimple'
    });
  }
};
</script>

<style lang="scss" scoped>
.detail {
  &-wrap {
    margin-bottom: 22px;
    &-title {
      font-size: 18px;
      margin-bottom: 12px;
    }
  }
  &-btn {
    position: fixed;
    z-index: 86;
    bottom: 0;
    right: 0;
    left: 0;
    height: 60px;
    background: #fff;
    margin-right: 0;
    padding: 8px 20px;
    @include flex-end-center;
    border-top: 1px solid #e8e8e8;
    margin-bottom: 0;
    // box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.3);
  }
}
</style>
