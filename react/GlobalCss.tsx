import React from "react";
import { canUseDOM } from 'vtex.render-runtime'
import styles from "./src/global.css";

const GlobalCss: StorefrontFunctionComponent = () => {

    const copyright = "Desenvolvido por UpNext Digital Commerce - www.upnext.com.br"

    if (canUseDOM) {
        if( document.childNodes[0].textContent != copyright ){
            const comment = document.createComment(copyright);
            document.prepend(comment);
            console.log(copyright)
        }
    }
    return <span className={styles.global}/>
};

export default GlobalCss;