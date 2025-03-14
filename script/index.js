function loadCategories(){
// fetch data 
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
// convert promise to json 
.then(res=>res.json())
// send data to display 
.then(data=>displayCategories(data.categories));

}
function displayCategories(categories){
// get the container 
const categoryContainer = document.getElementById('category-container');

for(let item of categories){
    // console.log(item)

    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML=`
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
    `
    categoryContainer.append(categoryDiv)
}

}

loadCategories()