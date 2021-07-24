document.addEventListener("DOMContentLoaded", function (){

    const tambahBuku = document.getElementById('tambahBuku');
    
    tambahBuku.addEventListener("submit", function(event){
            event.preventDefault();
            tambahBukuBaru();
    });
});