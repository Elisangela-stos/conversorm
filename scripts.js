const form = document.getElementById("converterform")
const amount = document.getElementById("amount")
const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const convertedAmount = document.getElementById("convertedAmount")
const loading = document.querySelector(".loading")
const resultDiv = document.querySelector(".result")
const errorDiv = document.querySelector(".error")

const API_URL = "https://open.er-api.com/v6/latest/";


async function converterMoney(){
    loading.style.display = "block"
    errorDiv.style.display = "none"
    resultDiv.style.display = "none"

 
    try {
        const response = await fetch(API_URL + fromCurrency.value);
        const data = await response.json();

        if(data.result === "sucess"){
        const rate = data.rates(toCurrency.value);
        const convertedValue = (amount.value * rate).toFixed(2);
        convertedAmount.value = convertedValue;
        resultDiv.style.display = "block";

        resultDiv.innerHTML = `
        <div style="font-size: 1.4rem;">
         ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>
        
        <div style="font-size: 0.9rem; opacity 0.8; margin-top:10px">
                    Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
                </div>
                `;
        }else {
            throw new Error("API não retornou dados válidos");

        }
   

       } catch(err) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = 'Falha ao converter moeda! Tente novamente';
        console.error(err);
    } finally {
        loading.style.display = "none";
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    converterMoney();
});

