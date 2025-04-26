import Child1Avatar from '../assets/child1.png';
import Child2Avatar from '../assets/child2.png';

export const ChildBubble = ({ childId, childName, childTheme, onSelect }) => {
    const resolveImage = (theme) => {
        switch (theme) {
            case "pink": return Child1Avatar;
            case "orange": return Child2Avatar;
        }
    };

    const handleSelect = () => {
        console.log(onSelect);
        onSelect(childId);
    };

    return (
        <div className="flex flex-col items-center hover:cursor-grab gap-4" onClick={handleSelect}>
            <div
                className={`rounded-full border-4 shadow-2xl ${
                    childTheme === "pink" ? "bg-pink-300 border-pink-400" : "bg-orange-300 border-orange-400"
                } w-27 h-27 sm:w-31 sm:h-31 md:w-35 md:h-35 lg:w-39 lg:h-39`}
            >
                <img
                    src={resolveImage(childTheme)}
                    className="rounded-full w-full h-full object-cover"
                    alt={childName}
                />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-black">{childName}</h1>
            </div>
    );
};
