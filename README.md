# 🌿 Grass Hacker Premium 2.3

[![Version](https://img.shields.io/badge/version-2.3-brightgreen.svg)](https://github.com/DeftSolutions-dev/The-Last-Meadow-Discord)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DeftSolutions-dev/The-Last-Meadow-Discord/blob/main/LICENSE)
[![Discord](https://img.shields.io/badge/Discord-desirepro-7289DA?logo=discord&logoColor=white)](https://discord.com/users/379564899371581441)
[![Telegram](https://img.shields.io/badge/Telegram-desirepro-26A5E4?logo=telegram&logoColor=white)](https://t.me/desirepro)

<p align="center">Автоматический помощник для игры в траву в "The Last Meadow" на Discord.<br>Ускоряет развитие в несколько раз и снимает всю рутину!</p>

<p align="center">
  <a href="#-возможности">Возможности</a> •
  <a href="#-установка-и-использование">Установка</a> •
  <a href="#%EF%B8%8F-дополнительные-команды">Команды</a> •
  <a href="#-интерфейс">Интерфейс</a> •
  <a href="#-автор">Автор</a>
</p>

<hr>

## ✨ Возможности

<table>
  <tr>
    <td>🖱️ <b>Автоклик</b></td>
    <td>Настраиваемая скорость до 100 кликов в секунду</td>
  </tr>
  <tr>
    <td>🌿 <b>Автосбор травы</b></td>
    <td>Мгновенно собирает появляющуюся траву с бонусами</td>
  </tr>
  <tr>
    <td>📈 <b>Автопокупка апгрейдов</b></td>
    <td>Интеллектуальная система приобретения всех доступных улучшений</td>
  </tr>
  <tr>
    <td>🛒 <b>Автомагазин</b></td>
    <td>Автоматически приобретает предметы из магазина</td>
  </tr>
  <tr>
    <td>🏆 <b>Автонаграды за уровень</b></td>
    <td>Забирает бонусы травы за повышение уровня</td>
  </tr>
  <tr>
    <td>🎁 <b>Автооткрытие лутбоксов</b></td>
    <td>Мгновенно открывает появляющиеся лутбоксы</td>
  </tr>
  <tr>
    <td>🚜 <b>Автогазонокосилка</b></td>
    <td>Активирует бонус газонокосилки, когда она появляется</td>
  </tr>
  <tr>
    <td>📊 <b>Статистика</b></td>
    <td>Отслеживание всех действий в реальном времени</td>
  </tr>
</table>

## 🚀 Установка и использование

1. Откройте Discord и игру "The Last Meadow"
2. Откройте консоль браузера (<kbd>F12</kbd> или <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>)
3. Скопируйте и вставьте следующую строку:

```javascript
fetch('https://raw.githubusercontent.com/DeftSolutions-dev/The-Last-Meadow-Discord/main/grass.hacker.js').then(r => r.text()).then(code => eval(code));
```

4. Нажмите <kbd>Enter</kbd> для запуска скрипта
5. Используйте появившуюся панель управления для настройки функций

## 🎮 Интерфейс

<p align="center">
  <img src="https://raw.githubusercontent.com/DeftSolutions-dev/The-Last-Meadow-Discord/main/image.png" alt="Панель управления" width="400">
</p>

- **Удобная панель управления** с возможностью сворачивания
- **Индикаторы статуса** для каждой функции (🟢 активно / 🔍 поиск)
- **Счетчики действий** показывают эффективность работы скрипта
- **Регулятор скорости** для настройки автокликера под свои нужды
- **Глобальное вкл/выкл** для быстрого управления всеми функциями

## ⚡ Дополнительные команды

<div align="center">
<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Описание</th>
      <th>Пример</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>boostPoints(множитель)</code></td>
      <td>Умножает текущие очки на указанный множитель</td>
      <td>
        <pre><code>boostPoints(10);</code></pre>
        <small><i>Умножит ваши очки в 10 раз</i></small>
      </td>
    </tr>
    <tr>
      <td><code>setClickSpeed(число)</code></td>
      <td>Устанавливает скорость автокликера (кликов в секунду)</td>
      <td>
        <pre><code>setClickSpeed(50);</code></pre>
        <small><i>Установит 50 кликов в секунду</i></small>
      </td>
    </tr>
    <tr>
      <td><code>turboMode(true/false)</code></td>
      <td>Включает или выключает турбо режим</td>
      <td>
        <pre><code>turboMode(true);</code></pre>
        <small><i>Активирует турбо режим</i></small>
      </td>
    </tr>
    <tr>
      <td><code>toggleAutoClick()</code></td>
      <td>Включает или выключает автокликер</td>
      <td>
        <pre><code>toggleAutoClick();</code></pre>
        <small><i>Переключает состояние автокликера</i></small>
      </td>
    </tr>
    <tr>
      <td><code>toggleAutoGrass()</code></td>
      <td>Включает или выключает автосбор травы</td>
      <td>
        <pre><code>toggleAutoGrass();</code></pre>
        <small><i>Переключает автосбор травы</i></small>
      </td>
    </tr>
  </tbody>
</table>
</div>

<p align="center"><i>Все команды выполняются в консоли браузера (F12 → вкладка "Console")</i></p>

<details>
  <summary><b>🔍 Расширенные команды</b></summary>
  
  ```javascript
  // Сбросить все счетчики статистики
  resetStats();
  
  // Получить текущую статистику в консоль
  getStats();
  
  // Настроить приоритет покупки апгрейдов (1-5)
  setUpgradePriority(2);
  
  // Установить задержку перед действиями (мс)
  setActionDelay(100);
  ```
</details>

## 🔧 Технические детали

- Скрипт работает полностью на стороне клиента, не отправляя запросы
- Использует техники эмуляции пользовательских действий
- Адаптивные алгоритмы для оптимальной производительности
- Оптимизированный код с минимальной нагрузкой на браузер
- Распознавание состояний игровых элементов в реальном времени

## 👨‍💻 Автор

<p align="center">
  <a href="https://discord.com/users/379564899371581441">
    <img src="https://img.shields.io/badge/Discord-desirepro%20%28379564899371581441%29-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
  <br>
  <a href="https://t.me/desirepro">
    <img src="https://img.shields.io/badge/Telegram-desirepro-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>
</p>

## ⚠️ Отказ от ответственности

<p align="center">
  Данный скрипт предназначен исключительно для образовательных целей.<br>
  Использование скрипта может нарушать правила игры и Discord.<br>
  Автор не несет ответственности за возможные последствия использования скрипта.
</p>

## 📜 Лицензия

<p align="center">
  MIT License<br>
  Copyright (c) 2025 desirepro
</p>

<hr>

<p align="center">
  Сделано с ❤️ для любителей травы в <b>The Last Meadow</b>
</p>
