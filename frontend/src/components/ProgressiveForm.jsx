import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import animationData from "./Animation - 1733053843557.json";
import "./ProgressiveForm.css";

const ProgressiveForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const nextStep = async () => {
    const valid = await trigger(getFieldsForStep(step));
    if (valid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true); // Show success state
        reset(); // Reset form fields
      } else {
        alert("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ["firstName", "lastName", "age"];
      case 2:
        return ["street", "city", "state"];
      case 3:
        return ["cardNumber", "expiryDate", "cvv", "cardHolderName"];
      default:
        return [];
    }
  };

  const progressPercent = ((step - 1) / 2) * 100;

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      
      {/* Progress Bar */}
      <ProgressBar
        percent={progressPercent}
        filledBackground="linear-gradient(to right, #6a11cb, #2575fc)"
      />

      {isSubmitted ? (
        <div className="submission-success">
          <Lottie animationData={animationData} loop={false} style={{ width: 200, height: 200 }} />
          <p>Form submitted successfully!</p>
          <button
            onClick={() => {
              reset(); // Reset the form
              setStep(1); // Set the step back to the first step
              setIsSubmitted(false); // Hide the success screen
              navigate("/"); // Navigate to the form page
            }}
            className="back-to-form-button"
          >
            Back to Registration Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <h2>Step 1: Personal Details</h2>
              <label>
                First Name:
                <input
                  type="text"
                  {...register("firstName", { required: "First Name is required" })}
                />
              </label>
              {errors.firstName && <p>{errors.firstName.message}</p>}

              <label>
                Last Name:
                <input
                  type="text"
                  {...register("lastName", { required: "Last Name is required" })}
                />
              </label>
              {errors.lastName && <p>{errors.lastName.message}</p>}

              <label>
                Age:
                <input type="number" {...register("age", { valueAsNumber: true })} />
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2: Address Details</h2>
              <label>
                Street:
                <input
                  type="text"
                  {...register("street", { required: "Street is required" })}
                />
              </label>
              {errors.street && <p>{errors.street.message}</p>}

              <label>
                City:
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                />
              </label>
              {errors.city && <p>{errors.city.message}</p>}

              <label>
                State:
                <select {...register("state", { required: "State is required" })}>
                  <option value="">Select a State</option>
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="New York">New York</option>
                </select>
              </label>
              {errors.state && <p>{errors.state.message}</p>}

              <label>
                Zip Code:
                <input type="text" {...register("zipCode")} />
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Step 3: Payment Details</h2>
              <label>
                Card Number:
                <input
                  type="text"
                  {...register("cardNumber", { required: "Card Number is required" })}
                />
              </label>
              {errors.cardNumber && <p>{errors.cardNumber.message}</p>}

              <label>
                Expiry Date:
                <input
                  type="text"
                  placeholder="MM/YY"
                  {...register("expiryDate", { required: "Expiry Date is required" })}
                />
              </label>
              {errors.expiryDate && <p>{errors.expiryDate.message}</p>}

              <label>
                CVV:
                <input
                  type="text"
                  {...register("cvv", { required: "CVV is required" })}
                />
              </label>
              {errors.cvv && <p>{errors.cvv.message}</p>}

              <label>
                Card Holder Name:
                <input
                  type="text"
                  {...register("cardHolderName", { required: "Card Holder Name is required" })}
                />
              </label>
              {errors.cardHolderName && <p>{errors.cardHolderName.message}</p>}
            </div>
          )}

          <div className="buttons">
            {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
            {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
            {step === 3 && <button type="submit">Submit</button>}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProgressiveForm;
