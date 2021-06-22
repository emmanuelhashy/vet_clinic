<template>
  <th>{{ id }}</th>
  <td>
    <input type="checkbox" :checked="completed" @change="toggleCompletion()" />
  </td>
  <td>{{ vet_prescription }} <strong>(C)</strong></td>
  <td>{{ prescribed_by }}</td>
  <td>{{ disease }}</td>
  <td>{{ livestock }}</td>
  <td>
    <span class="icon" @click="viewPrescription()">
      <i class="fa fa-eye"></i>
    </span>
    <span class="icon" @click="editPrescription()">
      <i class="fa fa-edit"></i>
    </span>
    <span class="icon" @click="removePrescription()">
      <i class="fa fa-trash"></i>
    </span>
  </td>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'

export default defineComponent({
  props: {
    vet_prescription: {type: String, required: true },
    prescribed_by: {type: String, required: true },
    disease: {type: String, required: true },
    livestock: {type: String, required: true }, 
    completed: { type: Boolean, required: true },
    id: { type: Number, required: true },
  },
  setup(props) {
    const store = useStore()

    const toggleCompletion = () => {
      store.commit(MutationType.CompletePrescription, {
        id: props.id,
        completed: !props.completed
      })
    }
    

    const removePrescription = () => {
        store.dispatch(ActionTypes.RemovePrescription, {
          id: props.id
        })
    }

    const viewPrescription = () => {
      store.commit(MutationType.SetPrescriptionModal, {showModal:true, prescriptionId:props.id})
    }

    const editPrescription = () => {
      store.commit(MutationType.SetEditModal, {showModal:true, prescriptionId: props.id})
    }

    return { toggleCompletion, removePrescription, editPrescription, viewPrescription }
  }
})
</script>
