import React, { createContext, useEffect, useState } from 'react';
import RequestTS from "./utils/RequestTS"
import { seal } from "./typings/seal"

export const SealsContext = createContext<Array<seal> | null >(null);

const SealsContextProvider: StorefrontFunctionComponent = ({children}) => {

    const [allSeals, setAllSeals] = useState<Array<seal> | null>(null)

    useEffect(() => {

        const headers = {
            headers: {
                'REST-Range': 'resources=0-100'
            }
        }
        RequestTS<seal[]>(`https://${window.location.host}/api/dataentities/selos/search?_fields=ref,title,tooltip,color,order,isActive&_schema=v1&isActive=true&_sort=order%20ASC`,headers).then( result => {
            setAllSeals(result);
        })

    }, []);

    if(!allSeals){
        return null
    }
  
    return (
        <SealsContext.Provider value={allSeals}>
            {children}
        </SealsContext.Provider>
    );
}

export default SealsContextProvider