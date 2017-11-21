import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Quizzes from '@/components/Quizzes'
import Quiz from '@/components/Quiz'
import QuizMaker from '@/components/QuizMaker'

Vue.use(Router)

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
      component: QuizMaker
    }
  ]
})
