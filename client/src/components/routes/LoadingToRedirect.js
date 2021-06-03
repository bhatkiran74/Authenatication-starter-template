import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


const LoadingToRedirect = () => {

    const [count, setCount] = useState(3)
    let history = useHistory();



    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && history.push("/");
        // cleanup
        return () => clearInterval(interval);
    }, [count, history]);

    return (
        <div>
            <p>Redirect you in {count} second</p>
        </div>
    )
}

export default LoadingToRedirect
