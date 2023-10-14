import React, { useEffect, useState } from 'react'
import "../src/PlanScreen.css"
import db from './firebase'
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot } from "firebase/firestore"; 
import "../src/PlanScreen.css"
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { loadStripe } from '@stripe/stripe-js';


const PlanScreen = () => {
    const [products,setProducts]=useState([])
    const user=useSelector(selectUser);
    const firestore = getFirestore();
    const [subscription,setSubscription]=useState(null);

    useEffect(()=>{
      getDocs(collection(db, "customers", user.uid, "subscriptions")).then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          });
        });
      });
    },[user.uid])

    useEffect(()=>{
        async function gettingData(){
        const querySnapshot=await getDocs(collection(db,"products"));
        const products={}
        querySnapshot.forEach(async (productDoc)=>{
            products[productDoc.id]=productDoc.data();
            const priceSnap=await getDocs(collection(productDoc.ref, "prices"));
            priceSnap.docs.forEach((price)=>{
               products[productDoc.id].prices={
                priceId:price.id,
                priceData:price.data()
               }
            })
        })
        setProducts(products)
    }
    gettingData();
      },[])
    console.log(products)
    console.log(subscription)

    const loadCheckOut=async(priceId)=>{
      const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
      
      onSnapshot(doc(db, "customers", user.uid, "checkout_sessions", docRef.id), async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(`An error occurred: ${error.message}`);
        }
        if (sessionId) {
          const stripe = await loadStripe(
            "pk_test_51MxYtpSHI2LflFH4M9fnzUzEuG31ttpm4CQsSBcMgQfCTYCIM4aZFJanEwOh63iSnYG0mxFMDDXz6sgTaFWeSIn500KI90QsCn"
          );
          stripe.redirectToCheckout({ sessionId });
        }
      });     
    }
  return (
    <div className='plansScreen'>
      <br/>
      {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}
     {Object.entries(products).map(([productId,productData])=>{
      const isCurrentPackage=productData.name?.toLowerCase().includes(subscription?.role);
     return(
        <div key={productId} className="plansScreen__plan">
          <div className='plansScreen__info'>
             <h5>{productData.name}</h5>
             <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckOut(productData?.prices?.priceId)} 
            style={{ backgroundColor: isCurrentPackage ? "gray" : "#e50914" }}>
            {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
        </div>
     )
     })}
    </div>
  )
}

export default PlanScreen