

//* =========================================Nav===========================================*//

	const cilorBtn = document.querySelector(".cilor-btn"),
	navMenu = document.querySelector(".nav-menu"),
	closeNavBtn =document.querySelector(".close-nav-menu");

	cilorBtn.addEventListener("click", showNavMenu);
	closeNavBtn.addEventListener("click", hideNavMenu);

	function showNavMenu(){
		navMenu.classList.add("open");
		bodyScrollingToggle();
	}

	function hideNavMenu(){
		navMenu.classList.remove("open");
		fadeOutEfek();
		bodyScrollingToggle();
	}

	function fadeOutEfek(){
		document.querySelector(".fade-out-efek").classList.add("active");
		setTimeout(()=>{
			document.querySelector(".fade-out-efek").classList.remove("active");
		},300)
	}

	document.addEventListener("click", (e)=>{
		if(e.target.classList.contains('link-item')){
			if(e.target.hash !==""){
				e.preventDefault();
				const hash = e.target.hash;

				document.querySelector(".section.active").classList.add("hide");
				document.querySelector(".section.active").classList.remove("active");
				document.querySelector(hash).classList.add("active");
				document.querySelector(hash).classList.remove("hide");

				navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
				navMenu.querySelector(".active").classList.add("active", "inner-shadow");

			if(navMenu.classList.contains("open")){

					// activate new navigation menu
					e.target.classList.add("active", "inner-shadow");
					e.target.classList.remove("outer-shadow", "hover-in-shadow");
					hideNavMenu();
				}else{
					let navItems = navMenu.querySelectorAll(".link-item");
					navItems.forEach((item)=>{
						if(hash === item.hash){
							item.classList.add("active", "inner-shadow");
							item.classList.remove("outer-shadow","hover-in-shadow");
						}
					})
					fadeOutEfek();
				}
				window.location.hash = hash;

			}
		}
	})

//*===========================================Tentang Section Tabs=================================*//

	const tentangSection = document.querySelector(".tentang-section"),
	tabsContainer =  document.querySelector(".tentang-tabs");

	tabsContainer.addEventListener("click", (e) =>{
		// console.log(e.target);
		// if event.target contains 'tab-item' class and not contains
		// 'active' class
		if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
			tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
			e.target.classList.add("active","outer-shadow");
			const target = event.target.getAttribute("data-target");
			// deactivate existing active 'tab-item' class and not contains 'active' class
			// activate new 'tab-item'
			// // 
			tentangSection.querySelector(".tab-content.active").classList.remove("active");
			// // // 
			tentangSection.querySelector(target).classList.add("active"); 
		}
	});

	function bodyScrollingToggle(){
		document.body.classList.toggle("stop-scrolling");
	}
