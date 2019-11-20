<template>
  <div class="container messageboard app-container">
    <!-- 查询区----start -->
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      :inline="true"
      ref="formSearch"
      :model="formSearch"
      class="demo-form-inline"
      size="mini"
    >
      <form method="get">
        <el-form-item
          label="状态"
          prop="nstatus"
        >
          <el-select
            v-model="formSearch.nstatus"
            placeholder="是否已领取奖金"
          >
            <el-option
              label="全部"
              value="-1"
            ></el-option>
            <el-option
              label="未领取"
              value="0"
            ></el-option>
            <el-option
              label="已领取"
              value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="username"
        >
          <el-input
            v-model="formSearch.username"
            placeholder="请输入用户姓名"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="phone"
        >
          <el-input
            v-model="formSearch.phone"
            placeholder="请输入用户电话"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="车牌号"
          prop="carNo"
        >
          <el-input
            v-model="formSearch.carNo"
            placeholder="请输入用户车牌号"
          ></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button
            type="primary"
            @click="onSearch(1)"
          >查询</el-button>
          <el-button
            type="warning"
            plain
            @click="onReset"
          >重置</el-button>
        </el-form-item>
      </form>
    </el-form>
    <!-- 查询区----end -->
    <!-- 表格---start -->
    <el-table
      :data="tableData"
      v-loading="listLoading"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="60"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="carNo"
        label="车牌号"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="signUpTime"
        label="报名时间"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="vstatus"
        label="状态"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="dectNo"
        label="单号"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="230"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            @click="handleDect(scope.$index, scope.row)"
            v-show="dectIsShow(scope.row.nstatus)"
          >领取</el-button>
          <el-button
            size="mini"
            plain
            type="primary"
            @click="handleDectEdit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pageStyle"
      background
      layout="total,sizes,prev, pager, next,jumper"
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.pageTotal"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >

    </el-pagination>
    <el-button
      class="addDesc"
      type="primary"
      @click="getDesc()"
    >活动详情</el-button>
    <!-- 表格---end -->

    <!-- 修改详情---start -->
    <el-dialog
      :title="formDectTitle"
      :visible.sync="dialogDectVisibleEdit"
      width="40%"
      @close="closeDialog('formEdit')"
    >
      <!-- 第一行 -->
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        ref="formDectEdit"
        :model="formDectEdit"
        class="demo-form-inline"
        size="medium"
        :rules="rules"
      >
        <el-form-item
          label="姓名"
          prop="username"
        >
          <el-input
            v-model="formDectEdit.username"
            placeholder="请输入姓名"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="phone"
        >
          <el-input
            v-model="formDectEdit.phone"
            placeholder="请输入电话"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="车牌号"
          prop="carNo"
        >
          <el-input
            v-model="formDectEdit.carNo"
            placeholder="请输入车牌号"
            maxlength="7"
          ></el-input>
        </el-form-item>
        <!--<el-form-item
          class="cusEl"
          label="报名时间"
          prop=""
        >
           <div class="dateAndTime">
            <el-date-picker
              v-model="formDectEdit.newDate"
              type="date"
              placeholder="日期"
              change="dateChange"
              format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
          <div class="dateAndTime">
            <el-time-picker
              v-model="formDectEdit.newTime"
              :picker-options="{}"
              placeholder="时间"
            >
            </el-time-picker>
          </div> -->
        <el-form-item
          label="报名时间"
          prop=""
        >
          <el-date-picker
            v-model="formDectEdit.signUpTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="领取状态"
          prop=""
        >
          <el-select
            v-model="formDectEdit.vstatus"
            @change="selectNstatus"
          >
            <el-option
              label="未领取"
              value="0"
            ></el-option>
            <el-option
              label="已领取"
              value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单号">
          <el-input
            :disabled="isDisabled"
            v-model="formDectEdit.dectNo"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogDectVisibleEdit = false">取消</el-button>
        <el-button
          type="primary"
          @click="formDectEditSubmit('formDectEdit')"
        >提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改详情---end -->
    <!-- 领取 start -->
    <el-dialog
      :title="formDectTitle"
      :visible.sync="dialogDectVisible"
      width="20%"
      @close="closeDialog('formEdit')"
    >
      <!-- 第一行 -->
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        ref="formDect"
        :model="formDect"
        class="demo-form-inline"
        size="medium"
      >
        <el-form-item
          label="单号"
          prop=""
        >
          <el-input
            v-model="formDect.dectNo"
            placeholder="请输入单号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogDectVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="formDectSubmit"
        >提交</el-button>
      </div>
    </el-dialog>
    <!-- 修改 end -->
    <!-- 活动详情 -->
    <el-dialog
      :title="formDescTitle"
      :visible.sync="dialogDescVisible"
      width="60%"
      @close="closeDialog('')"
    >
      <!-- 第一行 -->
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        ref="formDect"
        :model="formDesc"
        class="demo-form-inline descstyle"
        size="medium"
      >
        <el-form-item
          label="详情一"
          prop=""
        >
          <el-input
            v-model="formDesc.desc1"
            placeholder="请输入活动详情一"
            prop="formDesc.desc1"
            maxlength="80"
            type="text"
            :show-word-limit="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="详情二"
          prop=""
        >
          <el-input
            v-model="formDesc.desc2"
            placeholder="请输入活动详情二"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="详情三"
          prop=""
        >
          <el-input
            v-model="formDesc.desc3"
            placeholder="请输入活动详情三"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogDescVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="formDescSubmit"
        >提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.messageboard {
  // 设置输入框的宽度
  .el-form-item__content {
    width: 220px;
  }
  .descstyle {
    .el-form-item {
      width: 100%;
    }
    .el-form-item__content {
      width: calc(100% - 90px);
    }
  }
}
</style>

