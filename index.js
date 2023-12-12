let videoscontents = [];

const noContent= document.getElementById('no-content');


const handleCategory = async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categroryData = data.data;
  // console.log(data);
  // console.log(categroryData);
  const tabcontainer = document.getElementById("tab-container");
  categroryData.forEach((category) => {
    const div = document.createElement("div");
    if (category.category_id !== null) {
      div.innerHTML = `
    
            <button onclick="handleLoadVideos('${category.category_id}')" class="tab btn text-md mx-3 focus:bg-red-500 focus:text-white ">${category.category}</button> 
    
    
            `;
    }

    tabcontainer.appendChild(div);
  });
};

const handleLoadVideos = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  videoscontents = data.data;
  const status = data.status;
  console.log(status);
  console.log(videoscontents);

  handleVideosshow(videoscontents, status);
};

const handleVideosshow = (videoscontents, status) => {
  const videoscontainer = document.getElementById("videos-container");
  videoscontainer.innerHTML = "";
  if (status === true) {
    noContent.classList.add('hidden');

    videoscontents.forEach((videos) => {
      //   console.log(videos);
      const div = document.createElement("div");

      const inseconds = videos.others?.posted_date;
      //   console.log(inseconds);
    
      const displaypostedDate = inseconds ? toHourMinSec(inseconds) : " ";
      //   console.log(displaypostedDate);
      //   div.classList.add="w-screen-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-10 md:gap-4 lg:gap-2 my-20 mx-auto"
      div.innerHTML = `
            
                <div class="card h-[500px] w-11/12 bg-base-100 shadow-xl mx-5  my-5">
                    <figure class="relative">
                        <img src="${
                          videos.thumbnail
                        }" alt="videos" class="w-full h-[300px] lg:mx-10 rounded-md" />
                        <p class="absolute font-bold bottom-2 right-3 bg-gradient-to-b from-white to-white text-transparent bg-clip-text">${displaypostedDate}</p>
                    </figure>
                    <div class="card-body ">
                        <div class="flex gap-4">
                            <img src="${
                              videos.authors[0]?.profile_picture
                            }" class="w-10 h-10 rounded-full" alt=""/>
                            <div class="">
                                <h2 class="card-title text-left text-md font-black font-inter">${
                                  videos.title
                                }</h2>
                                <div class="flex justify-center items-center">
                                    <h3 class="my-3 font-semibold">${
                                      videos.authors[0].profile_name
                                    }  </h3>
                                    <p>${
                                      videos.authors[0].verified
                                        ? `<img src="./images/bluetick.png" class="w-5 h-5  ml-2">`
                                        : ""
                                    }</p>
                                </div>
                                <p class="font-small">${
                                  videos.others.views
                                } Views</p>
                            </div>
                        </div>
                            
                            
                    </div>
                </div>
            
                    
                    `;
      videoscontainer.appendChild(div);
    });
  } else {

    noContent.classList.remove('hidden');
        
  }
};

document.getElementById("sort-button").addEventListener("click", function () {
  console.log("sort button clicked");
  videoscontents.sort((a, b) => {
    return (
      parseFloat(b.others.views) - parseFloat(a.others.views)
      );
  });
  handleVideosshow(videoscontents, true);
});

const toHourMinSec = (giventime) => {
  giventime = Number(giventime);
  const hours = Math.floor(giventime / 3600);
  const min = Math.floor((giventime % 3600) / 60);
  const sec = Math.floor(giventime % 60);
  if (hours > 1) {
  }

  return `${hours} hr  ${min} min  ${sec} sec ago`;
};

handleCategory();
handleLoadVideos("1001");

/// Blog portion

document.getElementById("blog-btn-container").addEventListener("click", function () {
    window.location.href = "blog.html";
  });











  