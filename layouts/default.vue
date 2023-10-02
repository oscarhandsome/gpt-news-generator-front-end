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
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex-grow">
      <div class="container mx-auto px-2 sm:px-0">
        <TheBreadcrumb />
        <slot />
      </div>
    </main>
    <TheCookie />
    <TheFooter class="mt-auto mb-0" />

    <BaseUpButton />
  </div>
</template>
