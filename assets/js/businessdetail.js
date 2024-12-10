let businessId = sessionStorage.getItem('businessDetailId')
fetch(`${API_URL}/api/businesses/?per_page=1000`)
  .then((response) => response.json())
  .then((data) => {
    let business = data.data.filter(ele=>ele.id == businessId)[0];
    let thumbnail =
    business.thumbnail && !business.thumbnail.includes("no_photo")
      ? business.thumbnail
      : "../../assets/img/party/party1.png";
    document.getElementById("title").innerHTML = business.name;
    document.getElementById("description").innerHTML =
      business.name + business.description;
    document.getElementById("email").innerHTML += business.email;
    document.getElementById("phone").innerHTML += business.phone;
    document.getElementById("fb").href = business.facebook;
    document.getElementById("tiktok").href = business.tiktok;
    document.getElementById("telegram").href = business.telegram;
    document.getElementById("linkedin").href = business.linkedin;
    document.getElementById("catagory").innerHTML = business.categories ? business.categories.map(category => category.name).join(", ") : 'None'
    document.getElementById("location").innerHTML = business.location;
    document.getElementById("org-pf").src = business.creator.avatar;
    document.getElementById("org-name").innerHTML = business.creator.full_name;
    document.getElementById("org-name").setAttribute('data-id', business.creator.id)
    document.getElementById('business-img').src = thumbnail;

  });

  function viewOrgDetail(org){
    let id = org.dataset.id;
    sessionStorage.setItem("orgID", id);
    location.href = "../authentication/view-profile.html";
  }