<template>
    <el-row class="home">
        <el-col :span="8">
            <el-card shadow="hover" style="height:290px">
                <div class="user">
                    <img :src="userImg" height="268" width="268"/>
                    <div class="userInfo">
                        <p class="name">引路者</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2020-07-29 23:03</span></p>
                    <p>上次登录地址：<span>192.168.3.108</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="height:615px;margin-top:10px"><!--右键检查左边的高度 - 290px - 内边距的40px - margin-top:10px m-->
                最新数据
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card shadow="hover" v-for="(item,index) in countData" :key="index">
                    <i :class="`${item.icon}`"></i><!--可以拼接字符串-->
                    <div class="detail">
                        <p :style="{'color':item.color,fontSize:'30px'}">{{item.value}}</p>
                        <p :style="{'color':`${item.color}`}">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card shadow="hover">
                <div style="height:280px">它有个内边距,上20px下20px，所以总高度要减去40px</div>
            </el-card>
            <div class="graph">
                <el-card shadow="hover">
                    <div style="height:260px">左边</div>
                </el-card>
                <el-card shadow="hover">
                    <div style="height:260px">右边</div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name : "Welcome",
        mounted(){

        },
        data(){
            return {
                userImg : require('../assets/logo.jpg'),//显示默认的图片
                countData : [
                    {
                        name : '楼层数量',
                        value : '1250',
                        icon : 'el-icon-price-tag',
                        color : '#0ed8ea'
                    },
                    {
                        name : '摄像头数量',
                        value : '120',
                        icon : 'el-icon-star-off',
                        color : '#28801d'
                    },
                    {
                        name : '已损坏个数',
                        value : '100',
                        icon : 'el-icon-baseball',
                        color : '#181d78'
                    },
                    {
                        name : '货位数量',
                        value : '1520',
                        icon : 'el-icon-refrigerator',
                        color : '#417dd7'
                    },
                    {
                        name : '空位数量',
                        value : '80',
                        icon : 'el-icon-orange',
                        color : '#117979'
                    },
                    {
                        name : '已满货位',
                        value : '850',
                        icon : 'el-icon-ice-tea',
                        color : '#175e0e'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    @import "../assets/css/home.css";
</style>
