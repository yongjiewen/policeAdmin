<template>
  <div class="app-container">
    <div class="add">
      <el-button type="primary" round @click="addShow = true"
        >新增预警</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="policeList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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
      <el-table-column label="预留手机" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="预警级别" width="110" align="center">
        <template slot-scope="scope">
          <div class="red" v-if="scope.row.lelver == 1">高危</div>
          <div class="danger" v-if="scope.row.lelver == 2">高</div>
          <div class="warning" v-if="scope.row.lelver == 3">中</div>
          <div class="low" v-if="scope.row.lelver == 4">低</div>
        </template>
      </el-table-column>
      <el-table-column label="关联信息" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.related_info }}
        </template>
      </el-table-column>
      <el-table-column label="预警状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.warning_status }}
        </template>
      </el-table-column>
      <el-table-column label="是否见面" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_meet == 0">否</span>
          <span v-if="scope.row.is_meet == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="是否被骗" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_deceived == 0">否</span>
          <span v-if="scope.row.is_deceived == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="是否照相" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_phone == 0">否</span>
          <span v-if="scope.row.is_phone == 1">是</span>
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
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addDialog
      :dialogFormVisible="addShow"
      @close="addShow = false"
      @addClick="addClick"
    ></addDialog>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="originPoliceList.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { policeIndex } from "@/api/police";
import jsonData from "./data.json";
import addDialog from "./addDialog";
import { parseTime } from "@/utils/index";
export default {
  components: {
    addDialog
  },
  data() {
    return {
      list: null,
      listLoading: true,
      originPoliceList: [], //原始数据
      currentPage: 1, //当前页数
      pageSize: 10, //每页显示的条数
      addShow: false
    };
  },
  computed: {
    //当前页的数据
    policeList() {
      // if (!this.originPoliceList) {
      //   return [];
      // }
      // 每页的起始位置
      let startIndex = (this.currentPage - 1) * this.pageSize;
      // 结束位置
      let endIndex = startIndex + this.pageSize;
      return this.originPoliceList.slice(startIndex, endIndex);
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.originPoliceList = jsonData.data;
    // policeIndex().then((res) => {
    //   console.log(res);
    // });
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    addClick(data) {
      //获取当前时间
      let activeTime = parseTime(new Date().toString());
      data.storage_time = activeTime; //入库时间为添加时间
      console.log(data);
    },
    edit(data) {
      console.log(data);
    },
    //改变页数
    handleCurrentChange(index) {
      this.currentPage = index;
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
</style>
