<template>
  <header>
    <ul>
      <li>
        <router-link to='/main'>Pepe</router-link>
      </li>
      <li>
        <router-link to='/signin'>Sign In</router-link>
      </li>
      <li>
        <router-link to='/login'>Login</router-link>
      </li>
      <li>
        <router-link to='/logout'>Log Out</router-link>
      </li>
      <li>
        <router-link to='/user'>User</router-link>
      </li>
      <li>
        <router-link to='/test'>Test</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'main-header',
}  
</script>

<style scoped>
header {
  box-shadow: 0px 2px 0px 0px rgba(255, 255, 255, 0.1); 
  margin-bottom: 50px;
}

ul {
  list-style: none;
  display: flex;
  width: 90%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.0);
}

li {
  width: 150px;
  background-color: rgba(255, 255, 255, 0.0);
}

a {
  transition: all .25s ease-in-out;
  text-transform: uppercase;
  font-weight: bolder;
  padding: 15px;
  display: block;
  width: 100%;
  text-align: center;
  color: #fff;
  text-decoration: none;
}
a:hover {
  cursor: pointer;
  box-shadow: 0px 2px 0px 0px #aa4b6b; 
}
</style>

