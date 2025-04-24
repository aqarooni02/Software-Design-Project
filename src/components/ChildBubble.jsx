import Child1Avatar from '../assets/child1.png';
import Child2Avatar from '../assets/child2.png';

export const ChildBubble = ({ childId, childName, childTheme, onSelect }) => {
    const resolveImage = (theme) => {
        switch (theme) {
            case "pink": return Child1Avatar;
            case "orange": return Child2Avatar;
        }
    }
    const handleSelect = () => {
        console.log(onSelect)
        onSelect(childId)
    }

    return (
        <div className="flex flex-col items-center hover:cursor-grab" onClick={handleSelect}>
            <div className={`rounded-full border-amber-200 border-2 childBubbleBg${childId}
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36`}>
                <img
                    src={resolveImage(childTheme)}
                    className="rounded-full w-full h-full object-cover"
                    alt={childName}
                />
            </div>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl">{childName}</h1>
        </div>
    );
};
