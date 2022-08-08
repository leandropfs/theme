// import { useProduct } from "vtex.product-context";
// import { useQuery } from 'react-apollo'
// import shortDescription from './graphql/shortDescription.graphql'

// const ProductShortDescription: StorefrontFunctionComponent = () => {

//     const { product } = useProduct();

//     const { data, loading, error } = useQuery(shortDescription, {
//         variables: {
//           slug: product?.linkText,
//         },
//         ssr: false,
//     })

//     if (loading) {
//         return "Carregando..."
//     }
//     if (error) {
//         return ""
//     }

//     return (
//         data?.product?.shortDescription
//     )
// };

// export default ProductShortDescription;