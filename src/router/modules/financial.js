const Layout = () => import('@/layout/index.vue')
const Cash = () => import('@/views/financial/list.vue')

const List = () => import('@/views/financial/recharge.vue')
export default [
  {
    path: '/financial',
    component: Layout,
    name: 'financial',
    meta: {
      title: '财务中心',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: 'financial',
        component: Cash,
        meta: {
          title: '提现管理',
        },
      },
      {
        path: '/recharge',
        name: 'recharge',
        component: List,
        meta: {
          title: '充值管理',
        },
      },
    ],
  },
]
