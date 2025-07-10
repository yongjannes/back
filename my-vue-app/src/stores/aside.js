import { defineStore } from 'pinia'
import { ref } from 'vue'

//初始化state数据，这里我们使用一个函数来返回
function initState() {
    return {
        isCollapse: false,
        //tags固定有一个home标签
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null
    }
}
//第一个参数要求是一个独一无二的名字
//第二个参数可接受两类值：Setup 函数或 Option 对象。
export const useAllDataStore = defineStore('allData', () => {
    //在 Setup Store 中：
    //ref() 就是 state 属性
    //computed() 就是 getters
    //function() 就是 actions	
    const isCollapse = ref(initState().isCollapse)
    const tags = ref(initState().tags)

    //在之前定义的selectMenu方法中
    function selectMenu(val) {
        if (val.name == 'home') {
            this.currentMenu = null
        } else {
            this.currentMenu = val

            //这里添加如果点击的不是home时，先找一下tags中是否存在点击的菜单
            let index = this.tags.findIndex(item => item.name === val.name)
            //如果不存在则添加到tags中
            index === -1 ? this.tags.push(val) : ""
        }
    }

    function updateTags(tag) {
        //找到要删除的tab索引，使用splice方法删除
        let index = this.tags.findIndex(item => item.name === tag.name)
        this.tags.splice(index, 1)
    }


    //需要把所有定义的state，getters，actions返回出去
    return {
        isCollapse,
        tags,
        selectMenu,
        updateTags

    }
}, {
    persist: true
})