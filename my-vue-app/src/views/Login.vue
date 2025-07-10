<script setup>

import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores'

const { proxy } = getCurrentInstance();
const router = useRouter()
const loginForm = reactive({
    username: 'admin',
    password: 'admin',
});
const store = useAllDataStore()
const login = async () => {
    try {
        const res = await proxy.$api.getMenu(loginForm);
        console.log('API Response:', res); // 调试用

        // 检查数据结构
        const menuData = res.data?.data?.menuList || res.data?.menuList;
        if (!Array.isArray(menuData)) {
            throw new Error('菜单数据格式错误，应为数组');
        }

        // 确保token存在
        const token = res.data?.data?.token || res.data?.token;
        if (!token) {
            throw new Error('未获取到token');
        }

        // 更新store
        store.updateMenuList(menuData);
        store.token = token;

        // 添加路由
        await store.addMenu(router);

        // 跳转到首页
        router.push("/home");
    } catch (error) {
        console.error('登录失败:', error);
        // 这里可以添加用户提示，如ElMessage
        ElMessage.error(error.message || '登录失败');
    }
}
</script>


<template>
    <el-form :model="loginForm" class="login-container">
        <h3>系统登录</h3>

        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="login"> 登录 </el-button>
        </el-form-item>

    </el-form>

</template>

<style lang="less" scoped>
.login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;

    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }

    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>