<template>
  <div class="upload">
    <el-upload
      action=""
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :before-upload="handleBefore"
      :on-exceed="handleexceed"
      :on-remove="handleRemove"
      :auto-upload="true"
      :http-request="uploadPic"
      :multiple="true"
      :limit="limitCount"
      :class="fileList.length === limitCount?'upload-exceed':''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      title="图片明细"
      top="5vh"
      custom-class="custom-upload"
    >
      <img
        class="upload-dialog-pic"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import { UploadPic } from '@/apis/system';
export default {
  name: 'UploadWall',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      base64Src: '',
      loading: false
    };
  },
  props: {
    limitCount: {
      type: Number,
      default: 2
    },
    fileList: {
      type: Array
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.$emit('update:fileList', fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleexceed () {
      this.$message({
        message: `最多可以上传${this.limitCount}张图片`,
        type: 'error',
        duration: 5 * 1000
      });
    },
    handleBefore (file) {
      return new Promise((resolve, reject) => {
        const self = this;
        if (self.loading) {
          const error = { err: 'uploading' };
          reject(error);
          return;
        }
        const type = file.name.toLowerCase().split('.').splice(-1)[0];
        if (type !== 'bmp' && type !== 'jpg' && type !== 'png' && type !== 'jpeg' && type !== 'gif' && type !== 'webp') {
          this.$message({
            showClose: true,
            message: '只能上传bmp/png/jpg/jped/gif/webp文件',
            duration: 2000,
            type: 'warning'
          });
          reject(file);
          return;
        }
        self.compressPic(file, file.size).then((res) => {
          self.base64Src = res;
          console.log(res);
          resolve(res);
        }, err => {
          this.$message({
            showClose: true,
            message: '不能上传大小超过5M的图片',
            duration: 2500,
            type: 'warning'
          });
          reject(err);
        });
      });
    },
    uploadPic (file) {
      this.loading = true;
      console.log(this.fileList);
      UploadPic().then((res) => {
        this.$emit('update:fileList', [...this.fileList, { name: res.url, url: res.url }]);
      }).finally(() => {
        this.loading = false;
      });
    },
    compressPic (file, size) {
      return new Promise((resolve, reject) => {
        if (size > 5242880) {
          reject(file);
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          resolve(e.target.result);
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  &-dialog {
    &-pic {
      max-width: 300px;
      height: auto;
    }
  }
  &-exceed {
    /deep/ .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
