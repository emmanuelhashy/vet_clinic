require "test_helper"

class PrescriptionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @prescription = prescriptions(:one)
  end

  test "should get index" do
    get prescriptions_url, as: :json
    assert_response :success
  end

  test "should create prescription" do
    assert_difference('Prescription.count') do
      post prescriptions_url, params: { prescription: { completed: @prescription.completed, disease: @prescription.disease, livestock: @prescription.livestock, prescribed_by: @prescription.prescribed_by, vet_prescription: @prescription.vet_prescription } }, as: :json
    end

    assert_response 201
  end

  test "should show prescription" do
    get prescription_url(@prescription), as: :json
    assert_response :success
  end

  test "should update prescription" do
    patch prescription_url(@prescription), params: { prescription: { completed: @prescription.completed, disease: @prescription.disease, livestock: @prescription.livestock, prescribed_by: @prescription.prescribed_by, vet_prescription: @prescription.vet_prescription } }, as: :json
    assert_response 200
  end

  test "should destroy prescription" do
    assert_difference('Prescription.count', -1) do
      delete prescription_url(@prescription), as: :json
    end

    assert_response 204
  end
end
