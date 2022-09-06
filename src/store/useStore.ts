import { defineStore } from 'pinia'
import { User } from '@models/user.model'

export const useUserStore = defineStore(
  'user',

  () => {
    let username = $ref<string | undefined>()
    let token = $ref<string | undefined>()

    function setCreds(user: User) {
      username = user.username // TODO: why error?
      token = user.token
    }

    return $$({ username, token, setCreds }) // TODO: $$?
  },

  {
    persist: true
  }
)
