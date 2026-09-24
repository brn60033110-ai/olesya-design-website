--- src/DeploymentGuide.tsx (原始)
import { useState } from 'react'
import JSZip from 'jszip'

interface DeploymentGuideProps {
  onBack: () => void
}

export default function DeploymentGuide({ onBack }: DeploymentGuideProps) {
  const [activeTab, setActiveTab] = useState<'vercel' | 'netlify' | 'github'>('vercel')
  const [downloading, setDownloading] = useState(false)

  const generateStandaloneHtml = (): string => {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Олеся Быхалова — Дизайнер интерьера</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; background: #faf8f5; color: #2c2c2c; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    header { text-align: center; padding: 60px 0; border-bottom: 1px solid #e5e0d8; }
    h1 { font-size: 48px; margin-bottom: 16px; color: #8B7355; }
    .subtitle { font-size: 20px; color: #6b6560; font-style: italic; }
    section { padding: 60px 0; }
    h2 { font-size: 32px; margin-bottom: 24px; color: #8B7355; }
    .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 32px; }
    .service { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e0d8; }
    .service h3 { font-size: 18px; margin-bottom: 8px; }
    .price { color: #8B7355; font-weight: bold; font-size: 16px; margin-top: 12px; }
    .contact { text-align: center; padding: 60px 0; background: #f3f0eb; border-radius: 12px; margin: 40px 0; }
    .phone { font-size: 32px; margin: 20px 0; }
    .buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 24px; }
    .btn { display: inline-block; padding: 14px 32px; background: #8B7355; color: white; text-decoration: none; border-radius: 8px; font-size: 16px; transition: all 0.3s; }
    .btn:hover { background: #6b5540; transform: translateY(-2px); }
    footer { text-align: center; padding: 40px 0; border-top: 1px solid #e5e0d8; color: #6b6560; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Олеся Быхалова</h1>
      <p class="subtitle">Дизайнер интерьера</p>
      <p style="margin-top: 20px; color: #6b6560;">Создаю пространства, в которых хочется жить</p>
    </header>

    <section>
      <h2>Обо мне</h2>
      <p style="font-size: 18px; margin-bottom: 16px;">
        Меня зовут Олеся Быхалова. Более 7 лет я создаю интерьеры, в которых красиво и удобно жить.
      </p>
      <p style="font-size: 18px;">
        Работаю как самозанятая — это значит личный подход, гибкость и прямое общение без посредников.
      </p>
    </section>

    <section>
      <h2>Услуги</h2>
      <div class="services">
        <div class="service">
          <h3>🏠 Дизайн-проект квартиры</h3>
          <p>Полный проект с планировкой, 3D-визуализацией и чертежами</p>
          <p class="price">от 1 500 ₽/м²</p>
        </div>
        <div class="service">
          <h3>🛋️ Дизайн комнаты</h3>
          <p>Создание уютного пространства для любой комнаты</p>
          <p class="price">от 25 000 ₽</p>
        </div>
        <div class="service">
          <h3>💬 Консультация</h3>
          <p>Онлайн или выездная консультация по интерьеру</p>
          <p class="price">от 5 000 ₽</p>
        </div>
        <div class="service">
          <h3>🛒 Подбор материалов</h3>
          <p>Помогу выбрать всё необходимое</p>
          <p class="price">от 15 000 ₽</p>
        </div>
        <div class="service">
          <h3>🎨 Декорирование</h3>
          <p>Финальное оформление пространства</p>
          <p class="price">от 20 000 ₽</p>
        </div>
        <div class="service">
          <h3>👁️ Авторский надзор</h3>
          <p>Контроль реализации проекта</p>
          <p class="price">от 30 000 ₽/мес</p>
        </div>
      </div>
    </section>

    <div class="contact">
      <h2>Свяжитесь со мной</h2>
      <div class="phone">📞 8-913-252-61-28</div>
      <div class="buttons">
        <a href="tel:89132526128" class="btn">Позвонить</a>
        <a href="https://wa.me/89132526128" class="btn">WhatsApp</a>
        <a href="https://t.me/+89132526128" class="btn">Telegram</a>
      </div>
    </div>

    <footer>
      <p>© 2026 Быхалова Олеся Сергеевна • Самозанятая</p>
    </footer>
  </div>
</body>
</html>`
  }

  const downloadHtml = () => {
    const htmlContent = generateStandaloneHtml()
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  }

  const downloadZip = async () => {
    setDownloading(true)

    try {
      const zip = new JSZip()
      const htmlContent = generateStandaloneHtml()
      zip.file('index.html', htmlContent)

      const readme = `# Олеся Быхалова - Сайт дизайнера интерьера

## Как развернуть сайт

### Вариант 1: Vercel (самый простой)
1. Зарегистрируйтесь на https://vercel.com
2. Нажмите "Add New Project"
3. Загрузите этот архив
4. Готово! Получите ссылку вида https://ваш-сайт.vercel.app

### Вариант 2: Netlify
1. Зарегистрируйтесь на https://netlify.com
2. Перетащите папку с файлами на страницу
3. Готово! Получите ссылку вида https://ваш-сайт.netlify.app

### Вариант 3: GitHub Pages
1. Создайте репозиторий на GitHub
2. Загрузите все файлы
3. Включите GitHub Pages в настройках
4. Сайт будет доступен по адресу https://username.github.io/repo-name

## Структура файлов
- index.html - главная страница (автономная, работает без сервера)

## Контакты
Телефон: 8-913-252-61-28

---
Сайт создан с помощью AI Web Builder
`
      zip.file('README.md', readme)

      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const link = document.createElement('a')
      link.href = url
      link.download = 'olesya-design-website.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      alert('✅ Архив успешно создан и скачан!')
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Не удалось создать архив: ' + (error as Error).message)
    } finally {
      setDownloading(false)
    }
  }

  const deployToVercel = () => {
    window.open('https://vercel.com/new', '_blank')
  }

  const deployToNetlify = () => {
    window.open('https://app.netlify.com/drop', '_blank')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            marginBottom: 24,
            padding: '10px 20px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: 14,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.color = '#9ca3af'
          }}
        >
          ← Вернуться на сайт
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #4ade80, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 Как показать сайт другим людям
          </h1>
          <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.6 }}>
            Пошаговая инструкция по размещению сайта в интернете
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{
          padding: 32,
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(6, 182, 212, 0.1))',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          marginBottom: 48
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 24, color: '#4ade80' }}>
            ⚡ Быстрые действия
          </h2>

          <div style={{ display: 'grid', gap: 16 }}>
            <button
              onClick={downloadHtml}
              style={{
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #4ade80, #06b6d4)',
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(74, 222, 128, 0.3)'
              }}
            >
              📄 Скачать HTML файл (самый простой способ)
            </button>

            <button
              onClick={downloadZip}
              disabled={downloading}
              style={{
                padding: '16px 24px',
                background: downloading ? 'rgba(74, 222, 128, 0.3)' : 'linear-gradient(135deg, #06b6d4, #4ade80)',
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: downloading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: downloading ? 'none' : '0 4px 15px rgba(6, 182, 212, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!downloading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!downloading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.3)'
                }
              }}
            >
              {downloading ? '⏳ Создаём архив...' : '📦 Скачать ZIP-архив с README'}
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <button
                onClick={deployToVercel}
                style={{
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                🔺 Открыть Vercel
              </button>

              <button
                onClick={deployToNetlify}
                style={{
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                🎯 Открыть Netlify
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: 0
        }}>
          {[
            { id: 'vercel', label: '🔺 Vercel', desc: 'Самый простой' },
            { id: 'netlify', label: '🎯 Netlify', desc: 'Альтернатива' },
            { id: 'github', label: '🐙 GitHub Pages', desc: 'Для разработчиков' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === tab.id ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #4ade80' : '2px solid transparent',
                color: activeTab === tab.id ? '#4ade80' : '#9ca3af',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              <div>{tab.label}</div>
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 2 }}>{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Vercel Instructions */}
        {activeTab === 'vercel' && (
          <div style={{
            padding: 32,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#4ade80' }}>
              🔺 Размещение на Vercel
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Скачайте HTML файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7, marginBottom: 12 }}>
                    Нажмите кнопку <strong>"📄 Скачать HTML файл"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Зарегистрируйтесь на Vercel</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7, marginBottom: 12 }}>
                    Нажмите кнопку <strong>"🔺 Открыть Vercel"</strong> выше и зарегистрируйтесь.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Загрузите файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите <strong>"Add New..."</strong> → <strong>"Project"</strong> и загрузите скачанный HTML файл.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Готово! 🎉</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Через 30-60 секунд ваш сайт будет доступен по ссылке!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Netlify Instructions */}
        {activeTab === 'netlify' && (
          <div style={{
            padding: 32,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#06b6d4' }}>
              🎯 Размещение на Netlify
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Скачайте HTML файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите кнопку <strong>"📄 Скачать HTML файл"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Откройте Netlify Drop</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите кнопку <strong>"🎯 Открыть Netlify"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Перетащите файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Просто перетащите скачанный HTML файл в область на странице Netlify.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Готово!</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Netlify автоматически задеплоит сайт и даст вам ссылку.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GitHub Pages Instructions */}
        {activeTab === 'github' && (
          <div style={{
            padding: 32,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#f59e0b' }}>
              🐙 Размещение на GitHub Pages
            </h3>

            <div style={{
              padding: 16,
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderRadius: 8,
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: 24
            }}>
              <p style={{ fontSize: 14, color: '#f59e0b', margin: 0 }}>
                ⚠️ Этот способ требует базовых знаний Git и GitHub.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Скачайте HTML файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите кнопку <strong>"📄 Скачать HTML файл"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Создайте репозиторий</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Зарегистрируйтесь на GitHub и создайте новый репозиторий.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Загрузите файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Загрузите HTML файл в репозиторий через веб-интерфейс.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Включите GitHub Pages</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    В настройках репозитория (Settings → Pages) включите GitHub Pages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 48,
          textAlign: 'center',
          padding: 24,
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Если возникнут вопросы — обращайтесь! 💬
          </p>
        </div>
      </div>
    </div>
  )
}


+++ src/DeploymentGuide.tsx (修改后)
import { useState } from 'react'
import JSZip from 'jszip'

interface DeploymentGuideProps {
  onBack: () => void
}

export default function DeploymentGuide({ onBack }: DeploymentGuideProps) {
  const [activeTab, setActiveTab] = useState<'vercel' | 'netlify' | 'github'>('vercel')
  const [downloading, setDownloading] = useState(false)

  const generateStandaloneHtml = (): string => {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Олеся Быхалова - Дизайнер интерьера</title>
<style>
body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #faf8f5; }
.container { max-width: 800px; margin: 0 auto; }
h1 { color: #8B7355; text-align: center; }
.service { background: white; padding: 20px; margin: 10px 0; border-radius: 8px; }
.contact { text-align: center; margin: 40px 0; }
</style>
</head>
<body>
<div class="container">
<h1>Олеся Быхалова</h1>
<p style="text-align: center;">Дизайнер интерьера</p>
<div class="service">
<h3>Услуги</h3>
<p>Дизайн-проект квартиры - от 1500 руб/м2</p>
<p>Дизайн комнаты - от 25000 руб</p>
<p>Консультация - от 5000 руб</p>
</div>
<div class="contact">
<h2>Контакты</h2>
<p>Телефон: 8-913-252-61-28</p>
<a href="tel:89132526128">Позвонить</a> |
<a href="https://wa.me/89132526128">WhatsApp</a> |
<a href="https://t.me/+89132526128">Telegram</a>
</div>
</div>
</body>
</html>`
  }

  const downloadHtml = () => {
    console.log('Кнопка HTML нажата!')

    try {
      const htmlContent = generateStandaloneHtml()
      console.log('HTML сгенерирован, длина:', htmlContent.length)

      // Создаём data URL
      const dataUrl = 'text/html;charset=utf-8,' + encodeURIComponent(htmlContent)

      // Открываем в новом окне для скачивания
      const newWindow = window.open(dataUrl, '_blank')

      if (newWindow) {
        // Если окно открылось, предлагаем сохранить
        setTimeout(() => {
          alert('✅ Страница открылась в новом окне!\n\nЧтобы сохранить:\n1. Нажмите Ctrl+S (Cmd+S на Mac)\n2. Выберите место сохранения\n3. Убедитесь, что тип файла: "Веб-страница полностью"')
        }, 500)
      } else {
        // Если popup заблокирован, используем альтернативный метод
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'index.html'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        alert('✅ HTML файл скачан! Проверьте папку загрузок.')
      }
    } catch (error) {
      console.error('Ошибка скачивания HTML:', error)
      alert('❌ Не удалось скачать файл. Ошибка: ' + (error as Error).message)
    }
  }

  const downloadZip = async () => {
    console.log('Кнопка ZIP нажата!')

    setDownloading(true)

    try {
      console.log('Начинаем создание ZIP архива...')

      const zip = new JSZip()
      const htmlContent = generateStandaloneHtml()
      zip.file('index.html', htmlContent)

      const readme = `# Олеся Быхалова - Сайт дизайнера интерьера

## Как развернуть сайт

### Вариант 1: Vercel (самый простой)
1. Зарегистрируйтесь на https://vercel.com
2. Нажмите "Add New Project"
3. Загрузите этот архив
4. Готово! Получите ссылку вида https://ваш-сайт.vercel.app

### Вариант 2: Netlify
1. Зарегистрируйтесь на https://netlify.com
2. Перетащите папку с файлами на страницу
3. Готово! Получите ссылку вида https://ваш-сайт.netlify.app

### Вариант 3: GitHub Pages
1. Создайте репозиторий на GitHub
2. Загрузите все файлы
3. Включите GitHub Pages в настройках
4. Сайт будет доступен по адресу https://username.github.io/repo-name

## Структура файлов
- index.html - главная страница (автономная, работает без сервера)

## Контакты
Телефон: 8-913-252-61-28

---
Сайт создан с помощью AI Web Builder
`
      zip.file('README.md', readme)

      console.log('Генерируем ZIP...')
      const content = await zip.generateAsync({ type: 'blob' })
      console.log('ZIP создан, размер:', content.size)

      // Создаём URL и скачиваем
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = 'olesya-design-website.zip'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()

      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)

      console.log('ZIP файл скачан!')
      alert('✅ ZIP архив скачан! Проверьте папку загрузок.')

    } catch (error) {
      console.error('Ошибка создания архива:', error)
      alert('❌ Не удалось создать архив: ' + (error as Error).message)
    } finally {
      setDownloading(false)
    }
  }

  const deployToVercel = () => {
    window.open('https://vercel.com/new', '_blank')
  }

  const deployToNetlify = () => {
    window.open('https://app.netlify.com/drop', '_blank')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            marginBottom: 24,
            padding: '10px 20px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: 14,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.color = '#9ca3af'
          }}
        >
          ← Вернуться на сайт
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #4ade80, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 Как показать сайт другим людям
          </h1>
          <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.6 }}>
            Пошаговая инструкция по размещению сайта в интернете
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{
          padding: 32,
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(6, 182, 212, 0.1))',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          marginBottom: 48
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 24, color: '#4ade80' }}>
            ⚡ Быстрые действия
          </h2>

          <div style={{ display: 'grid', gap: 16 }}>
            <button
              onClick={() => {
                alert('✅ Тестовая кнопка работает!')
              }}
              style={{
                padding: '16px 24px',
                background: '#f59e0b',
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🧪 ТЕСТ: Проверить работу кнопок
            </button>

            <button
              onClick={() => {
                console.log('Клик по кнопке HTML!')
                try {
                  const html = generateStandaloneHtml()
                  console.log('HTML сгенерирован:', html.length, 'символов')
                  const blob = new Blob([html], { type: 'text/html' })
                  console.log('Blob создан:', blob.size, 'байт')
                  const url = URL.createObjectURL(blob)
                  console.log('URL создан:', url)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'index.html'
                  console.log('Ссылка создана, кликаем...')
                  a.click()
                  console.log('Клик выполнен!')
                  setTimeout(() => {
                    URL.revokeObjectURL(url)
                    console.log('URL очищен')
                  }, 100)
                  alert('✅ Файл скачан! Проверьте папку загрузок.')
                } catch (error) {
                  console.error('Ошибка:', error)
                  alert('❌ Ошибка: ' + (error as Error).message)
                }
              }}
              style={{
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #4ade80, #06b6d4)',
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(74, 222, 128, 0.3)'
              }}
            >
              📄 Скачать HTML файл (самый простой способ)
            </button>

            <button
              onClick={async () => {
                console.log('Клик по кнопке ZIP!')
                try {
                  console.log('Создаём JSZip...')
                  const zip = new JSZip()
                  console.log('JSZip создан')
                  const html = generateStandaloneHtml()
                  console.log('HTML сгенерирован:', html.length)
                  zip.file('index.html', html)
                  console.log('index.html добавлен в ZIP')
                  zip.file('README.md', '# Сайт Олеси Быхаловой\n\nЗагрузите index.html на Vercel или Netlify')
                  console.log('README.md добавлен в ZIP')
                  const blob = await zip.generateAsync({ type: 'blob' })
                  console.log('ZIP сгенерирован:', blob.size, 'байт')
                  const url = URL.createObjectURL(blob)
                  console.log('URL создан:', url)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'olesya-design-website.zip'
                  console.log('Ссылка создана, кликаем...')
                  a.click()
                  console.log('Клик выполнен!')
                  setTimeout(() => {
                    URL.revokeObjectURL(url)
                    console.log('URL очищен')
                  }, 100)
                  alert('✅ ZIP архив скачан! Проверьте папку загрузок.')
                } catch (error) {
                  console.error('Ошибка ZIP:', error)
                  alert('❌ Ошибка: ' + (error as Error).message)
                }
              }}
              style={{
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #06b6d4, #4ade80)',
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.3)'
              }}
            >
              📦 Скачать ZIP-архив с README
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <button
                onClick={deployToVercel}
                style={{
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                🔺 Открыть Vercel
              </button>

              <button
                onClick={deployToNetlify}
                style={{
                  padding: '16px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                🎯 Открыть Netlify
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: 0
        }}>
          {[
            { id: 'vercel', label: '🔺 Vercel', desc: 'Самый простой' },
            { id: 'netlify', label: '🎯 Netlify', desc: 'Альтернатива' },
            { id: 'github', label: '🐙 GitHub Pages', desc: 'Для разработчиков' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === tab.id ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #4ade80' : '2px solid transparent',
                color: activeTab === tab.id ? '#4ade80' : '#9ca3af',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              <div>{tab.label}</div>
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 2 }}>{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Vercel Instructions */}
        {activeTab === 'vercel' && (
          <div style={{
            padding: 32,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#4ade80' }}>
              🔺 Размещение на Vercel
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Скачайте HTML файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7, marginBottom: 12 }}>
                    Нажмите кнопку <strong>"📄 Скачать HTML файл"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Зарегистрируйтесь на Vercel</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7, marginBottom: 12 }}>
                    Нажмите кнопку <strong>"🔺 Открыть Vercel"</strong> выше и зарегистрируйтесь.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Загрузите файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите <strong>"Add New..."</strong> → <strong>"Project"</strong> и загрузите скачанный HTML файл.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Готово! 🎉</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Через 30-60 секунд ваш сайт будет доступен по ссылке!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Netlify Instructions */}
        {activeTab === 'netlify' && (
          <div style={{
            padding: 32,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#06b6d4' }}>
              🎯 Размещение на Netlify
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Скачайте HTML файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите кнопку <strong>"📄 Скачать HTML файл"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Откройте Netlify Drop</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите кнопку <strong>"🎯 Открыть Netlify"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Перетащите файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Просто перетащите скачанный HTML файл в область на странице Netlify.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Готово!</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Netlify автоматически задеплоит сайт и даст вам ссылку.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GitHub Pages Instructions */}
        {activeTab === 'github' && (
          <div style={{
            padding: 32,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: '#f59e0b' }}>
              🐙 Размещение на GitHub Pages
            </h3>

            <div style={{
              padding: 16,
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderRadius: 8,
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: 24
            }}>
              <p style={{ fontSize: 14, color: '#f59e0b', margin: 0 }}>
                ⚠️ Этот способ требует базовых знаний Git и GitHub.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Скачайте HTML файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Нажмите кнопку <strong>"📄 Скачать HTML файл"</strong> выше.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Создайте репозиторий</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Зарегистрируйтесь на GitHub и создайте новый репозиторий.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Загрузите файл</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    Загрузите HTML файл в репозиторий через веб-интерфейс.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0
                }}>
                  4
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Включите GitHub Pages</h4>
                  <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.7 }}>
                    В настройках репозитория (Settings → Pages) включите GitHub Pages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 48,
          textAlign: 'center',
          padding: 24,
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Если возникнут вопросы — обращайтесь! 💬
          </p>
        </div>
      </div>
    </div>
  )
}
