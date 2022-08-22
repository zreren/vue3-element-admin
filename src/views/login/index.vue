<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-11-15 09:48:29
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="login">
    <el-form
      class="form"
      :model="state.model"
      :rules="state.rules"
      ref="loginForm"
    >
      <h1 class="title">Vue3 Element Admin</h1>
      <el-form-item prop="email">
        <el-input
          class="text"
          v-model="state.model.email"
          prefix-icon="el-icon-user-solid"
          clearable
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="text"
          v-model="state.model.password"
          prefix-icon="el-icon-lock"
          show-password
          clearable
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item>
        <img :src="validateSrc" alt="" />
        <el-input
          class="text"
          v-model="state.model.checkCode"
          prefix-icon="el-icon-lock"
          clearable
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="state.loading"
          type="primary"
          class="btn"
          @click="state.submit"
        >
          {{ state.btnText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  ref,
  computed,
  onMounted,
} from 'vue'
import { Login, getCodeGen } from '@/api/login'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
onMounted(async () => {
  const res = await getCodeGen()
  console.log(res)
  let imgUrl =
    'data:image/png;base64,' +
    btoa(
      new Uint8Array(res).reduce(
        (res, byte) => res + String.fromCharCode(byte),
        ''
      )
    )
  validateSrc.value = imgUrl
  console.log(validateSrc.value)
})
const { proxy: ctx } = getCurrentInstance() // 可以把ctx当成vue2中的this
const store = useStore()
const router = useRouter()
const route = useRoute()
const validateSrc = ref()
const loginForm = ref()
const state = reactive({
  model: {
    email: 'mzy@mzy.com',
    password: '1234',
    checkCode: '1234',
  },
  rules: {
    email: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        min: 4,
        max: 12,
        message: '长度在 6 到 12 个字符',
        trigger: 'blur',
      },
    ],
  },
  loading: false,
  btnText: computed(() => (state.loading ? '登录中...' : '登录')),

  submit: () => {
    console.log('submit!')
    if (state.loading) {
      return
    }
    loginForm.value.validate(async valid => {
      if (valid) {
        state.loading = true
        const { code, data, message } = await Login(state.model)
        if (+code === 1) {
          ctx.$message.success({
            message: '登录成功',
            duration: 1000,
          })

          const targetPath = decodeURIComponent(route.query.redirect)
          if (targetPath.startsWith('http')) {
            // 如果是一个url地址
            window.location.href = targetPath
          } else if (targetPath.startsWith('/')) {
            // 如果是内部路由地址
            router.push(targetPath)
          } else {
            router.push('/')
          }

          store.dispatch('app/setToken', data)
        } else {
          ctx.$message.error(message)
        }
        state.loading = false
      }
    })
  },
})
</script>

<style lang="scss" scoped>
.login {
  transition: transform 1s;
  transform: scale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3a4b;

  .form {
    width: 520px;
    max-width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin: 160px auto 0;

    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }

    .text {
      font-size: 16px;

      :deep(.el-input__inner) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        color: #fff;
        height: 48px;
        line-height: 48px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .btn {
      width: 100%;
    }
  }
}
</style>
