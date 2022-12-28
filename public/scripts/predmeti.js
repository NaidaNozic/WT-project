
 function buttonsControl(button) {
    alert(button.innerHTML);
   }

var predmeti1=document.getElementsByTagName("li")
window.onload=function(){
var dugme=document.getElementById("dugme")

    dugme.onclick=function(){
        PoziviAjax.postLogout(function(err,data){

            if(err != null){
                window.alert(err)
            }else{
                //redirektujem se nazad na pocetnu stranicu prijava.html
                window.location.href="http://localhost:3000/prijava.html"
            }
        })
    }
    
for (let p of predmeti1) {
    p.addEventListener("click", function(event){
        buttonsControl(event.target);
    },false);
  }
}
