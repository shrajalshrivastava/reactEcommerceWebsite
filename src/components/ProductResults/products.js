import React,{useEffect} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import FormSelect from '../forms/FormSelect'
import {useHistory,useParams} from 'react-router-dom'
import {fetchProductsStart}from './../../Redux/Products/products.actions'
import './products.scss'
import Product from './Productss/index'
import LoadMore from '../LoadMore/loadMore'



const mapState =({productsData})=>({
    products : productsData.products
});

const ProductResults =()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType} = useParams();
    const {products} = useSelector(mapState);

    const {data,queryDoc,isLastPage}  =products;
    useEffect(()=>{
            dispatch(fetchProductsStart({filterType}));
    },[dispatch,filterType]);

    if(!Array.isArray(data)) return null;

    if(data.length<1){
        return(
            <div className="products">
                <p>
                    No Search Results
                </p>
            </div>
        );
    }

    const handleFilter = (e)=>{
         const nextFilter = e.target.value;
         history.push(`/search/${nextFilter}`)

    };
    const handleLoadMore =()=>{
        dispatch(
            fetchProductsStart({
            filterType,
            startAfterDoc:queryDoc,
            persistProducts:data  })
        )
    }
    const configFilters ={
        defaultValue: filterType,
        options :[{
            name:'Show all',
            value:''
        },{
            name: 'Mens',
            value: 'mens'
        },{
            name:'Womens',
            value:'womens'
        }],
        handleChange: handleFilter 
    };
    const configLoadMore ={
        onLoadMoreEvt: handleLoadMore,
    };
    return(
        <div className="wrapper">
            <h1>Browse Products</h1>

            <FormSelect {...configFilters}/>
        <div className="wrap">
                
           {data.map((product,pos) => {
               const { productName,
                productPrice,
                productThumbnail,
                productDesc
            } = product;
            if(!productThumbnail || !productName ||!productDesc|| typeof productPrice === 'undefined') return null;

            const configProduct ={
                ...product
            };
             return(
               <Product{...configProduct}/>
             );
        

           })}
        </div>
           {!isLastPage && (
            <LoadMore {...configLoadMore}/>
           )}
           

        </div>
    )
}
export default ProductResults;