import { GetterTree } from 'vuex'
import { State, Prescription } from './state'

export type Getters = {
  completedPrescriptionCount(state: State): number;
  totalPrescriptionCount(state: State): number;
  getPrescriptionById(state: State): (id: number) => Prescription | undefined;
}

export const getters: GetterTree<State, State> & Getters = {
  completedPrescriptionCount(state) {
    return state.prescriptions.filter(prescription => prescription.completed).length
  },
  totalPrescriptionCount(state) {
    return state.prescriptions.length
  },
  getPrescriptionById: (state) => (id: number) => {
    return state.prescriptions.find(prescription => prescription.id === id)
  }
}
