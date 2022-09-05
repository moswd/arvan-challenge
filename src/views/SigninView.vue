<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import BaseInput from '@components/BaseInput.vue'
import BaseButton from '@components/BaseButton.vue'
import { useLogin } from '@composables/user.composable'

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

const { attempt: login, loading: inProcess, data, abortController } = useLogin() // TODO: either use login or signin / register signup

async function submit() {
  console.log(inProcess.value) // TODO: should convert to $ . solve now
  if (inProcess.value) return // double check

  const credsValid = await validator.value.$validate()
  if (!credsValid) return

  console.log('asdfasdf')

  // try {
  //   await login({ user: { email: creds.email, password: creds.password } })
  // console.log(data)
  // } catch (e) {}
}
</script>

<template>
  <div class="max-w-md mx-auto min-h-screen flex justify-center items-center">
    <div class="w-full p-6 bg-gray-100 rounded-lg">
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
        <router-link to="/signup">Register Now!</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
