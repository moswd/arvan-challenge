import { defineStore } from 'pinia'
import { User } from '@models/user.model'

export const useUserStore = defineStore(
  'user',

  () => {
    let username = $ref<string | undefined>()
    let token = $ref<string | undefined>()

    function setCreds(user: User) {
      username = user.username
      token = user.token
    }

    function removeCreds() {
      username = undefined
      token = undefined
    }

    return $$({ username, token, setCreds, removeCreds })
  },

  {
    persist: true
  }
)
