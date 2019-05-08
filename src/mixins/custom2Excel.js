import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  methods: {
    // excel导出
    export2Excel (selector, title) {
      /* generate workbook object from table */
      // let _cache;
      // if (this.columnFixed) {
      //   _cache = this.columnFixed;
      //   this.columnFixed = false;
      // }
      this.isExport = false;
      this.$nextTick(async () => {
        const wb = XLSX.utils.table_to_book(document.querySelector(selector));
        /* get binary string as output */
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        });
        try {
          await FileSaver.saveAs(
            new Blob([wbout], {
              type: 'application/octet-stream'
            }),
            `${title || new Date().getTime()}.xlsx`
          );
          this.isExport = true;
          // this.columnFixed = _cache;
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout);
        }
        return wbout;
      });
    }
  }
};
