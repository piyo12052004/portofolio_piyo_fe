<template>
  <section class="m-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Card>
          <template #title>
            <div class="grid grid-cols-2 gap-4">
              <span>Title</span>
              <Button
                @click="toggleCreatedTitle"
                label="Created Title"
                severity="info"
                rounded
              />
            </div>
          </template>
          <template #content>
            <DataTitle
              @refreshDataTitle="fetchDataTitle"
              @sendDataRoleUser="sendDataRoleUser"
              @showSubtitle="showSubtitle"
              @storageDataEditTitle="storageDataEditTitle"
              :dataTitle="dataTitle"
              :isLoadingTitle="isLoadingTitle"
            />
          </template>
        </Card>
      </div>
      <div>
        <Card>
          <template #title>
            <div class="grid grid-cols-2 gap-4">
              <span>Sub Title</span>
              <Button
                v-if="dataShowTitle.id"
                @click="toggleCreatedSubTitle"
                label="Created Sub Title"
                severity="info"
                rounded
              />
            </div>
          </template>
          <template #content>
            <DataSubTitle :dataShowTitle="dataShowTitle" @toggelUpdataDataSubTitle="toggelUpdataDataSubTitle" />
            <!-- src/assets/img/search-1-dark.svg -->
          </template>
        </Card>
      </div>
    </div>
  </section>

  <!-- dialog created title -->
  <Dialog
    v-model:visible="storageDialogCreatedTitle.is_aktiv"
    modal
    :header="storageDialogCreatedTitle.title"
    :style="{ width: '55rem' }"
  >
    <!-- FORM -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="flex flex-col gap-2">
        <label class="font-medium">Sub Title <span class="text-red-500">*</span> </label>
        <InputText
          :invalid="storageDialogCreatedTitle.is_aktiv_sub_title"
          v-model="storageDialogCreatedTitle.sub_title"
        />
        <Message
          v-if="storageDialogCreatedTitle.is_aktiv_sub_title"
          size="small"
          severity="error"
          variant="simple"
          >{{ errors.title.sub_title }}</Message
        >
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium">Path</label>
        <InputText v-model="storageDialogCreatedTitle.path" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium">Name</label>
        <InputText v-model="storageDialogCreatedTitle.name" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium">Component</label>
        <InputText v-model="storageDialogCreatedTitle.component" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label class="font-medium">Role User <span class="text-red-500">*</span> </label>
      <Select
        :invalid="storageDialogCreatedTitle.is_aktiv_role_user"
        v-model="storageDialogCreatedTitle.role_user"
        :options="dataRoleUser"
        optionLabel="role_user"
        placeholder="Select a City"
        class="w-full"
      />
      <Message
        v-if="storageDialogCreatedTitle.is_aktiv_role_user"
        size="small"
        severity="error"
        variant="simple"
        >{{ errors.title.role_user }}</Message
      >
    </div>

    <!-- ACTION -->
    <div class="flex justify-end gap-2 mt-4">
      <Button
        label="Cancel"
        severity="secondary"
        @click="storageDialogCreatedTitle.is_aktiv = false"
      />
      <Button
        label="Save"
        :loading="storageDialogCreatedTitle.is_save_loading"
        @click="functionTitle"
      />
    </div>
  </Dialog>

  <Dialog
    v-model:visible="dataSubtitle.toggleCreatedSubTitle"
    modal
    :header="dataSubtitle.titleToggleCreatedSubTitle"
    :style="{ width: '55rem' }"
  >
    <!-- FORM -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <!-- TITLE (READ ONLY) -->
      <div class="flex flex-col gap-2">
        <Label class="font-medium"> Title </Label>
        <InputText v-model="dataSubtitle.form.title_name" disabled />
      </div>

      <!-- NAME -->
      <div class="flex flex-col gap-2">
        <Label class="font-medium"> Name <span class="text-red-500">*</span> </Label>
        <InputText
          v-model="dataSubtitle.form.name"
          :invalid="dataSubtitle.is_aktiv_name"
        />
        <Message
          v-if="dataSubtitle.is_aktiv_name"
          size="small"
          severity="error"
          variant="simple"
        >
          {{ errors.subTitle.name }}
        </Message>
      </div>

      <!-- PATH -->
      <div class="flex flex-col gap-2">
        <Label class="font-medium"> Path <span class="text-red-500">*</span> </Label>
        <InputText
          v-model="dataSubtitle.form.path"
          :invalid="dataSubtitle.is_aktiv_path"
        />
        <Message
          v-if="dataSubtitle.is_aktiv_path"
          size="small"
          severity="error"
          variant="simple"
        >
          {{ errors.subTitle.path }}
        </Message>
      </div>

      <!-- COMPONENT -->
      <div class="flex flex-col gap-2">
        <Label class="font-medium"> Component <span class="text-red-500">*</span> </Label>
        <InputText
          v-model="dataSubtitle.form.component"
          :invalid="dataSubtitle.is_aktiv_component"
        />
        <Message
          v-if="dataSubtitle.is_aktiv_component"
          size="small"
          severity="error"
          variant="simple"
        >
          {{ errors.subTitle.component }}
        </Message>
      </div>
    </div>

    <!-- ACTION -->
    <div class="flex justify-end gap-2 mt-4">
      <Button
        label="Cancel"
        severity="secondary"
        @click="dataSubtitle.toggleCreatedSubTitle = false"
      />
      <Button
        label="Save"
        :loading="dataSubtitle.is_save_loading"
        @click="functionSaveSubTitle"
      />
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useApi } from "@src/utils/useApi";
import * as H from "@src/utils/Helper";

