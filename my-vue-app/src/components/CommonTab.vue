<script setup>

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAllDataStore } from '@/stores'
import path from 'path'

const store = useAllDataStore()
const route = useRoute()
const router = useRouter()

// const tags = computed(() => {
//     //这个在下面配置
//     return store.state.tags
// })
const tags = ref([
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home',
    }
])

const changeMenu = (tag) => {
    //单击tab时，联动面包屑
    store.selectMenu(tag)
    //跳转对应页面
    router.push(tag.name)
}

//关闭tab时触发
const handleClose = (tag, index) => {

}

</script>

<template>
    <div class="tags">
        <!--closable是否有关闭按钮,hoem标签不能关闭所以为false
			effect主题，找到当前路由对应的tab，设置'dark'高亮主题
		-->
        <el-tag :key="tag.name" v-for="(tag, index) in tags" :closable="tag.name !== 'home'"
            :effect="route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)"
            @close="handleClose(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<style lang="less" scoped>
.tags {
    margin: 20px 0 0 20px;
}

.el-tag {
    margin-right: 10px;
}
</style>