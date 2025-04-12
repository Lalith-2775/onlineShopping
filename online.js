const productscontainer=document.getElementById("productcontainer");
const cartcontainer=document.getElementById("cartcontainer");
const feedbackElement=document.getElementById("feedback");
const clearcart=document.getElementById("clearcart");
const sortbyprice=document.getElementById("sortbyprice");

//default products
const products=[
    {
        id:1,
        pname:"Laptop",
        price:50000,
    },
    {
        id:2,
        pname:"Phone",
        price:20000,
    },
    {
        id:3,
        pname:"Tablet",
        price:5000,
    },
    {
        id:4,
        pname:"Smart-watch",
        price:1000,
    },
    {
        id:5,
        pname:"Headphones",
        price:500,
    },
];
//Empty cart
const cart=[];

sortbyprice.addEventListener('click',sortbyprices);
clearcart.addEventListener('click',clearcart1);

function clearcart1(){
    cart.length=0;
    rendercarDetails();
    updateuserFeedback('cart is cleared','sucess');
}

   
function sortbyprices(){
    cart.sort(function(item1,item2)
    {
        return item1.price-item2.price;
    });
    rendercarDetails();
}


 let totalprice1=0;

 function renderproductdetails(){
    products.forEach(function(product){
        //     const productrow=`<div class=product-row>
        //     <p>${product.pname} - ${product.price}</p>
        //     <button>Add to Cart</button>
        //     </div>`
        //     productscontainer.insertAdjacentHTML("beforeend",productrow);
            const {id,pname,price}=product;
            const divElement= document.createElement('div');
            divElement.className="product-row";
            divElement.innerHTML= `<p>${pname} -  Rs${price}</p>
           <button onclick="addtTOCart(${id})">Add to Cart</button>`
           productscontainer.appendChild(divElement);
         });
 }

 function rendercarDetails(){
    cartcontainer.innerHTML="";
cart.forEach(function(product){

    const {id:id1,pname,price}=product;

    const cartItemRow=`<div class="product-row">
    <p>${pname} -Rs ${price} </p>
    <button onclick="Removefromcart(${id1})">Remove</button>`
    cartcontainer.insertAdjacentHTML("beforeend",cartItemRow);
}) 

    // for(i=0;i<cart.length;i++)
    // {
        // totalprice1=+totalprice1+cart[i].price;
    // }
   const totalprice1= cart.reduce(function(acc,prod){
        return acc+prod.price;

    },0)
 document.getElementById("totalprice").textContent=`Rs.${totalprice1}`;
}

// add to cart
function addtTOCart(id)
{
    const isproductAvailable=cart.some((product) => product.id===id) ;
   
    if(isproductAvailable)
        {
                updateuserFeedback(` Item already added to cart`,"error");
            return;  
        };

    const productToAdd=products.find(function(product){
            return product.id===id;
    
    })

    cart.push(productToAdd);
    
    rendercarDetails();
    updateuserFeedback(`${productToAdd.pname} is added to cart`,"sucess");
}



function Removefromcart(id){
    console.log(id);
//    const updatecart= cart.splice(function(product){
        // return product.id !==id;
    // })
    const product=cart.find((product)=>product.id===id)
   const productindex=cart.findIndex((product)=>product.id===id);
    cart.splice(productindex,1);

    updateuserFeedback(`${product.pname} is Removed from the cart`,"error")
    rendercarDetails();

}

let timerid;
function updateuserFeedback(msg,type){
    clearTimeout(timerid);
    feedbackElement.style.display="block";
    if(type==='sucess')
    {
        feedbackElement.style.backgroundColor="green";
    }
    if(type==='error')
    {
        feedbackElement.style.backgroundColor="red"

    }
    feedbackElement.textContent=msg;
  
    timerid=setTimeout(function(){
        feedbackElement.style.display="none";
    },3000)
   
}

renderproductdetails();