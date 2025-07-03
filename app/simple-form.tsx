"use client";
import { useState } from "react";
import axios from "axios";

export default function SimpleForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "CSE",
    gender: "male",
    boardingpoint: "",
    feesdetails: "Fully Paid",
    feesamount: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submissionDate, setSubmissionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleNext() {
    let newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value) newErrors[key] = "Required";
    });
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        // Set current date for acknowledgement
        const today = new Date();
        setSubmissionDate(today.toLocaleDateString());
        setStep(3);
      }
    }
  }

  function handleBack() {
    setStep(step - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (step !== 3) {
      handleNext();
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, form);
      
      if (response.status === 201 || response.status === 200) {
        const today = new Date();
        setSubmissionDate(today.toLocaleDateString());
        setStep(3);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setSubmitError(
        error.response?.data?.message || 
        "Failed to submit registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <h1 className="text-lg font-bold text-gray-800">Jeppiaar Institute of Technology</h1>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Already a member? <a href="#" className="text-indigo-600 font-medium">Login</a>
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Let's get you started</h2>
            <p className="text-gray-600 text-sm">Enter the details to get going</p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`h-px w-24 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'} mx-2`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`h-px w-24 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'} mx-2`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>

          {/* Step labels */}
          <div className="flex justify-center mb-10 text-sm">
            <div className="w-32 text-center">
              <span className={`font-medium ${step === 1 ? 'text-indigo-600' : 'text-gray-400'}`}>Registration Details</span>
            </div>
            <div className="w-32 text-center">
              <span className={`font-medium ${step === 2 ? 'text-indigo-600' : 'text-gray-400'}`}>Confirmation</span>
            </div>
            <div className="w-32 text-center">
              <span className={`font-medium ${step === 3 ? 'text-indigo-600' : 'text-gray-400'}`}>Acknowledgement</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    className={`w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                  <input
                    className={`w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number*</label>
                  <input
                    className={`w-full border ${errors.rollNo ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    name="rollNo"
                    value={form.rollNo}
                    onChange={handleChange}
                    placeholder="Enter your roll number"
                  />
                  {errors.rollNo && <span className="text-xs text-red-500 mt-1">{errors.rollNo}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                  <div className="relative">
                    <select
                      className={`w-full border ${errors.department ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="CSBS">CSBS</option>
                      <option value="MECH">MECH</option>
                      <option value="AIDS">AIDS</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.department && <span className="text-xs text-red-500 mt-1">{errors.department}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                  <div className="relative">
                    <select
                      className={`w-full border ${errors.gender ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.gender && <span className="text-xs text-red-500 mt-1">{errors.gender}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Boarding Point*</label>
                  <input
                    className={`w-full border ${errors.boardingpoint ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    name="boardingpoint"
                    value={form.boardingpoint}
                    onChange={handleChange}
                    placeholder="Enter your boarding point"
                  />
                  {errors.boardingpoint && <span className="text-xs text-red-500 mt-1">{errors.boardingpoint}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fees Details*</label>
                  <div className="relative">
                    <select
                      className={`w-full border ${errors.feesdetails ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                      name="feesdetails"
                      value={form.feesdetails}
                      onChange={handleChange}
                    >
                      <option value="Fully Paid">Fully Paid</option>
                      <option value="Partially Paid">Partially Paid</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.feesdetails && <span className="text-xs text-red-500 mt-1">{errors.feesdetails}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fees Amount*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      className={`w-full border ${errors.feesamount ? 'border-red-300' : 'border-gray-300'} rounded-md pl-7 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                      name="feesamount"
                      value={form.feesamount}
                      onChange={handleChange}
                      placeholder="Enter fees amount"
                    />
                  </div>
                  {errors.feesamount && <span className="text-xs text-red-500 mt-1">{errors.feesamount}</span>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Your Information</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{form.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{form.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Roll Number</p>
                      <p className="font-medium">{form.rollNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{form.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{form.gender === 'male' ? 'Male' : form.gender === 'female' ? 'Female' : 'Other'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Boarding Point</p>
                      <p className="font-medium">{form.boardingpoint}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fees Details</p>
                      <p className="font-medium">{form.feesdetails}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fees Amount</p>
                      <p className="font-medium">₹{form.feesamount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please verify all details before proceeding. Once submitted, you cannot modify this information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{submitError}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-green-800">Registration Successful</h3>
                  </div>
                  
                  <div className="border-t border-green-200 pt-4">
                    <h4 className="text-lg font-bold text-center mb-4">Acknowledgement Letter</h4>
                    <div className="space-y-4">
                      <p>Date: {submissionDate}</p>
                      <p>Dear {form.name},</p>
                      <p>We are pleased to confirm that your registration for the first year program has been successfully processed. Below are the details of your registration:</p>
                      
                      <div className="bg-white rounded p-4 border border-green-100">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr>
                              <td className="py-2 font-medium">Name:</td>
                              <td>{form.name}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Roll Number:</td>
                              <td>{form.rollNo}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Department:</td>
                              <td>{form.department}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Email:</td>
                              <td>{form.email}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Boarding Point:</td>
                              <td>{form.boardingpoint}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Fees Status:</td>
                              <td>{form.feesdetails}</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-medium">Amount Paid:</td>
                              <td>₹{form.feesamount}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <p>Please keep this acknowledgement for your records. You will need to present this information during orientation.</p>
                      <p>For any queries, please contact the administration office at admin@college.edu or call at +91-9876543210.</p>
                      <p className="pt-4">Thank you,<br />Administration Department</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              
              <div className="flex">
                {step === 3 && (
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="mr-3 px-4 py-2 border border-green-500 text-green-600 rounded-md text-sm font-medium hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Print Acknowledgement
                  </button>
                )}
                
                <button
                  type="submit"
                  className={`px-6 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : step === 3 ? "Submit Registration" : step === 2 ? "Confirm & Submit" : "Next"}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
} 