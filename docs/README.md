
# Coastal Threat Alert System (Team Newbies)

## Run Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# set Twilio creds in backend/.env or export as env vars
uvicorn app:app --reload
```

## Run Frontend
Use any React boilerplate (Vite/CRA). For quick test, the minimal App here renders pages but 'npm start' is a placeholder.
Set API base via `VITE_API=http://localhost:8000/api` if needed.

## Endpoints
- POST /api/signup
- POST /api/login
- POST /api/predict_storm
- POST /api/predict_bloom (multipart file)
- POST /api/ask

## Models
- backend/ml/storm_model.pkl (trained RandomForest)
- backend/dl/bloom_model.h5 (placeholder; replace after training script)
```bash
# Train locally if desired
cd backend/ml && python train_storm_model.py
cd ../dl && python train_bloom_model.py
```
