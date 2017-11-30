<template>
  <div class="quizmaker">
    <section class="section">
      <h1 class="title has-text-centered"> Create your quiz </h1>
        <div class="container columns">
          <aside class="column is-3">
          
            <input                
              v-validate="{required: true}"
              v-validate.initial="'required'" 
              type="hidden" 
              name="user"
              :value="currentUser">

            <div id="title-field" class="field">
              <label class="label">Quiz Title</label>
              <div class="control">
                <input                
                  v-validate="{required: true}"
                  v-model="quiz.title" 
                  :class="{'input': true, 'is-danger': errors.has('title')}" 
                  type="text" 
                  name="title"
                  placeholder="Enter your quiz title...">
              </div>
              <p id="title-error-message" class="help is-danger" v-show="errors.has('title')">{{ errors.first('title') }}</p>
            </div>

            <div id="description-field" class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea 
                  v-validate="{required: true}"
                  v-model="quiz.description" 
                  :class="{'textarea':true, 'is-danger': errors.has('description')}" 
                  type="text" 
                  name="description"
                  placeholder="Enter a description for your quiz...">
                </textarea>
              </div>
              <p class="help is-danger" v-show="errors.has('description')">{{ errors.first('description') }} </p>
            </div>

            <div id="image-field" class="field">
              <label class="label">Image Thumbnail</label>
              <img :src="thumbnailImage" class="image is-64x64"/>
              <div class="control">
                <div :class="{'file':true, 'has-name':true, 'is-danger':errors.has('image')}">
                  <label class="file-label">
                    <input 
                      v-validate="{image: true, size: 500}"
                      @change="addFile" 
                      class="file-input" 
                      type="file" 
                      name="image">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fa fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
                <p class="help is-danger" v-show="errors.has('image')">{{ errors.first('image') }} </p>
              </div>
            </div>

            <div id="category-field" class="field">
              <label class="label">Category</label>
              <div class="control">
                <div class="select">
                  <select v-model="quiz.category" name="category">
                    <option>Animals</option>
                    <option>Sport</option>
                    <option>Just for fun</option>
                    <option>Music</option>
                    <option>People</option>
                    <option>Geography</option>
                  </select>
                </div>
              </div>
            </div>

            <div id="questions-field" class="field">
              <label class="label">Questions</label>
              <ul>
                <li v-for="(question, index) in quiz.questions">
                  {{ question.title }} 
                  <button @click="removeQuestion(index)" class="delete is-primary" aria-label="remove"></button> 
                </li>
              </ul>
              <div class="control">
                <button @click="questionCreatorActive=true" type="button" class="button is-small is-info"> 
                  Add Question            
                </button>
              </div>
            </div>
                       
            <button
              id="create-button" 
              :disabled="errors.any()" 
              v-show="!isUpdating" 
              @click="validateBeforeSubmit(createQuiz)" 
              class="button is-primary is-medium"> Create Quiz! </button>
            <button 
              id="update-button"
              :disabled="errors.any()" 
              v-show="isUpdating" 
              @click="validateBeforeSubmit(updateQuiz)" 
              class="button is-primary is-medium"> Update Quiz! </button>
          </aside>

          <question-modal
            ref="questionModal" 
            @createQuestion="addQuestion($event)"
            @editQuestion="editQuestion($event)" 
            @close="questionCreatorActive = false" 
            :active="questionCreatorActive"
            :editData="questionEditData"> 
          </question-modal>

         <main id="viewport" class="column is-9 has-text-centered"> 
           <media-card :quiz="{data:quiz}" :altSrc="thumbnailImage">
             
           </media-card>
           
           <ul>
              <li v-for="(question, index) in quiz.questions">
                <question-card @swap="swapCard(index,index-1)" @delete="removeQuestion(index)" @edit="openEditor(index)"> 
                  {{ question.title }} 
                </question-card>             
              </li>
            </ul> 

            <ul>
              <li v-for="file in questionFiles">
                {{ file.name }}            
              </li>
            </ul>            
         </main>
       </div>
    </section>
  
  </div>
</template>

<script>

import QuestionModal from '@/components/QuestionModal'
import MediaCard from '@/components/MediaCard'
import QuestionCard from '@/components/QuestionCard'
import Storage from '@/helpers/firestoreHelper'

