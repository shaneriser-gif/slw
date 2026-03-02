import { useState } from 'react'
import { ASPECT_KEYS, ASPECT_COLORS, ASPECT_DATA } from '../../data/aspects'
import styles from './AspectsView.module.css'

export default function AspectsView({ selectedAspect, onAspectSelect, scores, onScoreChange, diary, t }) {
  const [tab, setTab] = useState('theory')

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
  const aspectDiary = diary.filter(e => e.aspect === selectedAspect)

  const handleScoreChange = (value) => {
    onScoreChange({ ...scores, [selectedAspect]: value })
  }

  const tabs = [
    ['theory', 'Теория'],
    ['assess', 'Самооценка'],
    ['goals', 'Цели'],
    ['diary', 'Дневник']
  ]

  return (
    <div className={styles.detail}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <button onClick={() => onAspectSelect(null)} className={styles.backButton}>
          ← Назад
        </button>
        <div className={styles.headerContent}>
          <div>
            <span className={styles.detailCode} style={{ color, textShadow: `0 0 20px ${color}66` }}>
              {selectedAspect}
            </span>
            <span className={styles.detailName}>{data.name}</span>
            <div className={styles.detailMeta}>{data.sub} · {data.metaphor}</div>
          </div>
          <div className={styles.scoreControl}>
            <div className={styles.scoreLabel}>ОЦЕНКА</div>
            <div className={styles.scoreInput}>
              <input
                type="range"
                min="1"
                max="10"
                value={scores[selectedAspect]}
                onChange={(e) => handleScoreChange(+e.target.value)}
                style={{ accentColor: color }}
              />
              <span style={{ color }}>{scores[selectedAspect]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map(([t, l]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            style={tab === t ? { borderBottomColor: color, color } : {}}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Theory Tab */}
      {tab === 'theory' && (
        <div className={styles.theoryGrid}>
          {/* Суть */}
          <div className={styles.card} style={{ borderColor: `${color}22` }}>
            <div className={styles.cardTitle} style={{ color }}>Суть Аспекта</div>
            <p className={styles.cardText}>{data.essence}</p>
          </div>

          {/* Суперспособность */}
          <div className={styles.card} style={{ borderColor: `${color}44`, boxShadow: `0 0 20px ${color}33` }}>
            <div className={styles.cardTitle} style={{ color }}>✦ Суперспособность</div>
            <p className={styles.cardTextItalic}>{data.superpower}</p>
          </div>

          {/* Дилеммы */}
          {data.dilemmas && data.dilemmas.length > 0 && (
            <div className={styles.card}>
              <div className={styles.cardTitle} style={{ color }}>Ключевые Дилеммы</div>
              {data.dilemmas.map((d, i) => (
                <div key={i} className={styles.dilemma}>
                  <div className={styles.dilemmaTitle}>{d.t}</div>
                  <div className={styles.dilemmaGrid}>
                    <div className={styles.dilemmaShadow}>
                      <span className={styles.dilemmaLabel}>ТЕНЬ</span> {d.s}
                    </div>
                    <div className={styles.dilemmaGift}>
                      <span className={styles.dilemmaLabel}>ДАР</span> {d.g}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Архетипы */}
          {data.archetypes && (
            <div className={styles.card}>
              <div className={styles.cardTitle} style={{ color }}>Архетипы</div>
              <div className={styles.archetypeSection}>
                <div className={styles.archetypeLabel} style={{ color: '#f87171' }}>ТЕНЬ</div>
                {data.archetypes.shadow.map((a, i) => (
                  <div key={i} className={styles.archetypeItem}>{a}</div>
                ))}
              </div>
              <div className={styles.archetypeSection}>
                <div className={styles.archetypeLabel} style={{ color: '#4ade80' }}>ДАР</div>
                {data.archetypes.gift.map((a, i) => (
                  <div key={i} className={styles.archetypeItem} style={{ borderLeftColor: `${color}44` }}>{a}</div>
                ))}
              </div>
            </div>
          )}

          {/* Красные флаги */}
          {data.redFlags && data.redFlags.length > 0 && (
            <div className={styles.card}>
              <div className={styles.cardTitle} style={{ color: '#f87171' }}>⚠ Красные Флаги</div>
              {data.redFlags.map((f, i) => (
                <div key={i} className={styles.redFlag}>
                  <span style={{ color: '#f87171' }}>›</span> {f}
                </div>
              ))}
            </div>
          )}

          {/* Страхи + Советы */}
          <div className={styles.card}>
            <div className={styles.cardTitle} style={{ color }}>Страхи & Защиты</div>
            <p className={styles.fearText}><b>Страхи:</b> {data.fears}</p>
            <p className={styles.fearText}><b>Защиты:</b> {data.defenses}</p>
            <div className={styles.divider} />
            <div className={styles.cardTitle} style={{ color }}>Советы Коуча</div>
            {data.coachTips && data.coachTips.map((t, i) => (
              <div key={i} className={styles.coachTip}>
                <span style={{ color }}>{i + 1}.</span> {t}
              </div>
            ))}
          </div>

          {/* Resources */}
          {data.resources && data.resources.length > 0 && (
            <div className={styles.card} style={{ gridColumn: '1/-1' }}>
              <div className={styles.cardTitle} style={{ color }}>Ресурсные Действия</div>
              <div className={styles.resourceGrid}>
                {data.resources.map((r, i) => (
                  <div key={i} className={styles.resourceItem} style={{ borderColor: `${color}22` }}>
                    <span style={{ color: `${color}88` }}>◦ </span>{r}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Self Assessment Tab */}
      {tab === 'assess' && (
        <div className={styles.assessGrid}>
          {data.selfAssessment && data.selfAssessment.map((mp, mi) => (
            <div key={mi} className={styles.card} style={{ borderColor: `${color}22` }}>
              <div className={styles.cardTitle} style={{ color }}>
                Микрополе {mi + 1}: {mp.pole}
              </div>
              {mp.qs.map((q, qi) => (
                <div key={qi} className={styles.assessQuestion}>
                  <div className={styles.questionText}>{q}</div>
                  <div className={styles.questionLine}>───────────────── (отвечай в дневнике)</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Goals Tab */}
      {tab === 'goals' && (
        <div className={styles.goalsContainer}>
          <div className={styles.card}>
            <div className={styles.cardTitle} style={{ color }}>Вопросы для Желаний и Целей</div>
            {data.goals && data.goals.map((g, i) => (
              <div key={i} className={styles.goalItem}>
                <span className={styles.goalNumber} style={{ color: `${color}88` }}>{i + 1}</span>
                <span className={styles.goalText}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diary Tab */}
      {tab === 'diary' && (
        <div className={styles.diaryContainer}>
          {aspectDiary.length === 0 ? (
            <div className={styles.card}>
              <div className={styles.emptyDiary}>
                Записей по этому аспекту пока нет.<br />
                <span>Перейди в раздел «Дневник», чтобы добавить запись.</span>
              </div>
            </div>
          ) : (
            aspectDiary.map(entry => (
              <div key={entry.id} className={styles.card} style={{ borderColor: `${color}33` }}>
                <div className={styles.diaryDate}>{entry.date}</div>
                <div className={styles.diaryText}>{entry.text}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
