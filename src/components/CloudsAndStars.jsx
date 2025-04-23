export const CloudsAndStars = () => {
    return (

        <div className="cloudPane absolute inset-0">
            {/* Stars in the sky */}
            <div className="stars absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="star" id={`star${i + 1}`}></div>
                ))}
            </div>
            {/* Clouds */}
            {[1, 2, 3, 4, 5, 6, 7].map((cloudNum) => (
                <div key={cloudNum} className="bigCloud" id={`cloud${cloudNum}`}>
                    <div className="largeCircle" id="circ1">
                        <div className="largeCircle" id="circ1shadow"></div>
                    </div>
                    <div className="middleCircle" id="circ2">
                        <div className="middleCircle" id="circ2shadow"></div>
                    </div>
                    <div className="middleCircle" id="circ3">
                        <div className="middleCircle" id="circ3shadow"></div>
                    </div>
                    <div className="smallCircle" id="circ4"></div>
                    <div className="smallCircle" id="circ5">
                        <div className="smallCircle" id="circ5shadow"></div>
                    </div>
                    <div className="smallCircle" id="circ6">
                        <div className="smallCircle" id="circ6shadow"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}