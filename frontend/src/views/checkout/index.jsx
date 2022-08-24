import React, { useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BasePageTitle from "../../components/base/BasePageTitle";
import transitions from "./transitions.module.css";
import StepWizard from "react-step-wizard";
import ProductCart from "../../components/views/cart/ProductCart";
import { PaymentCard } from "./PaymentCard";
function CheckOutPage() {
  const { cart } = useSelector((state) => state.cart);
  
  const [state, updateState] = useState({
    form: {
        address:JSON.parse(window.sessionStorage.getItem('formData')) ? JSON.parse(window.sessionStorage.getItem('formData')).address : '',
        city:JSON.parse(window.sessionStorage.getItem('formData')) ? JSON.parse(window.sessionStorage.getItem('formData')).city : '',
        country: JSON.parse(window.sessionStorage.getItem('formData')) ? JSON.parse(window.sessionStorage.getItem('formData')).country : '',
        state: JSON.parse(window.sessionStorage.getItem('formData')) ? JSON.parse(window.sessionStorage.getItem('formData')).state : '',
        zip: JSON.parse(window.sessionStorage.getItem('formData')) ? JSON.parse(window.sessionStorage.getItem('formData')).zip : '',
        phone: JSON.parse(window.sessionStorage.getItem('formData')) ? JSON.parse(window.sessionStorage.getItem('formData')).phone : '',
    },
    transitions: {
      enterRight: `${transitions.animated} ${transitions.enterRight}`,
      enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
      exitRight: `${transitions.animated} ${transitions.exitRight}`,
      exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
      intro: `${transitions.animated} ${transitions.intro}`,
    },
    demo: false, // uncomment to see more
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    updateState({
      ...state,
      form,
    });
  };

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });
  return (
    <div className="boxed">
      {cart.length > 0 ? (
        <>
          <BasePageTitle
            detail={{
              background: "bg-parallax1.jpg",
              title: "CheckOut",
              breadCrumb: "checkout",
            }}
          />
          <div className="container mt-5">
            <StepWizard
              isHashEnabled
              transitions={state.transitions} // comment out for default transitions
              
              instance={setInstance}
            >
              <First
                hashKey={"FirstStep"}
                update={updateForm}
                formData={state.form}
              />
              <Second form={state.form} />
              {null /* will be ignored */}
              <Last hashKey={"TheEnd!"} />
            </StepWizard>
          </div>
        </>
      ) : (
        <Navigate to="/" replace />
      )}
      <div className="container"></div>
    </div>
  );
}

export default CheckOutPage;



const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
}) => (
  <div>
    <hr />
    {step > 1 && (
      <button className="" onClick={previousStep}>
        Go Back
      </button>
    )}
    {step < totalSteps ? (
      <button className="" onClick={nextStep}>
        Continue
      </button>
    ) : (
      <button className="" onClick={nextStep}>
        Finish
      </button>
    )}
  </div>
);

/** Steps */

const First = (props) => {
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };
  const validateForm = () => {
    const { formData } = props;
    if (
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zip &&
      formData.country
    ) {
        sessionStorage.setItem('formData', JSON.stringify(formData));
        
      return true;
    }
    return false;
    // console.log(props);
  };

  return (
    <div>
      <h3 className="text-center">Shipping Details</h3>
      <div
        className="
        form-group
      "
      >
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          placeholder="Address"
          value={props.formData.address}
          onChange={update}
        />
      </div>

      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          className="form-control"
          name="state"
          placeholder="State"
          value={props.formData.state}
          onChange={update}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          placeholder="City"
          value={props.formData.city}
          onChange={update}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          placeholder="Phone Number"
          value={props.formData.phone}
          onChange={update}
        />
      </div>
      <div className="form-group">
        <label>Pin Code</label>
        <input
          type="text"
          className="form-control"
          name="zip"
          placeholder="Pin Code"
          value={props.formData.zip}
          onChange={update}
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <select name="country" onChange={update}
          value={props.formData.country}
        >
          <option disabled>Select Country</option>
          <option value="pk">Pakistan</option>
          <option value="ind">India</option>
          <option value="aus">Aus</option>
        </select>
      </div>
      {validateForm() ? (
        <Stats step={1} {...props} />
      ) : (
        <button className="btn-default" disabled>
          All Fields Required
        </button>
      )}
    </div>
  );
};

const Second = (props) => {
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);
  const [tex, setTex] = useState(0);
  const [shipping, setShipping] = useState(0);
  useEffect(() => {
    setTex(totalPrice * 0.05);
    setShipping(totalPrice * 0.1);   
  }, [totalPrice]);
  const formateNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    }).format(num);
  
  const validate = () => {
    if (window.confirm("Are you sure you want to go back?")) {
      // eslint-disable-line
      props.previousStep();
    }
  };

  return (
    <div>
        <h3 className="text-center">Status Confirmation</h3>
      {
        props.form.address ? (
            <div>
                <p><b>Address:</b> {props.form.address}</p>
                <p>
                    <b>State:</b> {props.form.state}
                </p>
                <p>
                    <b>City:</b> {props.form.city}
                </p>
                <p>
                    <b>Phone:</b> {props.form.phone}
                </p>
                <p>
                    <b>Pin Code:</b> {props.form.zip}
                </p>
                <p>
                    <b>Country:</b> {props.form.country}
                </p>
                <div className="container cart-View-container ">
        {totalItems > 0 && (
          <>
            <div className="title-section margin-bottom-55 mt-5">
              <h2 className="title">Cart Detail</h2>
            </div>
            <div className="shopping-cart">
              <div className="column-labels">
                <label className="product-image">Image</label>
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-removal">Remove</label>
                <label className="product-line-price">Total</label>
              </div>

              {cart.map((cart) => (
                <ProductCart product={cart} key={cart.productId} />
              ))}

              <div className="totals">
                <div className="totals-item">
                  <label>Subtotal</label>
                  <div className="totals-value" id="cart-subtotal">
                    {formateNumber(totalPrice)}
                  </div>
                </div>
                <div className="totals-item">
                  <label>Tax (5%)</label>
                  <div className="totals-value" id="cart-tax">
                    {formateNumber(tex)}
                  </div>
                </div>
                <div className="totals-item">
                  <label>Shipping</label>
                  <div className="totals-value" id="cart-shipping">
                    {formateNumber(shipping)}
                  </div>
                </div>
                <div className="totals-item totals-item-total">
                  <label>Grand Total</label>
                  <div className="totals-value" id="cart-total">
                    {formateNumber(totalPrice + tex + shipping)}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
            </div>
        ) : (
            <div>
                <p>Address</p>
                <p>State</p>
                <p>City</p>
                <p>Phone</p>
                <p>Pin Code</p>
                <p>Country</p>
            </div>
        )
      }
      <Stats step={2} {...props} previousStep={validate} />
    </div>
  );
};

const Last = (props) => {
  const submit = () => {
    alert("You did it! Yay!"); // eslint-disable-line
  };

  return (
    <div>
      <PaymentCard />
      <Stats step={4} {...props} nextStep={submit} />
    </div>
  );
};
