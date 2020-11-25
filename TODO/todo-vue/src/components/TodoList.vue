<template>
    <div>
        <input type="text" class="todo-input" placeholder="what needs to be done"
        v-model="newtodo" @keyup.enter="Addtodo()" />
        <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item" >
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
      }
    
  },
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
    margin: 14px;
    max-width: 500px; 
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

</style>
