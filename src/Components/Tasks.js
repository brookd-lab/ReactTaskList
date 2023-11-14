const Tasks = ({tasks, removeTask, setReminder}) => {
    
    const TaskList = () => {
        return (
                <table>
                    <tbody className="">
                       {tasks.map(task => {
                         return (
                              <tr className="task-input" key={task.id} onDoubleClick={() => setReminder(task.id)}>
                                <td><span className={task.reminder ? "task-reminder mb-2 mt-1" : "task mb-2 mt-1"}>&nbsp;{task.name}</span></td>
                                <td>&nbsp;</td>
                                <td className="remove" onClick={() => removeTask(task.id)}>X</td>
                              </tr>
                          );
                       })}
                       </tbody>
                    </table>
           
            // <div className="container">
            //     {tasks.map(task => (
            //         <div className="" key={task.id} onDoubleClick={() => setReminder(task.id)}> 
            //             <span className={task.reminder ? "taskReminder" : "task"}>{task.name}</span>
            //             <div className="remove" onClick={() => removeTask(task.id)}>X</div>
            //         </div>
            //     ))}
            // </div>
        )
    }

  
    return (
        <TaskList className="text-center w-100" />
    )
}

export default Tasks