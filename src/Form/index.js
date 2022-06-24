import { useRef, useState } from "react";

export default function FormEsempio() {
    /* Controlled - singolo */
    const [nameInput, setNameInput] = useState("");
    /* onChange... bla bla bla cambia name input */
    /* Controlled - multipli in oggetto */
    const [formData, saveForm] = useState({ name: "", email: "", number: null });

    /* Uncontrolled + ref */
    const formRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputElements = Array
            .from(event.target.children)
            .filter(element => element.nodeName === "INPUT")
            .map(element => ({ [element.name]: element.value }));

        console.log(inputElements);
    };

    return (
        <form ref={formRef} action="/form" onSubmit={handleSubmit}>
            <span>name </span>
            <input type="text" name="name" id="name" />
            <br />
            <span>email </span>
            <input type="email" name="email" id="email" />
            <br />
            <span>number </span>
            <input type="number" name="number" id="number" />
            <br />
            <button type='submit'>Invia</button>
        </form>
    );
}