const id_buku_belum_selesai = "daftarBelumDibaca";
const id_buku_sudah_selesai = "daftarSudahDibaca";   
    
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

        const inputJudul = document.getElementById("tambahJudulBuku").value;

        const inputID = document.getElementById("tambahIdBuku").value;

        const inputPenulis = document.getElementById("tambahPenulisBuku").value;

        const inputTahunTerbit= document.getElementById("tambahTahunTerbit").value;

        const tambah = masukanBuku(inputJudul,inputID,inputPenulis,inputTahunTerbit);

        bukuBelumSelesai.append(tambah);

        // confirm(`apakah anda yakin menambahkan buku dengan kriteria sebagai berikut? \n judul: ${inputJudul} \n Id: ${inputID} \n Penulis: ${inputPenulis} \n Tahun: ${inputTahunTerbit} \n\n Jika iya tekan ok!`);   
    };

      // masukkan buku ke container sudah selesai  dibaca
    function tambahKeSelesai(daftarBuku) {
        const judulBukuSelesai = daftarBuku.querySelector(".book_item>h3").innerText;

        const idBukuSelesai = daftarBuku.querySelector(".pertama").innerText;

        const penulisBukuSelesai = daftarBuku.querySelector(".kedua").innerText;

        const tahunTerbitSelesai = daftarBuku.querySelector(".ketiga").innerText;

        const tambahSelesai = masukanBuku(judulBukuSelesai,idBukuSelesai,penulisBukuSelesai,tahunTerbitSelesai, true);
        
        const bukuSudahSelesai= document.getElementById(id_buku_sudah_selesai);

        bukuSudahSelesai.append(tambahSelesai);
        daftarBuku.remove();  
    }
    // masukkan buku ke container belum selesai dibaca

    function tambahKeBelum(daftarBuku) {
        const belumSelesai = document.getElementById(id_buku_belum_selesai);

        const judulBukuBelum = daftarBuku.querySelector(".book_item>h3").innerText;

        const idBukuBelum = daftarBuku.querySelector(".pertama").innerText;

        const penulisBukuBelum = daftarBuku.querySelector(".kedua").innerText;

        const tahunTerbitBelum = daftarBuku.querySelector(".ketiga").innerText;

        const tambahBelum = masukanBuku(judulBukuBelum,idBukuBelum,penulisBukuBelum,tahunTerbitBelum, false);
        

        belumSelesai.append(tambahBelum);
        daftarBuku.remove();  
    }

    // menghapus buku
    function hapusBuku(daftarBuku) {
        daftarBuku.remove();
        
    }