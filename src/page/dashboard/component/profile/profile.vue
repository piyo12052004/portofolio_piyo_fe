<script lang="ts" setup>
import Card from "primevue/card";
</script>
<template>
  <Card class="p-5">
    <template #title>Profile Details</template>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Full Name" value="Administrator SIMRS" />
        <Info label="Email" value="piyoaswandi@gmail.com" />
        <Info label="Employee ID" value="6107046007780013" />
        <Info label="Role" value="Superadmin" />
      </div>
    </template>
  </Card>

  <Card class="p-5">
    <template #title>Security Information</template>
    <template #content>
      <p class="text-sm text-gray-600">Last password update: 30 days ago</p>
    </template>
  </Card>

  <Card class="p-5">
    <template #title>Access Token</template>
    <template #content>
      <p class="text-sm text-gray-600">Manage and generate API access tokens.</p>
    </template>
  </Card>
</template>
