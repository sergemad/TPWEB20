<template>
    <div>
        <input type="text" class="todo-input" placeholder="what needs to be done"
        v-model="newtodo" @keyup.enter="Addtodo()" />
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-for="(todo, index) in todoFiltered" :key="todo.id" class="todo-item" >
            <div class="remove-item" @click="removetodo(index)">
                &times;
            </div>
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed">
                <input v-if="todo.edite" type="text" class="todo-label" 
                 v-model="todo.title" @blur="DoneEdite(todo)" @keyup.enter="DoneEdite(todo)"
                  @keyup.esc="canceledite(todo)" v-focus >
                <div v-else @dblclick="edite(todo)" :class="{ completed : todo.completed}">
                    {{todo.title}}
                </div>
            </div>
            
        </div>
        </transition-group>
        <div class="extra-container">
            <div>
                <input type="checkbox" :checked="AnyNotDone" @click="CheckAll()">
                Check all
            </div>
            
            <div>
                {{NotDone}} item left
            </div>
        </div>
        <div class="extra-container">
            <div>
                <input type="button" class="button" @click="Filtered = 'All'" value="All">
                <input type="button" class="button" @click="Filtered = 'Active'" value="Active">
                <input type="button" class="button" @click="Filtered = 'Completed'" value="Completed">
            </div>
            <transition name="fade">
            <input type="button" class="button" v-if="OneDone" @click="ClearCompleted()" value="Clear completed">
            </transition>
        </div>
    </div>
</template>

<script> 
export default {
  name: 'TodoList',
  data () {
    return {
      newtodo:'',
      idForNewTodo: 3,
      BeforeTitleEdit: '',
      Filtered:'All',
      todos:[
          {
              id:1,
              title:'I really want to eat',
              completed:false,
              edite:false,
          },
          {
              id:2,
              title:'Workout 3 days per week',
              completed:false,
              edite:false,
          },
      ]
    }
  },

    directives: {
      focus: {
          //directive definition
          inserted: function (el){
              el.focus()
          }
      }
  },

  methods:{
      Addtodo: function (){
          //alert("yo");
          if(this.newtodo.trim().length==0){
              return
          }
          this.todos.push({
              id: this.idForNewTodo,
              title: this.newtodo,
              completed: false
          });
          this.newtodo=''
          this.idForNewTodo++
      },
      removetodo(index){
          this.todos.splice(index,1)
      },
      edite(todo){
          this.BeforeTitleEdit=todo.title
          todo.edite=true
      },
      DoneEdite(todo){
          if(todo.title.trim().length==0){
                todo.title=this.BeforeTitleEdit
          }
          todo.edite=false
      },
      canceledite(todo){
          todo.title=this.BeforeTitleEdit
          todo.edite=false
      },
      CheckAll(){
          this.todos.forEach((todo) => todo.completed=event.target.checked)
      },
      ClearCompleted(){
          this.todos=this.todos.filter(todo => !todo.completed)
      }

    
  },

  computed: {
      NotDone(){
          return this.todos.filter(todo => !todo.completed).length
      },
      AnyNotDone(){
          return this.NotDone ==0
      },
      OneDone(){
          return this.todos.filter(todo => todo.completed).length > 0
      },
      todoFiltered(){
          if(this.Filtered=='All'){
              return this.todos
          }else if(this.Filtered=='Active'){
              return this.todos.filter(todo => !todo.completed)
          }else if(this.Filtered=='Completed'){
              return this.todos.filter(todo => todo.completed)
          }
          return this.todos
      }
  },
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input{
    border: 1px solid black;
    padding: 10px;
    width: 100%;
    font-size: 18px;
    
}
.todo-iteme{
    display: flex;
    float: left;
    justify-content: space-between;
    align-items: center;
    max-width: 500px; 
    animation-duration: 0.3s;
}
.remove-item{
    cursor: pointer;
    display: flex;
    float: right;
    padding: 7px;
}
.remove-item:hover{
    color: black;
}
.todo-label{
    border: 0px;
    width: 100%;
    font-size: 24px;
}
.todo-item-left{
    display: flex;
    align-items: center;
    padding: 10px;
    
}
.completed{
    text-decoration: line-through;
    color: grey;
}
.extra-container{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding: 10px;
}
.button{
    border: none;
    background: white;
}
.button:hover{
    cursor: pointer;
    background-color: teal;
    color: white;
}
.fade-enter-active, .fade-leave-active{
    transition:opacity .2s;
} 
.fade-enter, .fade-leave{
    opacity: 0;
} 

</style>
