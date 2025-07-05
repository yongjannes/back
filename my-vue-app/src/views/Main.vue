<template>
    <div>
        我是main组件
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-icon :size="size" :color="color">
            <Edit />
        </el-icon>
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped></style>