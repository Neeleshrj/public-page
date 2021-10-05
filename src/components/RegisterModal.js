import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

export default function RegisterModal() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    dob: "",
    gender: "",
    language: "",
    state: "",
    area: "",
    residential_address: "",
    pincode: "",
    city: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function sendSMS(data) {
    console.log(data)
    await fetch("https://pragyanpandey05.pythonanywhere.com/api/webmessage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then((json) => {
        if (json.status === "message sent") {
          console.log("Succ");
        } else {
          console.log("Failed to send message");
        }
      })
      .catch((e) => console.log(e));
  }
  async function userRegister() {
    let item = {
      name: register.name,
      email: register.email,
      number: register.number,
      password: register.password,
      dob: register.dob,
      gender: register.gender,
      language: register.language,
      state: register.state,
      area: register.area,
      residential_address: register.residential_address,
      pincode: register.pincode,
      city: register.city,
    };
    await fetch("https://pragyanpandey05.pythonanywhere.com/api/register1", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "entry not added") {
          alert("Please fill in all fields");
        }
        if (json.status === "user already exists") {
          alert("User already exists");
        }
        if (json.status === "entry added") {
          const data = {
            number: register.number,
          };
          setRegister({
            name: "",
            email: "",
            number: "",
            password: "",
            dob: "",
            gender: "",
            language: "",
            state: "",
            area: "",
            residential_address: "",
            pincode: "",
            city: "",
          });
          document.getElementById("registerModalDismiss").click();

          let successModal = new Modal(document.getElementById("successModal"));
          successModal.show();
          sendSMS(data);
          // fetch ("https://pragyanpandey05.pythonanywhere.com/api/webmessage",{
          //   method: "POST",
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(data)
          // })
          // .then(res => {
          //   if(res.data.status === "message sent"){
          //     console.log('Succ')
          //   }else{
          //     console.log("Failed to send message")
          //   }
          // }).catch(e => console.log(e))
          //alert('Congratulations, your account has been successfully created.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div
        className="modal fade"
        id="registmodal"
        tabIndex="-1"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <form
            className="modal-content shadow border-0 rounded-0 overflow-hidden modal-shape"
            autoComplete="off"
          >
            <img
              src={"images/shape/blue-circle.svg"}
              className="shape mdshape-1"
              alt="shape-5"
            />
            <img
              src={"images/shape/lightblue-diamond.svg"}
              className="shape mdshape-2"
              alt="shape-6"
            />
            <img
              src={"images/shape/yellow-circle.svg"}
              className="shape mdshape-3"
              alt="shape-5"
            />
            <img
              src={"images/shape/lightyellow-diamond.svg"}
              className="shape mdshape-4"
              alt="shape-6"
            />
            <div className="modal-header d-block position-relative">
              <h4 className="modal-title fw-bold text-blue">
                Registration form
              </h4>
              <div className="small d-block text-blue">
                Fill in your details
              </div>
              <button
                type="button"
                id="registerModalDismiss"
                className="btn-close top-0 end-0 mt-3 me-3 position-absolute"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row px-lg-5">
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="m_fullname"
                      placeholder="Full Name"
                      name="name"
                      onChange={handleChange}
                      value={register.name}
                    />
                    <label htmlFor="m_fullname">Full Name</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="m_email"
                      placeholder="Email ID"
                      name="email"
                      onChange={handleChange}
                      value={register.email}
                    />
                    <label htmlFor="m_email">Email ID</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="m_phonenumber"
                      placeholder="Phone Number"
                      name="number"
                      onChange={handleChange}
                      value={register.number}
                    />
                    <label htmlFor="m_phonenumber">Phone Number</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="m_password"
                      placeholder="Set Password"
                      autoComplete="new-password"
                      name="password"
                      onChange={handleChange}
                      value={register.password}
                    />
                    <label htmlFor="m_password">Set Password</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="m_gender"
                      name="gender"
                      onChange={handleChange}
                      value={register.gender}
                    >
                      <option value="" disabled>
                        -
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label htmlFor="m_gender">Gender</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="m_language"
                      name="language"
                      onChange={handleChange}
                      value={register.language}
                    >
                      <option value="" disabled>
                        -
                      </option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="urdu">Urdu</option>
                      <option value="others">others</option>
                    </select>
                    <label htmlFor="m_classname">Select Language</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="m_dob"
                      placeholder="Date of Birth"
                      name="dob"
                      onChange={handleChange}
                      value={register.dob}
                      min="1985-01-01"
                      max="2003-12-31"
                    />
                    <label htmlFor="m_dob">Date of Birth</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="m_city"
                      placeholder="City"
                      name="city"
                      onChange={handleChange}
                      value={register.city}
                    />
                    <label htmlFor="m_city">City</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="m_raddress"
                      placeholder="Residential Address"
                      name="residential_address"
                      onChange={handleChange}
                      value={register.residential_address}
                    />
                    <label htmlFor="m_raddress">Residential Address</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="m_state"
                      name="state"
                      onChange={handleChange}
                      value={register.state}
                    >
                      <option value="" disabled>
                        -
                      </option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <label htmlFor="m_state">State</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="m_pincode"
                      placeholder="Pincode"
                      name="pincode"
                      onChange={handleChange}
                      value={register.pincode}
                      maxLength="6"
                      min="100000"
                      max="999999"
                      required
                    />
                    <label htmlFor="m_pincode">Pincode</label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="m_area"
                      name="area"
                      onChange={handleChange}
                      value={register.area}
                    >
                      <option value="" disabled>
                        -
                      </option>
                      <option value="Nerela">Nerela</option>
                      <option value="Burari">Burari</option>
                      <option value="Timarpur">Timarpur</option>
                      <option value="Adarsh Nagar">Adarsh Nagar</option>
                      <option value="Badli">Badli</option>
                      <option value="Rithala">Rithala</option>
                      <option value="Bawana">Bawana</option>
                      <option value="Mundka">Mundka</option>
                      <option value="Kirari">Kirari</option>
                      <option value="Sultanpur Majra">Sultanpur Majra</option>
                      <option value="Nangloi Jat">Nangloi Jat</option>
                      <option value="Mangol Puri">Mangol Puri</option>
                      <option value="Rohini">Rohini</option>
                      <option value="Shalimar Bagh">Shalimar Bagh</option>
                      <option value="Shakur Basti">Shakur Basti</option>
                      <option value="Tri Nagar">Tri Nagar</option>
                      <option value="Wazirpur">Wazirpur</option>
                      <option value="Model Town">Model Town</option>
                      <option value="Sadar Bazar">Sadar Bazar</option>
                      <option value="Chandni Chowk">Chandni Chowk</option>
                      <option value="Matia Mahal">Matia Mahal</option>
                      <option value="Ballimaran">Ballimaran</option>
                      <option value="Karol Bagh">Karol Bagh</option>
                      <option value="Patel Nagar">Patel Nagar</option>
                      <option value="Moti Nagar">Moti Nagar</option>
                      <option value="Madipur">Madipur</option>
                      <option value="Rajouri Garden">Rajouri Garden</option>
                      <option value="Hari Nagar">Hari Nagar</option>
                      <option value="Tilak Nagar">Tilak Nagar</option>
                      <option value="Janakpuri">Janakpuri</option>
                      <option value="Vikaspuri">Vikaspuri</option>
                      <option value="Uttam Nagar">Uttam Nagar</option>
                      <option value="Dwarka">Dwarka</option>
                      <option value="Matiala">Matiala</option>
                      <option value="Najafgarh">Najafgarh</option>
                      <option value="Bijwasan">Bijwasan</option>
                      <option value="Palam">Palam</option>
                      <option value="Delhi Cantonment">Delhi Cantonment</option>
                      <option value="Rajinder Nagar">Rajinder Nagar</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Jangpura">Jangpura</option>
                      <option value="Kasturba Nagar">Kasturba Nagar</option>
                      <option value="Malviya Nagar">Malviya Nagar</option>
                      <option value="R K Puram">R K Puram</option>
                      <option value="Mehrauli">Mehrauli</option>
                      <option value="Chhatarpur">Chhatarpur</option>
                      <option value="Deoli">Deoli</option>
                      <option value="Ambedkar Nagar">Ambedkar Nagar</option>
                      <option value="Sangam Vihar">Sangam Vihar</option>
                      <option value="Greater Kailash">Greater Kailash</option>
                      <option value="Kalkaji">Kalkaji</option>
                      <option value="Tughlkabad">Tughlkabad</option>
                      <option value="Badarpur">Badarpur</option>
                      <option value="Okhla">Okhla</option>
                      <option value="Trilokpuri">Trilokpuri</option>
                      <option value="Kondli">Kondli</option>
                      <option value="Patparganj">Patparganj</option>
                      <option value="Laxmi Nagar">Laxmi Nagar</option>
                      <option value="Vishwas Nagar">Vishwas Nagar</option>
                      <option value="Krishna Nagar">Krishna Nagar</option>
                      <option value="Gandhi Nagar">Gandhi Nagar</option>
                      <option value="Shahdara">Shahdara</option>
                      <option value="Seemapuri">Seemapuri</option>
                      <option value="Rohtas Nagar">Rohtas Nagar</option>
                      <option value="Seelampur">Seelampur</option>
                      <option value="Ghonda">Ghonda</option>
                      <option value="Babarpur">Babarpur</option>
                      <option value="Gokalpur">Gokalpur</option>
                      <option value="Mustafabad">Mustafabad</option>
                      <option value="Karawal Nagar">Karawal Nagar</option>
                    </select>
                    <label htmlFor="m_state">Area</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-center border-0">
              <button
                type="button"
                className="btn btn-primary px-4 mb-4"
                onClick={userRegister}
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modale */}

      <div
        className="modal fade show1 d-block1"
        id="successModal"
        aria-hidden="true"
        tabIndex="-1"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div
            className="modal-content shadow border-0 rounded-0 pb-4 px-4 px-md-5 pb-md-5"
            style={{
              background: `url(${"images/success.jpg"})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body text-center p-4 p-md-5 rounded-12"
              style={{
                border: "3px solid #eee",
              }}
            >
              <h2 className="display-4 fw-bold text-blue2">Congratulations</h2>
              <h2 className="display-5 fw-medium text-blue2">
                for registering as a mentor.
              </h2>
              <div className="pt-3 pt-md-4">
                <p className="h5 mb-3">Download the app to continue...</p>
                <a href="https://play.google.com/store/apps/details?id=com.basil.manishsisodiasmentorshipprogramme">
                  <img
                    src={"images/google-play.jpg"}
                    className="rounded-6 w-140px"
                    alt="google-play"
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/desh-ke-mentor/id1583406462"
                  className="m-2"
                >
                  <img
                    src={"images/app-store.jpg"}
                    className="rounded-6 w-140px"
                    alt="app-store"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
