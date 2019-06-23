<template>
  <div class="login">
    <el-form :model="form" ref="form" :rules="rules" class="login-form">
      <el-form-item prop="account">
        <el-input
          placeholder="请输入账号（任意6位字母或数字）"
          clearable
          v-model="form.account"
          class="login-form__input"
        >
          <template slot="prepend">账号</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码（任意6位字母或数字）"
          v-model="form.password"
          class="login-form__input"
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
      <el-form-item class="login-form__item">
        <el-button
          type="primary"
          class="login-form__btn"
          v-debounce:300="handleSubmit"
          :loading="loading"
          :disabled="isDisabled"
        >注 册</el-button>
      </el-form-item>
      <el-form-item class="login-form__item login-form__props">
        <router-link :to="{path:'/login'}" class="item-nav">使用已有账号登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { RegSevice } from '@/apis/app';
import { checkLoginNumber } from '@/utils/validators';

export default {
  name: 'Reg',
  data () {
    return {
      loading: false,
      form: {
        account: '',
        password: '',
        rememberMe: true
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
          RegSevice(loginParams)
            .then(res => {
              this.RegSuccess(res);
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
    RegSuccess (res) {
      this.$message({
        message: `注册成功`,
        type: 'success',
        duration: 5 * 1000
      });
      this.$router.push({
        path: '/login'
      });
    },
    requestFailed (err) {
      console.log(err);
    }
  },
  mounted () {},
  beforeDestroy () {}
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  &-form {
    width: 380px;
    margin: 0 auto;
    padding: 40px;
    background: #fff;
    border-radius: 5px;
    .is-success {
      /deep/.el-input-group__prepend {
        border-color: $--color-success;
      }
    }
    .is-error {
      /deep/.el-input-group__prepend {
        border-color: $--color-danger;
      }
    }
    &__item {
      margin-bottom: 0;
    }
    &__input {
      /deep/.el-input-group__prepend {
        padding: 0 8px;
      }
      /deep/.el-input__inner {
        background: transparent !important;
      }
    }
    &__btn {
      width: 100%;
    }
    &__props {
      width: 100%;
      /deep/.el-form-item__content {
        width: 100%;
        @include flex-end-center;
        &:before {
          content: normal;
        }
        &:after {
          content: normal;
        }
        .item-nav {
          color: #409eff;
        }
      }
    }
  }
}
</style>
