import { useEffect } from "react";

function useWindowWidth() {
    const[ width, setWidth] = useState(window.innerWidth);
    
    useEffect(() =>{
        const handleResize =() => setWidth(window.innerWidth);
        window.addEventListener('resize',handleResize);


        return () => {
            window.removeEventListener('resize',handleResize);
        };
    }, []);
    return width;
}
function hooks(){
    const width = useWindowWidth();
    return <h1>niharika</h1>
}
export default hooks;