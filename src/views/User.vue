<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary">添加</el-button>
                    <el-button type="danger">删除</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                listDaa : [
                    {

                    }
                ]
            }
        },
        created() {
        },
        methods : {

        }
    }
</script>

<style scoped>

</style>
