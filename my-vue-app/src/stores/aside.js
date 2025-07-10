import { defineStore } from 'pinia'
import { ref } from 'vue'
import { watch } from 'vue'
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
        currentMenu: null,
        menuList: [],
        token: "",
        routeList: []
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
    const routeList = ref(initState().routeList)
    const currentMenu = ref(initState().currentMenu);
    const menuList = ref(initState().menuList);
    const token = ref(initState().token);


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

    function updateMenuList(val) {
        this.menuList = val
    }

    function addMenu(router, type = '') {
        // 确保有router实例
        if (!router) {
            console.error('Router instance is required');
            return;
        }

        // 从localStorage恢复数据（如果是刷新）
        if (type === "refresh") {
            const savedData = JSON.parse(localStorage.getItem('store') || '{}');
            this.menuList = savedData.menuList || [];
        }

        // 检查menuList
        if (!Array.isArray(this.menuList) || this.menuList.length === 0) {
            console.warn('menuList为空或不是数组', this.menuList);
            return;
        }

        // 动态加载组件
        const modules = import.meta.glob('../views/**/*.vue');

        // 添加路由
        this.menuList.forEach(item => {
            if (item.children) {
                item.children.forEach(child => {
                    if (child.url) {
                        router.addRoute('main', {
                            path: child.path,
                            name: child.name,
                            component: modules[`../views/${child.url}.vue`]
                        });
                    }
                });
            } else if (item.url) {
                router.addRoute('main', {
                    path: item.path,
                    name: item.name,
                    component: modules[`../views/${item.url}.vue`]
                });
            }
        });

        // 确保/home路由存在
        if (!router.hasRoute('home')) {
            router.addRoute({
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home.vue')
            });
        }
    }

    // 监听所有需要持久化的状态
    watch(
        [isCollapse, tags, currentMenu, menuList, token, routeList],
        () => {
            const storeData = {
                isCollapse: isCollapse.value,
                tags: tags.value,
                currentMenu: currentMenu.value,
                menuList: menuList.value,
                token: token.value,
                routeList: routeList.value
            };
            localStorage.setItem('store', JSON.stringify(storeData));
        },
        { deep: true }
    );

    function clearn() {
        // 安全处理 routeList
        const routesToRemove = Array.isArray(this.routeList) ? this.routeList : [];

        // 执行所有路由删除方法
        routesToRemove.forEach(removeRoute => {
            try {
                typeof removeRoute === 'function' && removeRoute();
            } catch (e) {
                console.error('Error removing route:', e);
            }
        });

        // 重置所有状态
        this.isCollapse = initState().isCollapse;
        this.tags = [...initState().tags]; // 新数组避免引用问题
        this.currentMenu = initState().currentMenu;
        this.menuList = [...initState().menuList];
        this.token = initState().token;
        this.routeList = [...initState().routeList];

        // 清理本地存储
        localStorage.removeItem('store');
    }






    //需要把所有定义的state，getters，actions返回出去
    return {
        isCollapse,
        tags,
        selectMenu,
        updateTags,
        updateMenuList,
        addMenu,
        clearn

    }
}, {
    persist: true
})