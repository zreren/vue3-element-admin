const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/business/list.vue')
export default [
  {
    path: '/business',
    component: Layout,
    name: 'business',
    meta: {
      title: '商家管理',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: 'businessList',
        component: List,
        meta: {
          title: '商家列表',
        },
      },
    ],
  },
]
