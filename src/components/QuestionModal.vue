<template>
  <div class="questionmodal">   
    <div class="modal" :class="{ 'is-active': active }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Question</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>

        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="label">Question</label>
              <div class="control">
                <input 
                  v-validate="{required:true}"
                  v-validate.initial="'required'"
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
                <p> {{ media.name }} </p>
                <p> {{ media.type }} </p>
              </div>
            </div>


            <div class="field">
              <label class="label">Answers</label>  
              <p class="help">Put each answer on a new line. Correct answer at the top.</p>           
              <div class="control">
                <textarea 
                  v-validate="{required:true}"
                  v-validate.initial="'required'"
                  v-model="questionData.answers"           
                  :class="{'textarea': true, 'is-danger':errors.has('answers')}" 
                  type="textarea" 
                  name='answers'
                  placeholder="Enter answers separated by a new line">
                </textarea>
              </div> 
              <p v-show="errors.has('answers')" class="help is-danger">You need to put some possible answers!</p>            
            </div>                      
          </form>
        </section>

        <footer class="modal-card-foot">
          <button @click="addQuestion" class="button is-success">Add Question</button>
          <button  @click="closeModal" class="button">Cancel</button>
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
        media: null
      },
      media: {}
    }
  },
  props: ['active'],
  methods: {
    addMedia (event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){ return }
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (event) => {
        vm.thumbnailImage = event.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.media = files[0]
      this.questionData.media = this.media.name
      console.log(this.media)
    },

    closeModal () {
      this.$emit('close')
    },

    addQuestion () {
      if(this.errors.items.length === 0){
        this.$emit('sendQuestionData', this.questionData)
      }           
    }
  }
}
</script>


<style scoped>

</style>
