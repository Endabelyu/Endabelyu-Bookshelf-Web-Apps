// local web storage
    const STORAGE_KEY ="BOOKSHELF_APPS";
    let bookshelfs = [];
    let bookshelf = localStorage.getItem(STORAGE_KEY);
    const book = JSON.parse(bookshelf);
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

    function loadDataFromStorage() {
        const serializedData = bookshelf;

        let data = JSON.parse(serializedData);

        if(data !== null) 
            bookshelfs = data ;
        

        document.dispatchEvent(new Event("ondataloaded"));
    }

    function updateDataBuku() {
        if(isStorageExist()) 
        saveData();
    }

    function composeBookshelfObject(inputJudul,inputID,inputPenulis,inputTahunTerbit,sudahBelum) {
        return {
            id : +new Date(),
            inputJudul,
            inputID,
            inputPenulis,
            inputTahunTerbit,
            sudahBelum
        };
        
    }

    function findBookshelf(bookshelfId) {
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
