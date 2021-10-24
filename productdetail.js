var xhr;
let productData = [];

let arraydata102 = [];
let fliterObjects = {
    sortPrice: null,
    sortPopularity: null,
    discounts:[],
    categories:[],
    minPrice: null,
    maxPrice: null
};

const placingdata = document.getElementById('rightpanel');


//------------------------creating xhr request--------------------------
const load = () => {
    xhr = new XMLHttpRequest();

    if(!xhr) {
        alert('Unable to create XHR Object');
        return false;
    }


    xhr.onreadystatechange = renderContent;
    xhr.open('GET', '../productdata.json');
    xhr.send();

    function renderContent() {
        console.log(xhr.readyState);
        if(xhr.readyState === 4) {
            console.log('Received the data');
            if(xhr.status === 200){
            productData = JSON.parse(xhr.responseText).productinfoarray; 
            arraydata102 = [...productData];
            initialdata();
            
        }
            else {
            console.log('Problem making AJAX request');
            }
        }

    }

}
window.onload = load;
// //-----------------------------------------------------------------------
const applyfilters = () => {
    arraydata102 = [...productData];
    const {sortPrice,sortPopularity,discounts,categories,minPrice,maxPrice} = fliterObjects 
    sortData(sortPrice,"price")
    sortData(sortPopularity,"Popularity")
    filterDiscounts(discounts)
    sortCategory(categories)
    filterPrices([minPrice,maxPrice])
    initialdata()
}

//-----------------------------------------------------------------------
// --------------------Products view in the starting---------------------
const initialdata = () =>{
    if(productData){
        placingdata.innerHTML = "";
        for(const {name, price, actualprice, brand, customerrating, discount, logo} of arraydata102 ){
            const keepvalue = placingdata.appendChild(document.createElement('div'));
            keepvalue.className='keep-value';
            keepvalue.innerHTML=(`<img src="${logo}" class="right" alt="product images"/> <p class="naming">${name}</p> 
            <p><span class="actualprice">₹${actualprice}</span>  <span class="puttingprice">₹${price}</span> 
            <span class="discounting">${discount}% off</span></p><p class="branding">Brand - ${brand}</p>
            <p class="upperating"><span class="ratings">${customerrating}<img src="star2.png" class="star"/></span></p>`)
        
        }
    }
    else{
        console.error('problem loading request');
    }
}

//-----------------------------------------------------------------------


const sortData = (order,key) => {
     if(!order) { return ;}
     const multiplyFactor = order === "ascending" ? 1:-1;
     arraydata102.sort((a,b) => (a[key]-b[key]) * multiplyFactor);
}

const sortCategory = categories => {
     if(categories.length){
         arraydata102 = arraydata102.filter(element => categories.includes(element.brand));
     }
}

const filterDiscounts = discounts => {
    if(discounts.length)
    {
        arraydata102 = arraydata102.filter(element => discounts.includes(element.discount));
    }
}

const filterPrices = prices => {
     if(prices[0] && prices[1])
     {
         arraydata102 = arraydata102.filter(element => element.price >= prices[0] && element.price <= prices[1]);
     }
}

// //------------------------------------------------------------------------


const reset = () => {
    arraydata102 = [...productData];
    fliterObjects.sortPrice = null;
    fliterObjects.sortPopularity = null;
    fliterObjects.discounts = [];
    fliterObjects.categories = [];
    fliterObjects.minPrice = null;
    fliterObjects.maxPrice = null;    
    
    applyfilters()
}

// //------------------------------------------------------------------------

const handleFilters = (filter,type) => {
    if(type === "discounts"){                    //if parameter type has discounts
        let discounts = fliterObjects.discounts
        if(discounts.includes(filter)){            //determines whether a string contains given character or not
            discounts = discounts.filter(element => element !== filter)
        }
        else{
            discounts.push(filter)
        }
        fliterObjects.discounts = discounts

    }
    else if(type==="categories"){
        let categories = fliterObjects.categories
        if(categories.includes(filter)){
            categories = categories.filter(element => element !== filter)
        }
        else{
            categories.push(filter)
        }
        fliterObjects.categories = categories
    }
    else if(type==="minPrice" && type==="maxPrice"){
        fliterObjects[type] = parseInt(filter)
    }
    else{
        fliterObjects.sortPopularity = null
        fliterObjects.sortPrice = null
        fliterObjects[type] = filter
    } 
    applyfilters()   
}


// //--------------------------------------------------------------------------

























