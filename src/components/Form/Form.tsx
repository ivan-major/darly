import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import Person from "../types";
import "./Form.scss";

type Props = {
    openForm: boolean;
    toggleForm: () => void;
};

export const Form: React.FC<Props> = ({ toggleForm, openForm }) => {
    const [firstname, setFirstName] = useState("");
    const [secondname, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [salary, setSalary] = useState("");

    const [errorFirstName, setErrorFirstName] = useState<string>("");
    const [errorSecondName, setErrorSecondName] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorPhone, setErrorPhone] = useState<string>("");
    const [errorSalary, setErrorSalary] = useState<string>("");

    const [disableButton, setDisableButton] = useState(true);

    const [newPerson, setNewPerson] = useState({} as Person);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "firstname":
                setFirstName(value);
                break;
            case "secondname":
                setSecondName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "salary":
                setSalary(value);
                break;
            default:
                break;
        }

        handleValid(name, value);

        if (
            errorFirstName === "valid" &&
            errorSecondName === "valid" &&
            errorEmail === "valid" &&
            errorPhone === "valid" &&
            errorSalary === "valid"
        ) {
            setDisableButton((state) => (state = false));
        } else {
            setDisableButton(() => true);
        }
    };

    const handleValid = (name: string, value: string) => {
        const validEmail =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const validPhone = /^[0-9]{10}/;

        switch (name) {
            case "firstname":
                if (value.length < 2) {
                    setErrorFirstName(() => "error");
                    // setDisableButton(true);
                } else {
                    setErrorFirstName(() => "valid");
                    // setDisableButton(false);
                }
                break;

            case "secondname":
                if (value.length < 2) {
                    setErrorSecondName(() => "error");
                    // setDisableButton(true);
                } else {
                    setErrorSecondName(() => "valid");
                    // setDisableButton(false);
                }
                break;

            case "email":
                if (!validEmail.test(value)) {
                    setErrorEmail(() => "error");
                    // setDisableButton(true);
                } else {
                    setErrorEmail(() => "valid");
                    // setDisableButton(false);
                }
                break;

            case "phone":
                if (!validPhone.test(value)) {
                    setErrorPhone(() => "error");
                    // setDisableButton(true);
                } else {
                    setErrorPhone(() => "valid");
                    // setDisableButton(false);
                }
                break;

            case "salary":
                if (value.length === 0) {
                    setErrorSalary(() => "error");
                    // setDisableButton(true);
                } else {
                    setErrorSalary((state) => (state = "valid"));
                    // setDisableButton(false);
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        if (
            errorFirstName === "valid" &&
            errorSecondName === "valid" &&
            errorEmail === "valid" &&
            errorPhone === "valid" &&
            errorSalary === "valid"
        ) {
            setNewPerson((state) => ({
                ...{
                    firstname,
                    secondname,
                    email,
                    phone,
                    salary,
                },
                ...state,
            }));
            toggleForm();
        } else {
            event.preventDefault();
            handleValid("firstname", firstname);
            handleValid("secondname", secondname);
            handleValid("email", email);
            handleValid("phone", phone);
            handleValid("salary", salary);
            // setDisableButton(true);
        }
    };

    const addPerson = async (data: Person) => {
        console.log(data);
        await api.post("/personal", data);
    };

    useEffect(() => {
        if (Object.keys(newPerson).length > 1) {
            addPerson(newPerson);
            // changePersons(newPerson);
        }
    }, [newPerson]);

    return (
        <div
            className={classNames(
                "form",
                openForm ? "form_active" : "form_not-active"
            )}
        >
            <div className="close">
                <button
                    className="btn btn-success close"
                    type="button"
                    onClick={() => toggleForm()}
                >
                    Close
                </button>
            </div>

            <form
                className="row g-4 needs-validation"
                onSubmit={(event) => {
                    handleSubmit(event);
                }}
            >
                <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                        First name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        className={classNames(
                            "form-control",
                            errorFirstName === "error" && "is-invalid",
                            errorFirstName === "valid" && "is-valid"
                        )}
                        id="validationCustom01"
                        placeholder="Enter a first name"
                        value={firstname}
                        onChange={(event) => handleChange(event)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                        Please provide a valid name - min 2 characters.
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">
                        Last name
                    </label>
                    <input
                        type="text"
                        className={classNames(
                            "form-control",
                            errorSecondName === "error" && "is-invalid",
                            errorSecondName === "valid" && "is-valid"
                        )}
                        id="validationCustom02"
                        name="secondname"
                        value={secondname}
                        placeholder="Enter a second name"
                        onChange={(event) => handleChange(event)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                        Please provide a valid name - min 2 characters.
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom03" className="form-label">
                        E-mail
                    </label>
                    <input
                        type="text"
                        className={classNames(
                            "form-control",
                            errorEmail === "error" && "is-invalid",
                            errorEmail === "valid" && "is-valid"
                        )}
                        id="validationCustom03"
                        name="email"
                        value={email}
                        placeholder="Enter an e-mail"
                        onChange={(event) => handleChange(event)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                        Please provide a valid e-mail - exemple@mail.com.
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom05" className="form-label">
                        Phone number
                    </label>
                    <input
                        type="text"
                        className={classNames(
                            "form-control",
                            errorPhone === "error" && "is-invalid",
                            errorPhone === "valid" && "is-valid"
                        )}
                        id="validationCustom05"
                        name="phone"
                        value={phone}
                        placeholder="Enter a phone number"
                        maxLength={10}
                        onChange={(event) => handleChange(event)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                        Please provide a valid phone-number - "XXXXXXXXXX".
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom05" className="form-label">
                        Salary
                    </label>
                    <input
                        type="number"
                        className={classNames(
                            "form-control",
                            errorSalary === "error" && "is-invalid",
                            errorSalary === "valid" && "is-valid"
                        )}
                        id="validationCustom05"
                        name="salary"
                        value={salary}
                        placeholder="Enter a salary"
                        onChange={(event) => handleChange(event)}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                        Please provide a valid salary - number from 0.
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-success"
                        type="submit"
                        disabled={disableButton}
                    >
                        Submit form
                    </button>
                </div>
            </form>
        </div>
    );
};
