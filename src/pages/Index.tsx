import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: 'up' | 'down';
}

interface RoadSegment {
  id: string;
  name: string;
  status: 'good' | 'warning' | 'critical';
  defects: number;
  lastInspection: string;
  priority: 'high' | 'medium' | 'low';
}

function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats: StatCard[] = [
    {
      title: 'Всего дорог на контроле',
      value: '1 247',
      change: '+12 за месяц',
      icon: 'MapPin',
      trend: 'up'
    },
    {
      title: 'Критических дефектов',
      value: '89',
      change: '-15 за неделю',
      icon: 'AlertTriangle',
      trend: 'down'
    },
    {
      title: 'Ремонтов в работе',
      value: '23',
      change: '+5 новых',
      icon: 'Construction',
      trend: 'up'
    },
    {
      title: 'Завершено за месяц',
      value: '156',
      change: '+23%',
      icon: 'CheckCircle',
      trend: 'up'
    }
  ];

  const roadSegments: RoadSegment[] = [
    {
      id: '1',
      name: 'Московский проспект, уч. 12-18 км',
      status: 'critical',
      defects: 15,
      lastInspection: '2025-11-25',
      priority: 'high'
    },
    {
      id: '2',
      name: 'ул. Ленина, уч. 3-5 км',
      status: 'warning',
      defects: 7,
      lastInspection: '2025-11-26',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'пр. Ленинградский, уч. 8-12 км',
      status: 'good',
      defects: 2,
      lastInspection: '2025-11-27',
      priority: 'low'
    },
    {
      id: '4',
      name: 'Президентский бульвар, уч. 1-4 км',
      status: 'warning',
      defects: 9,
      lastInspection: '2025-11-24',
      priority: 'high'
    },
    {
      id: '5',
      name: 'ул. Гагарина, уч. 5-8 км',
      status: 'critical',
      defects: 18,
      lastInspection: '2025-11-23',
      priority: 'high'
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'monitoring', label: 'Мониторинг дорог', icon: 'MapPin' },
    { id: 'control', label: 'Контроль работ', icon: 'ClipboardCheck' },
    { id: 'routes', label: 'Маршруты тестирования', icon: 'Route' },
    { id: 'planning', label: 'Планирование ремонтов', icon: 'Calendar' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      good: { label: 'Удовлетворительно', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      warning: { label: 'Требует внимания', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      critical: { label: 'Критическое', className: 'bg-red-100 text-red-800 hover:bg-red-100' }
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      high: { label: 'Высокий', className: 'bg-red-50 text-red-700 border-red-200' },
      medium: { label: 'Средний', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      low: { label: 'Низкий', className: 'bg-blue-50 text-blue-700 border-blue-200' }
    };
    const variant = variants[priority];
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Map" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">ГДИ Чебоксары</h1>
              <p className="text-xs text-sidebar-foreground/70">Городская дорожная инфраструктура</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Администратор</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">admin@cheboksary.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Дашборд мониторинга</h2>
              <p className="text-muted-foreground mt-1">Единая цифровая платформа городской дорожной инфраструктуры</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Новая проверка
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={stat.icon} className="text-primary" size={20} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Icon 
                      name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={14}
                      className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                    />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Участки дорог требующие внимания</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Фильтры
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadSegments.map((segment) => (
                    <div
                      key={segment.id}
                      className="p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">{segment.name}</h4>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(segment.status)}
                            {getPriorityBadge(segment.priority)}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="ExternalLink" size={16} />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Выявлено дефектов</p>
                          <p className="font-semibold text-foreground mt-1">{segment.defects}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Последняя проверка</p>
                          <p className="font-semibold text-foreground mt-1">
                            {new Date(segment.lastInspection).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Прогресс работ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Ремонт дорог</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Тестирование маршрутов</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Диагностика</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Icon name="Video" size={16} className="mr-2" />
                    Видеофиксация
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Создать отчёт
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Icon name="Map" size={16} className="mr-2" />
                    Просмотр карты
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Icon name="Bell" size={16} className="mr-2" />
                    Уведомления
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Index;
