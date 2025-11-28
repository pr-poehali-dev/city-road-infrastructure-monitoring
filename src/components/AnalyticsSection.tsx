import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AnalyticsSection = () => {
  const defectTypes = [
    { name: 'Выбоины', count: 234, percent: 35 },
    { name: 'Трещины', count: 189, percent: 28 },
    { name: 'Просадки', count: 145, percent: 22 },
    { name: 'Колейность', count: 98, percent: 15 }
  ];

  const monthlyData = [
    { month: 'Июль', defects: 120, repairs: 45 },
    { month: 'Август', defects: 156, repairs: 67 },
    { month: 'Сентябрь', defects: 143, repairs: 89 },
    { month: 'Октябрь', defects: 178, repairs: 102 },
    { month: 'Ноябрь', defects: 201, repairs: 134 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.defects, d.repairs)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Аналитика и отчёты</h3>
          <p className="text-muted-foreground mt-1">Статистика и визуализация данных дорожной инфраструктуры</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Calendar" size={16} className="mr-2" />
            Период
          </Button>
          <Button>
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт отчёта
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" className="text-red-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Выявлено дефектов</p>
                <p className="text-3xl font-bold">666</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Icon name="TrendingUp" size={14} className="text-red-600" />
              +12% за месяц
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Устранено</p>
                <p className="text-3xl font-bold">437</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Icon name="TrendingUp" size={14} className="text-green-600" />
              +28% за месяц
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Percent" className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Эффективность</p>
                <p className="text-3xl font-bold">65.6%</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Icon name="TrendingUp" size={14} className="text-green-600" />
              +8% за месяц
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика выявления и устранения дефектов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{item.month}</span>
                    <div className="flex gap-4">
                      <span className="text-red-600">Выявлено: {item.defects}</span>
                      <span className="text-green-600">Устранено: {item.repairs}</span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-red-200"
                      style={{ width: `${(item.defects / maxValue) * 100}%` }}
                    />
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500"
                      style={{ width: `${(item.repairs / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-200"></div>
                <span>Выявлено дефектов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span>Устранено</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Типы дефектов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {defectTypes.map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{type.name}</span>
                    <span className="text-muted-foreground">{type.count} ({type.percent}%)</span>
                  </div>
                  <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all"
                      style={{ width: `${type.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={18} className="text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900">Рекомендация</p>
                  <p className="text-blue-700 mt-1">
                    Увеличить частоту проверок участков с выбоинами на 15%. Это снизит риск аварийности.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Распределение по типам дорог</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Магистрали</span>
                <Icon name="TrendingUp" size={14} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold mb-1">342 км</p>
              <p className="text-xs text-muted-foreground">156 дефектов</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Межквартальные</span>
                <Icon name="TrendingUp" size={14} className="text-yellow-600" />
              </div>
              <p className="text-2xl font-bold mb-1">587 км</p>
              <p className="text-xs text-muted-foreground">298 дефектов</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Дворовые</span>
                <Icon name="TrendingDown" size={14} className="text-red-600" />
              </div>
              <p className="text-2xl font-bold mb-1">218 км</p>
              <p className="text-xs text-muted-foreground">178 дефектов</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Частный сектор</span>
                <Icon name="TrendingUp" size={14} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold mb-1">100 км</p>
              <p className="text-xs text-muted-foreground">34 дефекта</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
