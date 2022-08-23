<template>
  <pro-table
    ref="table"
    title="日志记录"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" icon="el-icon-delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/test/add')"
      >
        添加一条
      </el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #avatar="{ row }">
      <img class="avatar" :src="`/photo/${row.pic}`" />
    </template>
    <template #operate="scope">
      <el-button
        size="mini"
        type="primary"
        @click="$router.push(`/test/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button size="mini" type="danger" @click="deleteUserFn(scope.row.id)">
        删除
      </el-button>
    </template>
    <template #status="{ row }">
      <el-switch
        v-model="row.status"
        :active-value="1"
        :inactive-value="0"
        @change="changeStatus(row)"
      />
    </template>
  </pro-table>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { getTaskPage, putStatus } from '../../api/task'
import { param } from '../../utils'
export default defineComponent({
  name: 'task',
  setup() {
    const statusTable = {
      0: '普通',
      1: '会员',
    }
    const platformTable = {
      0: '美团',
      1: '饿了么',
    }
    // adminId: "8"
    // adminName: "mzy"
    // content: "管理员”null“删除了1用户"
    // createTime: "2022-08-22 08:45:46"
    // id: "16399"
    // name: "删除用户"
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection' },
        { label: '序号', type: 'index', props: 'id' },
        { label: '商家id', prop: 'merchantId', width: 100 },
        { label: '商家id', prop: 'merchantName', width: 100 },
        { label: '任务名称', prop: 'name', width: 150 },
        { label: '非会员最低', prop: 'minConsumptionA', width: 100 },
        { label: '非会员返现', prop: 'rebateB', width: 100 },
        { label: '会员最低', prop: 'minConsumptionB', width: 150 },
        { label: '会员返现', prop: 'rebateA', width: 100 },
        { label: '类型', prop: 'type', width: 100 },
        { label: '平台', prop: 'platform', width: 100 },
        { label: '备注', prop: 'remark', width: 100 },
        { label: '要求', prop: 'requirement', width: 200 },
        { label: '任务总数', prop: 'amount' },
        { label: '任务剩余', prop: 'taskLeft' },
        { label: 'completed', prop: 'completed' },
        { label: 'status', prop: 'status', tdSlot: 'status' },

        {
          label: '操作',
          width: 220,
          align: 'center',
          tdSlot: 'operate', // 自定义单元格内容的插槽名称
        },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: '90px', // 必须带上单位
        inputWidth: '360px', // 必须带上单位
        fields: [
          {
            type: 'text',
            label: '任务名称',
            name: 'name',
            defaultValue: 'abc',
          },
          {
            type: 'text',
            label: '商家名称',
            name: 'merchantName',
            defaultValue: 'abc',
          },
          {
            label: '状态',
            name: 'status',
            type: 'select',
            defaultValue: 1,
            options: [
              {
                name: '启用',
                value: 1,
              },
              {
                name: '禁用',
                value: 0,
              },
            ],
          },
          // {
          //     label: '性别',
          //     name: 'sex',
          //     type: 'radio',
          //     options: [
          //         {
          //             name: '男',
          //             value: 1,
          //         },
          //         {
          //             name: '女',
          //             value: 0,
          //         },
          //     ],
          // },
          // {
          //     label: '城市',
          //     name: 'city',
          //     type: 'radio-button',
          //     options: [
          //         {
          //             name: '北京',
          //             value: 'bj',
          //         },
          //         {
          //             name: '上海',
          //             value: 'sh',
          //         },
          //         {
          //             name: '广州',
          //             value: 'gz',
          //         },
          //         {
          //             name: '深圳',
          //             value: 'sz',
          //         },
          //     ],
          // },
          // {
          //     label: '爱好',
          //     name: 'hobby',
          //     type: 'checkbox',
          //     defaultValue: ['吃饭'],
          //     options: [
          //         {
          //             name: '吃饭',
          //             value: '吃饭',
          //         },
          //         {
          //             name: '睡觉',
          //             value: '睡觉',
          //         },
          //         {
          //             name: '打豆豆',
          //             value: '打豆豆',
          //         },
          //     ],
          //     // transform: (val) => val.join(","),
          // },
          // {
          //     label: '水果',
          //     name: 'fruit',
          //     type: 'checkbox-button',
          //     options: [
          //         {
          //             name: '苹果',
          //             value: '苹果',
          //         },
          //         {
          //             name: '香蕉',
          //             value: '香蕉',
          //         },
          //         {
          //             name: '橘子',
          //             value: '橘子',
          //         },
          //         {
          //             name: '葡萄',
          //             value: '葡萄',
          //         },
          //     ],
          //     transform: val => val.join(','),
          // },
          // {
          //     label: '日期',
          //     name: 'date',
          //     type: 'date',
          // },
          // {
          //     label: '时间',
          //     name: 'datetime',
          //     type: 'datetime',
          //     defaultValue: '2020-10-10 8:00:00',
          // },
          // {
          //     label: '日期范围',
          //     name: 'daterange',
          //     type: 'daterange',
          //     trueNames: ['startDate', 'endDate'],
          // },
          {
            label: '时间范围',
            name: 'datetimerange',
            type: 'datetimerange',
            trueNames: ['startTime', 'endTime'],
            style: { width: '360px' },
            defaultValue: ['2020-10-10 9:00:00', '2020-10-11 18:30:00'],
          },
          // {
          //     label: '数量',
          //     name: 'num',
          //     type: 'number',
          //     min: 0,
          //     max: 10,
          // },
        ],
      },
      // 分页配置
      paginationConfig: {
        layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
        pageSize: 10, // 每页条数
        pageSizes: [5, 10, 20, 50],
        style: { textAlign: 'left' },
      },
      selectedItems: [],
      indexMethod(row, column, cellValue, index) {
        return index * 3
      },
      batchDelete() {
        console.log(state.selectedItems)
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      // 请求函数
      async getList(params) {
        console.log(params, 'params')
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await getTaskPage({
          offset: params.current,
          limit: params.size,
        })
        // new Promise(rs => {
        //   setTimeout(() => {
        //     rs({
        //       code: 200,
        //       data: {
        //         list: [
        //           {
        //             id: 1,
        //             nickName: 'zhangsan',
        //             userEmail: 'zhangsan@xx.com',
        //           },
        //           {
        //             id: 2,
        //             nickName: 'lisi',
        //             userEmail: 'lisi@xx.com',
        //           },
        //         ],
        //         total: 100,
        //       },
        //     })
        //   }, 3000)
        // })

        // 必须要返回一个对象，包含data数组和total总数
        return {
          data: data,
          total: +data.total,
        }
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }
    const deleteUserFn = async id => {
      // const res = await deleteMerchant({ id: id })
    }
    const changeStatus = async val => {
      console.log(val)
      if (val.status == 1) {
        putStatus({
          id: val.id,
          status: 1,
          merchantId: val.merchantId,
          name: val.name,
          type: val.type,
          platform: val.platform,
          comment: val.comment,
          amount: val.amount,
          minConsumptionA: val.minConsumptionA,
          rebateA: val.rebateA,
          minConsumptionB: val.minConsumptionB,
          rebateB: val.rebateB,
          requirement: val.requirement,
          remark: val.remark,
        })
      } else if (val.status == 0) {
        putStatus({
          id: val.id,
          status: 0,
          merchantId: val.merchantId,
          name: val.name,
          type: val.type,
          platform: val.platform,
          comment: val.comment,
          amount: val.amount,
          minConsumptionA: val.minConsumptionA,
          rebateA: val.rebateA,
          minConsumptionB: val.minConsumptionB,
          rebateB: val.rebateB,
          requirement: val.requirement,
          remark: val.remark,
        })
      }
    }
    onMounted(async () => {
      // toRefs(state)
      // getOrdersPage({
      //   offset: 1,
      //   limit: 10,
      //   status: '9',
      // })
    })
    return {
      ...toRefs(state),
      refresh,
      table,
      statusTable,
      platformTable,
      deleteUserFn,
      changeStatus,
    }
  },
})
</script>
<style lang="scss" scoped>
.avatar {
  width: 40px;
  height: 40px;
}
</style>
