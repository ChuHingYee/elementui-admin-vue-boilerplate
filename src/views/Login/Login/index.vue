<template>
  <div class="login">
    <div class="container">
      <div class="top">
        <span class="top-title">后台系统</span>
        <p class="top-desc">欢迎使用</p>
      </div>

      <div class="main">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="account">
            <el-input
              placeholder="请输入账号（任意6位字母或数字）"
              clearable
              v-model="form.account"
              class="main-input"
            >
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码（任意6位字母或数字）"
              v-model="form.password"
              class="main-input"
              :type="isShowPw?'text':'password'"
            >
              <template slot="prepend">密码</template>
              <i
                slot="suffix"
                class="iconfont"
                :class="isShowPw?'icon-htmal5icon08':'icon-htmal5icon09'"
                @click="triggerPWCanSee"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.rememberMe">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="main-btn"
              v-debounce:300="handleSubmit"
              :loading="loading"
              :disabled="isDisabled"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="container-footer">
        <div class="copyright">Copyright &copy; 2018</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { checkLoginNumber } from '@/utils/validators';

export default {
  data () {
    return {
      loading: false,
      form: {
        account: '',
        password: '',
        rememberMe: ''
      },
      isShowPw: false,
      isDisabled: false,
      rules: {
        account: [
          { required: true, trigger: 'blur', validator: checkLoginNumber }
        ],
        password: [
          { required: true, trigger: 'blur', validator: checkLoginNumber }
        ]
      }
    };
  },
  created () {},
  methods: {
    ...mapActions(['Login']),
    triggerPWCanSee () {
      this.isShowPw = !this.isShowPw;
    },
    handleSubmit (e) {
      if (this.loading) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          const loginParams = { ...this.form };
          this.Login(loginParams)
            .then(res => {
              this.loginSuccess(res);
              this.isDisabled = true;
            })
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    loginSuccess (res) {
      this.$router.push({
        path: '/'
      });
    },
    requestFailed (err) {
      console.log(err);
    }
  },
  mounted () {
    document.body.classList.add('userLayout');
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout');
  }
};
</script>

<style lang="scss" scoped>
.login {
  @include flex-center-center();
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
    background: #121c34;
    .top {
      text-align: center;
      color: #fff;
      &-title {
        font-size: 20px;
      }
      &-desc {
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 330px;
      margin: 0 auto;
      /deep/ .el-checkbox__label {
        color: #fff;
      }
      .is-success {
        /deep/.el-input-group__prepend {
          border-color: #67c23a;
        }
      }
      .is-error {
        /deep/.el-input-group__prepend {
          border-color: #f56c6c;
        }
      }
      &-input {
        /deep/.el-input-group__prepend {
          background: transparent !important;
        }
        /deep/.el-input__inner {
          color: #fff;
          background: transparent !important;
        }
      }
      &-btn {
        width: 100%;
      }
    }

    &-footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;
      .copyright {
        color: rgba(255, 255, 255, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
