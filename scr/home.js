import unitConversionTable from './unitConversionTable.js';
const rootFontSizeKey = 'rootFontSize';
export default {
  components: {
    'unit-conversion-table': unitConversionTable,
  },
  data() {
    return {
      rootFontSize: parseInt(localStorage.getItem(rootFontSizeKey) || 0) || 16,
      inPixel: 16,
      inTw: 4,
      inRem: 1,
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
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
    isReadyInConfig: function () {
      return !!this.spacing[this.inTw]
    }
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
      this.inRem = size;
      this.triggerChangeInput({}, 'inRem')
    }
  },
  template: `
<div class="xl:h-screen">
  <div class="max-w-[700px] mx-auto border-0 border-b border-gray-300 border-solid pb-5">
    <div class="mt-10 mb-10 mx-auto max-w-screen-xl px-4 sm:px-6">
      <div class="text-center flex items-center justify-center">
        <img src="https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo.png" alt="" class="rounded-full w-28 mr-5">
        <h1 class="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-3xl flex">
          <span class="block xl:inline">Tailwind CSS</span>
          <span class="block text-indigo-600 xl:inline ml-1">Calculator</span>
        </h1>
      </div>
    </div>
    
    <form novalidate class="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
      <div class="space-y-12 sm:col-span-1">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Calculator</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Utilities for controlling the <span class="font-bold text-blue-400">space size</span> of an element.</p>
    
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          
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
              <p v-show="isReadyInConfig" class="text-green-500 text-sm mt-1">(already available in the default configuration)</p>
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
              <label @click="changeFont(value)" for="push-everything" class="block text-sm font-medium leading-6 text-gray-900 cursor-pointer" :class="{'text-indigo-500': value === inRem}">{{ key }}</label>
            </div>
          </div>
        </fieldset>
    </form>
    
  </div>
  
  <div class="container mx-auto pt-10">
    <unit-conversion-table :rootFontSize="rootFontSize" :ratio="ratio" />
  </div>
</div>
`
}
