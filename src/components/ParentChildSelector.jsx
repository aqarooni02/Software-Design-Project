
import { ChildBubble } from "./ChildBubble"
import { useCallback, useEffect, useState } from "react";


export const ParentChildSelector = ({ childSelected, setSelectedChild }) => {
    // console.log(task)
    const [children, setChildren] = useState([]);

    const loadChildren = useCallback(() => {
        const parentData = JSON.parse(localStorage.getItem("parent_data"));

        if (parentData == null) {
            const defaultData = { childrenIds: [], personalTasks: [] };
            localStorage.setItem("parent_data", JSON.stringify(defaultData));
            setChildren([]);
        } else {
            const loadedChildren = parentData.childrenIds
                .map((childId) => JSON.parse(localStorage.getItem(`child_${childId}`)))
                .filter(Boolean);
            setChildren(loadedChildren);
        }
    }, []);

    useEffect(() => {
        loadChildren();
    }, [loadChildren]);

    console.log(children)

    return (
        <>
            <h2 className="text-2xl font-bold mb-2 ">Select Child</h2>
            <div className="max-h-3/4 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0">
               

                {!childSelected ?

                    <div className="flex flex-wrap gap-8 justify-around">
                        {children.map((child, i) =>
                            <ChildBubble key={i} childId={child.id} childName={child.name} childTheme={child.theme} onSelect={setSelectedChild} />
                        )}

                    </div>

                    :
                    <button
                        className="bg-blue-500 px-4 py-1 rounded text-white "
                        onClick={() => setSelectedChild(null)}
                    >
                        Back
                    </button>
                }

            </div>

        </>
    )
}