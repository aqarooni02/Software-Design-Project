import CharacterBlue from '../assets/CharacterBlue.png'
import CharacterPink from '../assets/CharacterPink.png';
import CharacterOrange from '../assets/CharacterOrange.png';
export const Character = ({ childType }) => {
    let characterImage = CharacterBlue
    if (childType) {

        characterImage = childType === "orange" ? CharacterOrange : CharacterPink;
    }
    return (

        <img src={characterImage} alt="Homey Character"
            className="w-full h-full object-contain animate-float drop-shadow-2xl" />


    )
}