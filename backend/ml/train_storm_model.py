
import pandas as pd, numpy as np, pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

np.random.seed(42)
N=5000
df = pd.DataFrame({
    "wind_speed": np.random.randint(10, 200, N),
    "air_pressure": np.random.randint(950, 1050, N),
    "tide_height": np.random.uniform(0.5, 5.0, N),
    "rainfall": np.random.uniform(0, 300, N)
})
df["storm"] = ((df["wind_speed"] > 120) & (df["air_pressure"] < 1000) & (df["rainfall"] > 100)).astype(int)

X = df.drop("storm", axis=1); y = df["storm"]
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=200, random_state=42).fit(Xtr, ytr)
print("Accuracy:", model.score(Xte, yte))

with open("storm_model.pkl", "wb") as f:
    pickle.dump(model, f)
print("Saved storm_model.pkl")