export default {
  name: 'Home',
  components: {
    'question-modal': QuestionModal,
    'media-card': MediaCard,
    'question-card': QuestionCard
  },
  props: ['currentUser'],
  data () {
    return {
      quiz: {
        quizTitle: '',
        description: '',
        category: '',
        questions: [],
        image: undefined
      },
      questionEditData: undefined,    
      questionFiles: [],
      questionCreatorActive: false,
      questionIsPresent: false,
      thumbnailImage: '/static/question.png',
      file: {},
      isUpdating: false,
      editIndex: null
    }  
  },
  mounted() {
    if(this.$route && this.$route.params.quiz){
      this.loadQuizToForm(this.$route.params.quiz)
    }
  },
  methods: {

    addQuestion (data) {
      var filename = data.media
      if(filename.name !== undefined){filename = filename.name}
     
      var newQuestion = {
        title: data.question,
        possibleAnswers: data.answers.split('\n').filter((a) => a.length > 0),
        correctAnswer: data.answers.split('\n')[0],
        media: filename,
      }
      this.quiz.questions.push(newQuestion)
      this.questionFiles.push(data.media)
      this.questionCreatorActive = false  
    },

    editQuestion (data) {
      console.log(data)
      var filename = ''
      if(data.media !== undefined && data.media.file !== undefined){ 
        filename = data.media.file
      }

      var newQuestion = {
        title: data.question,
        possibleAnswers: data.answers.split('\n').filter((a) => a.length > 0),
        correctAnswer: data.answers.split('\n')[0],
        media: filename,
      }
      if(data.media !== undefined && data.media.file !== undefined){
        this.questionFiles.push(data.media) 
      }
      this.quiz.questions[this.editIndex] = newQuestion
      this.editIndex = null
      this.questionCreatorActive = false  

    },

    removeQuestion (index) {  
      if(confirm('Are you sure you want to delete?')){
        this.questionFiles.splice(index,1)
        this.quiz.questions.splice(index,1)
      }  
    },

    swapCard (index1, index2) {
      if(index1 <= 0){ return false }
      var c = this.quiz.questions[index1]
      this.quiz.questions.splice(index1, 1, this.quiz.questions[index2])
      this.quiz.questions.splice(index2, 1, c)
    },

    updateQuiz () {
      var quizRef = this.$store.state.db.collection("quizzes").doc(this.$route.params.quiz.id);
      if(this.file.name != this.$route.params.quiz.data.image){ 
        Storage.upload(this.file, this.currentUser + '/') 
      }

      return quizRef.update({
          image: this.file.name,
          title: this.quiz.title,
          category: this.quiz.category,
          description: this.quiz.description,
          questions: this.quiz.questions
      })
      .then(() => {
          for(var i = 0; i < this.questionFiles.length; i++){
            if(this.questionFiles[i].name !== undefined){
              Storage.upload(this.questionFiles[i], this.currentUser + '/media/')
            }
          }
          this.$router.push('/profile')
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error)
      })
    },

    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
          return
        }
        console.log("form validation error")
      })
    },

    createQuiz () {  
      if(this.errors.items.length === 0){

        var uid = this.currentUser
        var filename = this.thumbnailImage
        if(this.file.name){
          filename = this.file.name
        }
        //Add Quiz to quiz collection
        this.$store.state.db.collection("quizzes").add({
          owner: uid,
          image: filename,
          title: this.quiz.title,
          description: this.quiz.description,
          category: this.quiz.category,
          questions: this.quiz.questions
        })
        .then(() => {
          console.log("Document successfully written!");
          if(this.file.name){ Storage.upload(this.file, this.currentUser + '/') }
          for(var i = 0; i < this.questionFiles.length; i++){
            if(this.questionFiles[i].name !== undefined){
              Storage.upload(this.questionFiles[i], this.currentUser + '/media/')
            }
          }
          this.$router.push('/profile')
          
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
      
    },

    addFile (event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){ return }
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (event) => {
        vm.thumbnailImage = event.target.result;
        vm.quiz.image = event.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.file = files[0]
    },

    loadQuizToForm (quiz) {
      var uid = this.currentUser
      this.isUpdating = true
      this.quiz = quiz.data
      this.file.name = quiz.data.image
      Storage.download(uid + '/' + quiz.data.image, (url) => {
        this.thumbnailImage = url
      })      
    },
    openEditor (index) {
      this.questionCreatorActive = true
      var selectedQuestion = this.quiz.questions[index]
      this.questionEditData = {
        question: selectedQuestion.title,
        answers: selectedQuestion.possibleAnswers.join('\n'),
        media: selectedQuestion.media
      }
      this.editIndex = index
    }
  } 
}
</script>

<style scoped>
  aside{
    background-color: #f8f8f8;
    height: 90vh;
  }
  main{
    height: 90vh;
  }
  .textarea{
    white-space: pre-wrap;
  }
  .card{
    margin-top: 20px;
  }
</style>
