import { TaskCard } from "./TaskCard"
import { Task } from "../classes/Task"
import { ChildBubble } from "./ChildBubble"
// import { useEffect, useState } from "react"


export const ParentChildSelector = ({setSelectedChild}) => {
    // console.log(task)

    return (
        <>
            <h2 className="text-2xl font-bold mb-2 ">Select Child</h2>
            <div className="max-h-3/4 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0">
                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="flex flex-wrap gap-8 justify-around">
                    {[...Array(2)].map((x, i) =>
                        <ChildBubble key={i} childName={`Child ${i + 1}`} childId={i} onSelect={setSelectedChild} />
                    )}

                </div>
            </div>
        </>
    )
}