// URL do backend Flask
const API_URL = "http://127.0.0.1:5000";

// Atualizar cards de resumo
async function carregarResumo() {
    try {
        const res = await fetch(`${API_URL}/api/resumo`);
        const data = await res.json();

        document.getElementById("totalCorridas").innerText = `Corridas: ${data.total_corridas}`;
        document.getElementById("distanciaTotal").innerText = `Distância: ${data.distancia_total} km`;
        document.getElementById("caloriasTotal").innerText = `Calorias: ${data.calorias_total}`;
        document.getElementById("paceMedio").innerText = `Pace: ${data.pace_medio} min/km`;
    } catch (error) {
        console.error("Erro ao carregar resumo:", error);
    }
}

// Carregar treinos em uma tabela
async function carregarTreinos() {
    try {
        const res = await fetch(`${API_URL}/api/treinos`);
        const treinos = await res.json();

        const tabela = document.getElementById("tabelaTreinos");
        tabela.innerHTML = ""; // limpa antes de preencher

        treinos.forEach(t => {
            const row = `
                <tr>
                    <td>${t.data}</td>
                    <td>${t.distancia_km} km</td>
                    <td>${t.tempo_min} min</td>
                    <td>${t.calorias}</td>
                    <td>${t.pace} min/km</td>
                </tr>
            `;
            tabela.innerHTML += row;
        });
    } catch (error) {
        console.error("Erro ao carregar treinos:", error);
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
    carregarTreinos();
    carregarGraficos();
});
