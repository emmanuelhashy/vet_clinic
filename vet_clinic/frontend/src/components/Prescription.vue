<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1>VIEW PRESCRIPTION</h1>
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">Livestock: {{prescription.livestock }}</p>   
              <p class="subtitle is-6"> <b>Prescribed by:</b>  {{ prescription.prescribed_by }}</p>
              <p class="subtitle is-6"> <b>Disease:</b>  {{ prescription.disease }}</p>
            </div>
          </div>
          <div class="content">
            <p class="subtitle is-6">Prescription: {{ prescription.vet_prescription }}</p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default {
  name: "PrescriptionModal",
  props: {
    id: { type: Number, required: true },
  },
  setup(props: any) {
    const store = useStore();

    const prescription = computed(() => store.getters.getPrescriptionById(Number(props.id)));

    const closeModal = () => {
      store.commit(MutationType.SetPrescriptionModal, {
        showModal: false,
        prescriptionId: undefined,
      });
    };

    return { closeModal, prescription };
  },
};
</script>
<style scoped>
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>