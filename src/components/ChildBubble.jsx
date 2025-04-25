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
                } w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52`}
            >
                <img
                    src={resolveImage(childTheme)}
                    className="rounded-full w-full h-full object-cover"
                    alt={childName}
                />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">{childName}</h1>
        </div>
    );
};
