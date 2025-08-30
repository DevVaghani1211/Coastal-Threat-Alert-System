
# Train on your machine / Colab
import numpy as np, tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2

# TODO: Replace with real dataset loader (normal vs bloom images)
num_samples = 400
X = np.random.rand(num_samples, 64, 64, 3).astype(np.float32)
y = np.array([0]*(num_samples//2) + [1]*(num_samples//2))
idx = np.arange(num_samples); np.random.shuffle(idx); X, y = X[idx], y[idx]

base = MobileNetV2(input_shape=(64,64,3), include_top=False, weights=None)
model = models.Sequential([base, layers.GlobalAveragePooling2D(), layers.Dense(1, activation='sigmoid')])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X[:320], y[:320], validation_data=(X[320:], y[320:]), epochs=5, batch_size=32)
model.save("bloom_model.h5")
print("Saved bloom_model.h5")
