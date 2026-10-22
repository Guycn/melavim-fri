let data = [];

fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = parseCSV(text);

    showResults(data.slice(2));

});


function parseCSV(text) {

    let rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (char === '"') {
            insideQuotes = !insideQuotes;
        }

        else if (char === "," && !insideQuotes) {
            row.push(cell.trim());
            cell = "";
        }

        else if (char === "\n" && !insideQuotes) {
            row.push(cell.trim());
            rows.push(row);
            row = [];
            cell = "";
        }

        else {
            cell += char;
        }
    }

    row.push(cell.trim());
    rows.push(row);

    return rows;
}



function showResults(rows) {

    let results = document.getElementById("results");
    let count = document.getElementById("count");

    results.innerHTML = "";

    count.innerHTML = 
    "נמצאו " + rows.length + " נסיעות";


    rows.forEach((row,index)=>{


        let card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `

        <div class="trip-title">
        🚍 נסיעה ${index+1}
        </div>


        <div class="line">
        🕒 <b>שעה:</b> ${row[2] || ""}
        </div>


        <div class="line">
        🔄 <b>סוג:</b> ${row[3] || ""}
        </div>


        <div class="line">
        🚐 <b>רכב:</b> ${row[1] || ""}
        </div>


        <div class="route">
        🏫 <b>מסלול:</b><br>
        ${row[4] || ""}
        </div>


        <div class="line">
        👨‍✈️ <b>נהג:</b><br>
        ${row[5] || ""}
        </div>


        <div class="escort">
        👤 <b>מלווה:</b><br>
        ${row[6] || ""}
        </div>


        <div class="note">
        📝 ${row[7] || ""}
        </div>

        `;


        results.appendChild(card);

    });

}




document.getElementById("search")
.addEventListener("input",function(){


    let search = this.value.toLowerCase();


    let filtered = data.slice(2).filter(row=>{

        return row.join(" ")
        .toLowerCase()
        .includes(search);

    });


    showResults(filtered);


});
