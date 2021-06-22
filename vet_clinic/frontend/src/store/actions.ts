import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, Prescription, Data } from './state'
import axios from 'axios';
const apiUrl = "http://localhost:3000/prescriptions";

export enum ActionTypes {
  GetPrescriptions = 'GET_PRESCRIPTIONS',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  RemovePrescription = 'REMOVE_PRESCRIPTION',
  CreatePrescription = 'CREATE_PRESCRIPTION',
  UpdatePrescription = 'UPDATE_PRESCRIPTION',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}


export type Actions = {
  [ActionTypes.GetPrescriptions](context: ActionAugments): void;
  [ActionTypes.SetCreateModal](context: ActionAugments): void;
  [ActionTypes.SetEditModal](context: ActionAugments): void;
  [ActionTypes.RemovePrescription](context: ActionAugments, Prescription: {id: number}): void;
  [ActionTypes.CreatePrescription](context: ActionAugments, data: Data): void;
  [ActionTypes.UpdatePrescription](context: ActionAugments, prescription: Prescription): void;

}


export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetPrescriptions]({ commit }) {
    commit(MutationType.SetLoading, true)

    const response = await axios.get(apiUrl);

    commit(MutationType.SetLoading, false)
    commit(MutationType.SetPrescriptions, response.data)

  },

  async [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true)
  },

  async [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, {showModal: true, prescriptionId: 1})
  },



//Optimistic update
  async [ActionTypes.RemovePrescription]({ commit }, Prescription) {
    if(Prescription != undefined) {
      commit(MutationType.RemovePrescription, Prescription)
    }

    const response = await axios.delete(`${apiUrl}/${Prescription.id}`);

  },

  async [ActionTypes.CreatePrescription]({ commit, dispatch }, Prescription) {

    const response = await axios.post(apiUrl, Prescription)
    dispatch(ActionTypes.GetPrescriptions)
  },

  async [ActionTypes.UpdatePrescription]({ commit, dispatch }, Prescription) {
    if(Prescription != undefined) {
      commit(MutationType.UpdatePrescription, Prescription)
      const response = await axios.patch(`${apiUrl}/${Prescription.id}`, Prescription);
      dispatch(ActionTypes.GetPrescriptions)
    }

  },
}


