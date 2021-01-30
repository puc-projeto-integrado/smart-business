import React, {useEffect, useState} from "react";

const Foo = (props)=>{
    const [foo, setFoo] = useState(true);
    useEffect(() => {
        console.log('COUNT')
        setFoo(true);
    }, []);
    if(props.flag){
        setFoo(false)
    }
    return <div>FOO FOO</div>
}

export default Foo;