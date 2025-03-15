function removeActiveClass(){
  const activeButtons = document.getElementsByClassName('active');

  for(let btn of activeButtons){
    btn.classList.remove('active')
  }

}

function loadCategories(){
// fetch data 
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
// convert promise to json 
.then(res=>res.json())
// send data to display 
.then(data=>displayCategories(data.categories));

}

function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res=>res.json())
    .then(data=>{
      removeActiveClass();
      document.getElementById('btn-all').classList.add('active')
      displayVideos(data.videos)
    })
}

const loadCategoryVideos =(id)=>{
const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`

fetch(url)
.then(res=>res.json())
.then(data=>{
  removeActiveClass();
  const clickedBtn=document.getElementById(`btn-${id}`);
  clickedBtn.classList.add('active')
  displayVideos(data.category)
})

}

function displayCategories(categories){
// get the container 
const categoryContainer = document.getElementById('category-container');

for(let item of categories){
    // console.log(item)

    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML=`
            <button id='btn-${item.category_id}' onClick='loadCategoryVideos(${item.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
    `
    categoryContainer.append(categoryDiv)
}

}

const displayVideos =(videos)=>{
const videoContainer = document.getElementById('video-container');
videoContainer.innerHTML='';

if(videos.length===0){
videoContainer.innerHTML=`
   <div class="py-20 col-span-full text-center flex justify-center flex-col items-center">
            <img class="w-[120px]" src="./assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no videos to show</h2>
        </div>
        `
  return;
}

videos.forEach(video=>{
    // console.log(video)
const videoCard = document.createElement('div');

videoCard.innerHTML=`
 <div class="card bg-base-100">
            <figure class="relative">
              <img class='w-full h-[150px] object-cover'
                src='${video.thumbnail}' />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
             <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
             </div>
             <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">
                </p> 
                <p class="text-sm text-gray-400">${video.others.views}</p>
             </div>
            </div>
            <button onClick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>
`
videoContainer.append(videoCard);

})

}
const loadVideoDetails=(videoId)=>{
const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`

fetch(url)
.then(res=>res.json())
.then(data=>displayVideoDetails(data.video))

}

const displayVideoDetails=(video)=>{

  document.getElementById('video_details').showModal();

  const detailsContainer = document.getElementById('details-container');

  detailsContainer.innerHTML=
  `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  `

}
loadCategories()
// loadVideos()