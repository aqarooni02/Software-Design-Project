import { localStorageManager } from "../utils/localStorageManager";
import { ChildBubble } from "./ChildBubble";
import { useCallback, useEffect, useState } from "react";

export const ParentChildSelector = ({ childSelected, setSelectedChild }) => {
    const [children, setChildren] = useState([]);

    const loadChildren = useCallback(() => {
        // const parentData = JSON.parse(localStorage.getItem("parent_data"));
        const parentData = localStorageManager.retrieveEncodedObject("parent_data");

        if (parentData == null) {
            const defaultData = { childrenIds: [], personalTasks: [] };
            // localStorage.setItem("parent_data", JSON.stringify(defaultData));
            localStorageManager.storeEncodedObject("parent_data", defaultData);
            setChildren([]);
        } else {
            const loadedChildren = parentData.childrenIds
                // .map((childId) => JSON.parse(localStorage.getItem(`child_${childId}`)))
                .map((childId) => localStorageManager.retrieveEncodedObject(`child_${childId}`))
                .filter(Boolean);
            setChildren(loadedChildren);
        }
    }, []);

    useEffect(() => {
        loadChildren();
    }, [loadChildren]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Select Child</h2> {/* Set heading to black */}
            <div className="flex flex-col items-center gap-8 p-4 overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-0">
                {!childSelected ? (
                    children.map((child, i) => (
                        <ChildBubble
                            key={i}
                            childId={child.id}
                            childName={child.name}
                            childTheme={child.theme}
                            onSelect={setSelectedChild}
                        />
                    ))
                ) : (
                    <button
                        className="bg-blue-500 px-4 py-2 rounded text-white"
                        onClick={() => setSelectedChild(null)}
                    >
                        Back
                    </button>
                )}
            </div>
        </div>
    );
};