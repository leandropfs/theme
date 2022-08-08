import React from "react";
import { useProduct } from "vtex.product-context";


interface line {
    text: string;
    type: "div" | "h3" | "li" | "p" | null
}

const ProductDescription: StorefrontFunctionComponent = () => {

    const lineType = (line: string) => {
        if (line.length == 0) {
            return 'div'
        }
        if (line == line.toUpperCase()) {
            return 'h3'
        }
        if (line[0] == "*") {
            return 'li'
        }
        return 'p'
    }

    const sanitizeLine = (line: line) => {
        return line.type == 'li' ? line.text.substring(1) : line.text
    }

    const parseDescription = (description: string | null) => {
        if (description) {
            const splitedDescription = description.split('\n')
            const parsedDescription = splitedDescription.map((line) => {
                const thisLineType = lineType(line)
                const sanitizedLine = sanitizeLine({text: line, type: thisLineType})
                return `<${thisLineType} class="vtex-store-components-3-x-productDescription-${thisLineType}">${sanitizedLine}</${thisLineType}>`
            });
            return parsedDescription.join('\n')
        } else {
            return ""
        }
    }

    const { product } = useProduct();
    const productDescripton = product?.description ? parseDescription(product.description) : "";

    return (
        <div>
            <h2 className="vtex-store-components-3-x-productDescriptionTitle t-heading-5 mb5 mt0">Descrição do Produto</h2>
            <div className="vtex-store-components-3-x-productDescriptionContent" dangerouslySetInnerHTML={{ __html: productDescripton }} />
        </div>
    )
};

export default ProductDescription;