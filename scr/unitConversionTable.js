export default {
  template: `
<div class="px-4 sm:px-6 lg:px-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">Unit Conversion Table <span class="text-sm text-gray-400 font-normal">(In root font size: {{rootFontSize}}px)</span></h1>
    </div>
  </div>
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Tw config</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">EM</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-violet-70 bg-violet-50">REM</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-emerald-700 bg-emerald-50">Pixel</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Percent</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="pixel in items" :key="pixel" :class="{'bg-indigo-50': pixel%2}">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{isReadyInConfig(pixel)}}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{getInRem(pixel)}}em</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 bg-violet-50">{{getInRem(pixel)}}rem</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 bg-emerald-50">{{pixel}}px</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{getPercent(pixel)}}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    `,
  props: {
    rootFontSize: Number,
    ratio: Number,
  },
  data() {
    return {
      items: [],
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
    }
  },
  computed: {
    loopItems: function () {
      return this.items.slice(8, 48)
    }
  },
  created() {
    this.arrayRange(8, 48, 1)
  },
  methods: {
    arrayRange: function(start, stop, step) {
      this.items = Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
      )
    },
    getInTw: function (inPixel){
      return inPixel / this.ratio;
    },
    getInRem: function (inPixel){
      return inPixel / this.rootFontSize;
    },
    getPercent: function (inPixel){
      return (inPixel / this.rootFontSize) * 100;
    },
    isReadyInConfig: function (inPixel){
      const inTw = this.getInTw(inPixel);
      return !!this.spacing[inTw] ? inTw : ''
    }
  }
}
