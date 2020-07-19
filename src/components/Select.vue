<template>
  <div class="wrap" v-click-outside="clickOutside" >
    <div class="input" @click="changeBlock">
      <div
        v-for="l in model"
        :key="l.id"
      >
        {{l.val}}  
        <span @click="removeLang(l.id)"><img src="@/assets/close.png"></span>      
      </div>
      <span>
        <img v-if="block" src="@/assets/arrowUp.png">
        <img v-else src="@/assets/arrowDown.png">
      </span>
    </div>
    <div class="list" v-if="block" >
      <div
        v-for="(lang, index) in langs"
        :key="lang.id"
        :class="selected == lang.id ? 'active' : ''"
        @click="selectLang(lang.id)"
        @mouseover="mouseOver(index)" 
        ref="index"
        :id="index"    
      >
        {{lang.val}} 
      </div>
    </div>  
  </div>  
</template>

<script>
export default {
  data(){
    return {
      block: false,
      langs: [
        {id: 1, val:'Русский'}, 
        {id: 2, val:'English'},
        {id: 3, val:'Turkish'},
        {id: 4, val:'Узбектили'},
        {id: 5, val:'Arab'}, 
        {id: 6, val:'French'},
        {id: 7, val:'Монгольский'},
        {id: 8, val:'Мандаринский'},
      ],
      model: [],
      selected: 1,
      index: 0
    }
  },  
  updated(){
    if(this.block) {
        window.addEventListener('keyup', this.eventKey);
    } else {
        window.removeEventListener('keyup', this.eventKey)
    }
  },
  destroyed() {
    window.removeEventListener('keyup', this.eventKey)
  },
  methods: {
    eventKey(){
        if (event.keyCode === 13) { 
            this.selectLangEnter()
            this.selected = 0
            this.index = -1
        }
        
        if (event.keyCode === 38 && this.index > 0) {         
            let num = --this.index
            this.selected = this.langs[num].id
            let block = this.$refs.index[num]
            block.scrollIntoView({block: "nearest", behavior: "smooth"})
        }
        if (event.keyCode === 40 && this.index < (this.langs.length - 1)) { 
            let num = ++this.index
            this.selected = this.langs[num].id
            let block = this.$refs.index[num]
            block.scrollIntoView({block: "nearest", behavior: "smooth"})
        }
        if(event.keyCode === 27){
          this.block = false
        }
    },
    changeBlock(){
      this.block = !this.block
    },
    selectLang(id){
      const selected = this.langs.find(el => el.id === id)
      this.model.push(selected)
      this.langs = this.langs.filter(l => l.id !== id)
    },
    removeLang(id){
      const selected = this.model.find(el => el.id === id)
      this.langs.push(selected)
      this.model = this.model.filter(el => el.id !== id)
    },
    clickOutside(){
      this.block = false
    },
    mouseOver(index){
      this.selected = this.langs[index].id
      this.index = index
    },
    selectLangEnter(){
      this.selectLang(this.selected)
    }
  },
  
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== 'function') {
        	const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          
          console.warn(warn)
        }        
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
          	binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
			},
      
      unbind: function(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  
}
</script>

<style>
  .clear {clear: both;}
  .input {
    padding: 10px 30px 0 10px;
    border: 1px #ccc solid;
    border-radius: 5px;
    min-height: 35px;
    float: left;
    width: 360px;
    position: relative;
  }
  .input div {
    float: left;
    background: #000;
    color: #fff;
    padding: 4px 30px 3px 10px;
    margin: 0 5px 5px;
    position: relative;
    border-radius: 15px;
  }
  .input span {
    position: absolute;
    top: 13px;
    right: 10px;
    display: block;
    cursor: pointer;
  }
  .input div span {
    top: 2px;
    right: 3px;
    background: #777;
    padding: 0 5px 2px 5px;
    border-radius: 15px;
  }
  .list {
    border: 1px #ccc solid;
    border-radius: 0 0 5px 5px;
    max-height: 200px;
    overflow-y: auto;
  }
  .list div {
    padding: 10px 15px;
  }
  .list div.active {
    background: #000;
    color: #fff;
    cursor: pointer;
  }
</style>
