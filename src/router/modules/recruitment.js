const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/recruitment/list.vue')
export default [
  {
    path: '/recruitment',
    component: Layout,
    name: 'recruitment',
    meta: {
      title: '商家入驻',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '/recruitment',
        name: 'recruitment',
        component: List,
        meta: {
          title: '商家入驻',
        },
      },
    ],
  },
]
