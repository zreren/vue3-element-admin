const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/logs/list.vue')
export default [
  {
    path: '/business',
    component: Layout,
    name: 'log',
    meta: {
      title: '操作日志',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '/logList',
        name: 'logList',
        component: List,
        meta: {
          title: '日志',
        },
      },
    ],
  },
]
