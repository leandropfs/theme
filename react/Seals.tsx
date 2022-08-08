import React, { useContext, useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";
import { SealsContext } from "./SealsContextProvider"
import styles from "./src/seals.css";
import { seal } from "./typings/seal"

interface objectString {
    [key: string]: string
}

interface props {
    type: "collection" | "product"
}

Seals.defaultProps = {
    type: "collection"
} as props
function Seals<StorefrontFunctionComponent>(props: props) {

    const [seals, setSeals] = useState<Array<seal> | null>(null)
    const [allSeals, setAllSeals] = useState<Array<seal> | null>(null)

    const { product } = useProduct();
    const context = useContext(SealsContext);

    useEffect(() => {

        setAllSeals(context);

    }, [context]);

    useEffect(() => {

        if(allSeals == null){ return }

        const productClusters = product?.productClusters ? product.productClusters : [];
        const productPromotions = product?.benefits ? product.benefits : [];

        let applied_seals: seal[] = [];

        for (const seal of removeDuplicates(productClusters)) {
            let cluster = sealMatch(allSeals, seal.id);
            if (cluster) {
                applied_seals.push(cluster);
            }
        }

        for (const seal of removeDuplicates(productPromotions)) {
            let promotion = sealMatch(allSeals, seal.id);
            if (promotion) {
                applied_seals.push(promotion);
            }
        }

        if ( applied_seals.length != 0 ) {
            setSeals(applied_seals);
        }

    }, [product,allSeals]);

    const classType = props.type == "product" ? styles.sealProduct : styles.sealCollection

    return (
        <>
            {seals != null &&
                <div className={classType}>
                    {seals.map((seal, index, seals) => {

                        if( props.type == "product"){
                            return (
                                <div key={index}>
                                    <span className={styles.sealTooltip} style={{ backgroundColor: detectColor(seal.color) }} dangerouslySetInnerHTML={{ __html: seal.tooltip }} />
                                </div>
                            )
                        }

                        if( props.type == "collection" && index + 1 == seals.length ){
                            return (
                                <div key={index}>
                                    <span className={styles.sealTooltip} style={{ backgroundColor: detectColor(seal.color), borderColor: detectColor(seal.color) }} dangerouslySetInnerHTML={{ __html: seal.tooltip }} />
                                    <span className={styles.sealTitle} style={{ backgroundColor: detectColor(seal.color), borderColor: detectColor(seal.color) }} dangerouslySetInnerHTML={{ __html: seal.title }} />
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            }
        </>
    )
};

function detectColor(color: string) {

    let default_colors = {
        "purple - #8300d1": '#8300d1',
        "purpleLight - #a875e0": '#a875e0',
        "purpleDark - #50137c": '#50137c',
        "blue - #6d6efd": '#6d6efd',
        "blueDark - #151d3e": '#151d3e',
        "green - #46C152": '#46C152'
    }

    for (let [key, value] of Object.entries(default_colors)) {
        if (key == color) {
            return value
        }
    }

    if (isHexColor(color)) {
        return color
    }

    return Object.values(default_colors)[0]
}


function sealMatch(arraySeals: seal[], element_id: string) {
    for (var i = 0; i < arraySeals.length; i++) {
        if (arraySeals[i].ref == element_id) {
            let sealMatch = arraySeals[i]
            return sealMatch;
        }
    }
    return false;
}

function removeDuplicates(array: objectString[]) {
    return [...new Map( array.map( (item:objectString) => [JSON.stringify(item), item])).values()]
}

function isHexColor(hex: string) {
    let regex = /^#([0-9a-f]{3}){1,2}$/i;
    return regex.test(hex)
}

export default Seals;