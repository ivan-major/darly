import React, { useState, useEffect, ReactEventHandler } from "react";
import Person from "../types";
import "./TablePersonal.scss";
import { Form } from "../Form";
import { api } from "../../api/api";
import classNames from "classnames";

export const TablePersonal = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [fetching, setFetching] = useState(true);
    const [count, setCount] = useState(0);
    const [rows, setRows] = useState(5);

    useEffect(() => {
        totalPersons();
    }, []);

    useEffect(() => {
        const body = document.querySelector(".table-body");
        body?.addEventListener("scroll", scrollHandler);

        return function () {
            body?.removeEventListener("scroll", scrollHandler);
        };
    }, [persons]);

    useEffect(() => {
        if (fetching) {
            personsFromServer();
        }
    }, [fetching]);

    const scrollHandler = (elem: Event) => {
        const target = elem.target as HTMLElement;

        if (
            target.scrollHeight - target.scrollTop < 230 &&
            persons.length < count
        ) {
            setFetching(true);
        }
    };

    const totalPersons = async () => {
        const total = await api.get("/personal");
        setCount((state) => (state = total.length));
    };

    const personsRow = async (n: number) => {
        const server = await api.get(`/personal?_page=1&_limit=${n}`);

        setPersons(() => server);
        setPage((state) => (state = 2));
    };

    const numbersRow = (number: number) => {
        setRows((state) => (state = number));
        personsRow(number);
    };

    const personsFromServer = async () => {
        try {
            await api
                .get(`/personal?_page=${page}&_limit=${rows}`)
                .then((response) => {
                    setPersons([...persons, ...response]);
                    setPage((state) => state + 1);
                })
                .finally(() => {
                    setFetching(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const toggleForm = () => {
        setOpenForm(!openForm);
    };

    return (
        <div className="personal">
            <div className="buttons">
                <div className="buttons__title fs-3">Row's number</div>
                <div className="buttons__container">
                    <button
                        className={classNames(
                            "buttons__button btn",
                            rows === 5
                                ? "btn-outline-success"
                                : "btn-success btn-lg"
                        )}
                        onClick={() => numbersRow(5)}
                    >
                        5
                    </button>
                    <button
                        className={classNames(
                            "buttons__button btn",
                            rows === 10
                                ? "btn-outline-success"
                                : "btn-success btn-lg"
                        )}
                        onClick={() => numbersRow(10)}
                    >
                        10
                    </button>
                    <button
                        className={classNames(
                            "buttons__button btn",
                            rows === 15
                                ? "btn-outline-success"
                                : "btn-success btn-lg"
                        )}
                        onClick={() => numbersRow(15)}
                    >
                        15
                    </button>
                </div>
            </div>
            <table className="table personal-table">
                <thead className="table-dark">
                    <tr className="personal-table__row header">
                        <th
                            scope="col"
                            className="fs-3 header__cell header__cell_1"
                        >
                            #
                        </th>
                        <th scope="col" className="fs-3 header__cell">
                            Name
                        </th>
                        <th scope="col" className="fs-3 header__cell">
                            Email
                        </th>
                        <th scope="col" className="fs-3 header__cell">
                            Phone
                        </th>
                        <th scope="col" className="fs-3 header__cell">
                            Salary
                        </th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {persons.map((person: Person) => (
                        <tr
                            key={person.id}
                            className="table-secondary personal-table__row"
                        >
                            <th
                                scope="col"
                                className="fs-4 header__cell header__cell_1"
                            >
                                {person.id}
                            </th>
                            <td className="fs-4 header__cell">{`${person.firstname} ${person.secondname}`}</td>
                            <td className="fs-4 header__cell">
                                {person.email}
                            </td>
                            <td className="fs-4 header__cell">
                                {person.phone}
                            </td>
                            <td className="fs-4 header__cell">{`${person.salary}$`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success btn-lg" onClick={toggleForm}>
                Add new person
            </button>

            <Form openForm={openForm} toggleForm={toggleForm} />
        </div>
    );
};
