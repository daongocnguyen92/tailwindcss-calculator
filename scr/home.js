// my-component.js
const rootFontSizeKey = 'rootFontSize';
export default {
  data() {
    return {
      rootFontSize: localStorage.getItem(rootFontSizeKey) || 16,
      inPixel: 16,
      inTw: 4,
      inRem: 1,
      fontSize: {
        'text-xs': 0.75,
        'text-sm': 0.875,
        'text-base': 1,
        'text-lg': 1.125,
        'text-xl': 1.25,
        'text-2xl': 1.5,
        'text-3xl': 1.875,
        'text-4xl': 2.25,
        'text-5xl': 3,
        'text-6xl': 4,
        'text-7xl': 4.5,
        'text-8xl': 6,
        'text-9xl': 8,

      }
    }
  },
  computed: {
    inConfig: function () {
      return `'${this.inTw}': '${this.inRem}rem'`
    },
    ratio: function () {
      // `this` points to the vm instance
      return this.rootFontSize / 4
    },
  },
  created: function () {
    if (!localStorage.getItem(rootFontSizeKey)) {
      localStorage.setItem(rootFontSizeKey, 16)
    }
  },
  mounted: function () {
    this.triggerChangeInput({}, 'rootFontSize')
  },
  methods: {
    getInTw: function (){
      return this.inPixel / this.ratio;
    },
    getInRem: function (){
      return this.inPixel / this.rootFontSize;
    },
    triggerChangeInput: function (event, name){
      switch (name) {
        case 'rootFontSize':
          this.inTw = this.getInTw();
          this.inRem = this.getInRem();
          localStorage.setItem(rootFontSizeKey, this.rootFontSize)
          break;
        case 'inPixel':
          this.inTw = this.getInTw();
          this.inRem = this.getInRem();
          break;
        case 'inTw':
          this.inPixel = this.inTw * this.ratio;
          this.inRem = this.getInRem();
          break;
        case 'inRem':
          this.inPixel = this.inRem * this.rootFontSize;
          this.inTw = this.getInTw();
          break;
      }
    },
    changeFont: function (size){
      this.rootFontSize = size;
      this.triggerChangeInput({}, 'rootFontSize')
    }
  },
  template: `
<div class="h-screen flex items-center">
  <div class="max-w-[1000px] mx-auto">
    <div class="mt-10 mb-10 mx-auto max-w-screen-xl px-4 sm:px-6">
      <div class="text-center flex items-center justify-center">
        <img src="../access/avatar.jpg" alt="" class="rounded-full w-28 mr-5">
        <h1 class="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-3xl flex">
          <span class="block xl:inline">Tailwind CSS</span>
          <span class="hidden xl:inline-block">&nbsp;</span>
          <span class="block text-indigo-600 xl:inline">Calculator</span>
        </h1>
      </div>
    </div>
    <form novalidate class="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
      <div class="space-y-12 sm:col-span-1">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Calculator</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Utilities for controlling the <span class="font-bold text-blue-400">space size</span> of an element.</p>
    
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
            <div class="sm:col-span-6">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Root font size</label>
              <div class="mt-2">
                <input v-model="rootFontSize" @input="triggerChangeInput($event, 'rootFontSize')" type="number" name="rootFontSize" id="rootFontSize" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
    
            <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">In Pixel</label>
              <div class="mt-2">
                <input v-model="inPixel" @input="triggerChangeInput($event, 'inPixel')" type="number" name="inPixel" id="inPixel" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
    
            <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">In Tailwind</label>
              <div class="mt-2">
                <input v-model="inTw" @input="triggerChangeInput($event, 'inTw')" type="number" name="inTw" id="inTw" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
    
            <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">In Rem</label>
              <div class="mt-2">
                <input v-model="inRem" @input="triggerChangeInput($event, 'inRem')" type="number" name="inRem" id="inRem" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
    
            <div class="sm:col-span-6">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">In tailwind.config.js</label>
              <div class="mt-2">
                <input :value="inConfig" readonly type="text" name="inConfig" id="inConfig" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <p class="text-gray-400 text-sm mt-1">(already available in the default configuration)</p>
            </div>
            
          </div>
        </div>
      </div>
  
      <fieldset class="sm:col-span-1">
          <legend class="text-base font-semibold leading-6 text-gray-900">Font Size</legend>
          <p class="mt-1 text-sm leading-6 text-gray-600">Utilities for controlling the <span class="font-bold text-blue-400">font size</span> of an element.</p>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div v-for="(value, key) of fontSize" class="flex items-center gap-x-3 sm:col-span-2">
              <input :id="key" :checked="value === inRem" name="push-notifications" type="radio" disabled class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
              <label @click="changeFont(value)" for="push-everything" class="block text-sm font-medium leading-6 text-gray-900" :class="{'text-red-500': value === inRem}">{{ key }}</label>
            </div>
          </div>
        </fieldset>
    </form>
  </div>
</div>
`
}
