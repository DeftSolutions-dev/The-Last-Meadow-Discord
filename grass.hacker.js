(function() {
    const config = {
        mainClickSpeed: 20, upgradeCheck: 500, weedCheck: 100, lootboxCheck: 300,
        lawnmowerCheck: 300, shopCheck: 500, levelRewardCheck: 500,
        enabled: true, autoShopEnabled: true, autoLevelRewardEnabled: true,
        language: 'ru',
        collapsed: false,
        position: { x: 10, y: 10 },
    };

    const translations = {
        ru: {
            title: '🌿 ТРАВОХАКЕР v3.0',
            mainClicker: 'Автоклик по основной кнопке',
            speed: 'Скорость:',
            weedClicker: 'Автоклик по траве',
            weedSearching: '🔍 Ищем траву...',
            weedFound: '🌿 Трава найдена!',
            autoUpgrade: 'Автопокупка апгрейдов',
            upgradeWaiting: '⏳ Ждем возможности купить...',
            upgradeReady: '💰 Можно купить апгрейд!',
            autoShop: 'Автопокупка из магазина',
            shopWaiting: '⏳ Ждем возможности купить...',
            shopReady: '🛒 Можно купить предмет!',
            autoLevelReward: 'Автополучение наград за уровень',
            levelWaiting: '⏳ Ждем возможности получить...',
            levelReady: '🏆 Можно получить награду!',
            autoLootbox: 'Автооткрытие лутбоксов',
            lootboxSearching: '🔍 Ищем лутбоксы...',
            lootboxFound: '🎁 Лутбокс найден!',
            autoLawnmower: 'Автоклик по газонокосилке',
            lawnmowerSearching: '🔍 Ищем газонокосилку...',
            lawnmowerFound: '🚜 Газонокосилка найдена!',
            statistics: 'Статистика:',
            mainClicks: 'Основных кликов:',
            weedClicks: 'Кликов по траве:',
            upgrades: 'Куплено апгрейдов:',
            shopItems: 'Куплено из магазина:',
            levelRewards: 'Получено наград за уровень:',
            lootboxes: 'Открыто лутбоксов:',
            lawnmowers: 'Нажато газонокосилок:',
            points: 'Текущих очков:',
            time: 'Время работы:',
            toggleAll: 'ВСЁ ВКЛ',
            toggleAllOff: 'ВСЁ ВЫКЛ',
            collapse: 'СВЕРНУТЬ',
            expand: 'РАЗВЕРНУТЬ',
            language: 'ЯЗЫК: РУС'
        },
        en: {
            title: '🌿 GRASS HACKER v3.0',
            mainClicker: 'Auto-click main button',
            speed: 'Speed:',
            weedClicker: 'Auto-click grass',
            weedSearching: '🔍 Searching for grass...',
            weedFound: '🌿 Grass found!',
            autoUpgrade: 'Auto-buy upgrades',
            upgradeWaiting: '⏳ Waiting to buy...',
            upgradeReady: '💰 Can buy upgrade!',
            autoShop: 'Auto-buy from shop',
            shopWaiting: '⏳ Waiting to buy...',
            shopReady: '🛒 Can buy item!',
            autoLevelReward: 'Auto-claim level rewards',
            levelWaiting: '⏳ Waiting to claim...',
            levelReady: '🏆 Reward available!',
            autoLootbox: 'Auto-open lootboxes',
            lootboxSearching: '🔍 Searching for lootboxes...',
            lootboxFound: '🎁 Lootbox found!',
            autoLawnmower: 'Auto-click lawnmower',
            lawnmowerSearching: '🔍 Searching for lawnmower...',
            lawnmowerFound: '🚜 Lawnmower found!',
            statistics: 'Statistics:',
            mainClicks: 'Main clicks:',
            weedClicks: 'Grass clicks:',
            upgrades: 'Upgrades bought:',
            shopItems: 'Shop items bought:',
            levelRewards: 'Level rewards claimed:',
            lootboxes: 'Lootboxes opened:',
            lawnmowers: 'Lawnmowers clicked:',
            points: 'Current points:',
            time: 'Running time:',
            toggleAll: 'ALL ON',
            toggleAllOff: 'ALL OFF',
            collapse: 'COLLAPSE',
            expand: 'EXPAND',
            language: 'LANG: ENG'
        }
    };

    const intervals = {
        mainClick: null, upgradeCheck: null, weedCheck: null, lootboxCheck: null,
        lawnmowerCheck: null, shopCheck: null, levelRewardCheck: null, statsUpdate: null
    };

    const stats = {
        mainClicks: 0, weedClicks: 0, upgradesBought: 0, lootboxesOpened: 0,
        lawnmowersClicked: 0, shopItemsBought: 0, levelRewardsClaimed: 0,
        pointsEarned: 0, startTime: Date.now()
    };

    function clickElement(selector, statKey) {
        const element = document.querySelector(selector);
        if (element) {
            element.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));
            if (statKey) stats[statKey]++;
            return true;
        }
        return false;
    }

    function clickMainButton() {
        return clickElement('.default__9026a.logo_cf3f70', 'mainClicks');
    }

    function clickWeed() {
        return clickElement('.clickable_fa03d7', 'weedClicks');
    }

    function clickLootbox() {
        return clickElement('.lootbox_cb9930 .default__9026a', 'lootboxesOpened');
    }

    function clickLawnmower() {
        return clickElement('.lawnmower__78658', 'lawnmowersClicked');
    }

    function claimLevelReward() {
        if (!config.autoLevelRewardEnabled) return false;
        return clickElement('.leveling__8e695 .claimButton__8e695', 'levelRewardsClaimed');
    }

    function checkAndBuy(selector, priceSelector, statKey) {
        const pointsElement = document.querySelector('.pointsValue__7a0c3');
        if (!pointsElement) return false;
        
        const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
        const items = document.querySelectorAll(selector);
        
        for (const item of items) {
            if (selector.includes('primaryShop') && item.querySelector('.itemIcon__4b373')?.src.includes('96bd2598fac6410c.svg')) continue;
            
            const priceElement = item.querySelector(priceSelector);
            if (!priceElement) continue;
            
            const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
            if (!isNaN(price) && currentPoints >= price) {
                item.classList.remove('disabled_e9638b');
                item.classList.add('enabled_e9638b');
                item.style.pointerEvents = 'auto';
                item.style.opacity = '1';
                
                item.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));
                stats[statKey]++;
                
                setTimeout(() => {
                    const pointsAfter = document.querySelector('.pointsValue__7a0c3');
                    if (pointsAfter) {
                        stats.pointsEarned = Math.max(stats.pointsEarned, 
                            parseInt(pointsAfter.textContent.replace(/[^\d]/g, '')));
                    }
                }, 100);
                
                return true;
            }
        }
        return false;
    }

    function checkAndBuyUpgrades() {
        return checkAndBuy('.clickerButton_e9638b.upgrade__75ed5', '.text__73a39', 'upgradesBought');
    }

    function checkAndBuyShopItems() {
        if (!config.autoShopEnabled) return false;
        return checkAndBuy('.primaryShop__7a0c3 .clickerButton_e9638b', '.text__73a39', 'shopItemsBought');
    }

    function setupEventInterception() {
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'click') {
                return originalAddEventListener.call(this, type, function(event) {
                    listener.call(this, event);
                    if ((this.classList && (this.classList.contains('upgrade__75ed5') || 
                        this.classList.contains('item__4b373')))) {
                        setTimeout(() => {
                            this.classList.remove('disabled_e9638b');
                            this.classList.add('enabled_e9638b');
                            this.style.pointerEvents = 'auto';
                            this.style.opacity = '1';
                        }, 10);
                    }
                }, options);
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
    }

    function injectStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            #travaHackPanel {
                position: fixed;
                top: ${config.position.y}px;
                left: ${config.position.x}px;
                background: rgba(20, 20, 25, 0.95);
                color: white;
                padding: 15px;
                border-radius: 12px;
                z-index: 9999;
                font-family: 'Roboto', sans-serif;
                width: 320px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: box-shadow 0.3s ease;
            }
            
            #travaHackPanel:hover {
                box-shadow: 0 12px 48px rgba(76, 175, 80, 0.3);
            }
            
            #hack-panel-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                align-items: center;
                cursor: move;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .hack-section {
                background: rgba(255, 255, 255, 0.05);
                padding: 12px;
                margin-bottom: 10px;
                border-radius: 8px;
                border-left: 3px solid rgba(76, 175, 80, 0.5);
                transition: background 0.2s ease;
            }
            
            .hack-section:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .hack-toggle-label {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
            }
            
            .hack-status {
                font-size: 14px;
                opacity: 0.8;
            }
            
            .hack-button {
                padding: 10px 15px;
                background: linear-gradient(to right, #4CAF50, #2196F3);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 12px;
            }
            
            .hack-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
            }
            
            .hack-button:active {
                transform: translateY(0);
            }
            
            .hack-stats {
                font-size: 12px;
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 5px 10px;
            }
            
            .hack-stats-value {
                text-align: right;
                font-weight: bold;
            }
            
            .hack-footer {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-top: 15px;
            }
            
            .vertical-divider {
                width: 1px;
                background: rgba(255, 255, 255, 0.1);
                margin: 0 10px;
            }
            
            .container input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0;
            }
            
            .container {
              display: block;
              position: relative;
              cursor: pointer;
              font-size: 16px;
              user-select: none;
            }
            
            .checkmark {
              position: relative;
              height: 24px;
              width: 24px;
              border-radius: 6px;
              background-color: #212121;
              transition: 0.3s;
              box-shadow: 2px 2px 4px #000000, -2px -2px 4px #3c3c3c;
            }
            
            .checkmark svg {
              width: 16px;
              height: 16px;
              margin-top: 4px;
              margin-left: 4px;
              fill: #264d39;
              transition: 0.2s;
            }
            
            .checkmark:active {
              box-shadow: 1px 1px 2px #000000, -1px -1px 2px #3c3c3c;
            }
            
            .container input:checked ~ .checkmark {
              box-shadow: 2px 2px 3px #000000, -2px -2px 3px #3c3c3c;
            }
            
            .container input:checked ~ .checkmark svg {
              fill: #00ff7b;
            }
            
            .container input:checked ~ .checkmark:active {
              box-shadow: 1px 1px 2px #000000, -1px -1px 2px #3c3c3c;
            }
            
            .slider {
              --slider-width: 100%;
              --slider-height: 6px;
              --slider-bg: rgb(82, 82, 82);
              --slider-border-radius: 999px;
              --level-color: #00ff7b;
              --level-transition-duration: .1s;
              --icon-margin: 10px;
              --icon-color: var(--slider-bg);
              --icon-size: 18px;
              
              cursor: pointer;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              width: 100%;
              margin-top: 10px;
            }
            
            .slider .volume {
              display: inline-block;
              vertical-align: top;
              margin-right: var(--icon-margin);
              color: var(--icon-color);
              width: var(--icon-size);
              height: auto;
            }
            
            .slider .level {
              -webkit-appearance: none;
              appearance: none;
              width: var(--slider-width);
              height: var(--slider-height);
              background: var(--slider-bg);
              overflow: hidden;
              border-radius: var(--slider-border-radius);
              transition: height var(--level-transition-duration);
              cursor: inherit;
            }
            
            .slider .level::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 0;
              height: 0;
              box-shadow: -200px 0 0 200px var(--level-color);
            }
            
            .slider:hover .level {
              height: calc(var(--slider-height) * 2);
            }
        `;
        document.head.appendChild(styleEl);
    }

    function createCustomCheckbox(id, checked = true) {
        return `
        <label class="container">
          <input id="${id}" type="checkbox" ${checked ? 'checked' : ''} />
          <div class="checkmark">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.548 49.549" xml:space="preserve">
              <g>
                <g>
                  <g>
                    <path d="M30.203,4.387v4.385c7.653,2.332,13.238,9.451,13.238,17.857c0,10.293-8.373,18.667-18.667,18.667
                        S6.106,36.922,6.106,26.629c0-8.405,5.585-15.525,13.238-17.857V4.387C9.323,6.835,1.855,15.866,1.855,26.629
                        c0,12.639,10.281,22.92,22.919,22.92s22.92-10.281,22.92-22.92C47.694,15.865,40.224,6.835,30.203,4.387z"></path>
                  </g>
                  <g>
                    <path d="M24.776,27.225c-1.41,0-2.554-1.145-2.554-2.555V2.554c0-1.41,1.144-2.554,2.554-2.554c1.41,0,2.554,1.144,2.554,2.554
                        V24.67C27.33,26.08,26.186,27.225,24.776,27.225z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </label>
        `;
    }

    function createCustomSlider(id, min, max, value, svgContent) {
        return `
        <label class="slider">
            <input id="${id}" type="range" class="level" min="${min}" max="${max}" value="${value}">
            <svg class="volume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${svgContent}</svg>
        </label>
        `;
    }

    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'travaHackPanel';
        if (config.collapsed) {
            panel.dataset.collapsed = 'true';
        }

        const t = translations[config.language];
        
        const speedSvg = `<path d="M15.9,18.45C17.25,16.85 18,14.78 18,12.5A7.5,7.5 0 0,0 10.5,5A7.5,7.5 0 0,0 3,12.5A7.5,7.5 0 0,0 10.5,20C12.05,20 13.5,19.58 14.73,18.86L20.84,24.97L22.97,22.84L17.12,17L15.9,18.45M10.5,18A5.5,5.5 0 0,1 5,12.5A5.5,5.5 0 0,1 10.5,7A5.5,5.5 0 0,1 16,12.5A5.5,5.5 0 0,1 10.5,18Z" fill="#fff"></path>`;

        panel.innerHTML = `
            <div id="hack-panel-header">
                <h2 style="margin: 0; font-size: 16px;">${t.title}</h2>
                <div style="display: flex; gap: 10px;">
                    <button id="hack-language" class="hack-button" style="padding: 5px 10px; font-size: 10px;">${t.language}</button>
                    <button id="hack-collapse" class="hack-button" style="padding: 5px 10px; font-size: 10px;">${config.collapsed ? t.expand : t.collapse}</button>
                </div>
            </div>
            
            <div id="hack-content" style="${config.collapsed ? 'display: none;' : ''}">
                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.mainClicker}</span>
                        ${createCustomCheckbox('hack-toggle-main')}
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 5px;">
                        <span style="font-size: 14px; margin-right: 10px;">${t.speed}</span>
                        <div style="flex-grow: 1;">
                            ${createCustomSlider('hack-main-speed', 1, 100, config.mainClickSpeed, speedSvg)}
                        </div>
                        <span id="hack-main-speed-value" style="font-size: 14px; margin-left: 10px; font-weight: bold;">${config.mainClickSpeed}</span>
                    </div>
                </div>

                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.weedClicker}</span>
                        ${createCustomCheckbox('hack-toggle-weed')}
                    </div>
                    <div id="hack-weed-status" class="hack-status">${t.weedSearching}</div>
                </div>

                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.autoUpgrade}</span>
                        ${createCustomCheckbox('hack-toggle-upgrade')}
                    </div>
                    <div id="hack-upgrade-status" class="hack-status">${t.upgradeWaiting}</div>
                </div>

                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.autoShop}</span>
                        ${createCustomCheckbox('hack-toggle-shop', config.autoShopEnabled)}
                    </div>
                    <div id="hack-shop-status" class="hack-status">${t.shopWaiting}</div>
                </div>

                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.autoLevelReward}</span>
                        ${createCustomCheckbox('hack-toggle-level-reward', config.autoLevelRewardEnabled)}
                    </div>
                    <div id="hack-level-reward-status" class="hack-status">${t.levelWaiting}</div>
                </div>

                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.autoLootbox}</span>
                        ${createCustomCheckbox('hack-toggle-lootbox')}
                    </div>
                    <div id="hack-lootbox-status" class="hack-status">${t.lootboxSearching}</div>
                </div>

                <div class="hack-section">
                    <div class="hack-toggle-label">
                        <span>${t.autoLawnmower}</span>
                        ${createCustomCheckbox('hack-toggle-lawnmower')}
                    </div>
                    <div id="hack-lawnmower-status" class="hack-status">${t.lawnmowerSearching}</div>
                </div>

                <div class="hack-section">
                    <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 14px;">${t.statistics}</h3>
                    <div class="hack-stats">
                        <span>${t.mainClicks}</span>
                        <span id="hack-stat-main-clicks" class="hack-stats-value">0</span>
                        
                        <span>${t.weedClicks}</span>
                        <span id="hack-stat-weed-clicks" class="hack-stats-value">0</span>
                        
                        <span>${t.upgrades}</span>
                        <span id="hack-stat-upgrades" class="hack-stats-value">0</span>
                        
                        <span>${t.shopItems}</span>
                        <span id="hack-stat-shop-items" class="hack-stats-value">0</span>
                        
                        <span>${t.levelRewards}</span>
                        <span id="hack-stat-level-rewards" class="hack-stats-value">0</span>
                        
                        <span>${t.lootboxes}</span>
                        <span id="hack-stat-lootboxes" class="hack-stats-value">0</span>
                        
                        <span>${t.lawnmowers}</span>
                        <span id="hack-stat-lawnmowers" class="hack-stats-value">0</span>
                        
                        <span>${t.points}</span>
                        <span id="hack-stat-points" class="hack-stats-value">0</span>
                        
                        <span>${t.time}</span>
                        <span id="hack-stat-time" class="hack-stats-value">00:00:00</span>
                    </div>
                </div>

                <div class="hack-footer">
                    <button id="hack-toggle-all" class="hack-button">${t.toggleAll}</button>
                    <button id="hack-toggle-all-off" class="hack-button">${t.toggleAllOff}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        let isDragging = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;
        
        const header = document.getElementById('hack-panel-header');
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragOffsetX = e.clientX - panel.offsetLeft;
            dragOffsetY = e.clientY - panel.offsetTop;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const newX = e.clientX - dragOffsetX;
            const newY = e.clientY - dragOffsetY;
            
            // Keep within window bounds
            const maxX = window.innerWidth - panel.offsetWidth;
            const maxY = window.innerHeight - panel.offsetHeight;
            
            panel.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
            panel.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
            
            config.position = {
                x: parseInt(panel.style.left),
                y: parseInt(panel.style.top)
            };
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        setupEventHandlers();
        startStatsUpdater();
    }

    function formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
    }

    function startStatsUpdater() {
        if (intervals.statsUpdate) clearInterval(intervals.statsUpdate);
        intervals.statsUpdate = setInterval(() => {
            if (!config.enabled) return;
            
            document.getElementById('hack-stat-main-clicks').textContent = stats.mainClicks.toLocaleString();
            document.getElementById('hack-stat-weed-clicks').textContent = stats.weedClicks.toLocaleString();
            document.getElementById('hack-stat-upgrades').textContent = stats.upgradesBought.toLocaleString();
            document.getElementById('hack-stat-shop-items').textContent = stats.shopItemsBought.toLocaleString();
            document.getElementById('hack-stat-level-rewards').textContent = stats.levelRewardsClaimed.toLocaleString();
            document.getElementById('hack-stat-lootboxes').textContent = stats.lootboxesOpened.toLocaleString();
            document.getElementById('hack-stat-lawnmowers').textContent = stats.lawnmowersClicked.toLocaleString();
            
            const pointsElement = document.querySelector('.pointsValue__7a0c3');
            if (pointsElement) {
                const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
                document.getElementById('hack-stat-points').textContent = currentPoints.toLocaleString();
                stats.pointsEarned = Math.max(stats.pointsEarned, currentPoints);
            } else {
                document.getElementById('hack-stat-points').textContent = stats.pointsEarned.toLocaleString();
            }
            
            document.getElementById('hack-stat-time').textContent = formatTime(Date.now() - stats.startTime);
            
            updateStatusElements();
        }, 1000);
    }

    function updateStatusElements() {
        const t = translations[config.language];
        const elements = {
            'hack-weed-status': ['.clickable_fa03d7', t.weedFound, t.weedSearching],
            'hack-lootbox-status': ['.lootbox_cb9930 .default__9026a', t.lootboxFound, t.lootboxSearching],
            'hack-lawnmower-status': ['.lawnmower__78658', t.lawnmowerFound, t.lawnmowerSearching],
            'hack-level-reward-status': ['.leveling__8e695 .claimButton__8e695', t.levelReady, t.levelWaiting],
        };
        
        for (const [id, [selector, foundText, notFoundText]] of Object.entries(elements)) {
            document.getElementById(id).textContent = document.querySelector(selector) ? foundText : notFoundText;
        }
        
        const pointsVal = document.querySelector('.pointsValue__7a0c3');
        if (pointsVal) {
            const currentPoints = parseInt(pointsVal.textContent.replace(/[^\d]/g, ''));
            
            const canBuyUpgrade = Array.from(document.querySelectorAll('.clickerButton_e9638b.upgrade__75ed5'))
                .some(button => {
                    const price = parseInt(button.querySelector('.text__73a39')?.textContent.replace(/[^\d]/g, '') || '0');
                    return !isNaN(price) && currentPoints >= price;
                });
            document.getElementById('hack-upgrade-status').textContent = 
                canBuyUpgrade ? t.upgradeReady : t.upgradeWaiting;
                
            const canBuyShop = Array.from(document.querySelectorAll('.primaryShop__7a0c3 .clickerButton_e9638b'))
                .some(item => {
                    const price = parseInt(item.querySelector('.text__73a39')?.textContent.replace(/[^\d]/g, '') || '0');
                    return !isNaN(price) && currentPoints >= price;
                });
            document.getElementById('hack-shop-status').textContent = 
                canBuyShop ? t.shopReady : t.shopWaiting;
        }
    }

    function setupEventHandlers() {
        // Toggle handlers
        document.getElementById('hack-toggle-main').addEventListener('change', e => {
            if (e.target.checked) {
                startMainClicker();
            } else {
                stopProcess('mainClick');
            }
        });
        
        document.getElementById('hack-toggle-weed').addEventListener('change', e => {
            if (e.target.checked) {
                startWeedClicker();
            } else {
                stopProcess('weedCheck');
            }
        });
        
        document.getElementById('hack-toggle-upgrade').addEventListener('change', e => {
            if (e.target.checked) {
                startUpgradeChecker();
            } else {
                stopProcess('upgradeCheck');
            }
        });
        
        document.getElementById('hack-toggle-shop').addEventListener('change', e => {
            config.autoShopEnabled = e.target.checked;
            if (e.target.checked) {
                startShopChecker();
            } else {
                stopProcess('shopCheck');
            }
        });
        
        document.getElementById('hack-toggle-level-reward').addEventListener('change', e => {
            config.autoLevelRewardEnabled = e.target.checked;
            if (e.target.checked) {
                startLevelRewardChecker();
            } else {
                stopProcess('levelRewardCheck');
            }
        });
        
        document.getElementById('hack-toggle-lootbox').addEventListener('change', e => {
            if (e.target.checked) {
                startLootboxChecker();
            } else {
                stopProcess('lootboxCheck');
            }
        });
        
        document.getElementById('hack-toggle-lawnmower').addEventListener('change', e => {
            if (e.target.checked) {
                startLawnmowerChecker();
            } else {
                stopProcess('lawnmowerCheck');
            }
        });
        
        const speedSlider = document.getElementById('hack-main-speed');
        const speedValue = document.getElementById('hack-main-speed-value');
        
        speedSlider.addEventListener('input', e => {
            const value = parseInt(e.target.value);
            config.mainClickSpeed = value;
            speedValue.textContent = value;
            
            if (intervals.mainClick) {
                stopMainClicker();
                startMainClicker();
            }
        });
        
        document.getElementById('hack-toggle-all').addEventListener('click', () => {
            const checkboxes = [
                'hack-toggle-main',
                'hack-toggle-weed',
                'hack-toggle-upgrade',
                'hack-toggle-shop',
                'hack-toggle-level-reward',
                'hack-toggle-lootbox',
                'hack-toggle-lawnmower'
            ];
            
            checkboxes.forEach(id => {
                const checkbox = document.getElementById(id);
                if (!checkbox.checked) {
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        });
        
        document.getElementById('hack-toggle-all-off').addEventListener('click', () => {
            const checkboxes = [
                'hack-toggle-main',
                'hack-toggle-weed',
                'hack-toggle-upgrade',
                'hack-toggle-shop',
                'hack-toggle-level-reward',
                'hack-toggle-lootbox',
                'hack-toggle-lawnmower'
            ];
            
            checkboxes.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox.checked) {
                    checkbox.checked = false;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        });
        
        document.getElementById('hack-collapse').addEventListener('click', () => {
            const content = document.getElementById('hack-content');
            const button = document.getElementById('hack-collapse');
            const t = translations[config.language];
            
            if (content.style.display === 'none') {
                content.style.display = '';
                button.textContent = t.collapse;
                config.collapsed = false;
            } else {
                content.style.display = 'none';
                button.textContent = t.expand;
                config.collapsed = true;
            }
        });
        
        document.getElementById('hack-language').addEventListener('click', () => {
            config.language = config.language === 'en' ? 'ru' : 'en';
            
            document.getElementById('travaHackPanel').remove();
            createControlPanel();
        });
    }

    function startProcess(interval, func, configProp) {
        if (intervals[interval]) clearInterval(intervals[interval]);
        intervals[interval] = setInterval(() => {
            if (config.enabled) func();
        }, config[configProp]);
    }
    
    function stopProcess(interval) {
        if (intervals[interval]) {
            clearInterval(intervals[interval]);
            intervals[interval] = null;
        }
    }
    
    function startMainClicker() {
        if (intervals.mainClick) clearInterval(intervals.mainClick);
        intervals.mainClick = setInterval(() => {
            if (config.enabled) clickMainButton();
        }, Math.floor(1000 / config.mainClickSpeed));
    }
    
    function startWeedClicker() {
        startProcess('weedCheck', clickWeed, 'weedCheck');
    }
    
    function startUpgradeChecker() {
        startProcess('upgradeCheck', checkAndBuyUpgrades, 'upgradeCheck');
    }
    
    function startShopChecker() {
        startProcess('shopCheck', checkAndBuyShopItems, 'shopCheck');
    }

    function startLevelRewardChecker() {
        startProcess('levelRewardCheck', claimLevelReward, 'levelRewardCheck');
            }
    
    function startLootboxChecker() {
        startProcess('lootboxCheck', clickLootbox, 'lootboxCheck');
    }
    
    function stopLootboxChecker() {
        stopProcess('lootboxCheck');
    }
    
    function startLawnmowerChecker() {
        startProcess('lawnmowerCheck', clickLawnmower, 'lawnmowerCheck');
    }
    
    function stopLawnmowerChecker() {
        stopProcess('lawnmowerCheck');
    }
    
    function stopMainClicker() {
        stopProcess('mainClick');
    }
    
    function stopAllProcesses() {
        Object.keys(intervals).forEach(stopProcess);
    }
    
    window.boostPoints = function(multiplier = 10) {
        const pointsElement = document.querySelector('.pointsValue__7a0c3');
        if (!pointsElement) return false;
        
        const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
        pointsElement.textContent = (currentPoints * multiplier).toString();
        return true;
    };
    
    window.setClickSpeed = function(clicksPerSecond) {
        if (isNaN(clicksPerSecond) || clicksPerSecond < 1) return false;
        
        config.mainClickSpeed = clicksPerSecond;
        
        const speedSlider = document.getElementById('hack-main-speed');
        const speedValue = document.getElementById('hack-main-speed-value');
        if (speedSlider && speedValue) {
            speedSlider.value = clicksPerSecond;
            speedValue.textContent = clicksPerSecond;
        }
        
        if (intervals.mainClick) {
            stopMainClicker();
            startMainClicker();
        }
        
        return true;
    };

    window.turboMode = function(enable = true) {
        const settings = {
            weedCheck: enable ? 50 : 100,
            upgradeCheck: enable ? 200 : 500, 
            shopCheck: enable ? 200 : 500,
            levelRewardCheck: enable ? 200 : 500,
            lootboxCheck: enable ? 100 : 300,
            lawnmowerCheck: enable ? 100 : 300
        };
        
        Object.assign(config, settings);
        
        const processes = [
            ['weedCheck', startWeedClicker, 'hack-toggle-weed'],
            ['upgradeCheck', startUpgradeChecker, 'hack-toggle-upgrade'],
            ['shopCheck', startShopChecker, 'hack-toggle-shop'],
            ['levelRewardCheck', startLevelRewardChecker, 'hack-toggle-level-reward'],
            ['lootboxCheck', startLootboxChecker, 'hack-toggle-lootbox'],
            ['lawnmowerCheck', startLawnmowerChecker, 'hack-toggle-lawnmower']
        ];
        
        processes.forEach(([key, startFunc, toggleId]) => {
            stopProcess(key);
            if (document.getElementById(toggleId)?.checked) startFunc();
        });
        
        return true;
    };
    
    window.changeLanguage = function(lang) {
        if (lang !== 'en' && lang !== 'ru') return false;
        
        config.language = lang;
        
        document.getElementById('travaHackPanel').remove();
        createControlPanel();
        
        return true;
    };

    function initialize() {
        console.log('%c 🌿 ТРАВОХАКЕР ПРЕМИУМ V3.0 🌿 ', 'background: linear-gradient(to right, #4CAF50, #2196F3); color: white; font-size: 14px; padding: 8px; border-radius: 4px;');
        console.log('%c by @DesirePro 2025 ', 'background: #212121; color: #00ff7b; font-size: 12px; padding: 4px;');
        
        setupEventInterception();
        injectStyles();
        createControlPanel();
        
        startMainClicker();
        startWeedClicker();
        startUpgradeChecker();
        startShopChecker();
        startLevelRewardChecker();
        startLootboxChecker();
        startLawnmowerChecker();
        
        window.addEventListener('beforeunload', stopAllProcesses);
    }
    
    window.travaHack = {
        config,
        stats,
        intervals,
        start: function() {
            config.enabled = true;
            console.log('TravaHack enabled');
        },
        stop: function() {
            config.enabled = false;
            console.log('TravaHack disabled');
        },
        turbo: window.turboMode
    };
    
    initialize();
})();
