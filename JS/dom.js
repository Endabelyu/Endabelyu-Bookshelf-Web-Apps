const id_buku_belum_selesai = "daftarBelumDibaca";
const id_buku_sudah_selesai = "daftarSudahDibaca";   
const BOOKSHLEF_ITEMID = "itemID";
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
            event.stopPropagation();
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

        const  bukuBelum = masukanBuku(inputJudul,inputID,inputPenulis,inputTahunTerbit,false)

        const  bukuSudah= masukanBuku(inputJudul,inputID,inputPenulis,inputTahunTerbit,true)

        const bookshelfObjectBelum = composeBookshelfObject(inputJudul,inputID,inputPenulis,inputTahunTerbit,false)
        const bookshelfObjectSudah = composeBookshelfObject(inputJudul,inputID,inputPenulis,inputTahunTerbit,true)
        bukuBelum[BOOKSHLEF_ITEMID] = bookshelfObjectBelum.id;
        bukuSudah[BOOKSHLEF_ITEMID] = bookshelfObjectSudah.id;
            if(checkboxBelum.checked === true){
                bukuBelumSelesai.append(bukuBelum); 
                bookshelfs.push(bookshelfObjectBelum);  
                 
            }else if (checkboxSudah.checked ===true){
                bukuSudahSelesai.append(bukuSudah);    
                bookshelfs.push(bookshelfObjectSudah);           
                
            }else{
                alert("Pilih Kategori Buku!")                
            }     
            confirm("apakah anda yakin akan menambahkan buku ini?");
            console.log(bukuBelum[BOOKSHLEF_ITEMID]);
            console.log(bukuSudah[BOOKSHLEF_ITEMID])
            updateDataBuku();
    };
      // masukkan buku ke container sudah selesai  dibaca
    function tambahKeSelesai(daftarBuku) {
        const judulBukuSelesai = daftarBuku.querySelector(".book_item>h3").innerText;

        const idBukuSelesai = daftarBuku.querySelector(".pertama").innerText;

        const penulisBukuSelesai = daftarBuku.querySelector(".kedua").innerText;

        const tahunTerbitSelesai = daftarBuku.querySelector(".ketiga").innerText;

        const tambahSelesai = pindahBuku(judulBukuSelesai,idBukuSelesai,penulisBukuSelesai,tahunTerbitSelesai, true);
        
        const bukuSudahSelesai= document.getElementById(id_buku_sudah_selesai);
        bukuSudahSelesai.append(tambahSelesai);      
        const bookshelf = findBookshelf(daftarBuku[BOOKSHLEF_ITEMID]);
        bookshelf.sudahBelum=true;
        bukuSudahSelesai[BOOKSHLEF_ITEMID] = bookshelf.id;
        daftarBuku.remove();  
         updateDataBuku();

    }
    // masukkan buku ke container belum selesai dibaca

    function tambahKeBelum(daftarBuku) {
        const belumSelesai = document.getElementById(id_buku_belum_selesai);

        const judulBukuBelum = daftarBuku.querySelector(".book_item>h3").innerText;

        const idBukuBelum = daftarBuku.querySelector(".pertama").innerText;

        const penulisBukuBelum = daftarBuku.querySelector(".kedua").innerText;

        const tahunTerbitBelum = daftarBuku.querySelector(".ketiga").innerText;

        const tambahBelum = pindahBuku(judulBukuBelum,idBukuBelum,penulisBukuBelum,tahunTerbitBelum, false);
        belumSelesai.append(tambahBelum);
        
        const bookshelf = findBookshelf(daftarBuku[BOOKSHLEF_ITEMID]);
        bookshelf.sudahBelum = false;
        tambahBelum[BOOKSHLEF_ITEMID] = bookshelf.id;

        daftarBuku.remove();  
        updateDataBuku();

    }

    // menghapus buku
    function hapusBuku(daftarBuku) {
        const bookshelfPosition =findBookshelfIndex(daftarBuku[BOOKSHLEF_ITEMID]);
        bookshelfs.splice(bookshelfPosition,1);
        confirm("apakah anda yakin akan menghapus buku ini?");
        daftarBuku.remove();
         updateDataBuku();
             alert(`Anda telah menghapus data buku yang tersimpan`);


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

    // menyimpan data buku
    function refreshDataFromBookshelfs() {
        const listBelumSelesai = document.getElementById(id_buku_belum_selesai);
        let listSelesai = document.getElementById(id_buku_sudah_selesai)


        for (bookshelf of bookshelfs){
            const tambahBuku = masukanBuku(bookshelf.inputJudul,bookshelf.inputID,bookshelf.inputPenulis,bookshelf.inputTahunTerbit,bookshelf.sudahBelum) ;
            tambahBuku[BOOKSHLEF_ITEMID] = bookshelf.id;

            if(bookshelf.sudahBelum){
                listSelesai.append(tambahBuku);
            }else{
                listBelumSelesai.append(tambahBuku);
            }
        }
        console.log(tambahBuku[BOOKSHLEF_ITEMID]);
        updateDataBuku();
    }


    // function search tidak diaktifkan karena saya belum bisa membuat sepenuhnya
// // mengaktifkan tombol cari
// // function cariBukuDiRak() {
//     const tombolCaribuku = document.getElementById("tombolCari");
//     const inputanDicari    = document.getElementById("cariJudul");
    
//     tombolCaribuku.addEventListener('click', (event)=> {
//         console.log(bookshelf);
//         event.preventDefault();
//     });
//     inputanDicari.addEventListener('input', (event)=> {
//         const cariKata = event.target.value;
//         for(bookshelf of bookshelfs){
//             const filterKata = bookshelfs.filter( bookshelf => {
//                         return(
//                             bookshelf.inputJudul.includes(cariKata)||
//                             bookshelf.inputPenulis.includes(cariKata)
//                         );
//                     });
//             tampilkanBuku(filterKata)
//         }
       
//     });
// //   tampilkan buku
//     const tampilkanBuku = (bookshelfs) => {
//         bookshelfs.map((bookshelf)=> {
//             return masukanBuku(bookshelf.inputJudul,bookshelf.inputID,bookshelf.inputPenulis,bookshelf.inputTahunTerbit,bookshelf.sudahBelum)
            
//         });
//     }