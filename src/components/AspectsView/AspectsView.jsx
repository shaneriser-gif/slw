import { ASPECT_KEYS, ASPECT_COLORS, ASPECT_DATA } from '../../data/aspects'
import styles from './AspectsView.module.css'

export default function AspectsView({ selectedAspect, onAspectSelect, scores, onScoreChange, diary, t }) {
  if (!selectedAspect) {
    return (
      <div className={styles.grid}>
        {ASPECT_KEYS.map(key => (
          <div
            key={key}
            onClick={() => onAspectSelect(key)}
            className={styles.card}
            style={{ borderColor: `${ASPECT_COLORS[key]}33` }}
          >
            <div className={styles.code} style={{ color: ASPECT_COLORS[key] }}>{key}</div>
            <div className={styles.name}>{ASPECT_DATA[key].name}</div>
            <div className={styles.sub}>{ASPECT_DATA[key].sub}</div>
            <div className={styles.scoreBar}>
              <div className={styles.bar}>
                <div 
                  className={styles.fill} 
                  style={{ 
                    width: `${scores[key] * 10}%`,
                    background: ASPECT_COLORS[key]
                  }} 
                />
              </div>
              <span style={{ color: ASPECT_COLORS[key] }}>{scores[key]}/10</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const data = ASPECT_DATA[selectedAspect]
  const color = ASPECT_COLORS[selectedAspect]

  return (
    <div className={styles.detail}>
      <button onClick={() => onAspectSelect(null)} className={styles.backButton}>
        {t.aspects.back}
      </button>
      <div className={styles.header}>
        <span className={styles.detailCode} style={{ color }}>{selectedAspect}</span>
        <span className={styles.detailName}>{data.name}</span>
      </div>
      <p className={styles.essence}>{data.essence}</p>
      {/* Добавить остальные секции по необходимости */}
    </div>
  )
}
