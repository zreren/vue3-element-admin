const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/task/list.vue')
const Add = () => import('@/views/task/add.vue')
export default [
  {
    path: '/task',
    component: Layout,
    name: 'task',
    meta: {
      title: '任务中心',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '/task',
        name: 'task',
        component: List,
        meta: {
          title: '任务中心',
        },
      },
      {
        path: '/task/add',
        name: 'taskadd',
        component: Add,
        meta: {
          title: '添加',
        },
        hidden: true, // 不在菜单中显示
      },
    ],
  },
]
