<template>
  <div class="publicStyle">
    <div class="publicStyle-conter">
      <!-- 主播列表 -->
      <div class="record">
        <div class="record-conter">
          <el-row :gutter="20" class="record-top" style="margin-left: 0px; margin-right: 0px;">
            <el-col :span="24">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="菜单名称：">
                  <el-input
                    v-model.trim="formInline.menuName"
                    @keyup.enter.native="onSubmit"
                    @clear="onSubmit"
                    placeholder="请输入菜单名称"
                    clearable
                    size="mini"
                  ></el-input>
                </el-form-item> -->
                <el-form-item label>
                  <el-button icon="el-icon-plus" type="success" size="mini" title="新增" @click="openDialog('新增菜单')">新增菜单</el-button>
                </el-form-item>

                <!-- <el-form-item label="状态：">
                  <el-select
                    @change="onSubmit"
                    clearable
                    v-model="formInline.status"
                    placeholder="请选择"
                    size="mini"
                    style="width:85px"
                  >
                    <el-option
                      v-for="(item,index) in liveingStateOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
              </el-form>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            row-key="menuId"
          >
            <!-- <el-table-column type="index" min-width="50" label="编号"></el-table-column> -->
            <el-table-column
              prop="menuName"
              class-name="table_col_menu"
              align="left"
              show-overflow-tooltip
              min-width="80px"
              label="菜单名称"
            ></el-table-column>
            <el-table-column prop="icon" show-overflow-tooltip min-width="80px" label="图标">
              <template slot-scope="scope">
                <svg-icon :icon-class="scope.row.icon" />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="orderNum" label="排序" min-width="120px"></el-table-column>
            <el-table-column prop="menuType" label="权限标识" show-overflow-tooltip></el-table-column>
            <el-table-column prop="component" label="组件路径" min-width="80px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="component" label="可见" min-width="80px" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.visible==="0"?"隐藏":"可见"}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="createTime" label="创建时间">
              <template slot-scope="scope">{{parseTime(scope.row.createTime)}}</template>
            </el-table-column>

            <el-table-column label="操作" min-width="120px">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-plus"
                  size="mini"
                  title="新增"
                  style="margin-bottom:5px"
                  @click="openDialog('新增菜单',scope.row.menuId)"
                ></el-button>
                <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  title="编辑"
                  style="margin-bottom:5px"
                  plain
                  @click="openDialog('编辑菜单',scope.row.menuId)"
                ></el-button>
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  title="删除"
                  style="margin-bottom: 5px;"
                  plain
                  @click="deleteMenu(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" custom-class="common-dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <iconSelect ref="iconSelect" @selected="selected"></iconSelect>
                <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="是否外链">
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path"> -->
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType == 'F'" label="权限标识">
              <el-input v-model="form.perms" placeholder="请权限标识" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in visibleOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/styles/publicStyle.css";
import {
  listMenu,
  getMenu,
  getTreeselect,
  updateMenu,
  addMenu,
  delMenu
} from "@/api/system/menu.js";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import iconSelect from "@/components/IconSelect";
import { visibleOptions } from "@/utils/options/role";

export default {
  name: "Menu",
  components: { treeselect: treeselect, iconSelect: iconSelect },
  data() {
    return {
      visibleOptions,
      // 总条数
      totalNum: 0,
      // 查询数据
      formInline: {
        menuName: ""
      },
      // 表格
      tableData: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},

  beforeMount() {},
  created() {
    this.getList();
  },
  mounted() {},

  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    onSubmit() {
      this.formInline.pageNum=1
      this.getList();
    },
    // 获取列表
    getList() {
      let data = JSON.parse(JSON.stringify(this.formInline));
      listMenu(data).then(xhrData => {
        if (xhrData.code === 0) {
          this.tableData = xhrData.data;
          // this.totalNum = +xhrData.data.total_rows;
          // this.pagination=xhrData.data.pagination
        }
      });
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      getTreeselect().then(response => {
        this.menuOptions = [];
        const menu = { id: 0, label: "主类目", children: [] };
        menu.children = response.data;
        this.menuOptions.push(menu);
      });
    },
    // 打开新增/编辑弹框
    openDialog(title, id) {
      this.reset();
      this.getTreeselect();
      this.title = title;
      if (title === "新增菜单") {
        if (id) {
          this.form.parentId = id;
        }
        this.open = true;
      } else if (title === "编辑菜单") {
        getMenu(id).then(response => {
          this.form = response.data;
          this.open = true;
        });
      } else {
        return false;
      }
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.menuType === "M") {
            this.form.component = "";
          }
          console.log(this.form);
          if (this.title === "编辑菜单") {
            updateMenu(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else if (this.title === "新增菜单") {
            addMenu(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            return false;
          }
        }
      });
    },
    cancel() {
      this.reset();
      this.open = false;
    },
    // 表单重置
    reset() {
      this.form = {
        menuId: "",
        parentId: 0,
        menuName: "",
        icon: "",
        menuType: "M",
        orderNum: "",
        isFrame: "1",
        visible: "1"
      };
      this.resetForm("form");
    },
    deleteMenu(row) {
      this.$confirm(`是否确认删除名称为 ${row.menuName} 的数据项?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delMenu(row.menuId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  },

  watch: {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/scss/list.scss";
</style>
<style lang="scss">
.publicStyle .publicStyle-conter .record .record-conter .table_col_menu {
  text-align: left !important;
}
</style>