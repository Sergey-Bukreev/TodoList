import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

export default {
    title:"Task",
    component: Task
}
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")
export const TaskBaseExample = (props:any) => {
   return <>
            <Task task={{id:"1", title:"CSS", status:TaskStatuses.Completed, todoListId:"todolistId1",
                        addedDate:"", deadline:"", startDate:"", order:1, priority:TaskPriorities.Low,
                        description:""
                        }}
                 todolistId={"todolistId1"}
                 changeStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTask={removeTaskCallback}
            />
            <Task task={{id:"2", title:"JS", status:TaskStatuses.New, todoListId:"todolistId2",
                        addedDate:"", deadline:"", startDate:"", order:1,
                        priority:TaskPriorities.Low, description:""
            }}
                 todolistId={"todolistId2"}
                 changeStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTask={removeTaskCallback}
           />
           </>
}