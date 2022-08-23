const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/config/config.vue')
export default [
  {
    path: '/config',
    component: Layout,
    name: 'config',
    meta: {
      title: '配置中心',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: 'config',
        component: List,
        meta: {
          title: '配置列表',
        },
      },
    ],
  },
]
