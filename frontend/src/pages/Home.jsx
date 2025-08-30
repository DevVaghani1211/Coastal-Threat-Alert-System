import React from "react";
import Link from "next/link"; // ✅ Next.js Link
import styles from "./Home.module.css"; // ✅ CSS Module

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Coastal Threat Alert System
          </h1>
          <p className={styles.heroSubtitle}>
            Advanced AI-powered storm prediction and algal bloom detection with real-time SMS alerts
          </p>
          <div className={styles.heroButtons}>
            <Link href="/storm" className={`${styles.ctaButton} ${styles.primary}`}>
              Storm Prediction
            </Link>
            <Link href="/bloom" className={`${styles.ctaButton} ${styles.secondary}`}>
              Bloom Detection
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.waveAnimation}>
            <div className={`${styles.wave} ${styles.wave1}`}></div>
            <div className={`${styles.wave} ${styles.wave2}`}></div>
            <div className={`${styles.wave} ${styles.wave3}`}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌊</div>
              <h3>Storm Prediction</h3>
              <p>Advanced machine learning models to predict coastal storms with high accuracy</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌿</div>
              <h3>Algal Bloom Detection</h3>
              <p>AI-powered detection of harmful algal blooms using satellite imagery</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Real-time Alerts</h3>
              <p>Instant SMS notifications when threats are detected</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h3>AI Assistant</h3>
              <p>Interactive AI-powered assistant for threat analysis and guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of coastal communities already protected by our system</p>
          <Link href="/signup" className={`${styles.ctaButton} ${styles.primary} ${styles.large}`}>
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
