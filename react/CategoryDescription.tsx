import React from "react";
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext';

const ProductDescription: StorefrontFunctionComponent = () => {

    const { searchQuery } = useSearchPage();
    let categoryTitle = searchQuery.data.searchMetadata?.titleTag;
    let categoryDescripton = searchQuery.data.searchMetadata?.metaTagDescription;

    return (
        <>
            { categoryTitle != null && categoryDescripton != null ? 
                <div>
                    <h2 className="title-default t-heading-5 mb5 mt5">{categoryTitle}</h2>
                    <p>{categoryDescripton}</p>
                </div>
            : null}
        </>
        
    )
};

export default ProductDescription;