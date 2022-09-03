<script setup lang="ts">
import { watch } from 'vue'
import { useRegister } from './composables/user.composable'

// const { login, loading, data, abortController } = useLogin()
const { attempt: register, loading, data, abortController } = useRegister()

register({
  user: {
    email: 'ewrwer21949012840',
    password: 'asdfasu9027149719024df',
    username: 'asdfay8901328705123sdf'
  }
}).catch((ee) => console.log('0000000000000000000000000000000000000', ee))

abortController?.abort()

watch(loading, (val) => {
  console.log('WATCHING ----------------------')
  console.log(val)
  console.log('-------------------------------')
})
watch(data, (val) => {
  console.log('DATA WATCHING ----------------------')
  console.log(val)
  console.log('-------------------------------')
})
</script>

<template>{{ loading }}</template>

<style scoped></style>
