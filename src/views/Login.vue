<template>
  <div class="login">
    <h1>Login page</h1>
    <div>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" v-model="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password" />
    </div>
    <div>
      <button name="login" @click="$router.push('/')">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },

}
</script>

<style>

</style>
