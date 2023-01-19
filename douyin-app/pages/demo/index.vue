<template>
  <view>
    <ss-select-city
      v-model="value"
      :hot-citys="hotCitys"
      @on-select="onSelect"
    />
  </view>
</template>

<script>
import ssSelectCity from '@/components/ss-select-city/index.vue'

export default {
  data() {
    return {
      hotCitys: [
        '杭州',
        '天津',
        '北京',
        '上海',
        '深圳',
        '广州',
        '成都',
        '重庆',
        '厦门'
      ],
      value: '杭州'
    }
  },
  components: {
    ssSelectCity
  },
  methods: {
    onSelect(city) {
      console.log(city)
    }
  }
}
</script>

<style></style>
