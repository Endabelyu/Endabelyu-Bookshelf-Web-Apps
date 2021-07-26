document.addEventListener("DOMContentLoaded", function (){

    const tambahBuku = document.getElementById('tambahBuku');
    
    tambahBuku.addEventListener("submit", function(event){
            event.preventDefault();
            tambahBukuBaru();
    });
    if(isStorageExist()){
        loadDataFromStorage();
    }
});


document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelfs();
});
