const Task = ({input, setInput, addTask}) => {

    return (
        <div>
            <input className="w-75" value={input} placeholder="Enter task" name="task" onChange={(e) => setInput(e.target.value)} />
            <button className="btn btn-primary btn-sm mb-3 mt-2" onClick={addTask}>Add Task</button>
        </div>
    )
}

export default Task