const id_buku_belum_selesai = "daftarBelumDibaca";
const id_buku_sudah_selesai = "daftarSudahDibaca";   
const belumDibaca = document.getElementById("bdSection");
const sudahDibaca = document.getElementById("sdSection");
const botContainer = document.getElementById("botContainer");
const BOOKSHLEF_ITEMID = "bookId";
   // masukkan buku baru ke container belum /sudah  selesai  dibaca
  
    
    function masukanBuku(judul,id,penulis,tahun, sudahBelum) {
        
        const judulBuku = document.createElement("h3");       
        judulBuku.innerText = judul;

        const idBuku =  document.createElement ("p");
        idBuku.classList.add("pertama");
        idBuku.innerText = `Id Buku :  ${id}`;

        const penulisBuku = document.createElement("p");
        penulisBuku.classList.add("kedua");
        penulisBuku.innerText = `Penulis :  ${penulis}`;

        const tahunTerbit = document.createElement("p");
        tahunTerbit.classList.add("ketiga");
        tahunTerbit.innerText = `Tahun Terbit :  ${tahun}`;

        const containerBuku = document.createElement("article");
        containerBuku.classList.add("book_item");
        containerBuku.append(judulBuku, idBuku, penulisBuku, tahunTerbit);

        if(sudahBelum){
            containerBuku.append(tombolBelum(),tombolHapus());
        } else {
            containerBuku.append(tombolSudah(),tombolHapus());
        };
        
        return containerBuku;
    }

    // pindah buku
    function pindahBuku(judul,id,penulis,tahun, sudahBelum) {
        
        const judulBuku = document.createElement("h3");       
        judulBuku.innerText = judul;

        const idBuku =  document.createElement ("p");
        idBuku.classList.add("pertama");
        idBuku.innerText = ` ${id}`;

        const penulisBuku = document.createElement("p");
        penulisBuku.classList.add("kedua");
        penulisBuku.innerText = `${penulis}`;

        const tahunTerbit = document.createElement("p");
        tahunTerbit.classList.add("ketiga");
        tahunTerbit.innerText = `${tahun}`;

        const containerBuku = document.createElement("article");
        containerBuku.classList.add("book_item");
        containerBuku.append(judulBuku, idBuku, penulisBuku, tahunTerbit);
        if(sudahBelum){
            containerBuku.append(tombolBelum(),tombolHapus());
        } else {
            containerBuku.append(tombolSudah());
            containerBuku.append(tombolHapus());
            
        };
        return containerBuku;
    }
    // membuat button
    function buatButton(buttonClass, eventListener,textTombol) {
        const button = document.createElement("button");
        button.classList.add(buttonClass);
        button.innerText= textTombol;
        button.addEventListener("click", function (event) {
            eventListener(event);
            
        });
        return button;
    }
     // buat tombol sudah selesai
    function tombolSudah() {
        return buatButton ("green", function (event) {
            tambahKeSelesai(event.target.parentElement);
        }, "Selesai dibaca");
    }

    // buat tombol hapus buku
    function tombolHapus() {
        return buatButton("red", function (event) {
            hapusBuku(event.target.parentElement);
        }, "Hapus Buku");
    }

    // buat tombol belum selesai 
    function tombolBelum() {
        return buatButton("yellow", function (event) {
            tambahKeBelum(event.target.parentElement);
        }, "Belum Selesai dibaca");
    }


    // input buku baru
    function tambahBukuBaru(){
        const bukuBelumSelesai = document.getElementById(id_buku_belum_selesai);
        const bukuSudahSelesai = document.getElementById(id_buku_sudah_selesai);

        const inputJudul = document.getElementById("tambahJudulBuku").value;

        const inputID = document.getElementById("tambahIdBuku").value;

        const inputPenulis = document.getElementById("tambahPenulisBuku").value;

        const inputTahunTerbit= document.getElementById("tambahTahunTerbit").value;
        
        const bookshelfObject = composeBookshelfObject(inputJudul,inputID,inputPenulis,inputTahunTerbit,false);

        bookshelf[BOOKSHLEF_ITEMID] = bookshelfObject.id;


            if(checkboxBelum.checked === true){
                bukuBelumSelesai.append(masukanBuku(inputJudul,inputID,inputPenulis,inputTahunTerbit,false));
                bookshelfs.push(bookshelfObject);               
            }else if (checkboxSudah.checked ===true){
                bukuSudahSelesai.append(masukanBuku(inputJudul,inputID,inputPenulis,inputTahunTerbit,true));                
            }else{
                alert("Pilih Kategori Buku!")                
            }     
            
            updateDataStorage();
    };

      // masukkan buku ke container sudah selesai  dibaca
    function tambahKeSelesai(daftarBuku) {
        const judulBukuSelesai = daftarBuku.querySelector(".book_item>h3").innerText;

        const idBukuSelesai = daftarBuku.querySelector(".pertama").innerText;

        const penulisBukuSelesai = daftarBuku.querySelector(".kedua").innerText;

        const tahunTerbitSelesai = daftarBuku.querySelector(".ketiga").innerText;

        const tambahSelesai = pindahBuku(judulBukuSelesai,idBukuSelesai,penulisBukuSelesai,tahunTerbitSelesai, true);
        
        const bookshelf = findBookshef(daftarBuku[BOOKSHLEF_ITEMID]);
        bookshelf.sudahBelum = true;

        tambahSelesai[BOOKSHLEF_ITEMID] = bookshelf.id;

        const bukuSudahSelesai= document.getElementById(id_buku_sudah_selesai);
        bukuSudahSelesai.append(tambahSelesai);      
        
        daftarBuku.remove();  
        updateDataStorage();
    }
    // masukkan buku ke container belum selesai dibaca

    function tambahKeBelum(daftarBuku) {
        const belumSelesai = document.getElementById(id_buku_belum_selesai);

        const judulBukuBelum = daftarBuku.querySelector(".book_item>h3").innerText;

        const idBukuBelum = daftarBuku.querySelector(".pertama").innerText;

        const penulisBukuBelum = daftarBuku.querySelector(".kedua").innerText;

        const tahunTerbitBelum = daftarBuku.querySelector(".ketiga").innerText;

        const tambahBelum = pindahBuku(judulBukuBelum,idBukuBelum,penulisBukuBelum,tahunTerbitBelum, false);

        const bookshelf = findBookshef(daftarBuku[BOOKSHLEF_ITEMID]);
        bookshelf.sudahBelum = false;

        tambahBelum[BOOKSHLEF_ITEMID] =bookshelf.id;
        belumSelesai.append(tambahBelum);
        
        daftarBuku.remove();   
        updateDataStorage();
    }

    // menghapus buku
    function hapusBuku(daftarBuku) {
        
        const bookshelfPosition = findBookshelfIndex(daftarBuku[BOOKSHLEF_ITEMID]);
        bookshelfs.splice(bookshelfPosition,1);
        
        daftarBuku.remove();
        updateDataStorage();
    }
        const checkboxBelum = document.getElementById("checklistBelumSelesai");
        const checkboxSudah = document.getElementById("checklistSelesai");
    // aktifkan fitur checkbox 
    function aktifBelum() {      
        let boxAktifBelum = checkboxBelum.checked;
        if ( boxAktifBelum === true){
            checkboxSudah.setAttribute("disabled","");                    
        }else if (boxAktifBelum === false)  {
            checkboxSudah.removeAttribute("disabled","");                   
        }else{
            alert ("anda belum memilih kategori")
        }   
    }       

    function aktifSudah() {     
        let boxAktifSudah = checkboxSudah.checked;
        if ( boxAktifSudah === true){
            checkboxBelum.setAttribute("disabled","");             
        }else if ( boxAktifSudah === false){
            checkboxBelum.removeAttribute("disabled","");             
        }else {
            alert("anda belum memilih kategori");           
        }
    }

    // local web storage
    const STORAGE_KEY ="BOOKSHELF_APPS";
    let bookshelfs = [];

    function isStorageExist() {
        if(typeof(Storage) === undefined) {
            alert("browser kamu tidak mendukung local storage");        
            return false
        }
        return true;
    }

    function saveData() {
        const parsed = JSON.stringify(bookshelfs);

        localStorage.setItem(STORAGE_KEY,parsed);

        document.dispatchEvent(new Event("ondatasaved"));  
    }

    function localDataFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);


        let data = JSON.parse(serializedData);


        if(data !== null) {
            bookshelfs = data ;
        }

        document.dispatchEvent(new Event("ondataloaded"));
    }

    function updateDataStorage() {
        if(isStorageExist())
        saveData();
        
    }

    function composeBookshelfObject(inputJudul,inputID,inputPenulis,inputTahunTerbit,sudahBelum) {
        return {
            judul,
            id,
            penulis,
            tahun,
            sudahBelum
        };
        
    }

    function findBookshef(bookshelfId) {
        for(bookshelf of bookshelfs) {
            if(bookshelf.id === bookshelfId)
            return bookshelf;
        }
        return null;
    }


    function findBookshelfIndex(bookshelfId) {
        let index = 0;
        for(bookshelf of bookshelfs){
            if(bookshelf.id === bookshelfId)
                return index;
            
            index++        
        }
        return -1;        
    }

    function refreshDataFromBookshelfs() {
        const listBelumSelesai = document.getElementById(id_buku_belum_selesai) ;
        let listSelesai = document.getElementById(id_buku_sudah_selesai);

        for (bookshelf of bookshelfs) {
            const tambahs
        }
    }