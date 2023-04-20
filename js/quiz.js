let domande = "";

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                domande = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}

readTextFile("domande.json"); // non so perchè ma devo fare così
domande = JSON.parse(domande);

window.onload = function () {
    //da importare da un file json

    //template domande
    header_template = '<hr/><h5> %question_string </h1>';
    option_template = `
    <label for='option-%inputid' id="lbl-opt-%inputid">
        <input type='radio' name='option-%qid' id='option-%inputid'/>%opt_string</label>
    <br/>
    `;
    var inputidre = new RegExp("%inputid", "g");
    var qidre = new RegExp("%qid", "g")
    //il div in cui verranno inserite le domande
    target_tag = document.getElementById("domandezone");

    //numero della domanda corrente (serve per assegnare gli id)
    var dn = 0
    //per ogni domanda
    domande.forEach(q => {
        console.log(q)

        //domanda risposta multipla
        if (q.type == "MC") {
            //domanda
            target_tag.innerHTML += header_template.replace("%question_string", q.q);
            //option number, sempre per gli id
            var on = 0;
            //spamma le opzioni
            q.opts.forEach(option => {
                var s = option_template.replace("%opt_string", option).replace(inputidre, dn + "-" + on).replace(qidre, dn);

                target_tag.innerHTML += s;

                on += 1;
            });
        }

        if (q.type == "VF") {
            //domanda
            target_tag.innerHTML += header_template.replace("%question_string", q.q);

            //vero o false?
            target_tag.innerHTML += option_template.replace("%opt_string", " Vero").replace(inputidre, dn + "-V").replace(qidre, dn);
            target_tag.innerHTML += option_template.replace("%opt_string", " Falso").replace(inputidre, dn + "-F").replace(qidre, dn);
        }

        dn += 1;
    });
}

function checkAnswers() {
    var n_correct = 0;

    //per ogni domanda
    for (let i = 0; i < domande.length; i++) {
        q = domande[i]

        if (q.type == "MC") {
            var ans = q.ans.charCodeAt(0) - 65;

            for (let optn = 0; optn < q.opts.length; optn++) {
                var checked = document.getElementById("option-" + i + "-" + optn).checked
                var label = document.getElementById("lbl-opt-" + i + "-" + optn)

                //se è la risposta giusta la marca e controlla se è stata indovinata.
                if (optn == ans) {
                    if (checked)
                        n_correct += 1;
                    label.style = "color:green";
                }
                //se non è corretta ma è stata cliccata l'utente è un pirla
                else if (checked)
                    label.style = "color:red";
            }
        }
        else if (q.type == "VF") {
            var ans = q.ans;
            var useranswered = true;

            var correct = ans ? "V" : "F";
            var err = ans ? "F" : "V";

            //marca la risposta corretta
            document.getElementById("lbl-opt-" + i + "-" + correct).style = "color:green";

            //controlla se la risposta è corretta
            if (document.getElementById("option-" + i + "-" + correct).checked)
                n_correct += 1;

            //controlla se la risposta è sbagliata
            if (document.getElementById("option-" + i + "-" + err).checked)
                document.getElementById("lbl-opt-" + i + "-" + err).style = "color:red";

        }
    }

    var previous = document.getElementsByClassName("results");
    if (previous.length > 0)
        previous[0].remove();
    var maintag = document.getElementById("domandezone");
    maintag.innerHTML =
        "<div class=\"results\"><h3> Risultato Quiz </h4><br/><p>Risposte corrette <b>:"
        + n_correct + "/" + domande.length + "</b><br/>Percentuale: <b>" + Math.round(n_correct / domande.length * 100) + "%</b></p>"
        + "</div>" + maintag.innerHTML;

    window.scrollTo(0, 0);
}