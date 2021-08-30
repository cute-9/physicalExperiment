<template>
  <div class="zhuye">
    <div class="img">
      <img class="imgs" src="https://z3.ax1x.com/2021/06/30/RDF0RH.png" />
    </div>
    <div class="main">
      <div class="middle">
        <el-table
          :data="tableData"
          :span-method="arraySpanMethod"
          :show-header="showHeader"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" width="140" label="实验（项目）名称">
          </el-table-column>
          <el-table-column prop="name">
             <template slot-scope="scope">
         <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
             <el-select v-model="form.experiment_name" placeholder="请选择实验名称" v-if="scope.row.id == '实验（项目）名称'" style="width：100%;display:block;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
            <!-- </el-form-item> -->
            <div v-if="scope.row.id == '课程名称'">
              <el-input v-model="form.course_name"></el-input>
            </div>
            <div v-if="scope.row.id == '学生专业'">
              <el-input v-model="form.student_spec"></el-input>
            </div>
            <div v-if="scope.row.id == '学生班级'">
              <el-input v-model="form.student_class"></el-input>
            </div>
            <div v-if="scope.row.id == '学生姓名'">
              <el-input v-model="form.student_name"></el-input>
            </div>
            <div v-if="scope.row.id == '指导教师'">
              <el-input v-model="form.student_teacher"></el-input>
            </div>
         </el-form>
          </template>
           </el-table-column>
          <el-table-column prop="amount1" width="140px">
          </el-table-column>
          <el-table-column prop="amount2">
              <template slot-scope="scope">
                 <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
            <div v-if="scope.row.amount1 == '学生层次'">
              <el-input v-model="form.student_level"></el-input>
            </div>
            <div v-if="scope.row.amount1 == '学生年级'">
              <el-input v-model="form.student_year"></el-input>
            </div>
            <div v-if="scope.row.amount1 == '学生学号'">
              <el-input v-model="form.student_num"></el-input>
            </div>
            <div v-if="scope.row.amount1 == '完成日期'">
              <el-input v-model="form.student_date"></el-input>
            </div>
                 </el-form>
          </template>
          </el-table-column>
        
        </el-table>
        <el-form ref="form">
          <el-form-item style="text-align: center">
            <el-button
              class="btn"
              style="text-align: center"
              type="primary"
              @click="login()"
              >进入测试</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        experiment_name:"",
        course_name:"",
        student_spec:"",
        student_class:"",
        student_name:"",
        student_teacher:"",
        student_level:"",
        student_year:"",
        student_num:"",
        student_date:""
      },
      rules:{
          test_name:[
            { required: true, message: '请输入实验（项目）名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
      },
        options: [{
          value: '劈尖测细丝实验',
          label: '劈尖测细丝实验'
        }, {
          value: '电表的改装与校准',
          label: '电表的改装与校准'
        }, {
          value: '外用表改装设计实验',
          label: '外用表改装设计实验'
        },
         {
          value: '箱式直流电桥测量电阻',
          label: '箱式直流电桥测量电阻'
        }
        ],
      showHeader:false,
      checked: "",
      tableData: [{
          id: '实验（项目）名称',
          name: '',
        }, {
          id: '课程名称',
          name: '计算机网络',
          amount1: '学生层次',
          amount2: '本科',
        }, {
          id: '学生专业',
          name: '信息工程',
          amount1: '学生年级',
          amount2: '19级',
        }, {
          id: '学生班级',
          name: '信工一班',
          amount1: '学生学号',
          amount2: '19380220103',
        }, {
          id: '学生姓名',
          name: '甘相东',
          amount1: '完成日期',
          amount2: '2021.08.16',
        }, {
          id: '指导教师',
          name: '李忠政',
        }]
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(async(valide) => {
        const {data:res} = await this.$http.post('api/experiment/student',this.form)
        console.log(res);
        if(res.code == 200) {
          const number = this.form.student_num
          window.sessionStorage.setItem('student_id',res.data[0].id)
          if(this.form.experiment_name=='劈尖测细丝实验'){
          this.$router.push({
            name:'test',
            params: { number }
          });
          }
          else if(this.form.experiment_name=='电表的改装与校准'){
          this.$router.push({
            name:'test1',
            params: { number }
          });
          }
          else if(this.form.experiment_name=='外用表改装设计实验'){
             this.$router.push({
            name:'test2',
            params: { number }
          });
          }
           else if(this.form.experiment_name=='箱式直流电桥测量电阻'){
             this.$router.push({
            name:'test3',
            params: { number }
          });
          }
        }
      });
    },
    // login(){
    //     window.sessionStorage.setItem('student_id',this.form.student_num)
    //       this.$router.push({
    //         name:'logined',
    //         params: { number }
    //       });
    // },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          if (columnIndex === 1) {
            return [1, 3];
          }
        }else if(rowIndex === 5) {
          if (columnIndex === 1) {
            return [1, 3];
          }
        }
      },
  },
};
</script>

<style>
.el-table td, .el-table th{
  padding: 6px 0 !important;
}
.zhuye {
  height: 100%;
  background-color: #dee5f3;
}
.main {
  height: 60%;
  width: 50%;
  min-width: 300px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.middle {
  min-width: 250px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.btn {
  margin-top: 50px !important;
  background-color: #6f8ed3;
  text-align: center;
}
.img {
  height: 50px;
  background-color: #4168c0;
}
.imgs{
  height: 38px;
  padding: 6px 0 6px 10px;
}
</style>