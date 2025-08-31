//URL do backend Flask
const API_URL = "http://127.0.0.1:5000";

//Atualizar cards de resumo
async function carregarResumo() {
    const res = await fetch(`${API_URL}/api/resumo`);
    const data = await res.json();

    document.getElementById("totalCorridas").innerText`Corridas: ${data.totalCorridas}`;
    document.getElementById("distanciaTotal").innerText`Distancia: ${data.distanciaTotal}km`;
    document.getElementById("caloriasTotal").innerText`Calorias: ${data.caloriasTotal}`;
    document.getElementById("paceMedio").innerText`Pace: ${data.paceMedio}min/km`;
}

//Criar gráficos
async function carregarGraficos() {
    const res = await fetch(`${API_URL}/api/resumo`);
    const treinos = await res.json();

    const datas = treinos.map(t => t.data);
    const distancias = treinos.map(t => t.distancia_km);
    const calorias = treinos.map(t => t.calorias);

//Grafico de distâcias
new Chart(document.getElementById(graficoDistancia), {
    type: "line",
    data: {
        labels: datas,
        datasets: [{
            label: "Distancia (km)",
            data: distancias,
            borderColor: "blue",
            fill: false,
            tension: 0.1
        }]
    }
});

//Grafico de calorias
new Chart(document.getElementById("graficoCalorias"), {
    type: "bar",
    data: {
        labels: datas,
        datasets: [{
        label: "Calorias",
        data: calorias,
        backgroundColor: "orange"
            }]
        }
    });
}

//Inicializar
carregarResumo()
carregarGraficos()

