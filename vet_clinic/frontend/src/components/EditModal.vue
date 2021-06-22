<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="updatePrescription">
          <h1>Edit Modal</h1>
        <div class="field">
          <label class="label">Prescribed By</label>
          <div class="control">
            <input
              v-model="prescribedBy"
              class="input"
              type="text"
              placeholder="Enter prescriber's name"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Prescription</label>
          <div class="control">
            <textarea
              v-model="prescription"
              class="textarea"
              placeholder="Enter Prescription"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Disease</label>
          <div class="control">
            <input
              v-model="disease"
              class="input"
              type="text"
              placeholder="Enter name of disease"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Livestock</label>
          <div class="control">
            <input
              v-model="livestock"
              class="input"
              type="text"
              placeholder="Enter livestock"
            />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { Prescription } from '@/store/state'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'
export default {
  name: 'EditModal',
  props: {
      id: { type: Number, required: true }
  },
  setup(props: any) {
    const state = reactive({
      prescription: '',
      prescribedBy: '',
      disease: '',
      livestock: ''
    })
    const store = useStore()

    const setFields = () => {
       const prescription = store.getters.getPrescriptionById(Number(props.id))
       if(prescription) {
           console.log("prescription si kolo", prescription)
           state.prescription = prescription.vet_prescription
           state.prescribedBy = prescription.prescribed_by
           state.disease = prescription.disease
           state.livestock = prescription.livestock
       }
    }

    onMounted(() => { setFields() });

    const updatePrescription = () => {
      if (
        state.prescription === '' ||
        state.prescribedBy === '' ||
        state.disease === '' ||
        state.livestock === ''
      )
        return

      const prescription: Prescription = {
        id: props.id,
        vet_prescription: state.prescription,
        prescribed_by: state.prescribedBy,
        disease: state.disease,
        livestock: state.livestock,
        completed: false,
        editing: false
      }
      store.dispatch(ActionTypes.UpdatePrescription, prescription)
      state.prescription = ''
      state.prescribedBy = ''
      state.disease = ''
      state.livestock = ''
    }

    const closeModal = () => {
      store.commit(MutationType.SetEditModal, {showModal: false, prescriptionId: undefined})
    }

    return { closeModal, ...toRefs(state), updatePrescription }
  }
}
</script>
<style scoped>
label {
    color: #ffffff;
}
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>