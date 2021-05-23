import { firestore } from './../../firebase/util'

export const handleAddProduct = product =>{
    return new Promise((resolve,reject)=>{
        firestore
        .collection('products')
        .doc()
        .set(product).then(()=>{
          resolve();  
        }).catch(err =>{
            reject(err);
        })
    })
}

 export const handleFetchProducts = ({ filterType, startAfterDoc,persistProducts=[] })=>{
    const pageSize = 6;
    return new Promise((resolve,reject)=>{

        let ref = firestore.collection('products').orderBy('createdAt','desc').limit(pageSize);
        if(filterType) ref = ref.where('productCategory','==', filterType);
        if(startAfterDoc) ref  = ref.startAfter(startAfterDoc);
       
        ref.get().then(snapshot=>{
            const Count = snapshot.size;
            const data = [
                ...persistProducts,
                ...snapshot.docs.map(doc =>{
                    return{
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({data,
                queryDoc:snapshot.docs[Count-1],
                isLastPage : Count<1
            });
        }).catch(err =>{
            reject(err);
        })
     });
 }

 export const handleDeleteProduct = documentID =>{
    return new Promise((resolve,reject)=>{
        firestore
        .collection('products')
        .doc(documentID)
        .delete().then(()=>{
            resolve();

        }).catch(err=>{
            reject(err);
        })
    });
 }

 export const handleFetchProduct = productID =>{
     return new Promise ((resolve,reject)=>{
         firestore
         .collection('products')
         .doc(productID)
         .get().then(snapshot=>{
          if(snapshot.exists){
              resolve(
                  snapshot.data()
              )
          }

         }).catch(err=>{
             reject(err)
         });
     })
 }
