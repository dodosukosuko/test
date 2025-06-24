import React, { useState, useEffect } from 'react';

// アイコンコンポーネント
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
  </svg>
);

const SmartphoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'PWAアプリを試してみる', completed: false },
    { id: 2, text: 'ホーム画面に追加する', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask('');
      
      // 触覚フィードバック（対応デバイスのみ）
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    // 触覚フィードバック
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    // 触覚フィードバック
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <>
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        .task-item {
          transition: all 0.3s ease;
        }
        
        .task-item.completed {
          transform: scale(0.98);
          opacity: 0.7;
        }
        
        .btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .btn:active {
          transform: scale(0.95);
        }
        
        .install-info {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }
        
        @media (max-width: 640px) {
          .container {
            padding: 1rem;
          }
        }
      `}</style>
      
      <div className="app-container bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container max-w-md mx-auto pt-8 px-4 pb-20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <CheckIcon />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">タスク管理</h1>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-600">{isOnline ? 'オンライン' : 'オフライン'}</span>
              </div>
              <div className="text-gray-600">
                完了: {completedCount} | 未完了: {activeCount}
              </div>
            </div>
          </div>

          {/* Add Task */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="新しいタスクを追加..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addTask}
                className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'すべて' },
                { key: 'active', label: '未完了' },
                { key: 'completed', label: '完了済み' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`btn flex-1 py-2 px-4 rounded-lg font-medium ${
                    filter === key
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center text-4xl">
                    ✓
                  </div>
                </div>
                <p className="text-gray-500">
                  {filter === 'active' && 'お疲れ様！すべてのタスクが完了しました🎉'}
                  {filter === 'completed' && '完了したタスクはありません'}
                  {filter === 'all' && 'タスクがありません。新しいタスクを追加してください。'}
                </p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`task-item bg-white rounded-xl shadow-lg p-4 ${
                    task.completed ? 'completed' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`btn flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'border-2 border-gray-300 hover:border-green-500 hover:bg-green-50'
                      }`}
                    >
                      {task.completed && <CheckIcon />}
                    </button>
                    
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </span>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PWA Features Info */}
          <div className="install-info mt-8 rounded-xl p-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <SmartphoneIcon />
              </div>
              <p className="text-gray-600 text-sm">
                📱 このアプリはオフラインでも動作します<br/>
                🏠 ホーム画面に追加してアプリとして使用可能
              </p>
              <div className="mt-3 text-xs text-gray-500">
                <p>iPhoneでの追加方法：</p>
                <p>Safari → 共有ボタン(□↑) → ホーム画面に追加</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}