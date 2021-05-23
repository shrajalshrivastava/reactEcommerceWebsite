import React, { useState,useEffect}from 'react';
import './admin.scss'
import {useDispatch, useSelector} from 'react-redux'
import {addProductStart,deleteProductStart,fetchProductsStart} from './../../Redux/Products/products.actions'

import Button from './../../components/forms/Button/button'
import Modal from './../../components/Modal/index'
import FormInput from './../../components/forms/FormInput/form'
import FormSelect from './../../components/forms/FormSelect/index'
import LoadMore from './../../components/LoadMore/loadMore'
import CKEditor from 'ckeditor4-react'


const mapState =({productsData}) =>({
  products : productsData.products
});
const Admin = props =>{
    
  const { products } = useSelector(mapState);
  const [hideModal, setHideModal] = useState(true);
  const dispatch = useDispatch();

  const {data,queryDoc,isLastPage} = products;
  
  const toggleModal = () => setHideModal(!hideModal);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc,setProductDesc] = useState('');



  useEffect(()=>{
    dispatch(fetchProductsStart());
  },[dispatch]);

  

  const configModal = {
    hideModal,
    toggleModal
  };
  const resetForm= () =>{
    setProductCategory('mens');
    setProductName('');
    setProductPrice(0);
    setProductThumbnail('');
    setHideModal(true);
    setProductDesc('');
  }
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addProductStart({
      productName,
      productCategory,
      productPrice,
      productThumbnail,
      productDesc
    })
    );
    resetForm();

};

const handleLoadMore = ()=>{
  dispatch(
    fetchProductsStart({
    startAfterDoc:queryDoc,
    persistProducts:data  })
)

}
const configLoadMore = {
  onLoadMoreEvt:handleLoadMore
}




  return(
    <div className="admin">

    <div className="callToActions">
      <ul>
        <li>
          <Button onClick={() => toggleModal()}>
            Add new product
          </Button>
        </li>
      </ul>
    </div>

    <Modal {...configModal}>
      <div className="addNewProductForm">
        <form onSubmit ={handleSubmit}>

          <h2>
            Add new product
          </h2>
          <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

          <FormInput
            label="Product Name"
            type="text"
            value={productName}
            handleChange={e => setProductName(e.target.value)}
          />

          <FormInput
            label="Main image URL"
            type="url"
            value={productThumbnail}
            handleChange={e => setProductThumbnail(e.target.value)}
          />

          <FormInput
            label="Price"
            type="number"
            min="0.00"
            max="10000.00"
            step="1"
            placeholder="Enter Price in Rupees"
            value={productPrice}
            handleChange={e => setProductPrice(e.target.value)}
          />
          <CKEditor
          
          onChange ={evt=> setProductDesc(evt.editor.getData())}/>
          <br/>
          <Button type="submit">
            Add product
          </Button>

        </form>
      </div>
    </Modal>
    <div className="manageProducts">
      <table border="0" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <th>
              <h1>Manage Products</h1>
            </th>
          </tr>
          <tr>
            <td>
              <table className="results" border="0" cellPadding="10" cellSpacing="0">
                <tbody>
                  {(Array.isArray(data) && data.length>0)&&data.map((product,index)=>{
                    const { productName,
                      productPrice,
                      productThumbnail,
                    documentID } = product
                    return(
                      <tr>
                        <td>
                        <img src={productThumbnail} alt="productImg"/>
                        </td>
                        <td>
                          {productName}
                        </td>
                        <td>
                          Rs{productPrice}
                        </td>
                        <td>
                          <Button onClick ={()=>dispatch(deleteProductStart(documentID))}> Delete </Button>
                        </td>


                      </tr>
                    )
                  })}
                </tbody>
                
              </table>
            </td>
          </tr>
          <tr>
            <td>

            </td>
           </tr>

           <tr>
            <td>
              <table border ="0" cellPadding="10" cellSpacing="0">
                
                <tbody>
                  <tr>
                  <td>
                    {!isLastPage &&(
                    <LoadMore{...configLoadMore}/>
                    )}
                 
                  </td>
                </tr>
                </tbody>
             
              </table>
                
            </td>
           </tr>
        </tbody>
      </table>

    </div>
    </div>
    );
}

export default Admin;