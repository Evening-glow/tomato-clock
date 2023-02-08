<template>
    <div class="activity">
        <el-table :stripe="true" :data="activityList" width="300" ref="multipleTable" border height="80vh"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" type="index" width="55"></el-table-column>
            <el-table-column min-width="200" prop="thing" label="ACTIVITY INVENTORY(活动清单)" header-align="center">
            </el-table-column>
            <el-table-column label="番茄数" header-align="center">
                <template slot-scope="scope">
                    <span v-for="tomato,index in scope.row.tomatoes" :key="index" class="tomato grow"></span>
                    <el-button size="mini" type="primary" @click="addTodoTomatoes(scope.$index)">guess +</el-button>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    <span>{{scope.row.remarks ? scope.row.remarks : ''}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!--添加活动清单，并添加备注-->
        <el-dialog title="添加活动事项" :visible.sync="dialogFormVisible" :before-close="clearForm">
            <el-form :model="activityObj" ref="dialogForm" :rules="rules">
                <el-form-item label="活动安排:" prop="thing">
                    <el-input v-model.tirm="activityObj.thing" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remarks">
                    <el-input v-model.trim="activityObj.remarks" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="quitDialog">取 消</el-button>
                <el-button type="primary" @click="addActivityItem">确 定</el-button>
            </div>
        </el-dialog>
        <div class="btns">
            <el-button @click="changeAllTodoList" type="success">建立今日待办</el-button>
            <el-button @click="showDialog" type="success">添加活动清单</el-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    components: {},
    data() {
        return {
            tempTodoList: [],
            activityObj: {
                remarks: '',
                thing: ''
            },
            rules: {
                thing: [{
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('清单内容不能为空'));
                        } else {
                            callback();
                        }
                    }, trigger: 'blur'
                }]
            },
            dialogFormVisible: false
        }
    },
    computed: {
        ...mapState('list', ['activityList'])
    },
    methods: {
        ...mapActions('list', ['changeTodoList', 'addActivityList', 'changeActivityTomatoes']),
        handleSelectionChange(newList) {
            this.tempTodoList = newList;
        },
        changeAllTodoList() {
            if (this.tempTodoList.length > 0) {
                this.changeTodoList(this.tempTodoList)
            } else {
                this.$message({ message: '待办列表不能为空，至少要选中一项', type: 'error' })
            }
        },
        showDialog() {
            //弹出填写信息框
            this.dialogFormVisible = true;
        },
        quitDialog() {
            this.clearForm();
        },
        addActivityItem() {
            this.addActivityList(this.activityObj)
            this.clearForm();
        },
        //关闭弹窗前的回调
        clearForm() {
            this.$refs.dialogForm.resetFields();
            this.$refs.dialogForm.clearValidate()
            this.dialogFormVisible = false;
        },
        //按钮添加list tomato
        addTodoTomatoes(id) {
            this.changeActivityTomatoes(id);
        }
    },
    mounted() { }
}
</script>
<style lang="less">
.btns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
    margin-left: 1rem;
}

.tomato {
    display: inline-block;
    width: 50./@vw;
    height: 50./@vw;
    background-size: cover;
    background-position: center;
}

.grow {
    background-image: url('../assets/hollow.png');
}
</style>