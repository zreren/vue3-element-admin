<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-09-18 18:10:39
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="任务名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="商家ID">
      <el-input v-model="form.merchantId" />
    </el-form-item>
    <el-form-item label="任务平台">
      <el-select v-model="form.platform" placeholder="please select your zone">
        <el-option label="美团" value="0" />
        <el-option label="饿了么" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否需要评价">
      <el-select v-model="form.comment" placeholder="please select your zone">
        <el-option label="是" value="0" />
        <el-option label="否" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="任务总数">
      <el-input v-model="form.amount" />
    </el-form-item>
    <el-form-item label="非会员返现">
      <el-input v-model="form.minConsumptionA" />
      <el-input v-model="form.rebateA" />
    </el-form-item>
    <el-form-item label="会员返现">
      <el-input v-model="form.minConsumptionB" />
      <el-input v-model="form.rebateB" />
    </el-form-item>
    <el-form-item label="任务要求">
      <el-input v-model="form.requirement" />
    </el-form-item>
    <el-form-item label="任务备注">
      <el-input v-model="form.remark" />
    </el-form-item>
    <el-form-item label="是否启用">
      <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      roles: ['11', '311'],
      treeData: [
        {
          id: '1',
          label: '一级 1',
          children: [
            {
              id: '11',
              label: '二级 1-1',
              children: [
                {
                  id: '111',
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          id: '2',
          label: '一级 2',
          children: [
            {
              id: '21',
              label: '二级 2-1',
              children: [
                {
                  id: '211',
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              id: '22',
              label: '二级 2-2',
              children: [
                {
                  id: '221',
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          id: '3',
          label: '一级 3',
          children: [
            {
              id: '31',
              label: '二级 3-1',
              children: [
                {
                  id: '311',
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              id: '32',
              label: '二级 3-2',
              children: [
                {
                  id: '321',
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      treeProps: {
        props: {
          children: 'children',
          label: 'label',
        },
      },
      handleChange(v) {
        console.log('你选择了:', v)
      },
    })
    let form = reactive({
      name: '',
      merchantId: '',
      type: 0,
      platform: 0,
      comment: 0,
      amount: 0,
      minConsumptionA: 0,
      minConsumptionB: 0,
      rebateA: 0,
      rebateB: 0,
      requirement: '',
      remark: '',
      status: 1,
      desc: '',
    })

    const onSubmit = () => {
      console.log('submit!')
    }
    onMounted(() => {
      form.platform = String(0)
      form.comment = String(0)
    })
    return {
      form,
      onSubmit,
    }
  },
})
</script>
