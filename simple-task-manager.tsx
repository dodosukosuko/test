<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>タスク管理アプリ</title>
    
    <!-- PWA設定 -->
    <meta name="theme-color" content="#3B82F6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="タスク管理">
    
    <!-- スタイル -->
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #dbeafe, #e0e7ff);
            min-height: 100vh;
            -webkit-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
        }
        
        .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        
        .header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .app-icon {
            width: 3rem;
            height: 3rem;
            background: #3B82F6;
            border-radius: 0.75rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            color: white;
            font-size: 1.5rem;
        }
        
        .title {
            font-size: 2rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 0.5rem;
        }
        
        .status {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        .online-indicator {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
        }
        
        .dot.online { background: #10b981; }
        .dot.offline { background: #ef4444; }
        
        .card {
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            padding: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .input-group {
            display: flex;
            gap: 0.75rem;
        }
        
        .input {
            flex: 1;
            padding: 0.75rem 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 1rem;
            outline: none;
            transition: all 0.2s;
        }
        
        .input:focus {
            border-color: #3B82F6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .btn {
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            outline: none;
        }
        
        .btn:active {
            transform: scale(0.95);
        }
        
        .btn-primary {
            background: #3B82F6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2563eb;
        }
        
        .btn-secondary {
            background: #f3f4f6;
            color: #374151;
        }
        
        .btn-secondary:hover {
            background: #e5e7eb;
        }
        
        .btn-secondary.active {
            background: #3B82F6;
            color: white;
        }
        
        .filter-group {
            display: flex;
            gap: 0.5rem;
        }
        
        .filter-group .btn {
            flex: 1;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .task-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .task-item {
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s;
        }
        
        .task-item.completed {
            opacity: 0.7;
            transform: scale(0.98);
        }
        
        .task-checkbox {
            width: 2rem;
            height: 2rem;
            border: 2px solid #d1d5db;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .task-checkbox:hover {
            border-color: #10b981;
            background: #f0fdf4;
        }
        
        .task-checkbox.completed {
            background: #10b981;
            border-color: #10b981;
            color: white;
        }
        
        .task-text {
            flex: 1;
            font-size: 1rem;
            color: #1f2937;
            transition: all 0.2s;
        }
        
        .task-text.completed {
            text-decoration: line-through;
            color: #9ca3af;
        }
        
        .task-delete {
            width: 2rem;
            height: 2rem;
            background: #fef2f2;
            color: #dc2626;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .task-delete:hover {
            background: #fee2e2;
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: #6b7280;
        }
        
        .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .pwa-info {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
            margin-top: 2rem;
        }
        
        .pwa-info .icon {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .pwa-info p {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 0.5rem;
        }
        
        .install-instructions {
            font-size: 0.75rem;
            color: #9ca3af;
            margin-top: 0.5rem;
        }
        
        @media (max-width: 640px) {
            .container {
                padding: 1rem 0.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="app-icon">✓</div>
            <h1 class="title">タスク管理</h1>
            <div class="status">
                <div class="online-indicator">
                    <div class="dot online" id="online-dot"></div>
                    <span id="online-text">オンライン</span>
                </div>
                <div>
                    完了: <span id="completed-count">0</span> | 未完了: <span id="active-count">0</span>
                </div>
            </div>
        </div>

        <!-- Add Task -->
        <div class="card">
            <div class="input-group">
                <input 
                    type="text" 
                    id="new-task-input" 
                    class="input" 
                    placeholder="新しいタスクを追加..."
                >
                <button class="btn btn-primary" onclick="addTask()">
                    <span style="font-size: 1.25rem; font-weight: bold;">+</span>
                </button>
            </div>
        </div>

        <!-- Filter Buttons -->
        <div class="card">
            <div class="filter-group">
                <button class="btn btn-secondary active" onclick="setFilter('all')">すべて</button>
                <button class="btn btn-secondary" onclick="setFilter('active')">未完了</button>
                <button class="btn btn-secondary" onclick="setFilter('completed')">完了済み</button>
            </div>
        </div>

        <!-- Tasks List -->
        <div id="task-list" class="task-list">
            <!-- タスクがここに表示されます -->
        </div>

        <!-- PWA Info -->
        <div class="pwa-info">
            <div class="icon">📱</div>
            <p>このアプリはオフラインでも動作します</p>
            <p>🏠 ホーム画面に追加してアプリとして使用可能</p>
            <div class="install-instructions">
                <p>iPhoneでの追加方法：</p>
                <p>Safari → 共有ボタン(□↑) → ホーム画面に追加</p>
            </div>
        </div>
    </div>

    <script>
        // アプリの状態
        let tasks = [
            { id: 1, text: 'PWAアプリを試してみる', completed: false },
            { id: 2, text: 'ホーム画面に追加する', completed: false }
        ];
        let currentFilter = 'all';

        // DOM要素
        const newTaskInput = document.getElementById('new-task-input');
        const taskList = document.getElementById('task-list');
        const completedCount = document.getElementById('completed-count');
        const activeCount = document.getElementById('active-count');
        const onlineDot = document.getElementById('online-dot');
        const onlineText = document.getElementById('online-text');

        // タスクを追加
        function addTask() {
            const text = newTaskInput.value.trim();
            if (text) {
                const task = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };
                tasks.push(task);
                newTaskInput.value = '';
                updateUI();
                
                // 触覚フィードバック
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        }

        // タスクの完了状態を切り替え
        function toggleTask(id) {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            updateUI();
            
            // 触覚フィードバック
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }

        // タスクを削除
        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            updateUI();
            
            // 触覚フィードバック
            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 50]);
            }
        }

        // フィルターを設定
        function setFilter(filter) {
            currentFilter = filter;
            
            // フィルターボタンのアクティブ状態を更新
            document.querySelectorAll('.filter-group .btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            updateUI();
        }

        // UIを更新
        function updateUI() {
            // カウントを更新
            const completed = tasks.filter(task => task.completed).length;
            const active = tasks.filter(task => !task.completed).length;
            completedCount.textContent = completed;
            activeCount.textContent = active;

            // タスクリストを更新
            const filteredTasks = tasks.filter(task => {
                if (currentFilter === 'active') return !task.completed;
                if (currentFilter === 'completed') return task.completed;
                return true;
            });

            if (filteredTasks.length === 0) {
                taskList.innerHTML = `
                    <div class="card empty-state">
                        <div class="empty-icon">✓</div>
                        <p>
                            ${currentFilter === 'active' ? 'お疲れ様！すべてのタスクが完了しました🎉' :
                              currentFilter === 'completed' ? '完了したタスクはありません' :
                              'タスクがありません。新しいタスクを追加してください。'}
                        </p>
                    </div>
                `;
            } else {
                taskList.innerHTML = filteredTasks.map(task => `
                    <div class="task-item ${task.completed ? 'completed' : ''}">
                        <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                            ${task.completed ? '✓' : ''}
                        </div>
                        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
                        <button class="task-delete" onclick="deleteTask(${task.id})">
                            🗑
                        </button>
                    </div>
                `).join('');
            }
        }

        // オンライン/オフライン状態を監視
        function updateOnlineStatus() {
            if (navigator.onLine) {
                onlineDot.className = 'dot online';
                onlineText.textContent = 'オンライン';
            } else {
                onlineDot.className = 'dot offline';
                onlineText.textContent = 'オフライン';
            }
        }

        // イベントリスナー
        newTaskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // 初期化
        updateUI();
        updateOnlineStatus();

        // タッチジェスチャーの改善
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: true });
    </script>
</body>
</html>
