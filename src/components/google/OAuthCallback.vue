<script  setup>
import { onMounted } from 'vue'
import { handleGoogleCallback } from '@src/utils/callbackGoogle.js'
onMounted(() => {
  handleGoogleCallback()
})

</script>