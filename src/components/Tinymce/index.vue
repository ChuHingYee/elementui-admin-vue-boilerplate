<template>
  <div class="rich-text">
    <Editor v-model="richTxt" :init="editorInit" :key="tinymceFlag"></Editor>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
export default {
  name: 'RichTxt',
  data () {
    return {
      tinymceFlag: 1,
      editorInit: {
        encoding: 'XML',
        language_url: require('./../../../public/tinymce/languages/zh_CN.js'),
        language: 'zh_CN',
        skin_url:
          process.env.NODE_ENV === 'development'
            ? '/tinymce/skins/ui/oxide'
            : './tinymce/skins/ui/oxide',
        height: 300,
        browser_spellcheck: true, // 拼写检查
        plugins:
          'link lists image code table colorpicker textcolor contextmenu wordcount',
        toolbar:
          'bold italic underline strikethrough | fontselect | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        font_formats:
          "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64();
          success(img);
        }
      },
      fileList: [],
      showUploadDialog: false,
      base64Src: '',
      editor: {},
      headers: {
        authorization: 'authorization-text'
      }
    };
  },
  props: {
    tinymceHtml: {
      type: String,
      default: ''
    }
  },
  computed: {
    richTxt: {
      get () {
        return this.tinymceHtml;
      },
      set (val) {
        return this.$emit('update:tinymceHtml', val);
      }
    }
  },
  watch: {
    richTxt (val) {
      this.$emit('update:tinymceHtml', val);
    },
    tinymceHtml (val) {
      if (val !== this.richTxt) {
        this.richTxt = val;
      }
    }
  },
  components: {
    Editor
  },
  mounted () {
    tinymce.init({});
  },
  activated () {
    this.tinymceFlag++;
  }
};
</script>

<style lang="scss">
.rich-text {
  position: relative;
  .rich-list {
    &_item {
      @include flex-start-center;
      &_icon {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
      &_input {
        height: 40px;
        line-height: 40px;
        flex: 1;
      }
    }
  }
  .rich-upload {
    position: absolute;
    top: 2px;
    right: 1px;
  }
}
</style>
