<template>
  <div class="generalBlock">
    <div class="block">
      <h4>Выбор языка:</h4>
      <a-select></a-select>
    </div>
    <div>
      <h4>Выбор языка:</h4>
      <a-select></a-select>
    </div>
  </div>  
</template>

<script>
import Select from './components/Select'
export default {
  components: {
    ASelect: Select
  }
}
</script>

<style>
  .generalBlock {
    display: flex;
    width: 820px;
    margin: 100px auto;
    font: normal 13px Arial
  }
  .block {margin: 0 20px;}
  h4 {margin-bottom: 4px;}
</style>
