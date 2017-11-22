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
              :value="$store.state.currentUser.uid">

            <div class="field">
              <label class="label">Quiz Title</label>
              <div class="control">
                <input                
                  v-validate="{required: true}"
                  v-validate.initial="'required'"
                  v-model="quizTitle" 
                  :class="{'input': true, 'is-danger': errors.has('title')}" 
                  type="text" 
                  name="title"
                  placeholder="Enter your quiz title...">
              </div>
              <p class="help is-danger" v-show="errors.has('title')">{{ errors.first('title') }}</p>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea 
                  v-validate="{required: true}"
                  v-validate.initial="'required'"
                  v-model="description" 
                  :class="{'textarea':true, 'is-danger': errors.has('description')}" 
                  type="text" 
                  name="description"
                  placeholder="Enter a description for your quiz...">
                </textarea>
              </div>
              <p class="help is-danger" v-show="errors.has('description')">{{ errors.first('description') }} </p>
            </div>

            <div class="field">
              <label class="label">Image Thumbnail</label>
              <img :src='thumbnailImage' class="image is-64x64"/>
              <div class="control">
                <div :class="{'file':true, 'has-name':true, 'is-danger':errors.has('image')}">
                  <label class="file-label">
                    <input 
                      v-validate="{image: true, size: 1000}"
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

            <div class="field">
              <label class="label">Questions</label>
              <ul>
                <li v-for="(question, index) in questions">
                  {{ question.title }} 
                  <button @click="questions.splice(index,1)" class="delete is-primary" aria-label="remove"></button> 
                </li>
              </ul>
              <div class="control">
                <button @click="questionCreatorActive=true" type="button" class="button is-small is-info"> 
                  Add Question            
                </button>
              </div>
            </div>
                       
            <button @click="createQuiz" class="button is-primary is-medium"> Create Quiz! </button>
          </aside>

          <question-modal 
            @sendQuestionData="addQuestion($event)" 
            @close="questionCreatorActive = false" 
            :active="questionCreatorActive"> 
          </question-modal>

         <main class="column is-9 has-text-centered"> 
           <media-card>
             <img v-if="!errors.has('image') && thumbnailImage" slot="image" :src='thumbnailImage' class='image is-64x64'/>
             <p slot="title"> {{quizTitle}} </p>
             <p slot="description"> {{description}} </p>
           </media-card>
           
           <ul>
              <li v-for="(question, index) in questions">
                <question-card @swap="swapCard(index,index-1)"> 
                  {{ question.title }} 
                </question-card>             
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

export default {
  name: 'Home',
  components: {
    'question-modal': QuestionModal,
    'media-card': MediaCard,
    'question-card': QuestionCard
  },
  data () {
    return {
      quizTitle: '',
      description: '',
      questions: [],
      questionCreatorActive: false,
      questionIsPresent: false,
      thumbnailImage: 'https://bulma.io/images/placeholders/64x64.png',
      file: {}
    }  
  },
  methods: {

    addQuestion: function(data) {
      var newQuestion = {
        title: data.question,
        possibleAnswers: data.answers.split('\n').filter((a) => a.length > 0),
        correctAnswer: data.answers.split('\n')[0]
      }
      this.questions.push(newQuestion)
      this.questionCreatorActive = false
    },

    swapCard: function(index1, index2) {
      if(index1 <= 0){ return false }
      var c = this.questions[index1]
      this.questions.splice(index1, 1, this.questions[index2])
      this.questions.splice(index2, 1, c)
    },

    createQuiz: function() {  
      if(this.errors.items.length === 0){
        if(this.file.name){ this.uploadFile() }

        var uid = this.$store.state.currentUser.uid

        //Add Quiz to quiz collection
        this.$store.state.db.collection("quizzes").add({
          owner: uid,
          image: this.file.name,
          title: this.quizTitle,
          description: this.description,
          questions: this.questions
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
      
    },

    uploadFile: function() {
      var uid = this.$store.state.currentUser.uid
      var storageRef = this.$store.state.storage.ref()
      var imagesRef = storageRef.child(uid+'/'+this.file.name);
      var file = this.file 
      imagesRef.put(file).then(function(snapshot) {
        console.log('Uploaded a file!')
      })
    },

    addFile: function(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){ return }
      console.log(files[0])
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (event) => {
        vm.thumbnailImage = event.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.file = files[0]
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
