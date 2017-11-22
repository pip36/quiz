import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Quizzes from '@/components/Quizzes'
import Quiz from '@/components/Quiz'
import QuizMaker from '@/components/QuizMaker'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import store from '@/vuex/store'
import Profile from '@/components/Profile'

Vue.use(Router)

var authenticated = function () {
  if (store.state.currentUser.uid) {
    return true
  }
  return false
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/quizzes',
      name: 'Quizzes',
      component: Quizzes
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/quizmaker',
      name: 'QuizMaker',
      component: QuizMaker,
      beforeEnter: (to, from, next) => {
        if (!authenticated()) {
          next(from)
        } else {
          next()
        }
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        if (authenticated()) {
          next(from)
        } else {
          next()
        }
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        if (authenticated()) {
          next(from)
        } else {
          next()
        }
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (!authenticated()) {
          next(from)
        } else {
          next()
        }
      }
    }
  ]
})
