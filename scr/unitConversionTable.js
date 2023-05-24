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
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">EM</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-violet-70 bg-violet-50">REM</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-emerald-700 bg-emerald-50">Pixel</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Percent</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="pixel in items" :key="pixel" :class="{'bg-indigo-50': pixel%2}">
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
      items: []
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
    }
  }
}
