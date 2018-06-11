<template>
  <div>
    <h1>test</h1>
    <h2 v-if="val === true">ok</h2>
    <h2 v-else>nope</h2>
    <ul>
      <li v-for="(field, key ,index) in obj" :key="index">
        <div v-if="Array.isArray(field)">
          <li v-for="item in field" :key="item">{{key}} {{item}}</li>
        </div>
        <div v-else>
          {{key}} {{field}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      val: true,
      obj: {
        name: 'man',
        age: 100,
        children: ['one', 'two', 'three']
      }
    }
  }
}
</script>