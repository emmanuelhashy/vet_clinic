# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Prescription.destroy_all

Prescription.create!([{
    vet_prescription:"Achyranthes aspera",
    prescribed_by:"Dr Chucks", 
    disease:"Rabbies", 
    livestock:"goat", 
    completed:false
},
{
    vet_prescription:"Achyranthes aspera",
    prescribed_by:"Dr Rex", 
    disease:"Rabbies", 
    livestock:"Dog", 
    completed:false
},
{
    vet_prescription:"ethnovet",
    prescribed_by:"Dr Chucks", 
    disease:"Pox", 
    livestock:"Sheep", 
    completed:false
}])

p "Created #{Prescription.count} prescriptions"