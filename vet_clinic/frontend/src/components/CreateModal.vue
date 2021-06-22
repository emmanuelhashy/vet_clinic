<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="createPrescription">
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
              placeholder="Enter prescription"
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
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { Data } from '@/store/state'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'
export default {
  name: 'CreateModal',
  setup() {
    const state = reactive({
      prescription: '',
      prescribedBy: '',
      disease: '',
      livestock: ''
    })
    const store = useStore()

    const createPrescription = () => {
      if (
        state.prescription === '' ||
        state.prescribedBy === '' ||
        state.disease === '' ||
        state.livestock === ''
      )
        return

      const prescription: Data = {
        vet_prescription: state.prescription,
        prescribed_by: state.prescribedBy,
        disease: state.disease,
        livestock: state.livestock, 
      }
      store.dispatch(ActionTypes.CreatePrescription, prescription)
      state.prescription = ''
      state.prescribedBy = ''
      state.disease = ''
      state.livestock = ''
    }

    const closeModal = () => {
      store.commit(MutationType.SetCreateModal, false)
    }

    return { closeModal, ...toRefs(state), createPrescription }
  }
}
</script>
