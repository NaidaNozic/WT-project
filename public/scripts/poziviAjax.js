const PoziviAjax = (()=>{
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
    }
    function impl_postLogin(username,password,fnCallback){
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null,ajax.response)
            }
            else if(ajax.readyState == 4){
                //desio se neki error
                fnCallback(ajax.statusText,null)
            }
        }
        ajax.open("POST", "http://localhost:3000/login", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        var objekat = {
            "username":username,
            "password":password
        }
        forSend=JSON.stringify(objekat)
        ajax.send(forSend)
    }
    function impl_postLogout(fnCallback){
        let ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null,ajax.response)
            }
            else if(ajax.readyState == 4){
                //desio se neki error
                fnCallback(ajax.statusText,null)
            }
        }
        ajax.open("POST", "http://localhost:3000/logout", true)
        ajax.send()
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
    }
    return{
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    postPrisustvo: impl_postPrisustvo
    };
    })();
