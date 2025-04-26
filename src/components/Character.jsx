import CharacterBlue from '../assets/CharacterBlue.png';
import CharacterPink from '../assets/CharacterPink.png';
import CharacterOrange from '../assets/CharacterOrange.png';

export const Character = ({ childType, name = "Parent" }) => {
    let characterImage = CharacterBlue;
    if (childType) {
        characterImage = childType === "orange" ? CharacterOrange : CharacterPink;
    }

    return (
        <div className="relative flex flex-col items-center h-full">
            {/* Speech Bubble */}
            <div className="absolute w-full flex justify-center" style={{ top: '5%' }}> {/* Adjusted top to lower the bubble */}
                <div className="bg-white px-12 py-12 rounded-full shadow-xl relative border-4 border-gray-100"> {/* Made bubble circular */}
                    <p className="text-5xl font-bold font-poppins text-gray-700 text-center tracking-wide"> {/* Increased font size */}
                        Hello, {name}!
                    </p>
                    {/* Triangle for speech bubble */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rotate-45 border-b-4 border-r-4 border-gray-100"></div>
                </div>
            </div>

            {/* Character Image */}
            <div className="mt-40 w-[30rem] h-[48rem]"> {/* size */}
                <img
                    src={characterImage}
                    alt="Homey Character"
                    className="w-full h-full object-contain animate-float drop-shadow-2xl"
                />
            </div>
        </div>
    );
};