<template>
  <div class="app-container">
    <div class="header">
      <div class="add">
        <el-button type="primary" round @click="addShow = true"
          >新增预警</el-button
        >
      </div>
      <div class="right">
        <div class="search_top">
          <span style="color: #333">采集时间：</span>
          <el-date-picker
            v-model="filterTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <span style="color: #333; margin-left: 20px">数据来源：</span>
          <el-select
            v-model="searchData.data_sources"
            placeholder="请选择数据来源"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in sources"
              :key="index"
            ></el-option>
          </el-select>
          <span style="color: #333; margin-left: 20px">预警状态：</span>
          <el-select
            v-model="searchData.warning_status"
            placeholder="请选择预警状态"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in early"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="search_bottom">
          <span style="color: #333">预警手机号：</span>
          <el-input
            placeholder="请输入预警手机号"
            v-model="searchData.phone"
            class="serach_phone"
          >
          </el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="search"
            >查询</el-button
          >
          <el-button type="warning" icon="el-icon-refresh-left" @click="reset"
            >重置</el-button
          >
          <el-button
            type="success"
            icon="el-icon-phone-outline"
            @click="samePhone"
            >筛选相同手机号</el-button
          >
          <el-button
            type="info"
            icon="el-icon-folder-opened"
            @click="exportExcelData"
            >数据导出</el-button
          >
        </div>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (searchData.pageIndex - 1) * 10 }}
          <!-- {{ scope.row.id }} -->
        </template>
      </el-table-column>
      <el-table-column label="采集时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.coll_time }}
        </template>
      </el-table-column>
      <el-table-column label="数据来源" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data_sources }}</span>
        </template>
      </el-table-column>
      <el-table-column label="咋骗类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.scams_type }}
        </template>
      </el-table-column>
      <el-table-column label="预警单位" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.unit }}
        </template>
      </el-table-column>
      <el-table-column label="预警手机" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="预警级别" width="110" align="center">
        <template slot-scope="scope">
          <div class="red" v-if="scope.row.lelver == '高危'">高危</div>
          <div class="danger" v-if="scope.row.lelver == '高'">高</div>
          <div class="warning" v-if="scope.row.lelver == '中'">中</div>
          <div class="low" v-if="scope.row.lelver == '低'">低</div>
        </template>
      </el-table-column>
      <el-table-column label="关联信息" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.related_info }}
        </template>
      </el-table-column>
      <el-table-column label="预警状态" width="110" align="center">
        <template slot-scope="scope">
          <span
            v-if="scope.row.warning_status == '未下发'"
            style="color: red"
            >{{ scope.row.warning_status }}</span
          >
          <span v-else>{{ scope.row.warning_status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否见面" width="110" align="center">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.is_meet == 0">否</span>
          <span v-if="scope.row.is_meet == 1">是</span> -->
          {{ scope.row.is_meet }}
        </template>
      </el-table-column>
      <el-table-column label="是否被骗" width="110" align="center">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.is_deceived == 0">否</span>
          <span v-if="scope.row.is_deceived == 1">是</span> -->
          {{ scope.row.is_deceived }}
        </template>
      </el-table-column>
      <el-table-column label="是否照相" width="110" align="center">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.is_phone == 0">否</span>
          <span v-if="scope.row.is_phone == 1">是</span> -->
          {{ scope.row.is_phone }}
        </template>
      </el-table-column>
      <el-table-column label="入库时间" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.storage_time }}
        </template>
      </el-table-column>
      <el-table-column label="下发时间" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.release_time }}
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="操作员" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            style="margin-right: 10px"
            @click="edit(scope.row)"
            >修改</el-link
          >
          <el-link type="danger" :underline="false" @click="remove(scope.row)"
            >删除</el-link
          >
          <!-- <el-button type="primary" @click="edit(scope.row)">修改</el-button> -->
          <!-- <el-button type="danger" @click="remove(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <addDialog
      :dialogFormVisible="addShow"
      @close="addShow = false"
      @addClick="addClick"
    ></addDialog>
    <editDialog
      :dialogFormVisible="editShow"
      @close="editShow = false"
      @editClick="editClick"
      :formData="dataInfo"
      :status_time="status_time"
    />
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="searchData.pageIndex"
      :page-size="searchData.pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  policeIndex,
  addPolice,
  editPolice,
  delPolice,
  exportExcel
} from "@/api/police";
import jsonData from "./data.json";
import addDialog from "./addDialog";
import editDialog from "./editDialog";
import { parseTime } from "@/utils/index";
import { Loading, Message } from "element-ui";
export default {
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      list: null,
      listLoading: true,
      status_time: "",
      total: null,
      searchData: {
        pageIndex: 1, //当前页数
        pageSize: 10, //每页显示的条数
        start_time: "",
        end_time: "",
        warning_status: "",
        data_sources: "",
        phone: ""
      },
      addShow: false,
      editShow: false,
      dataInfo: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      filterTime: "",
      early: [
        {
          name: "已电话联系",
          value: "已电话联系"
        },
        {
          name: "已下发",
          value: "已下发"
        },
        {
          name: "已移送",
          value: "已移送"
        },
        {
          name: "待移送",
          value: "待移送"
        },
        {
          name: "未下发",
          value: "未下发"
        }
      ],
      sources: [
        {
          name: "群下发",
          value: "群下发"
        },
        {
          name: "世纪网通",
          value: "世纪网通"
        },
        {
          name: "部平台",
          value: "部平台"
        },
        {
          name: "回访中心",
          value: "回访中心"
        },
        {
          name: "市局下发文档",
          value: "市局下发文档"
        }
      ]
    };
  },
  computed: {
    //当前页的数据
    // policeList() {
    //   // 每页的起始位置
    //   let startIndex = (this.pageIndex - 1) * this.pageSize;
    //   // 结束位置
    //   let endIndex = startIndex + this.pageSize;
    //   return this.originPoliceList.slice(startIndex, endIndex);
    // }
  },

  mounted() {
    this.fachPolice(this.searchData);
  },
  methods: {
    fachPolice(data) {
      this.listLoading = true;
      policeIndex(data).then((res) => {
        if (res.code == 20000) {
          let list = res.data.list.map((item, index) => {
            return {
              ...item,
              coll_time: parseTime(
                new Date(item.coll_time),
                "{y}-{m}-{d} {h}:{i}:{s}"
              )
            };
          });
          this.list = list;
          this.total = res.data.total;
        }
        this.listLoading = false;
      });
    },

    //新增信息
    addClick(data) {
      this.same_phone = "";
      this.searchData = {
        pageIndex: 1,
        pageSize: 10,
        start_time: "",
        end_time: "",
        warning_status: "",
        data_sources: "",
        phone: ""
      };
      if (!data.warning_status) {
        data.warning_status = "未下发";
      }
      //获取当前时间
      let activeTime = parseTime(new Date().toString());
      data.coll_time = activeTime; //采集时间为添加时间
      data.release_time = Number(data.release_time) ? activeTime : ""; //添加下发时间
      data.phone = data.phone ? data.phone.trim() : "";
      addPolice(data).then((res) => {
        this.fachPolice(this.searchData);
        this.addShow = false;
        if (res.code == 20000) {
          this.$message.success("添加成功");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    edit(data) {
      this.dataInfo = Object.assign({}, data);
      this.status_time = data.release_time;
      this.editShow = true;
    },
    // 修改内容
    editClick(data) {
      //获取当前时间
      let activeTime = parseTime(new Date().toString());
      if (data.release_time == 1) {
        data.release_time = activeTime; //添加下发时间
      } else if (data.release_time == 0) {
        data.release_time = "";
      }
      data.phone.trim();
      editPolice(data).then((res) => {
        this.fachPolice(this.searchData);
        this.editShow = false;
        if (res.code == 20000) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    search() {
      let start_time =
        this.filterTime && parseTime(this.filterTime[0], "{y}-{m}-{d}");
      let end_time =
        this.filterTime && parseTime(this.filterTime[1], "{y}-{m}-{d}");
      let { warning_status, data_sources, phone } = this.searchData;
      if (!start_time && !warning_status && !data_sources && !phone)
        return this.$message.error("查询条件不能为空");
      this.searchData = {
        pageIndex: 1, //当前页数
        pageSize: 10, //每页显示的条数
        start_time,
        end_time,
        warning_status,
        data_sources,
        phone: phone.trim()
      };
      this.fachPolice(this.searchData);
    },
    samePhone() {
      this.reset();
      this.same_phone = true;
      this.fachPolice({ ...this.searchData, same_phone: true });
    },
    reset() {
      this.same_phone = "";
      this.filterTime = "";
      this.searchData = {
        pageIndex: 1, //当前页数
        pageSize: 10, //每页显示的条数
        start_time: "",
        end_time: "",
        warning_status: "",
        data_sources: "",
        phone: ""
      };
      this.fachPolice(this.searchData);
    },
    remove(data) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "确定删除吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delPolice({ id: data.id }).then((res) => {
            if (res.code == 20000) {
              this.fachPolice({
                ...this.searchData,
                same_phone: this.same_phone
              });
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {});
      return;
    },
    //下载导出execl
    exportExcelData() {
      exportExcel(this.searchData).then((res) => {
        this.download(res);
      });
    },
    //改变页数
    handleCurrentChange(index) {
      this.searchData.pageIndex = index;
      this.fachPolice({ ...this.searchData, same_phone: this.same_phone });
    },
    download(data) {
      let url = window.URL.createObjectURL(
        new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocment.spreadsheetml.sheet"
        })
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "excel.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>
<style lang="scss" scoped>
.add {
  margin: 10px 0 30px;
}
.red {
  background: red;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
}
.danger {
  background: #d86c6c;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
}
.warning {
  background: #d4a146;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
}
.low {
  background: #d0c0a3;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
}
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  .right {
    // display: flex;
    // align-items: center;
    .search_bottom {
      margin: 15px 0;
      .serach_phone {
        width: 335px;
        margin-right: 10px;
      }
    }
  }
}
</style>
