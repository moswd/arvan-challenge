<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useUserStore } from '@store/user'
import { useLogin } from '@composables/user.composable'
import { User } from '@models/user.model'
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

const validator = useVuelidate(credsRules, creds)

const emailErrors = $computed(() =>
  validator.value.email.$error
    ? validator.value.email.$errors.map((err) => err.$message)
    : []
)

const passwordErrors = $computed(() =>
  validator.value.password.$error
    ? validator.value.password.$errors.map((err) => err.$message)
    : []
)

const { attempt: login, loading: inProcess, data } = $(useLogin()) // TODO: either use login or signin / register signup

async function submit() {
  if (inProcess) return // double check

  const credsValid = await validator.value.$validate()
  if (!credsValid) return

  try {
    await login({
      user: {
        email: creds.email,
        password: creds.password
      }
    })

    setCreds(data as User) // TODO: why convert to User?

    router.push({ name: 'Dashboard' })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto min-h-screen flex justify-center items-center">
    <div class="w-full p-6 bg-gray-50 rounded-lg shadow border border-gray-100">
      <h1 class="text-center text-4xl mt-4 mb-8 text-gray-500">Login</h1>

      <base-input
        id="email"
        v-model="creds.email"
        type="email"
        label="Email"
        :errors="(emailErrors as string[])"
      ></base-input>
      <!-- TODO: why errors should be converted? -->

      <base-input
        id="password"
        v-model="creds.password"
        type="password"
        label="Password"
        container-classes="mt-4"
        :errors="(passwordErrors as string[])"
      ></base-input>

      <base-button
        class="mt-4 w-full"
        :loading="inProcess"
        :disabled="inProcess"
        @click="submit"
        >Login</base-button
      >

      <p class="mt-4 text-sm text-gray-600">
        Don't have an account?
        <router-link :to="{ name: 'Signup' }">Register Now!</router-link>
      </p>
    </div>
  </div>
</template>
