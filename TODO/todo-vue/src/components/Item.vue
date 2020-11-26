<template>
    <div class="todo-item">
        
            <div class="todo-item-left">
                <input type="checkbox" v-model="completed" @change="DoneEdite()">
                <input v-if="edite" type="text" class="todo-label" 
                 v-model="title" @blur="DoneEdite()" @keyup.enter="DoneEdite()"
                  @keyup.esc="canceledite()" v-focus >
                <div v-else @dblclick="Edite()" :class="{ completed : completed}">
                    {{title}}
                </div>
            </div>
            <div class="remove-item" @click="removetodo(index)">
                &times;
            </div>
    </div>
</template>

<script>
export default {
    name: 'Item',
    props:{
        todo:{
            type: Object,
            required: true,
        },
        index:{
            type: Number,
            required: true,
        },
        CheckAll:{
            type: Boolean,
            required: true,
        }
    },
    watch:{
        CheckAll(){
            this.completed=this.CheckAll ? true : false
        },
    },
    data(){
        return {
            id: this.todo.id,
            title: this.todo.title,
            completed: this.todo.completed,
            edite: this.todo.edite,
            BeforeTitleEdit: '',
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
        removetodo(index) {
            this.$emit("RemovedTodo", index);
        },
        Edite(){
          this.BeforeTitleEdit=this.title
          this.edite=true
        },
        DoneEdite(){
          if(this.title.trim().length==0){
                this.title=this.BeforeTitleEdit
          }
          this.edite=false
            this.$emit("FinishedEdite", {
                index: this.index,
                todo:{
                    id:this.id,
                    title:this.title,
                    completed:this.completed,
                    edite:this.edite,
                }
            });

        },
        canceledite(){
          this.title=this.BeforeTitleEdit
          this.edite=false
        },

    }
}
</script>
