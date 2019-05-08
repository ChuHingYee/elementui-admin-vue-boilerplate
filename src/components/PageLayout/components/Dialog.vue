<template>
  <el-dialog
    title="对话框"
    :visible.sync="isDialogShowing"
    width="450px"
    class="addForm"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
    :append-to-body="true"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="原密码"
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        label="haha"
        prop="select"
      >
        <el-select
          v-model="form.select"
          placeholder="请选择"
          :loading="optionsLoading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        size="small"
        @click="isDialogShowing = false"
      >取 消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="submit"
        :loading="loading"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { EditTable, GetSelect } from '@/apis/table';
import CustomDialogMixin from '@/mixins/customDialog';
export default {
  name: 'UserLevelItemDialog',
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        select: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: [],
      optionsLoading: false
    };
  },
  props: {
    type: {
      type: Number,
      default: 0
    },
    currentItem: {
      type: Object,
      defalut: () => { }
    }
  },
  watch: {
    async show (val) {
      if (val) {
        this.resetForm();
        this.optionsLoading = true;
        GetSelect().then((res) => {
          this.options = res.list;
          this.optionsLoading = false;
        }, (err) => {
          console.log(err);
          this.optionsLoading = false;
        });
      }
    }
  },
  mixins: [CustomDialogMixin],
  computed: {
    isDialogShowing: {
      get () {
        return this.show;
      },
      set () {
        if (this.loading) {
          return;
        }
        return this.$emit('update:show', false);
      }
    }

  },
  methods: {
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          EditTable().then((res) => {
            this.loading = false;
            this.$emit('update:show', false);
            this.$emit('edit-success');
          }, (err) => {
            console.log(err);
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>
