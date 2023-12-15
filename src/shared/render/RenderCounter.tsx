import { useEffect, useRef } from 'react';

function RenderCount() {
    const renderRef = useRef(1);
    const render = 'Render Count of ';

    useEffect(() => {
        renderRef.current += 1;
    });

    return (
        <div>
            {render}: {renderRef.current}
        </div>
    );
}

export default RenderCount;
