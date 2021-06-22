import { MutationTree } from 'vuex'
import { State, Prescription, Data } from './state'

export enum MutationType {
  CreatePrescription = 'CREATE_PRESCRIPTION',
  SetPrescriptions = 'SET_PRESCRIPTIONS',
  CompletePrescription = 'COMPLETE_PRESCRIPTION',
  RemovePrescription = 'REMOVE_PRESCRIPTION',
  EditPrescription = 'EDIT_PRESCRIPTION',
  UpdatePrescription = `UPDATE_PRESCRIPTION`,

  SetLoading = 'SET_LOADING',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  SetPrescriptionModal = 'SET_PRESCRIPTION_MODAL'
}

export type Mutations = {

  [MutationType.CreatePrescription](state: State, prescription: Data): void;
  [MutationType.SetPrescriptions](state: State, prescription: Prescription[]): void;
  [MutationType.CompletePrescription](
    state: State,
    prescription: Partial<Prescription> & { id: number }
  ): void;
  [MutationType.RemovePrescription](
    state: State,
    prescription: Partial<Prescription> & { id: number }
  ): void;
  [MutationType.EditPrescription](
    state: State,
    prescription: Partial<Prescription> & { id: number }
  ): void;
  [MutationType.UpdatePrescription](
    state: State,
    prescription: Partial<Prescription> & { id: number }
  ): void;

  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetCreateModal](state: State, value: boolean): void;
  [MutationType.SetEditModal](state: State, value: {showModal: boolean, prescriptionId: number|undefined}): void;
  [MutationType.SetPrescriptionModal](state: State, value: {showModal: boolean, prescriptionId: number|undefined}): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.CreatePrescription](state, prescription) {
    state.data == prescription
  },
  [MutationType.SetPrescriptions](state, prescriptions) {
    state.prescriptions = prescriptions
  },
  [MutationType.CompletePrescription](state, newPrescription) {
    const prescription = state.prescriptions.findIndex(prescription => prescription.id === newPrescription.id)
    if (prescription === -1) return
    state.prescriptions[prescription] = { ...state.prescriptions[prescription], ...newPrescription }
  },
  [MutationType.RemovePrescription](state, Prescription) {
    const prescription = state.prescriptions.findIndex(prescription => prescription.id === Prescription.id)
    if (prescription === -1) return
    //If prescription exist in the state, remove it
    state.prescriptions.splice(prescription, 1) 
  },
  [MutationType.EditPrescription](state, Prescription) {
    const prescription = state.prescriptions.findIndex(prescription => prescription.id === Prescription.id)
    if (prescription === -1) return
    //If prescription exist in the state, toggle the editing property
    state.prescriptions[prescription] = { ...state.prescriptions[prescription], editing: !state.prescriptions[prescription].editing } 
    console.log("prescription", state.prescriptions[prescription])
  },
  [MutationType.UpdatePrescription](state, Prescription) {
    state.prescriptions = state.prescriptions.map(prescription => {
      if(prescription.id === Prescription.id) {
        return {...prescription, ...Prescription}
      }
      return prescription;
    })
  },

  [MutationType.SetLoading](state, value) {
    state.loading = value
  },
  [MutationType.SetCreateModal](state, value) {
    state.showCreateModal = value
  },
  [MutationType.SetEditModal](state, value) {
    state.showEditModal = value.showModal
    state.editModalPrescriptionId = value.prescriptionId
  },
  [MutationType.SetPrescriptionModal](state, {showModal, prescriptionId}) {
    state.showPrescriptionModal = showModal
    state.showPrescriptionId = prescriptionId
  }
}

