let data = [];

fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = text.split("\n");

    show(data);

});


function show(rows){

    let results = document.getElementById("results");

    results.innerHTML="";


    rows.forEach(row=>{

        if(row.trim()=="") return;


        let div=document.createElement("div");

        div.className="row";

        div.textContent=row;

        results.appendChild(div);

    });

}



document.getElementById("search")
.addEventListener("input",function(){

    let value=this.value.toLowerCase();


    let filtered=data.filter(row=>

        row.toLowerCase().includes(value)

    );


    show(filtered);

});
