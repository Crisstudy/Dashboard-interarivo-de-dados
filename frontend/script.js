// URL do backend Flask
const API_URL = "http://127.0.0.1:5000";

// Atualizar cards de resumo
async function carregarResumo() {
    try {
        const res = await fetch(`${API_URL}/api/resumo`);
        const data = await res.json();

        document.getElementById("totalCorridas").innerText = `Corridas: ${data.totalCorridas}`;
        document.getElementById("distanciaTotal").innerText = `Distância: ${data.distanciaTotal} km`;
        document.getElementById("caloriasTotal").innerText = `Calorias: ${data.caloriasTotal}`;
        document.getElementById("paceMedio").innerText = `Pace: ${data.paceMedio} min/km`;
        } catch (error) {
        console.error("Erro ao carregar resumo:", error);
        }
}

// Criar gráficos
async function carregarGraficos() {
    try {
        const res = await fetch(`${API_URL}/api/treinos`);
        const treinos = await res.json();

        const datas = treinos.map(t => t.data);
        const distancias = treinos.map(t => t.distancia_km);
        const calorias = treinos.map(t => t.calorias);

    // Gráfico de distâncias
        new Chart(document.getElementById("graficoDistancia"), {
        type: "line",
        data: {
            labels: datas,
            datasets: [{
            label: "Distância (km)",
            data: distancias,
            borderColor: "blue",
            fill: false,
            tension: 0.1
            }]
        }
    });

    // Gráfico de calorias
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
    } catch (error) {
    console.error("Erro ao carregar gráficos:", error);
    }
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarResumo();
    carregarGraficos();
});
