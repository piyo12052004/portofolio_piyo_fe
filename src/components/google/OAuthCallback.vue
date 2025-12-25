<script lang="ts" setup>
import { onMounted } from 'vue'
import { handleGoogleCallback } from '@src/utils/callbackGoogle.js'

console.log('hello')
onMounted(() => {
  handleGoogleCallback()
})

</script>