// Upload File in create event
let fileInput = document.getElementById('fileUpload');
let fileNameDisplay = document.getElementById('fileName');
let btnRemoveImgFile = document.getElementById('btnRemoveImgFile');
let imageDisplay = document.getElementById('imageDisplay');

// Update the file name display when a file is selected
fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;

        let reader = new FileReader();
        reader.onload = function (event) {
            imageDisplay.src = event.target.result; // Set the image source
            imageDisplay.style.display = 'block';   // Display the image
        }
        reader.readAsDataURL(fileInput.files[0]); // Read the file as a data URL

    }
    document.getElementById('imgInputBtn').style.display = 'none';
    document.getElementById('imgIcon').style.display = 'none';
    btnRemoveImgFile.style.display = 'block';
});

btnRemoveImgFile.addEventListener('click', function () {
    fileInput.value = '';
    imageDisplay.src ='';
    imageDisplay.style.display = 'none';
    fileNameDisplay.textContent = 'No file chosen';
    btnRemoveImgFile.style.display = 'none';
    document.getElementById('imgInputBtn').style.display = 'block';
    document.getElementById('imgIcon').style.display = 'block';
});

// --------------------------------------------------------

// Upload photo in create event in description section 
let photoInput = document.getElementById('photoUpload');
let photoNameDisplay = document.getElementById('photoName');
let btnRemoveImg = document.getElementById('btnRemoveImg');
let photoDisplay = document.getElementById('photoDisplay');

// Update the file name display when a file is selected
photoInput.addEventListener('change', function () {
    if (photoInput.files.length > 0) {
        photoNameDisplay.textContent = photoInput.files[0].name;

        let reader = new FileReader();
        reader.onload = function (event) {
            photoDisplay.src = event.target.result; // Set the image source
            photoDisplay.style.display = 'block';   // Display the image
        }
        reader.readAsDataURL(photoInput.files[0]); // Read the file as a data URL

    }
    document.getElementById('photoInputBtn').style.display = 'none';
    document.getElementById('photoIcon').style.display = 'none';
    btnRemoveImg.style.display = 'block';
});

function removeImageFile() {
    photoInput.value = ''; // Clear the file input
    photoNameDisplay.textContent = 'No file chosen';
}
btnRemoveImg.addEventListener('click', function () {
    photoInput.value = '';
    photoDisplay.src = "";
    photoDisplay.style.display = 'none';
    photoNameDisplay.textContent = 'No file chosen';
    btnRemoveImg.style.display = 'none';
    document.getElementById('photoInputBtn').style.display = 'block';
    document.getElementById('photoIcon').style.display = 'block';
});
// --------------------------------------------------------

// Upload photo in create event in description section 
let khqrPhotoUpload = document.getElementById('khqrPhotoUpload');
let KhqrPhotoName = document.getElementById('KhqrPhotoName');
let btnRemoveKhqrImg = document.getElementById('btnRemoveKhqrImg');
let KhqrPhotoDisplay = document.getElementById('KhqrPhotoDisplay');


btnRemoveKhqrImg.style.display = 'none';
KhqrPhotoDisplay.style.display = 'none';
// Upload photo in create event in Ticket section (Khqr)
khqrPhotoUpload.addEventListener('change', function () {
    if (khqrPhotoUpload.files.length > 0) {
        KhqrPhotoName.textContent = khqrPhotoUpload.files[0].name;

        let reader = new FileReader();
        reader.onload = function (event) {
            KhqrPhotoDisplay.src = event.target.result; // Set the image source
            KhqrPhotoDisplay.style.display = 'block';   // Display the image
        }
        reader.readAsDataURL(khqrPhotoUpload.files[0]); // Read the file as a data URL

    }
    document.getElementById('khqrPhotoInputBtn').style.display = 'none';
    document.getElementById('khqrPhotoIcon').style.display = 'none';
    btnRemoveKhqrImg.style.display = 'block';
});

function removeImageFile() {
    khqrPhotoUpload.value = ''; // Clear the file input
    KhqrPhotoName.textContent = 'No file chosen';
}
btnRemoveKhqrImg.addEventListener('click', function () {
    khqrPhotoUpload.value = '';
    KhqrPhotoDisplay.src = "";
    KhqrPhotoDisplay.style.display = 'none';
    KhqrPhotoName.textContent = 'No file chosen';
    btnRemoveKhqrImg.style.display = 'none';
    document.getElementById('khqrPhotoInputBtn').style.display = 'block';
    document.getElementById('khqrPhotoIcon').style.display = 'block';
});