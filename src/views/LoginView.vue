<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useUserStore } from '@store/user'
import { useLogin } from '@composables/user.composable'
import { User } from '@models/user.model'
import AuthLayout from '@layouts/AuthLayout.vue'
import BaseInput from '@components/base/BaseInput.vue'
import BaseButton from '@components/base/BaseButton.vue'

const router = useRouter()

const { setCreds } = $(useUserStore())

const creds = reactive({
  email: '',
  password: ''
})

const credsRules = {
  email: { required, email },
  password: { required }
}

const validator = $(useVuelidate(credsRules, creds))

const emailErrors = $computed(() => validator.email.$errors.map((err) => err.$message))
const passwordErrors = $computed(() => validator.password.$errors.map((err) => err.$message))

const { attempt: login, loading: inProcess, data } = $(useLogin())

async function submit() {
  const credsValid = await validator.$validate()
  if (!credsValid) return

  try {
    await login({
      user: {
        email: creds.email,
        password: creds.password
      }
    })

    setCreds(data as User)

    router.push({ name: 'Dashboard' })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <auth-layout>
    <h1 class="text-center text-4xl font-light mt-2 mb-8 text-gray-500">Login</h1>

    <base-input
      id="email"
      v-model="creds.email"
      type="email"
      label="Email"
      :errors="(emailErrors as string[])"
    ></base-input>

    <base-input
      id="password"
      v-model="creds.password"
      type="password"
      label="Password"
      container-classes="mt-4"
      :errors="(passwordErrors as string[])"
    ></base-input>

    <base-button class="mt-4 w-full" :loading="inProcess" :disabled="inProcess" @click="submit">Login</base-button>

    <p class="mt-4 text-sm text-gray-600">
      Don't have an account?
      <router-link :to="{ name: 'Register' }">Register Now!</router-link>
    </p>
  </auth-layout>
</template>
