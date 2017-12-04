<template>
  <div class="questionmodal">   
    <div class="modal" :class="{ 'is-active': active }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Question</p>
          <button class="delete" aria-label="close" id="close-icon" @click="closeModal"></button>
        </header>

        <section class="modal-card-body">
          <form>
            <div id="type-field" class="field">
              <label class="label">Question Type</label>
              <div class="control">
                <div class="select">
                  <select v-model="questionData.type" name="type">
                    <option>Multiple Choice</option>
                    <option>Typed Answer</option>
                  </select>
                </div>
              </div>
            </div>

            <div v-if="questionData.type != ''">
              <div class="field">
                <label class="label">Question</label>
                <div class="control">
                  <input 
                    v-validate="{required:true}"
                    v-model="questionData.question" 
                    :class="{'input': true, 'is-danger': errors.has('question')}" 
                    type="text" 
                    name="question"
                    placeholder="Type your question...">
                </div>
                <p class="help is-danger" v-show="errors.has('question')">You need to enter a question!</p> 
              </div>

              <div class="field">
                <label class="label">Question Media</label>
                <p class="help"> add media to question </p>
                <div class="control">
                  <div :class="{'file':true, 'has-name':true}">
                    <label class="file-label">
                      <input 
                        @change="addMedia"
                        v-validate="{image: true, size: 500}"
                        class="file-input" 
                        type="file" 
                        name="file">
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
                  <p class="help is-danger" v-show="errors.has('file')">{{ errors.first('file') }} </p>
                  <p v-if="questionData.media"> {{ questionData.media.name }} </p>
                  <p v-if="questionData.media"> {{ questionData.media.type }} </p>
                </div>
              </div>


              <div class="field">
                <label class="label">Answers</label>  
                <p v-if="questionData.type == 'Multiple Choice'" class="help">Put each answer on a new line. Correct answer at the top.</p>
                <p v-if="questionData.type == 'Typed Answer'" class="help">Enter each answer you want to accept as correct on a new line.</p>             
                <div class="control">
                  <textarea 
                    v-validate="{required:true}"
                    v-model="questionData.answers"           
                    :class="{'textarea': true, 'is-danger':errors.has('answers')}" 
                    type="textarea" 
                    name='answers'
                    placeholder="Enter answers separated by a new line">
                  </textarea>
                </div> 
                <p v-show="errors.has('answers')" class="help is-danger">You need to put some answers!</p>            
              </div> 
            </div>                     
            </form>
          </section>

          <footer class="modal-card-foot">
            <button v-if="!isEditing" @click="validateBeforeSubmit(addQuestion)" id="create-button" class="button is-success">Add Question</button>
            <button v-if="isEditing" @click="validateBeforeSubmit(editQuestion)" id="edit-button" class="button is-success">Edit Question</button>
            <button @click="closeModal" id="close-button" class="button">Cancel</button>
          </footer>
        
      </div>
    </div>
   
  </div>
</template>

<script>

export default {
  name: 'QuestionModal',
  data () {
    return{
      questionData: {
        question: '',
        answers: '',
        media: '',
        type: ''
      },
      isEditing: false
    }
  },
  props: ['active', 'editData'],
  mounted() {
    if(this.editData !== undefined){
      this.questionData = {
        question: this.editData.question,
        answers: this.editData.answers,
        media: this.editData.media,
        type: this.editData.type
      }
      this.isEditing = true
    }
  },
  watch: {
    editData: function () {
      this.questionData = {
        question: this.editData.question,
        answers: this.editData.answers,
        media: this.editData.media,
        type: this.editData.type
      }
      this.isEditing = true
    }
  },
  methods: {
    addMedia (event) {
      console.log(event)
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){ return }
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.readAsDataURL(files[0]);
      this.questionData.media = files[0]
    },

    closeModal () {
      this.$emit('close')
    },

    addQuestion () {
      if(this.errors.items.length === 0){
        this.$emit('createQuestion', this.questionData)
      }           
    },

    editQuestion () {
      if(this.errors.items.length === 0){
        this.$emit('editQuestion', this.questionData)
        this.isEditing = false
      }   
    },

    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
          return
        }
        console.log("form validation error")
      })
    }
  }
}
</script>


<style scoped>

</style>