//* ===============================galeri filter dan popup======================================*//

	const filterContainer = document.querySelector(".galeri-filter"),
	galeriItemsContainer = document.querySelector(".galeri-items"),
	galeriItems = document.querySelectorAll(".galeri-item"),
	popup = document.querySelector(".galeri-popup"),
	prevBtn = popup.querySelector(".pp-prev"),
	nextBtn = popup.querySelector(".pp-next"),
	closeBtn = popup.querySelector(".pp-close"),
	projectDetailsContainer = popup.querySelector(".pp-details"),
	projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
	let itemIndex, slideIndex, screenshots;

	// galeri Filter Items
	filterContainer.addEventListener("click", (e) =>{
		if(e.target.classList.contains("filter-item") &&
			!e.target.classList.contains("active")){

			// Aktivasi eksis aktif 'filter-item'
			filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
			// Aktivasi new 'filter-item'
			e.target.classList.add("active", "outer-shadow");
			const target = e.target.getAttribute("data-target");
			
			galeriItems.forEach((item) =>{
			// console.log(item.getAttribute("data-category"));
			if(target === item.getAttribute("data-category") || target === 'all'){
				item.classList.remove("hide");
				item.classList.add("show");
			}else{
				item.classList.remove("show");
				item.classList.add("hide");
			}
		  })
		}
	})

	galeriItemsContainer.addEventListener("click", (e) =>{
		if(e.target.closest(".galeri-item-inner")){
			const galeriItem = e.target.closest(".galeri-item-inner").
				parentElement;
			// Get galeri Index
			itemIndex = Array.from(galeriItem.parentElement.children).indexOf(galeriItem);
			// console.log(itemIndex);
			screenshots = galeriItems[itemIndex].querySelector(".galeri-item-img img").getAttribute("data-screenshots");
			// Convert Screenshot Into Array
			screenshots = screenshots.split(",");
			if(screenshots.length === 1){
				prevBtn.style.display="none";
				nextBtn.style.display="none";
			}else{
				prevBtn.style.display="block";
				nextBtn.style.display="block";
			}
			// console.log(screenshots)
			slideIndex = 0;
			popupToggle();
			popupSlideshow();
			popupDetails();
		}
	})

	closeBtn.addEventListener("click", () =>{
		popupToggle();
		if(projectDetailsContainer.classList.contains("active")){
			popupDetailsToggle();
		}
	})

	function popupToggle(){
		popup.classList.toggle("open");
		bodyScrollingToggle();
	}

	function popupSlideshow(){
		const imgSrc = screenshots[slideIndex];
		const popupImg = popup.querySelector(".pp-img");
		// Aktif Loader until popup img loaded
		popup.querySelector(".pp-loader").classList.add("active");
		popupImg.src=imgSrc;
		popupImg.onload = () =>{
			// 
			popup.querySelector(".pp-loader").classList.remove("active");
		}
		popup.querySelector(".pp-counter"). innerHTML = (slideIndex+1) + "of" +
			screenshots.length;
	}

	// nextSlide
	nextBtn.addEventListener("click", ()=>{
		if(slideIndex === screenshots.length-1){
			slideIndex = 0;
		}else{
			slideIndex++;
		}
		popupSlideshow();
	})

	// prevSlide
	prevBtn.addEventListener("click", ()=>{
		if(slideIndex === 0){
			slideIndex = screenshots.length-1
		}else{
			slideIndex--;
		}
		popupSlideshow();
	})

	function popupDetails(){
		if(!galeriItems[itemIndex].querySelector(".galeri-item-details")){
			projectDetailsBtn.style.display = "none";
			return; //end function execute
		}
		projectDetailsBtn.style.display = "block";
		// get the proojec
		const details = galeriItems[itemIndex].querySelector(".galeri-item-details").innerHTML;
		// get the proojec
			popup.querySelector(".pp-project-details").innerHTML = details;
		// get the project title
		const title = galeriItems[itemIndex].querySelector(".galeri-item-title").innerHTML;
		// set project title
			popup.querySelector(".pp-title h2").innerHTML = title;	
		// get project kategori
		const category = galeriItems[itemIndex].getAttribute("data-category");
		// set project kategori
		popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("");
	}

	projectDetailsBtn.addEventListener("click", ()=>{
		popupDetailsToggle();
	})

	function popupDetailsToggle() {
		if(projectDetailsContainer.classList.contains("active")){
			projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
			projectDetailsBtn.querySelector("i").classList.add("fa-plus");
			projectDetailsContainer.classList.remove("active");
			projectDetailsContainer.style.maxHeight = 0 + "px"; 
		}else{
			projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
			projectDetailsBtn.querySelector("i").classList.add("fa-minus");
			projectDetailsContainer.classList.add("active");
			projectDetailsContainer.style.maxHeight = projectDetailsContainer.
				scrollHeight + "px";
			popup.scroll(0,projectDetailsContainer.offsiteTop);
		}
	};

//* =========================================Hide Sections All Aktif===========================================*//


	const sections = document.querySelectorAll(".section");
	sections.forEach((section)=>{
		if(!section.classList.contains("active")){
			section.classList.add("hide");
		}
	})


window.addEventListener("load", ()=>{
	document.querySelector(".preloader").classList.add("fade-out");
	setTimeout(()=>{
		document.querySelector(".preloader").style.display="none";
	},600)
})
