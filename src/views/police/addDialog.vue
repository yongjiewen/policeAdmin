<template>
  <el-dialog
    title="预警信息"
    :visible="dialogFormVisible"
    @close="$emit('close')"
  >
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="采集时间:">
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
      </el-form-item>
      <el-form-item label="数据来源:">
        <el-input v-model="form.data_sources"></el-input>
      </el-form-item>
      <el-form-item label="诈骗类型:">
        <el-input v-model="form.scams_type"></el-input>
      </el-form-item>
      <el-form-item label="预警单位:">
        <el-input v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="预留手机号:">
        <el-input v-model="form.phone" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="关联信息:">
        <el-input v-model="form.related_info"></el-input>
      </el-form-item>
      <el-form-item label="预警状态:">
        <el-input v-model="form.warning_status"></el-input>
      </el-form-item>
      <el-form-item label="入库时间:">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.storage_time"
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
      </el-form-item>
      <el-form-item label="下发时间:">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.release_time"
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
      </el-form-item>
      <el-form-item label="预警级别:">
        <el-radio-group v-model="form.lelver">
          <el-radio label="1">高危</el-radio>
          <el-radio label="2">高</el-radio>
          <el-radio label="3">中</el-radio>
          <el-radio label="4">低</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否见面:">
        <el-radio-group v-model="form.is_meet">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否被骗:">
        <el-radio-group v-model="form.is_deceived">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否照相:">
        <el-radio-group v-model="form.is_phone">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="$emit('addClick', form)"
        >添 加</el-button
      >
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
        remark: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    }
  }
};
</script>

<style>
</style>