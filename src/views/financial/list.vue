<template>
  <el-dialog v-model="dialogFormVisible" title="拒绝提现请求">
    <el-input v-model="rejectReson" placeholder="Please input" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="reject">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <pro-table
    ref="table"
    title="提现管理"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <!-- <template #toolbar>
      <el-button type="primary" icon="el-icon-delete" @click="batchDelete">
        批量删除
      </el-button>
      <el-button type="primary" icon="el-icon-plus" @click="$router.push('/test/add')">
        添加一条
      </el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </template> -->
    <template #avatar="{ row }">
      <img class="avatar" :src="`/photo/${row.pic}`" />
    </template>
    <template #operate="scope">
      <el-button
        size="mini"
        type="plain"
        :disabled="scope.row.status !== 1 ? true : false"
        @click="updateCashRequestFn(scope.row.id)"
      >
        确认转账
      </el-button>
      <el-button
        size="mini"
        type="danger"
        :disabled="scope.row.status !== 1 ? true : false"
        @click="rejectCash(scope.row.id)"
      >
        拒绝转账
      </el-button>
      <!-- <el-button size="mini" type="primary" @click="$router.push(`/test/edit/${scope.row.id}`)">
        编辑
      </el-button> -->
      <el-button size="mini" type="danger" @click="deleteUserFn(scope.row.id)">
        删除
      </el-button>
    </template>
    <template #payType="{ row }">
      {{ payType[row.payType] }}
    </template>

    <template #status="{ row }">
      {{ statusTable[row.status] }}
    </template>
  </pro-table>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import {
  getCashablePageInfo,
  updateCashRequest,
  rejectCashRequest,
} from '../../api/financial'
import { param } from '../../utils'
export default defineComponent({
  name: 'financial',
  setup() {
    const rejectReson = ref('')
    const dialogFormVisible = ref(false)
    const payType = {
      1: '支付宝',
      2: '微信',
    }
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }
    const selectId = ref('')
    // 提现状态（1为待转账，2为已转账，3为已取消）
    const statusTable = {
      1: '待转账',
      2: '已转账',
      3: '已取消',
    }
    const rejectCash = val => {
      dialogFormVisible.value = true
      selectId.value = val
    }
    const reject = async () => {
      dialogFormVisible.value = false
      await rejectCashRequest({
        withdrawReason: rejectReson.value,
        id: selectId.value,
      })
    }
    // adminId: "8"
    // adminName: "mzy"
    // content: "管理员”null“删除了1用户"
    // createTime: "2022-08-22 08:45:46"
    // id: "16399"
    // name: "删除用户"
    const form = reactive({
      name: '',
      region: '',
    })
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection' },
        { label: '序号', type: 'index', prop: 'id' },
        { label: '申请人ID', prop: 'userId', width: 100 },
        { label: '申请人昵称', prop: 'userName', width: 100 },
        { label: '提现金额', prop: 'cashableAmount', width: 100 },
        { label: '支付方式', prop: 'payType', tdSlot: 'payType', width: 150 },
        { label: '支付宝账号', prop: 'aliPayId' },
        { label: '支付宝名字', prop: 'aliPayName' },
        { label: '状态', prop: 'status', tdSlot: 'status', width: 120 },
        { label: '备注', prop: 'withdrawReason' },
        { label: '申请时间', prop: 'createTime' },
        { label: '状态变更时间', prop: 'updateTime' },

        {
          label: '操作',
          width: 400,
          align: 'left',
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
            label: '管理员id',
            name: 'nickName',
            defaultValue: 'abc',
          },
          {
            type: 'text',
            label: '管理员名字',
            name: 'description',
          },
          {
            label: '操作类型',
            name: 'status',
            type: 'select',
            defaultValue: 1,
            options: [
              {
                name: '新增渠道合作',
                value: 1,
              },
              {
                name: '财务',
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
        const { data } = await getCashablePageInfo({
          Page: params.current,
          PageSize: params.size,
          chooseType: 0,
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
          data: data.records,
          total: +data.total,
        }
      },
    })
    const updateCashRequestFn = val => {
      updateCashRequest({
        id: val,
      })
      // refresh()
    }
    const deleteUserFn = async id => {
      // const res = await deleteMerchant({ id: id })
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
      ...toRefs(form),
      rejectReson,
      dialogFormVisible,
      refresh,
      statusTable,
      rejectCash,
      reject,
      selectId,
      deleteUserFn,
      payType,
      updateCashRequestFn,
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