<script>
import { getOwnerInfo } from "@/api/table";
export default {
  name: "messageboard",
  data() {
    var checkUsername = (rule, value, callback) => {
      var reg = new RegExp(/^([a-zA-Z0-9-\u4e00-\u9fa5]+)$/);
      if (!reg.test(value)) {
        callback(new Error("请输入正确的姓名"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      var reg = new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
      if (!reg.test(value)) {
        callback(new Error("请输入正确的电话"));
      } else {
        callback();
      }
    };
    var checkCarNo = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        var reg = new RegExp(
          /^[鲁京津沪渝冀晋辽吉黑苏浙皖闽赣豫鄂湘粤琼川贵云陕甘青藏桂蒙宁新]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        );
        if (!reg.test(value)) {
          callback(new Error("请输入正确的车牌号"));
        } else {
          callback();
        }
      }
    };
    return {
      listLoading: false, //
      pageInfo: {
        //分页
        currentPage: 1,
        pageSize: 10,
        pageTotal: 80
      },
      id: "",
      formSearch: {
        // 状态
        nstatus: "-1",
        //表单查询
        username: "",
        phone: "",
        carNo: ""
      },
      formDect: {
        dectNo: ""
      },
      formDesc: {
        desc1: "",
        desc2: "",
        desc3: ""
      },
      dectNo: "",
      formDectEdit: {
        username: "",
        date: "",
        time: ""
      },
      formEdit: {
        //表单编辑
      },
      addFormVisible: false,
      userList: [],
      isDisabled: false,
      formDectTitle: "检测单号", //
      formDectDisabled: false, //
      formDescTitle: "活动详情", //
      formDescDisabled: false, //
      dialogDescVisible: false,
      dialogDectVisible: false, //编辑弹框显示
      dialogDectVisibleEdit: false,
      dialogType: "", //弹框类型：add,edit,show
      tableData: [],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      multipleSelection: [],
      rules: {
        username: [
          { validator: checkUsername, trigger: "change" },
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        phone: [
          { validator: checkPhone, trigger: "change" },
          { required: true, message: "请输入电话", trigger: "blur" }
        ],
        carNo: [{ validator: checkCarNo, trigger: "change" }]
      }
    };
  },
  computed: {},
  filters: {
    convertType: function(type) {
      if (type == 1) {
        return "留言";
      } else if (type == 2) {
        return "建议";
      } else if (type == 3) {
        return "BUG";
      }
    }
  },
  mounted() {
    // 搜索
    this.onSearch();
  },
  methods: {
    handleEditDesc() {
      this.dialogDescVisible = true;
    },
    dectIsShow(nstatus) {
      //
      this.formDect.dectNo = "";
      var status = true;
      if (parseInt(nstatus) == 1) {
        status = false;
      }
      return status;
    },
    /**
     * 查询列表
     */
    onSearch(currentPage) {
      if (currentPage) {
        this.pageInfo.currentPage = 1;
      }
      this.listLoading = true;
      let param = Object.assign({}, this.formSearch, this.pageInfo);
      getOwnerInfo(param)
        .then(data => {
          this.listLoading = false;
          console.log("表格执行到这里了");
          if (data) {
            var json = data;
            if (json.result.resultCode == "0") {
              this.pageInfo.pageTotal = json.total;
              //this.pageInfo.currentPage = json.pageCount;
              this.tableData = json.userInfos;
              console.log(json.userInfos);
            } else if (json.message) {
              this.$message({ message: json.message, type: "error" });
            }
          }
        })
        .catch(err => {
          this.listLoading = false;
          this.$message({ message: "查询异常，请重试", type: "error" });
        });
    },
    //领取操作弹窗
    handleDect(index, rowData) {
      this.id = rowData.id;
      this.dialogDectVisible = true;
      this.$nextTick(() => {
        this.formDectTitle = "检测单号";
        this.formDectDisabled = false;
      });
    },
    // 编辑信息内容
    handleDectEdit(index, rowData) {
      this.id = rowData.id;
      // 深拷贝处理
      this.formDectEdit = window.JSON.parse(window.JSON.stringify(rowData));
      // 记录dectNo
      this.dectNo = window.JSON.parse(window.JSON.stringify(rowData.dectNo));
      var timestr = rowData.signUpTime.split(" ");
      // this.formDectEdit.newDate = new Date(timestr[0]);
      // this.formDectEdit.newTime = new Date(2016, 9, 10, 8, 40, 50);
      var ymd = timestr[0].split("-");
      var hms = timestr[1].split(":");
      this.formDectEdit.signUpTime = new Date(
        ymd[0],
        parseInt(ymd[1]) - 1,
        ymd[2],
        hms[0],
        hms[1],
        hms[2]
      );
      this.dialogDectVisibleEdit = true;
      // 设置单号框的状态
      this.isDisabled = parseInt(this.formDectEdit.nstatus) == 1 ? false : true;
      this.$nextTick(() => {
        this.formDectTitle = "编辑报名信息";
        this.formDectDisabled = false;
      });
    },
    // 领取操作
    formDectSubmit() {
      if (!this.formDect.dectNo) {
        this.$message({ message: "请填写检测单号", type: "error" });
        return false;
      }
      apis.msgApi
        .changeStutas({ id: this.id, dectNo: this.formDect.dectNo })
        .then(data => {
          if (data && data.data) {
            var json = data.data;
            if (json && json.result.resultCode == "0") {
              this.$message({ message: "领取成功", type: "success" });
              this.dialogDectVisible = false;
              this.onSearch();
              return;
            } else {
              this.$message({
                message: json.result.resultDesc,
                type: "error"
              });
            }
          }
        })
        .catch(err => {
          debugger;
          this.$message({ message: "执行失败，请重试", type: "error" });
        });
    },
    /**
     * 删除
     */
    handleDelete(index, rowData) {
      var id = rowData.id;
      console.log(id);
      this.$confirm("确定删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apis.msgApi
            .deleteInfo({ id: id })
            .then(data => {
              if (data && data.data) {
                var json = data.data;
                if (json && json.result.resultCode == "0") {
                  this.$message({ message: "删除信息成功", type: "success" });
                  this.dialogDectVisible = false;
                  this.onSearch();
                  return;
                }
              }
              this.$message({ message: "执行失败，请重试", type: "error" });
            })
            .catch(err => {
              debugger;
              this.$message({ message: "执行失败，请重试", type: "error" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    selectNstatus(e) {
      //状态赋值
      this.formDectEdit.nstatus = e;
      if (e == "1") {
        //选择了已领取
        this.isDisabled = false;
        this.formDectEdit.dectNo = this.dectNo;
      } else {
        // 未领取
        this.formDectEdit.dectNo = "";
        this.isDisabled = true;
      }
    },
    // 修改操作
    formDectEditSubmit(formName) {
      this.$refs[formName].validate(valid => {
        //校验
        if (valid) {
          if (
            parseInt(this.formDectEdit.nstatus) == 1 &&
            !this.formDectEdit.dectNo
          ) {
            this.$message({ message: "请填写检测单号", type: "error" });
            return false;
          }
          apis.msgApi
            .editInfo({ id: this.id, dataEdit: this.formDectEdit })
            .then(data => {
              if (data && data.data) {
                var json = data.data;
                if (json && json.result.resultCode == "0") {
                  this.$message({ message: "修改信息成功", type: "success" });
                  this.onSearch();
                  this.dialogDectVisibleEdit = false;
                  return;
                }
              }
              this.$message({ message: json.result.resultDesc, type: "error" });
            })
            .catch(err => {
              debugger;
              this.$message({ message: "执行失败，请重试", type: "error" });
            });
        } else {
          return false;
        }
      });
    },
    formDescSubmit() {
      if (this.formDesc.desc1 && this.formDesc.desc2 && this.formDesc.desc3) {
        apis.msgApi
          .editDesc({ desc: this.formDesc })
          .then(data => {
            if (data && data.data) {
              var json = data.data;
              if (json && json.result.resultCode == "0") {
                this.$message({ message: "修改活动信息成功", type: "success" });
                this.dialogDescVisible = false;
                return;
              }
            }
            this.$message({ message: json.result.resultDesc, type: "error" });
          })
          .catch(err => {
            debugger;
            this.$message({ message: "执行失败，请重试", type: "error" });
          });
      } else {
        this.$message({ message: "请填写活动详情", type: "error" });
        return false;
      }
    },
    getDesc() {
      var that = this;
      apis.msgApi
        .getDesc({})
        .then(data => {
          if (data && data.data) {
            var json = data.data;
            if (json && json.result.resultCode == "0") {
              that.formDesc = json.descInfo[0];
              that.dialogDescVisible = true;
            }
          }
        })
        .catch(err => {
          debugger;
          this.$message({ message: "执行失败，请重试", type: "error" });
        });
    },
    onReset() {
      this.$refs["formSearch"].resetFields();
    },
    /**
     * 关闭弹框，数据重置
     */
    closeDialog(formName) {
      //this.$refs[formName].resetFields();
    },
    /**
     * 分页大小切换
     */
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.onSearch();
    },
    /**
     * 分页切换
     */
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.onSearch();
    },
    /**
     * 点击选择
     */
    handleSelectionChange(val) {
      var ids = [];
      // for (var i = 0; i < val.length; i++) {
      //   if (val[i].tiId) {
      //     ids.push(val[i].tiId);
      //   }
      // }
      var idsStr = ids.join(",");
      //this.multipleSelection = val;
      this.ids = idsStr;
      // this.$message({
      //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
      //     type: "success"
      // });
    },
    /**
     * 打开详情页
     */
    openDetail(row) {
      this.$common.OpenNewPage(this, "detail", row);
    }
  }
};
</script>
<style>
.pageStyle {
  margin-top: 20px;
}
.el-row--flex .cus-p {
  display: inline-block;
  height: 35px;
  line-height: 35px;
}
.content-img {
  width: 100%;
  height: auto;
}
.single-img .cus-image img {
  width: 100%;
  height: 210px;
}
.cus-row .bg-purple {
  text-align: center;
}
.single-img {
  text-align: center;
  width: 20%;
  padding: 10px;
  display: inline-block;
}
.single-img span {
  display: block;
}
.row-bg {
  padding: 0;
  background-color: #fff;
}
.el-row {
  /* margin-bottom: 20px; */
  margin: 0;
}
.bg-purple {
  background: #fff;
}
.dateAndTime {
  width: 50%;
  display: inline-block;
  float: left;
}
.dateAndTime .el-date-editor.el-input {
  width: 132px;
}
.messageboard .cusEl .el-form-item__content {
  width: 270px;
}
.messageboard {
  position: relative;
}
.addDesc {
  position: absolute;
  right: 30px;
  bottom: 15px;
}
</style>

