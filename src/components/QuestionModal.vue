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
              <label class="label">Quiz Type</label>
              <div class="control">
                <div class="select">
                  <select>
                    <option> multiple choice </option>
                  </select>
                </div>
              </div>
            </div>  

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
        answers: ''
      }
    }
  },
  props: ['active'],
  methods: {
    closeModal: function(){
      this.$emit('close')
    },
    addQuestion: function(){
      if(this.errors.items.length === 0){
        this.$emit('sendQuestionData', this.questionData)
      }   
          console.log("ggg")        
    }
  }
}
</script>


<style scoped>

</style>
