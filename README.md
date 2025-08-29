# 🌊 Coastal Threat Alert System  

A hackathon project to protect coastal communities by predicting storms, detecting algal blooms, and sending real-time SMS alerts to registered users.  

---

## ⚡ Overview  

This project combines **Machine Learning, Deep Learning, and AI assistance** to build a web-based platform for early warning and community support against coastal threats.  

---

## 📑 Website Pages  

### 1. 🔐 **Sign Up / Login**  
- Users register with **Name, Email, Phone Number, Password**.  
- Phone numbers are stored securely in the database.  
- Registered users automatically receive **SMS alerts** whenever a natural threat is detected.  
- **Tech:** Node.js/Python backend + SQLite/Firebase DB + Twilio/Fast2SMS API.  

---

### 2. 🏠 **Home / Introduction**  
- Explains the **problem (coastal threats)**, the **impact on lives & ecosystems**, and our **solution approach**.  
- 3 main solution cards:  
  1. Storm Prediction 🌪️  
  2. Algal Bloom Detection 🐟  
  3. AI Safety Assistant 🤖  
- Button → *“Start Monitoring”* → leads to Storm Prediction page.  

---

### 3. 🌪️ **Storm Prediction (ML Model + Auto-SMS)**  
- **Input:** Weather features (Wind Speed, Air Pressure, Tide Level, Rainfall).  
- **Model:** ML algorithm (Isolation Forest / Random Forest).  
- **Output:**  
  - Risk Level: High / Medium / Low.  
  - **Explainability:** Shows which features caused the alert (e.g., *High wind + Low pressure*).  
  - Historical Trend Chart of last 24h simulated data.  
- **Auto-SMS Alert:**  
  - If “High Risk” → SMS sent automatically to all registered users in **English + Gujarati/Hindi**.  

---

### 4. 🐠 **Algal Bloom Detection (DL Model + Auto-SMS)**  
- **Input:** Upload an image of sea (satellite/mock).  
- **Model:** CNN (ResNet / MobileNet) trained to classify *Normal* vs. *Algal Bloom*.  
- **Output:**  
  - Result: *“Algal Bloom Detected (72% confidence)”*.  
  - Historical Trend Chart (last 7 days simulated).  
- **Auto-SMS Alert:**  
  - If bloom probability > threshold → SMS alert sent to all registered users in multiple languages.  

---

### 5. 🤖 **AI Safety Assistant**  
- Chatbot page that guides users with **safety measures** during storms, floods, or algal blooms.  
- **Examples:**  
  - User: *“What should I do if cyclone alert is high?”*  
  - Bot: *“Stay indoors, keep emergency kit ready, avoid fishing, follow evacuation orders.”*  
- **Supports English + Gujarati/Hindi** (user can select language).  
- Backend: Rule-based Q&A / small AI model.  

---

## 🛠️ Tech Stack  

- **Frontend:** React + Tailwind + Recharts  
- **Backend:** Python (FastAPI/Flask) or Node.js  
- **ML Model:** Isolation Forest / Random Forest (scikit-learn)  
- **DL Model:** CNN (TensorFlow / PyTorch, MobileNet/ResNet)  
- **Database:** SQLite / Firebase / MongoDB  
- **SMS Alerts:** Twilio / Fast2SMS API  

---

## 🚀 Execution Flow  

1. User **signs up** with phone → added to DB.  
2. On **Storm Prediction page**, ML model predicts risk → if “High” → SMS alerts sent.  
3. On **Algal Bloom page**, DL model classifies image → if bloom → SMS alerts sent.  
4. On **AI Assistant page**, users get multilingual safety advice.  
5. Judges can see alerts history & SMS proof in console/logs.  

---

## 🎯 Impact  

- Saves lives by providing **early warnings**.  
- Protects marine ecosystems by detecting **algal blooms** early.  
- Builds **community resilience** with AI guidance + multilingual alerts.  
- Scalable for disaster management agencies, NGOs, and local communities.  

---
