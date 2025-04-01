# 🌿 Grass Hacker Premium 2.3

[![Version](https://img.shields.io/badge/версия-2.3-brightgreen.svg)](https://github.com/DeftSolutions-dev/The-Last-Meadow-Discord)
[![License](https://img.shields.io/badge/лицензия-MIT-blue.svg)](https://github.com/DeftSolutions-dev/The-Last-Meadow-Discord/blob/main/LICENSE)
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

1. Откройте Discord в веб-браузере
2. Перейдите в вкладку игры "The Last Meadow"
3. Начните игру
4. Нажмите <kbd>F12</kbd> или <kbd>Ctrl+Shift+I</kbd>, чтобы открыть Инструменты разработчика в окне игры
5. Перейдите на вкладку "Консоль" или "Console"
6. Скопируйте содержимое файла с GitHub по ссылке: [grass.hacker.js](https://raw.githubusercontent.com/DeftSolutions-dev/The-Last-Meadow-Discord/main/grass.hacker.js)
   (возможно, придется вручную ввести "разрешить вставку" или "allow pasting" в консоль, если не вставляется код)
7. Вставьте код в консоль и нажмите <kbd>Enter</kbd>

Скопировать код на прямую:
<details>
  <summary><b>🔍</b></summary>
  
  ```javascript
  (function() {
    let config = {
        mainClickSpeed: 20,
        upgradeCheck: 500, 
        weedCheck: 100, 
        lootboxCheck: 300, 
        lawnmowerCheck: 300,
        shopCheck: 500,
        levelRewardCheck: 500,
        enabled: true,
        autoShopEnabled: true,
        autoLevelRewardEnabled: true
    };

    let intervals = {
        mainClick: null,
        upgradeCheck: null,
        weedCheck: null,
        lootboxCheck: null,
        lawnmowerCheck: null,
        shopCheck: null,
        levelRewardCheck: null,
        statsUpdate: null
    };

    let stats = {
        mainClicks: 0,
        weedClicks: 0,
        upgradesBought: 0,
        lootboxesOpened: 0,
        lawnmowersClicked: 0,
        shopItemsBought: 0,
        levelRewardsClaimed: 0,
        pointsEarned: 0,
        startTime: Date.now()
    };

    function clickMainButton() {
        const mainButton = document.querySelector('.default__9026a.logo_cf3f70');
        if (mainButton) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            mainButton.dispatchEvent(event);
            stats.mainClicks++;
            return true;
        }
        return false;
    }

    function clickWeed() {
        const weedButton = document.querySelector('.clickable_fa03d7');
        if (weedButton) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            weedButton.dispatchEvent(event);
            stats.weedClicks++;
            return true;
        }
        return false;
    }

    function checkAndBuyUpgrades() {
        const pointsElement = document.querySelector('.pointsValue__7a0c3');
        if (!pointsElement) return false;
        
        const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
        const upgradeButtons = document.querySelectorAll('.clickerButton_e9638b.upgrade__75ed5');
        
        for (const button of upgradeButtons) {
            const priceElement = button.querySelector('.text__73a39');
            if (!priceElement) continue;
            
            const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
            
            if (!isNaN(price) && currentPoints >= price) {
                button.classList.remove('disabled_e9638b');
                button.classList.add('enabled_e9638b');
                button.style.pointerEvents = 'auto';
                button.style.opacity = '1';
                
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                button.dispatchEvent(event);
                stats.upgradesBought++;
                
                setTimeout(() => {
                    const pointsAfter = document.querySelector('.pointsValue__7a0c3');
                    if (pointsAfter) {
                        const pointsValue = parseInt(pointsAfter.textContent.replace(/[^\d]/g, ''));
                        stats.pointsEarned = Math.max(stats.pointsEarned, pointsValue);
                    }
                }, 100);
                
                return true;
            }
        }
        
        return false;
    }

    function checkAndBuyShopItems() {
        if (!config.autoShopEnabled) return false;
        
        const pointsElement = document.querySelector('.pointsValue__7a0c3');
        if (!pointsElement) return false;
        
        const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
        const shopItems = document.querySelectorAll('.primaryShop__7a0c3 .clickerButton_e9638b');
        
        for (const item of shopItems) {
            const priceElement = item.querySelector('.text__73a39');
            if (!priceElement) continue;
            
            const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
            
            if (!isNaN(price) && currentPoints >= price) {
                item.classList.remove('disabled_e9638b');
                item.classList.add('enabled_e9638b');
                item.style.pointerEvents = 'auto';
                item.style.opacity = '1';
                
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                item.dispatchEvent(event);
                stats.shopItemsBought++;
                
                setTimeout(() => {
                    const pointsAfter = document.querySelector('.pointsValue__7a0c3');
                    if (pointsAfter) {
                        const pointsValue = parseInt(pointsAfter.textContent.replace(/[^\d]/g, ''));
                        stats.pointsEarned = Math.max(stats.pointsEarned, pointsValue);
                    }
                }, 100);
                
                return true;
            }
        }
        
        return false;
    }

    function claimLevelReward() {
        if (!config.autoLevelRewardEnabled) return false;
        
        const rewardButton = document.querySelector('.leveling__8e695 .claimButton__8e695');
        if (rewardButton) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            rewardButton.dispatchEvent(event);
            stats.levelRewardsClaimed++;
            return true;
        }
        return false;
    }

    function clickLootbox() {
        const lootbox = document.querySelector('.lootbox_cb9930 .default__9026a');
        if (lootbox) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            lootbox.dispatchEvent(event);
            stats.lootboxesOpened++;
            return true;
        }
        return false;
    }

    function clickLawnmower() {
        const lawnmower = document.querySelector('.lawnmower__78658');
        if (lawnmower) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            lawnmower.dispatchEvent(event);
            stats.lawnmowersClicked++;
            return true;
        }
        return false;
    }

    function setupEventInterception() {
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'click') {
                const enhancedListener = function(event) {
                    listener.call(this, event);
                    
                    if ((this.classList && (this.classList.contains('upgrade__75ed5') || this.classList.contains('item__4b373')))) {
                        setTimeout(() => {
                            this.classList.remove('disabled_e9638b');
                            this.classList.add('enabled_e9638b');
                            this.style.pointerEvents = 'auto';
                            this.style.opacity = '1';
                        }, 10);
                    }
                };
                
                return originalAddEventListener.call(this, type, enhancedListener, options);
            } else {
                return originalAddEventListener.call(this, type, listener, options);
            }
        };
        
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url) {
            this._hackUrl = url;
            return originalXHROpen.apply(this, arguments);
        };
        
        XMLHttpRequest.prototype.send = function(data) {
            return originalXHRSend.apply(this, arguments);
        };
    }

    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'travaHackPanel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 9999;
            font-family: sans-serif;
            width: 280px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        `;
        
        panel.innerHTML = `
            <h2 style="margin: 0 0 10px; text-align: center; color: #4CAF50;">🌿 ТРАВОХАКЕР v2.3</h2>
            
            <div style="background: rgba(33, 150, 243, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-main" type="checkbox" checked> Автоклик по основной кнопке
                </label>
                <div style="display: flex; align-items: center;">
                    <span>Скорость: </span>
                    <input id="hack-main-speed" type="range" min="1" max="100" value="${config.mainClickSpeed}" style="flex-grow: 1; margin: 0 5px;">
                    <span id="hack-main-speed-value">${config.mainClickSpeed}</span>/сек
                </div>
            </div>
            
            <div style="background: rgba(76, 175, 80, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-weed" type="checkbox" checked> Автоклик по траве
                </label>
                <span id="hack-weed-status">🔍 Ищем траву...</span>
            </div>
            
            <div style="background: rgba(255, 193, 7, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-upgrade" type="checkbox" checked> Автопокупка апгрейдов
                </label>
                <span id="hack-upgrade-status">⏳ Ждем возможности купить...</span>
            </div>

            <div style="background: rgba(156, 39, 176, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-shop" type="checkbox" checked> Автопокупка из магазина
                </label>
                <span id="hack-shop-status">⏳ Ждем возможности купить...</span>
            </div>

            <div style="background: rgba(121, 85, 72, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-level-reward" type="checkbox" checked> Автополучение наград за уровень
                </label>
                <span id="hack-level-reward-status">⏳ Ждем возможности получить...</span>
            </div>

            <div style="background: rgba(233, 30, 99, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-lootbox" type="checkbox" checked> Автооткрытие лутбоксов
                </label>
                <span id="hack-lootbox-status">🎁 Ищем лутбоксы...</span>
            </div>

            <div style="background: rgba(255, 87, 34, 0.2); padding: 8px; margin-bottom: 10px; border-radius: 4px;">
                <label style="display: block; margin-bottom: 5px;">
                    <input id="hack-toggle-lawnmower" type="checkbox" checked> Автоклик по газонокосилке
                </label>
                <span id="hack-lawnmower-status">🚜 Ищем газонокосилку...</span>
            </div>
            
            <div style="background: rgba(33, 33, 33, 0.2); padding: 8px; border-radius: 4px;">
                <div style="margin-bottom: 5px; font-weight: bold;">Статистика:</div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Основных кликов:</span>
                    <span id="hack-stats-main-clicks">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Кликов по траве:</span>
                    <span id="hack-stats-weed-clicks">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Куплено апгрейдов:</span>
                    <span id="hack-stats-upgrades">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Куплено из магазина:</span>
                    <span id="hack-stats-shop-items">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Получено наград за уровень:</span>
                    <span id="hack-stats-level-rewards">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Открыто лутбоксов:</span>
                    <span id="hack-stats-lootboxes">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Нажато газонокосилок:</span>
                    <span id="hack-stats-lawnmowers">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Текущих очков:</span>
                    <span id="hack-stats-points">0</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>Время работы:</span>
                    <span id="hack-stats-time">00:00:00</span>
                </div>
            </div>
            
            <div style="margin-top: 10px; display: flex; justify-content: space-between;">
                <button id="hack-toggle-all" style="width: 48%; padding: 5px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">ВСЁ ВКЛ</button>
                <button id="hack-panel-toggle" style="width: 48%; padding: 5px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">СВЕРНУТЬ</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        setupPanelHandlers();
        intervals.statsUpdate = setInterval(updateStats, 1000);
        
        return panel;
    }

    function setupPanelHandlers() {
        const mainToggle = document.getElementById('hack-toggle-main');
        mainToggle.addEventListener('change', function() {
            if (this.checked) {
                startMainClicker();
            } else {
                stopMainClicker();
            }
        });
        
        const mainSpeed = document.getElementById('hack-main-speed');
        const mainSpeedValue = document.getElementById('hack-main-speed-value');
        mainSpeed.addEventListener('input', function() {
            config.mainClickSpeed = parseInt(this.value);
            mainSpeedValue.textContent = config.mainClickSpeed;
            
            if (mainToggle.checked) {
                stopMainClicker();
                startMainClicker();
            }
        });
        
        const weedToggle = document.getElementById('hack-toggle-weed');
        weedToggle.addEventListener('change', function() {
            if (this.checked) {
                startWeedClicker();
            } else {
                stopWeedClicker();
            }
        });
        
        const upgradeToggle = document.getElementById('hack-toggle-upgrade');
        upgradeToggle.addEventListener('change', function() {
            if (this.checked) {
                startUpgradeChecker();
            } else {
                stopUpgradeChecker();
            }
        });

        const shopToggle = document.getElementById('hack-toggle-shop');
        shopToggle.addEventListener('change', function() {
            config.autoShopEnabled = this.checked;
            if (this.checked) {
                startShopChecker();
            } else {
                stopShopChecker();
            }
        });

        const levelRewardToggle = document.getElementById('hack-toggle-level-reward');
        levelRewardToggle.addEventListener('change', function() {
            config.autoLevelRewardEnabled = this.checked;
            if (this.checked) {
                startLevelRewardChecker();
            } else {
                stopLevelRewardChecker();
            }
        });

        const lootboxToggle = document.getElementById('hack-toggle-lootbox');
        lootboxToggle.addEventListener('change', function() {
            if (this.checked) {
                startLootboxChecker();
            } else {
                stopLootboxChecker();
            }
        });

        const lawnmowerToggle = document.getElementById('hack-toggle-lawnmower');
        lawnmowerToggle.addEventListener('change', function() {
            if (this.checked) {
                startLawnmowerChecker();
            } else {
                stopLawnmowerChecker();
            }
        });
        
        const toggleAll = document.getElementById('hack-toggle-all');
        toggleAll.addEventListener('click', function() {
            config.enabled = !config.enabled;
            
            if (config.enabled) {
                this.textContent = "ВСЁ ВКЛ";
                this.style.background = '#4CAF50';
                
                if (mainToggle.checked) startMainClicker();
                if (weedToggle.checked) startWeedClicker();
                if (upgradeToggle.checked) startUpgradeChecker();
                if (shopToggle.checked) startShopChecker();
                if (levelRewardToggle.checked) startLevelRewardChecker();
                if (lootboxToggle.checked) startLootboxChecker();
                if (lawnmowerToggle.checked) startLawnmowerChecker();
            } else {
                this.textContent = "ВСЁ ВЫКЛ";
                this.style.background = '#F44336';
                
                stopMainClicker();
                stopWeedClicker();
                stopUpgradeChecker();
                stopShopChecker();
                stopLevelRewardChecker();
                stopLootboxChecker();
                stopLawnmowerChecker();
            }
        });
        
        const panelToggle = document.getElementById('hack-panel-toggle');
        const panel = document.getElementById('travaHackPanel');
        let isPanelCollapsed = false;
        
        panelToggle.addEventListener('click', function() {
            const children = panel.children;
            
            if (isPanelCollapsed) {
                for (let i = 0; i < children.length; i++) {
                    if (i !== 0 && i !== children.length - 1) {
                        children[i].style.display = '';
                    }
                }
                this.textContent = "СВЕРНУТЬ";
                isPanelCollapsed = false;
            } else {
                for (let i = 0; i < children.length; i++) {
                    if (i !== 0 && i !== children.length - 1) {
                        children[i].style.display = 'none';
                    }
                }
                this.textContent = "РАЗВЕРНУТЬ";
                isPanelCollapsed = true;
            }
        });
    }

    function updateStats() {
        document.getElementById('hack-stats-main-clicks').textContent = stats.mainClicks;
        document.getElementById('hack-stats-weed-clicks').textContent = stats.weedClicks;
        document.getElementById('hack-stats-upgrades').textContent = stats.upgradesBought;
        document.getElementById('hack-stats-shop-items').textContent = stats.shopItemsBought;
        document.getElementById('hack-stats-level-rewards').textContent = stats.levelRewardsClaimed;
        document.getElementById('hack-stats-lootboxes').textContent = stats.lootboxesOpened;
        document.getElementById('hack-stats-lawnmowers').textContent = stats.lawnmowersClicked;
        
        const pointsElement = document.querySelector('.pointsValue__7a0c3');
        if (pointsElement) {
            const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
            document.getElementById('hack-stats-points').textContent = currentPoints;
            stats.pointsEarned = Math.max(stats.pointsEarned, currentPoints);
        }
        
        const runTime = Math.floor((Date.now() - stats.startTime) / 1000);
        const hours = Math.floor(runTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((runTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(runTime % 60).toString().padStart(2, '0');
        document.getElementById('hack-stats-time').textContent = `${hours}:${minutes}:${seconds}`;
        
        const weedButton = document.querySelector('.clickable_fa03d7');
        document.getElementById('hack-weed-status').textContent = 
            weedButton ? '🌿 Трава найдена!' : '🔍 Ищем траву...';
        
        const pointsVal = document.querySelector('.pointsValue__7a0c3');
        const upgradeButtons = document.querySelectorAll('.clickerButton_e9638b.upgrade__75ed5');
        let canBuyAny = false;
        
        if (pointsVal && upgradeButtons.length > 0) {
            const currentPoints = parseInt(pointsVal.textContent.replace(/[^\d]/g, ''));
            
            for (const button of upgradeButtons) {
                const priceElement = button.querySelector('.text__73a39');
                if (!priceElement) continue;
                
                const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
                if (!isNaN(price) && currentPoints >= price) {
                    canBuyAny = true;
                    break;
                }
            }
        }
        
        document.getElementById('hack-upgrade-status').textContent = 
            canBuyAny ? '💰 Можно купить апгрейд!' : '⏳ Ждем...';
            
        const shopItems = document.querySelectorAll('.primaryShop__7a0c3 .clickerButton_e9638b');
        let canBuyShopItem = false;
        
        if (pointsVal && shopItems.length > 0) {
            const currentPoints = parseInt(pointsVal.textContent.replace(/[^\d]/g, ''));
            
            for (const item of shopItems) {
                const priceElement = item.querySelector('.text__73a39');
                if (!priceElement) continue;
                
                const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
                if (!isNaN(price) && currentPoints >= price) {
                    canBuyShopItem = true;
                    break;
                }
            }
        }
        
        document.getElementById('hack-shop-status').textContent = 
            canBuyShopItem ? '🛒 Можно купить предмет!' : '⏳ Ждем...';
        
        const levelReward = document.querySelector('.leveling__8e695 .claimButton__8e695');
        document.getElementById('hack-level-reward-status').textContent = 
            levelReward ? '🏆 Можно получить награду!' : '⏳ Ждем...';
            
        const lootbox = document.querySelector('.lootbox_cb9930');
        document.getElementById('hack-lootbox-status').textContent = 
            lootbox ? '🎁 Лутбокс найден!' : '🔍 Ищем...';
            
        const lawnmower = document.querySelector('.lawnmower__78658');
        document.getElementById('hack-lawnmower-status').textContent = 
            lawnmower ? '🚜 Газонокосилка найдена!' : '🔍 Ищем...';
    }
    
    function startMainClicker() {
        if (intervals.mainClick) clearInterval(intervals.mainClick);
        
        const interval = Math.floor(1000 / config.mainClickSpeed);
        intervals.mainClick = setInterval(() => {
            if (config.enabled) clickMainButton();
        }, interval);
    }
    
    function stopMainClicker() {
        if (intervals.mainClick) {
            clearInterval(intervals.mainClick);
            intervals.mainClick = null;
        }
    }
    
    function startWeedClicker() {
        if (intervals.weedCheck) clearInterval(intervals.weedCheck);
        
        intervals.weedCheck = setInterval(() => {
            if (config.enabled) clickWeed();
        }, config.weedCheck);
    }
    
    function stopWeedClicker() {
        if (intervals.weedCheck) {
            clearInterval(intervals.weedCheck);
            intervals.weedCheck = null;
        }
    }
    
    function startUpgradeChecker() {
        if (intervals.upgradeCheck) clearInterval(intervals.upgradeCheck);
        
        intervals.upgradeCheck = setInterval(() => {
            if (config.enabled) checkAndBuyUpgrades();
        }, config.upgradeCheck);
    }
    
    function stopUpgradeChecker() {
        if (intervals.upgradeCheck) {
            clearInterval(intervals.upgradeCheck);
            intervals.upgradeCheck = null;
        }
    }
    
    function startShopChecker() {
        if (intervals.shopCheck) clearInterval(intervals.shopCheck);
        
        intervals.shopCheck = setInterval(() => {
            if (config.enabled && config.autoShopEnabled) checkAndBuyShopItems();
        }, config.shopCheck);
    }
    
    function stopShopChecker() {
        if (intervals.shopCheck) {
            clearInterval(intervals.shopCheck);
            intervals.shopCheck = null;
        }
    }

    function startLevelRewardChecker() {
        if (intervals.levelRewardCheck) clearInterval(intervals.levelRewardCheck);
        
        intervals.levelRewardCheck = setInterval(() => {
            if (config.enabled && config.autoLevelRewardEnabled) claimLevelReward();
        }, config.levelRewardCheck);
    }
    
    function stopLevelRewardChecker() {
        if (intervals.levelRewardCheck) {
            clearInterval(intervals.levelRewardCheck);
            intervals.levelRewardCheck = null;
        }
    }
    
    function startLootboxChecker() {
        if (intervals.lootboxCheck) clearInterval(intervals.lootboxCheck);
        
        intervals.lootboxCheck = setInterval(() => {
            if (config.enabled) clickLootbox();
        }, config.lootboxCheck);
    }
    
    function stopLootboxChecker() {
        if (intervals.lootboxCheck) {
            clearInterval(intervals.lootboxCheck);
            intervals.lootboxCheck = null;
        }
    }
    
    function startLawnmowerChecker() {
        if (intervals.lawnmowerCheck) clearInterval(intervals.lawnmowerCheck);
        
        intervals.lawnmowerCheck = setInterval(() => {
            if (config.enabled) clickLawnmower();
        }, config.lawnmowerCheck);
    }
    
    function stopLawnmowerChecker() {
        if (intervals.lawnmowerCheck) {
            clearInterval(intervals.lawnmowerCheck);
            intervals.lawnmowerCheck = null;
        }
    }
    
    function stopAllProcesses() {
        stopMainClicker();
        stopWeedClicker();
        stopUpgradeChecker();
        stopShopChecker();
        stopLevelRewardChecker();
        stopLootboxChecker();
        stopLawnmowerChecker();
        
        if (intervals.statsUpdate) {
            clearInterval(intervals.statsUpdate);
            intervals.statsUpdate = null;
        }
    }
    
    function enableAllButtons() {
        const upgradeButtons = document.querySelectorAll('.clickerButton_e9638b.upgrade__75ed5');
        upgradeButtons.forEach(button => {
            button.classList.remove('disabled_e9638b');
            button.classList.add('enabled_e9638b');
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
        });
        
        const shopItems = document.querySelectorAll('.primaryShop__7a0c3 .clickerButton_e9638b');
        shopItems.forEach(item => {
            item.classList.remove('disabled_e9638b');
            item.classList.add('enabled_e9638b');
            item.style.pointerEvents = 'auto';
            item.style.opacity = '1';
        });
    }
    
    window.boostPoints = function(multiplier = 10) {
        const pointsElement = document.querySelector('.pointsValue__7a0c3');
        if (!pointsElement) return false;
        
        const currentPoints = parseInt(pointsElement.textContent.replace(/[^\d]/g, ''));
        const newPoints = currentPoints * multiplier;
        pointsElement.textContent = newPoints.toString();
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
        if (enable) {
            config.weedCheck = 50;
            config.upgradeCheck = 200;
            config.shopCheck = 200;
            config.levelRewardCheck = 200;
            config.lootboxCheck = 100;
            config.lawnmowerCheck = 100;
        } else {
            config.weedCheck = 100;
            config.upgradeCheck = 500;
            config.shopCheck = 500;
            config.levelRewardCheck = 500;
            config.lootboxCheck = 300;
            config.lawnmowerCheck = 300;
        }
        
        stopWeedClicker();
        stopUpgradeChecker();
        stopShopChecker();
        stopLevelRewardChecker();
        stopLootboxChecker();
        stopLawnmowerChecker();
        
        if (document.getElementById('hack-toggle-weed').checked) startWeedClicker();
        if (document.getElementById('hack-toggle-upgrade').checked) startUpgradeChecker();
        if (document.getElementById('hack-toggle-shop').checked) startShopChecker();
        if (document.getElementById('hack-toggle-level-reward').checked) startLevelRewardChecker();
        if (document.getElementById('hack-toggle-lootbox').checked) startLootboxChecker();
        if (document.getElementById('hack-toggle-lawnmower').checked) startLawnmowerChecker();
        
        return true;
    };

    function initialize() {
        console.log('%c ТРАВА-ХАКЕР ПРЕМИУМ V2.3 ', 'background: linear-gradient(to right, #4CAF50, #2196F3); color: white; font-size: 14px; padding: 8px; border-radius: 4px;');
        
        setupEventInterception();
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
    
    initialize();
})();
  ```
</details>

## 🎮 Интерфейс

<p align="center">
  <img src="https://raw.githubusercontent.com/DeftSolutions-dev/The-Last-Meadow-Discord/main/image.png" alt="Панель управления" width="400">
</p>

- **Удобная панель управления** с возможностью сворачивания
- **Индикаторы статуса** для каждой функции (🟢 активно / 🔍 поиск)
- **Счетчики действий** показывают эффективность работы скрипта
- **Регулятор скорости** для настройки автокликера под свои нужды
- **Глобальное вкл/выкл** для быстрого управления всеми функциями


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
