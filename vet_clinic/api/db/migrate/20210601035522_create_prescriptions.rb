class CreatePrescriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :prescriptions do |t|
      t.text :vet_prescription
      t.text :prescribed_by
      t.text :disease
      t.text :livestock
      t.boolean :completed

      t.timestamps
    end
  end
end
