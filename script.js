const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file;

button.onclick = ()=>{
    input.click();
}

input.addEventListener("change", function(){
    file = this.files[0];
    dropArea.classList.add("active");
    showFile();
});

dropArea.addEventListener("dragover", (event)=> {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to upload file!";
});

dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to upload the file."
});

dropArea.addEventListener("drop", (event)=>{
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
});

function showFile(){
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if(validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="Image">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    }else{
        alert("This is not a support image type!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to upload file";
    }
}