
import { useState } from "react";

import Web3 from 'web3';
import { contractAddress, ABI } from './config';

function FormTodo({ addTodo }) {
    const [value, setValue] = useState("");
    const [counter, setCounter] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!value) {
            return
        } else {
            var web3 = window.web3;
            web3 = new Web3(web3.currentProvider);
            const instance = new web3.eth.Contract(ABI, contractAddress);
            const userAccount = await web3.eth.getAccounts();
            const account = userAccount[0];
            const statusOfAdd = await instance.methods.addTask(value).send({ from: account })
            console.log(statusOfAdd)
            if (statusOfAdd.status) {
                addTodo(value);
                setCounter(counter + 1);
                setValue("");
            }
        }
    };

    function handleTextValue(e) {
        setValue(e.target.value)
    }

    return (
        <form>
            <b>Add Todo</b>
            <input type="text" className="input" value={value} onChange={handleTextValue} placeholder="Add new todo" />
            <button onClick={handleSubmit}>Add Task</button>
        </form>
    );
}

export default FormTodo