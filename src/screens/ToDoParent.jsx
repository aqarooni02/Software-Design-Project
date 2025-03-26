
import { Character } from "../components/Character"
import { NavBar } from "../components/NavBar"
import { PersonalTaskList } from "../components/PersonalTaskList"
export const ToDoParent = () => {
    return (
        <>
            <div className="h-screen flex flex-col ">
                <NavBar parent={true} />
                <div className="flex flex-1 gap-4 p-4">
                    <div className="flex-1 p-4">
                    </div>
                    <div className="flex-1 p-4">
                        <PersonalTaskList/>
                    
                    </div>
                    <div className="flex-1 p-4">
                        <Character/>
                    </div>
                </div>

            </div>
        </>
    )
}