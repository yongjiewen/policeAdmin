<template>
  <el-dialog title="预警信息" :visible="dialogFormVisible" @close="close">
    <el-form ref="form" :model="form" label-width="90px">
      <!-- <el-form-item label="采集时间:">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.coll_time"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item> -->

      <el-form-item label="数据来源:">
        <el-select v-model="form.data_sources" placeholder="请选择数据来源">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in sources"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警单位:">
        <el-select v-model="form.unit" placeholder="请选择预警单位">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in unit"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警状态:">
        <el-select v-model="form.warning_status" placeholder="请选择预警状态">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in early"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="诈骗类型:">
        <el-select v-model="form.scams_type" placeholder="请选择诈骗类型">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in fraud_type"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警手机:">
        <el-input v-model="form.phone" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="关联信息:">
        <el-input v-model="form.related_info"></el-input>
      </el-form-item>

      <el-form-item label="入库时间:">
        <el-input v-model="form.storage_time"></el-input>
      </el-form-item>
      <el-form-item label="下发时间:">
        <el-radio-group v-model="form.release_time">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">下发(当前时间)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预警级别:">
        <el-radio-group v-model="form.lelver">
          <el-radio label="高危">高危</el-radio>
          <el-radio label="高">高</el-radio>
          <el-radio label="中">中</el-radio>
          <el-radio label="低">低</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否见面:">
        <el-radio-group v-model="form.is_meet">
          <el-radio label="否">否</el-radio>
          <el-radio label="是">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否被骗:">
        <el-radio-group v-model="form.is_deceived">
          <el-radio label="否">否</el-radio>
          <el-radio label="是">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否照相:">
        <el-radio-group v-model="form.is_phone">
          <el-radio label="否">否</el-radio>
          <el-radio label="是">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="操作员:">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="addClick">添 加</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        coll_time: "",
        data_sources: "",
        scams_type: "",
        unit: "",
        phone: "",
        lelver: "",
        related_info: "",
        warning_status: "",
        is_meet: "",
        is_deceived: "",
        is_phone: "",
        storage_time: "",
        release_time: "",
        remark: "",
        nickname: ""
      },
      unit: [
        {
          name: "桥峰派出所",
          value: "桥峰派出所"
        },
        {
          name: "河南派出所",
          value: "河南派出所"
        },
        {
          name: "新塘派出所",
          value: "新塘派出所"
        },
        {
          name: "沙湖派出所",
          value: "沙湖派出所"
        },
        {
          name: "君糖派出所",
          value: "君糖派出所"
        },
        {
          name: "牛江派出所",
          value: "牛江派出所"
        },
        {
          name: "圣堂派出所",
          value: "圣堂派出所"
        },
        {
          name: "良西派出所",
          value: "良西派出所"
        },
        {
          name: "东成派出所",
          value: "东成派出所"
        },
        {
          name: "大田派出所",
          value: "大田派出所"
        },
        {
          name: "大槐派出所",
          value: "大槐派出所"
        },
        {
          name: "横坡派出所",
          value: "横坡派出所"
        },
        {
          name: "那吉派出所",
          value: "那吉派出所"
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
      ],
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
      fraud_type: [
        {
          name: "贷款、代办信用卡",
          value: "贷款、代办信用卡"
        },
        {
          name: "冒充公检法",
          value: "冒充公检法"
        },
        {
          name: "冒充电商客服",
          value: "冒充电商客服"
        },
        {
          name: "刷单兼职",
          value: "刷单兼职"
        },
        {
          name: "杀猪盘",
          value: "杀猪盘"
        },
        {
          name: "投资、赌博平台",
          value: "投资、赌博平台"
        },
        {
          name: "裸聊诈骗",
          value: "裸聊诈骗"
        },
        {
          name: "婚恋交友",
          value: "婚恋交友"
        },
        {
          name: "钓鱼、欺诈网站",
          value: "钓鱼、欺诈网站"
        },
        {
          name: "其他类型",
          value: "其他类型"
        }
      ]
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.form = { warning_status: "未下发" };
    },
    addClick() {
      this.$emit("addClick", this.form);
      this.form = { warning_status: "未下发" };
    }
  }
};
</script>

<style>
</style>