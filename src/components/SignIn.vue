<template>
  <div class="signup">
   
    <section class="section">
      <div class="container">
        <h1 class="title"> Log In </h1>
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input 
            v-model="email" 
            v-validate="{required:true, email: true}"
            v-validate.initial="'required'"
            :class="{'input':true, 'is-danger':errors.has('email'), 'is-success':!errors.has('email')}" 
            type="email" 
            name="email"
            placeholder="enter your email...">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i :class="{'fa':true, 'fa-warning':errors.has('email'), 'fa-check': !errors.has('email')}"></i>
            </span>
          </div>
          <p :v-show="errors.has('email')" class="help is-danger">{{errors.first('email')}}</p>
        </div>

         <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input 
            v-model="password" 
            v-validate="{required:true, min: 6, max: 24, alpha_dash:true}"
            v-validate.initial="'required'"
            :class="{'input':true, 'is-danger':errors.has('password'), 'is-success':!errors.has('password')}" 
            type="password" 
            name="password"
            placeholder="enter a password...">     
            <span class="icon is-small is-right">
              <i :class="{'fa':true, 'fa-warning':errors.has('password'), 'fa-check': !errors.has('password')}"></i>
            </span>
          </div>
          <p :v-show="errors.has('password')" class="help is-danger">{{errors.first('password')}}</p>
        </div>

        <button :disabled="errors.any()" class="button is-primary is-large" type="submit" @click="signIn()"> Log In </button>
  
      </div>
    </section>
    
  </div>
</template>

<script>

import Auth from '@/authentication/auth'

export default {
  name: 'SignUp',
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    signIn () {
      Auth.login(this.email, this.password, () => {
        this.$router.push('/')
      })
     
    }
  }
}
</script>

<style scoped>

</style>
