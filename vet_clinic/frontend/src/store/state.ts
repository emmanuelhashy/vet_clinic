export type Prescription = {
  id: number;
  vet_prescription: string;
  prescribed_by: string;
  disease: string;
  livestock: string;
  completed: boolean;
  editing: boolean;
};

export type Data = {
  vet_prescription: string;
  prescribed_by: string;
  disease: string;
  livestock: string;
};

export type State = {
  loading: boolean;
  prescriptions: Prescription[];
  data: Data | null;
  showCreateModal: boolean;
  showEditModal: boolean;
  showPrescriptionModal: boolean;
  editModalPrescriptionId: number | undefined;
  showPrescriptionId: number | undefined;
};

export const state: State = {
  loading: false,
  prescriptions: [],
  data: null,
  showCreateModal: false,
  showEditModal: false,
  showPrescriptionModal: false,
  editModalPrescriptionId: undefined,
  showPrescriptionId: undefined,
};
