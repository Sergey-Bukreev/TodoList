import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

export default {
    title:"Task",
    component: Task
}
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")
export const TaskBaseExample = (props:any) => {
   return <>
            <Task task={{id:"1", title:"CSS", isDone:true}}
                 todolistId={"todolistId1"}
                 changeStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTask={removeTaskCallback}
            />
            <Task task={{id:"2", title:"JS", isDone:false}}
                 todolistId={"todolistId2"}
                 changeStatus={changeTaskStatusCallback}
                 changeTaskTitle={changeTaskTitleCallback}
                 removeTask={removeTaskCallback}
           />
           </>
}