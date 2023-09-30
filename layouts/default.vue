<script lang="ts" setup>
// import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
// import { useAuthStore } from '~/store/auth' // import the auth store we just created

// const router = useRouter()

// const { logUserOut } = useAuthStore() // use authenticateUser action from  auth store
// const { isAuthenticated } = storeToRefs(useAuthStore()) // make isAuthenticated state reactive with storeToRefs

// const logout = () => {
//   logUserOut()
//   router.push('/auth/login')
// }
</script>

<template>
  <!-- <ul>
    <li
      v-if="!isAuthenticated"
      class="loginBtn text-red-500 p-2"
      style="float: right"
    >
      <nuxt-link to="/auth/login">Login</nuxt-link>
    </li>
    <li
      v-if="isAuthenticated"
      class="loginBtn text-red-500 p-2"
      style="float: right"
    >
      <nuxt-link @click="logout">Logout</nuxt-link>
    </li>
  </ul> -->
  <TheHeader />
  <main>
    <div class="container px-2 md:px-0 mx-auto">
      <TheBreadcrumb class="mb-2 lg:mb-5" />
      <slot />
    </div>
  </main>
  <TheCookie />
  <TheFooter />
</template>
