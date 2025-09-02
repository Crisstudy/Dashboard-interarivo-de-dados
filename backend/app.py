from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv("data/treinos.csv")
df.columns = df.columns.str.strip()

df["pace"] = (df["tempo_min"] / df["distancia_km"]).round(2)

@app.route("/api/treinos")
def get_treinos():
    return jsonify(df.to_dict(orient="records"))

@app.route("/api/resumo", methods=["GET"])
def get_resumo():
    resumo = {
        "total_corridas": len(df),
        "distancia_total": float(df["distancia_km"].sum()),
        "tempo_total": float(df["tempo_min"].sum()),
        "calorias_total": int(df["calorias"].sum()),
        "pace_medio": round(float(df["pace"].mean()),2)
    }
    return jsonify(resumo)

if __name__ == "__main__":
    app.run(debug=True)

