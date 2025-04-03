export const AssignedTaskList = ({ childType }) => {
    return (
        <>
            <h2
                className={
                    childType === "orange"
                        ? "text-2xl font-bold mb-2 text-orange-700"
                        : "text-2xl font-bold mb-2 text-pink-700"
                }
            >
                Assigned by Parent
            </h2>
            <div
                className={
                    childType === "orange"
                        ? "h-3/4 bg-orange-400/40 rounded-3xl border-2 border-orange-400 p-4 overflow-y-auto"
                        : "h-3/4 bg-pink-400/40 rounded-3xl border-2 border-pink-400 p-4 overflow-y-auto"
                }
            >

                <div className="flex flex-col gap-2 pb-2">
                    <p
                        className={
                            childType === "orange"
                                ? "text-orange-700 text-lg"
                                : "text-pink-700 text-lg"
                        }
                    >
                        No tasks assigned yet!
                    </p>
                </div>
            </div>
        </>
    )
}