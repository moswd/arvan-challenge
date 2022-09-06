<script setup lang="ts">
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useRegister } from '@composables/user.composable'
import BaseInput from '@components/BaseInput.vue'
import BaseButton from '@components/BaseButton.vue'

// TODO: form validation composable

const creds = reactive({
  email: '',
  username: '',
  password: ''
})

const credsRules = {
  email: { required, email },
  username: { required },
  password: { required }
}

const validator = useVuelidate(credsRules, creds)

const emailErrors = $computed(() =>
  validator.value.email.$error
    ? validator.value.email.$errors.map((err) => err.$message)
    : []
)

const usernameErrors = $computed(() =>
  // TODO: think of a better way to handle errors
  validator.value.username.$error
    ? validator.value.username.$errors.map((err) => err.$message)
    : []
)

const passwordErrors = $computed(() =>
  validator.value.password.$error
    ? validator.value.password.$errors.map((err) => err.$message)
    : []
)

const { attempt: register, loading: inProcess, data } = useRegister() // TODO: either use login or signin / register signup

async function submit() {
  console.log(inProcess.value) // TODO: should convert to $ . solve now
  if (inProcess.value) return // double check

  const credsValid = await validator.value.$validate()
  if (!credsValid) return

  try {
    await register({
      user: {
        email: creds.email,
        username: creds.username,
        password: creds.password
      }
    })

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto min-h-screen flex justify-center items-center">
    <div class="w-full p-6 bg-gray-50 rounded-lg shadow border border-gray-100">
      <h1 class="text-center text-4xl mt-4 mb-8 text-gray-500">Register</h1>

      <base-input
        id="email"
        v-model="creds.email"
        type="email"
        label="Email"
        :errors="(emailErrors as string[])"
      ></base-input>
      <!-- TODO: why errors should be converted? -->

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

      <base-button
        class="mt-4 w-full"
        :loading="inProcess"
        :disabled="inProcess"
        @click="submit"
        >Register</base-button
      >

      <p class="mt-4 text-sm text-gray-600">
        Already registered?
        <router-link to="/signin">Login</router-link>
      </p>
    </div>
  </div>
</template>
