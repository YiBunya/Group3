let recruitId = sessionStorage.getItem("recruitDetailId");
fetch(`${API_URL}/api/vendors/${recruitId}`)
  .then((response) => response.json())
  .then((json) => {
    document.getElementById("recruit-name").innerHTML = json.data.name;
    document.getElementById("ev-startDate").innerHTML = moment(
      json.data.start_date
    ).format("ddd, D MMMM, YYYY");
    document.getElementById("ev-endDate").innerHTML = moment(
      json.data.end_date
    ).format("ddd, D MMMM, YYYY");
    document.getElementById("ev-catagory").innerHTML = json.data.categories
      .map((category) => category.name)
      .join(", ");
    document.getElementById("ev-location").innerHTML = json.data.location;
    document.getElementById("ev-org-pf").src = json.data.creator.avatar;
    document.getElementById("ev-org-name").innerHTML =
      json.data.creator.full_name;
    document.getElementById("ev-description").innerHTML = json.data.description;

    document
      .getElementById("ev-org-name")
      .setAttribute("data-org-id", json.data.creator.id);
    document.querySelectorAll(".btn-apply-now").forEach((btn) => {
     
      btn.onclick = () => {
        if(token){
        
          fetch(`${API_URL}/api/vendors/apply/${recruitId}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((json) => {
              showToast(json.message, json.result);
              if(json.result){
                document.querySelectorAll(".btn-apply-now").forEach((btn)=>{
                  btn.disabled = true;
                })
              }
            });
        }
        else{
          location.href = '/pages/authentication/login.html'
        }
      };
    });
  });

function viewOrgDetail(org) {
  let id = org.dataset.orgId;
  sessionStorage.setItem("orgID", id);
  location.href = "../authentication/view-profile.html";
}
