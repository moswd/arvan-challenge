<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { faker } from '@faker-js/faker'
import useVuelidate from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'
import { User } from '@models/user.model'
import { useUserStore } from '@store/user'
import { useRegister } from '@composables/user.composable'
import AuthLayout from '@layouts/AuthLayout.vue'
import BaseInput from '@components/base/BaseInput.vue'
import BaseButton from '@components/base/BaseButton.vue'

const router = useRouter()

const { setCreds } = $(useUserStore())

const creds = reactive({
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: '12345678'
})

const credsRules = {
  email: { required, emailValidator },
  username: { required },
  password: { required }
}

const validator = $(useVuelidate(credsRules, creds))

const emailErrors = $computed(() => validator.email.$errors.map((err) => err.$message))
const usernameErrors = $computed(() => validator.username.$errors.map((err) => err.$message))
const passwordErrors = $computed(() => validator.password.$errors.map((err) => err.$message))

const { attempt: register, loading: inProcess, data } = $(useRegister())

async function submit() {
  const credsValid = await validator.$validate()
  if (!credsValid) return

  try {
    await register({
      user: {
        email: creds.email,
        username: creds.username,
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
    <h1 class="text-center text-4xl font-light mt-2 mb-8 text-gray-500">Register</h1>

    <base-input
      id="email"
      v-model="creds.email"
      type="email"
      label="Email"
      :errors="(emailErrors as string[])"
    ></base-input>

    <base-input
      id="username"
      v-model="creds.username"
      type="text"
      label="Username"
      container-classes="mt-4"
      :errors="(usernameErrors as string[])"
    ></base-input>

    <base-input
      id="password"
      v-model="creds.password"
      type="password"
      label="Password"
      container-classes="mt-4"
      :errors="(passwordErrors as string[])"
    ></base-input>

    <base-button class="mt-4 w-full" :loading="inProcess" :disabled="inProcess" @click="submit">Register</base-button>

    <p class="mt-4 text-sm text-gray-600">
      Already registered?
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </p>
  </auth-layout>
</template>
