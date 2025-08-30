
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from schema import StormInput
from database import get_db
from models import User
from alerts.alert_manager import log_alert
from alerts.notifier import notify_numbers
import numpy as np
import pickle
from pathlib import Path

router = APIRouter(tags=["predict"])

STORM_MODEL_PATH = Path(__file__).resolve().parent.parent / "ml" / "storm_model.pkl"
BLOOM_MODEL_PATH = Path(__file__).resolve().parent.parent / "dl" / "bloom_model.h5"

# Load storm model once
with open(STORM_MODEL_PATH, "rb") as fh:
    STORM_MODEL = pickle.load(fh)

def get_all_numbers(db: Session):
    return [u.phone for u in db.query(User).all()]

@router.post("/predict_storm")
def predict_storm(inp: StormInput, db: Session = Depends(get_db)):
    X = np.array([[inp.wind_speed, inp.air_pressure, inp.tide_height, inp.rainfall]])
    prob = 0.0
    pred = int(STORM_MODEL.predict(X)[0])
    if hasattr(STORM_MODEL, "predict_proba"):
        prob = float(STORM_MODEL.predict_proba(X)[0][1])
    severity = "HIGH" if pred==1 else ("LOW" if prob<0.3 else "MEDIUM")
    message = f"Storm Risk: {severity}. wind={inp.wind_speed}km/h pressure={inp.air_pressure}hPa rainfall={inp.rainfall:.1f}mm"
    rec = log_alert(db, "STORM", severity, message)
    if pred==1:
        numbers = get_all_numbers(db)
        notify_numbers(numbers, f"⚠️ Cyclone Alert: {severity}. Stay indoors. {message}")
    return {"prediction": pred, "probability": prob, "severity": severity, "alert_id": rec.id}

@router.post("/predict_bloom")
async def predict_bloom(file: UploadFile = File(...), db: Session = Depends(get_db)):
    data = await file.read()
    # Try TensorFlow model; fallback to heuristic if TF not installed
    pred_prob = 0.0
    try:
        import io
        from PIL import Image
        import numpy as np
        try:
            import tensorflow as tf
            model = tf.keras.models.load_model(str(BLOOM_MODEL_PATH))
            img = Image.open(io.BytesIO(data)).convert("RGB").resize((64,64))
            arr = np.array(img)/255.0
            arr = np.expand_dims(arr, axis=0)
            pred_prob = float(model.predict(arr, verbose=0)[0][0])
        except Exception:
            # Heuristic: greener images -> higher bloom probability
            img = Image.open(io.BytesIO(data)).convert("RGB").resize((64,64))
            arr = np.array(img).astype(float)
            g_ratio = arr[:,:,1].mean() / (arr.mean()+1e-6)
            pred_prob = float(min(1.0, max(0.0, (g_ratio-0.33)*1.5)))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {e}")
    pred = int(pred_prob >= 0.5)
    severity = "HIGH" if pred_prob>=0.8 else ("MEDIUM" if pred_prob>=0.5 else "LOW")
    message = f"Algal Bloom Risk: {severity} (p={pred_prob:.2f})"
    rec = log_alert(db, "BLOOM", severity, message)
    if pred==1:
        numbers = get_all_numbers(db)
        notify_numbers(numbers, f"⚠️ Algal Bloom Alert: {severity}. Avoid water & seafood. {message}")
    return {"prediction": pred, "probability": pred_prob, "severity": severity, "alert_id": rec.id}
