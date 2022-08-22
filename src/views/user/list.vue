<template>
  <pro-table
    ref="table"
    title="用户列表"
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
    <template #grade="{ row }">
      {{ statusTable[row.grade] }}
    </template>
    <template #avatar="{ row }">
      <img class="avatar" :src="`/photo/${row.avatar}`" />
    </template>
    <template #upId="{ row }">
      {{ row.upId ? row.upId : '暂无上级' }}
    </template>
    <template #downId="{ row }">
      {{ row.downId ? row.downId : '暂无下级' }}
    </template>
    <template #platform="{ row }">
      {{ platformTable[row.platform] }}
    </template>
    <template #operate="scope">
      <el-button
        size="mini"
        type="primary"
        @click="$router.push(`/test/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button size="mini" type="danger" @click="blockUserFn(scope.row.id)">
        封号
      </el-button>
      <el-button size="mini" type="danger" @click="deleteUserFn(scope.row.id)">
        删除
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { getUsersPage, deleteUser } from '../../api/user'
import { param } from '../../utils'
export default defineComponent({
  name: 'userList',
  setup() {
    const statusTable = {
      0: '普通',
      1: '会员',
    }
    const platformTable = {
      0: '美团',
      1: '饿了么',
    }
    // aliPayId: "123"
    // aliPayName: "123"
    // avatar: "123"
    // cashableAmount: 123.12
    // createTime: "2022-08-22 10:20:47"
    // downId: "123"
    // grade: 123
    // id: "521"
    // membershipExpTime: "2022-08-09 14:07:54"
    // name: "234"
    // password: "456323"
    // savedAmount: 123
    // tel: "123"
    // upId: "123"
    // updateTime: "2022-08-22 10:20:47"
    // withdrawnAmount: 123
    // wxId: "123"
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { type: 'selection' },
        { label: '序号', type: 'index', props: 'id' },
        { label: '名称', prop: 'name' },
        { label: '头像', prop: 'avatar', tdSlot: 'avatar' },
        { label: '手机号', prop: 'tel', width: 150 },
        { label: '剩余金额', prop: 'cashableAmount' },
        { label: '邀请码', prop: 'downId', tdSlot: 'downId' },
        { label: '已省金额', prop: 'savedAmount' },
        { label: '已提现', prop: 'withdrawnAmount' },
        {
          label: '会员状态',
          prop: 'grade',
          tdSlot: 'grade',
          sortable: true,
          width: 120,
        },
        { label: '上级id', prop: 'upId', tdSlot: 'upId' },
        { label: '微信id', prop: 'wxId' },
        { label: '注册时间', prop: 'createTime' },
        { label: '更新时间', prop: 'updateTime' },
        { label: '会员过期时间', prop: 'membershipExpTime', width: 150 },
        { label: '阿里id', prop: 'aliPayId' },
        { label: '支付宝', prop: 'aliPayName' },

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
            label: '用户id',
            name: 'nickName',
            defaultValue: 'abc',
          },
          {
            type: 'text',
            label: '用户手机号',
            name: 'description',
          },
          {
            label: '会员状态',
            name: 'status',
            type: 'select',
            defaultValue: 1,
            options: [
              {
                name: '会员',
                value: 1,
              },
              {
                name: '普通',
                value: 0,
              },
            ],
          },
          {
            label: '性别',
            name: 'sex',
            type: 'radio',
            options: [
              {
                name: '男',
                value: 1,
              },
              {
                name: '女',
                value: 0,
              },
            ],
          },
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
        const { data } = await getUsersPage({
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
          data: data.records,
          total: +data.total,
        }
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }
    const deleteUserFn = async id => {
      const res = await deleteUser({ id: id })
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
