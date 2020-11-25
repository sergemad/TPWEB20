<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
      <TodoList></TodoList>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TodoList,
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  
}
.container{
  max-width: 600px;
  margin: auto;
}
.logo{
  display: block;
  margin: 20px auto;
  width: 100px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
</style>