// primevue
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Select from "primevue/select";

// view
import DataTitle from "@src/page/dashboard/component/masterManu/title/data.vue";
import DataSubTitle from "@src/page/dashboard/component/masterManu/subtitle/data.vue";

// data
const dataTitle: any = ref([]);
const isLoadingTitle: any = ref(false);
const storageDialogCreatedTitle: any = ref({});
const dataRoleUser: any = ref([]);
const dataShowTitle: any = ref({});

// sub title
const dataSubtitle: any = ref({
  toggleCreatedSubTitle: false,
  form: {},
  is_save_loading: false,
  is_aktiv_name: false,
  is_aktiv_path: false,
  is_aktiv_component: false,
});

const errors = ref({
  title: {
    sub_title: "",
    role_user: "",
  },
  subTitle: {
    name: "",
    path: "",
    component: "",
  },
});

const fetchDataTitle = async (role_user: any) => {
  isLoadingTitle.value = true;
  try {
    const params = {
      role_user_id: role_user?.value,
      page: role_user.page,
      per_page: role_user.per_page,
    };
    const response = await useApi().get("/superadmin/path-master/title/get-data", params);
    dataTitle.value = response;
    isLoadingTitle.value = false;
    // pagination.value.total = response.meta.total
    // contoh: simpan ke state
  } catch (err) {
    dataTitle.value = "";
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch data.";

    H.alert("error", message);
  } finally {
    // optional: loading.value = false
  }
};

const sendDataRoleUser: any = (params: any) => {
  dataRoleUser.value = params;
};

const toggleCreatedTitle = () => {
  storageDialogCreatedTitle.value.is_aktiv = true;
  storageDialogCreatedTitle.value.title = "Created Title";
};

const functionTitle = () => {
  if (!storageDialogCreatedTitle.value?.sub_title) {
    storageDialogCreatedTitle.value.is_aktiv_sub_title = true;
    errors.value.title.sub_title = "Sub Title field cannot be empty.";
    H.alert("warning", "Sub Title field cannot be empty.");
    return;
  } else {
    storageDialogCreatedTitle.value.is_aktiv_sub_title = false;
  }
  if (!storageDialogCreatedTitle.value?.role_user) {
    storageDialogCreatedTitle.value.is_aktiv_role_user = true;
    errors.value.title.role_user = "Role User field cannot be empty.";
    H.alert("warning", "Sub Title field cannot be empty.");
    return;
  } else {
    storageDialogCreatedTitle.value.is_aktiv_role_user = false;
  }

  try {
    storageDialogCreatedTitle.value.is_save_loading = true
    const response = useApi().post(
      "/superadmin/path-master/title/save-data",
      storageDialogCreatedTitle.value
    );
    storageDialogCreatedTitle.value.is_save_loading = false
    storageDialogCreatedTitle.value.is_aktiv = false;
    storageDialogCreatedTitle.value = {};
  } catch (err) {
    dataTitle.value = "";
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch data.";

    H.alert("error", message);
    storageDialogCreatedTitle.value.is_save_loading = false
  } finally {
  }
};

const toggleCreatedSubTitle = () => {
  dataSubtitle.value.toggleCreatedSubTitle = true;
  dataSubtitle.value.titleToggleCreatedSubTitle = "Created Sub Title";
  dataSubtitle.value.form.title_name = dataShowTitle.value.sub_title;
  dataSubtitle.value.form.title_id = dataShowTitle.value.id;
};

const showSubtitle = (data: any) => {
  dataShowTitle.value = data;
};

const functionSaveSubTitle = async () => {
  if (!dataSubtitle.value.form.name) {
    dataSubtitle.value.is_aktiv_name = true;
    (errors.value.subTitle.name = "Name field cannot be empty."),
      H.alert("warning", "Name field cannot be empty.");
    return;
  }
  if (!dataSubtitle.value.form.path) {
    dataSubtitle.value.is_aktiv_path = true;
    (errors.value.subTitle.path = "Path field cannot be empty."),
      H.alert("warning", "Path field cannot be empty.");
    return;
  }
  if (!dataSubtitle.value.form.component) {
    dataSubtitle.value.is_aktiv_component = true;
    (errors.value.subTitle.component = "Component field cannot be empty."),
      H.alert("warning", "Component field cannot be empty.");
    return;
  }

  try {
    dataSubtitle.value.is_save_loading = true;

    await useApi().post(
      "/superadmin/path-master/sub-title/new-sub-title",
      dataSubtitle.value.form
    );

    dataSubtitle.value.toggleCreatedSubTitle = false;
    dataSubtitle.value.is_save_loading = false;

    dataSubtitle.value.form = {};
  } catch (err) {
    dataTitle.value = "";
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch data.";

    H.alert("error", message);
    dataSubtitle.value.is_save_loading = false;
  }
};

const storageDataEditTitle = (params:any)=>{
  console.log('data params',params);
  storageDialogCreatedTitle.value.is_aktiv = true;
  storageDialogCreatedTitle.value.title = "Update Title";

  // storageDialogCreatedTitle.value.sub_title = params.sub_title
  // storageDialogCreatedTitle.value.path
}
</script>
