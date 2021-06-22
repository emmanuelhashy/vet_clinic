<template>
  <table class="table is-hoverable is-striped">
    <thead>
      <tr>
        <th><abbr title="Position">Prescription Id</abbr></th>
        <th>Treated</th>
        <th>Prescription</th>
        <th><abbr title="Won">Prescribed By</abbr></th>
        <th><abbr title="Drawn">Disease</abbr></th>
        <th><abbr title="Drawn">Livestock</abbr></th>
        <th><abbr title="Lost">Actions</abbr></th>
      </tr>
    </thead>
    <tbody v-if="prescriptions">
      <tr v-for="prescription in prescriptions" :key="prescription.id">
        <PrescriptionListItem  v-bind="prescription" />
      </tr>
    </tbody>
    <tfoot>
      <CreateModal v-show="showCreateModal"></CreateModal>
      <button class="button  is-success" @click="setModal">Create Prescription</button>
    </tfoot>
  </table>
  <EditModal v-if="showEditModal" :id="editModalPrescriptionId"></EditModal>
  <Prescription v-if="showPrescriptionModal" :id="showPrescriptionId"></Prescription>
</template>
<script>
import CreateModal from './CreateModal'
import EditModal from './EditModal'
import Prescription from './Prescription'
import PrescriptionListItem from './PrescriptionListItem'
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
export default defineComponent({
  name: 'Table',
  components: {
    CreateModal,
    PrescriptionListItem,
    Prescription,
    EditModal
  },
  setup() {
    const store = useStore()

    const setModal = () => {
      store.commit(MutationType.SetCreateModal, true)
    }

    const showCreateModal = computed(() => store.state.showCreateModal)
    const showEditModal = computed(() => store.state.showEditModal)
    const editModalPrescriptionId = computed(() => store.state.editModalPrescriptionId)
    const showPrescriptionModal = computed(() => store.state.showPrescriptionModal)
    const showPrescriptionId = computed(()=> store.state.showPrescriptionId)

    const prescriptions = computed(() => {console.log(store.state.prescriptions); return store.state.prescriptions})
    console.log({ prescriptions })
    return { showCreateModal, setModal, prescriptions, showEditModal, showPrescriptionModal, editModalPrescriptionId, showPrescriptionId }
  }
})
</script>
<style scoped>  
table {
  width: 100%;
}
.fa {
  font-size: 1.2rem;
  margin-left: 15px;
}
.fa:hover {
  font-size: 1.4rem;
}
</style>
