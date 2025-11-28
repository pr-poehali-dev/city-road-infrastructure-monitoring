import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface RepairProject {
  id: string;
  name: string;
  status: 'planned' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  budget: number;
  progress: number;
  startDate: string;
  endDate: string;
  contractor: string;
}

const PlanningSection = () => {
  const projects: RepairProject[] = [
    {
      id: '1',
      name: 'Ремонт Московского проспекта (уч. 12-18 км)',
      status: 'in_progress',
      priority: 'high',
      budget: 15000000,
      progress: 45,
      startDate: '2025-10-01',
      endDate: '2026-03-15',
      contractor: 'ООО "ДорСтрой"'
    },
    {
      id: '2',
      name: 'Капитальный ремонт ул. Гагарина',
      status: 'planned',
      priority: 'high',
      budget: 8500000,
      progress: 0,
      startDate: '2026-02-01',
      endDate: '2026-06-30',
      contractor: 'Не назначен'
    },
    {
      id: '3',
      name: 'Текущий ремонт Президентского бульвара',
      status: 'in_progress',
      priority: 'medium',
      budget: 4200000,
      progress: 78,
      startDate: '2025-11-01',
      endDate: '2025-12-20',
      contractor: 'ИП Иванов А.С.'
    },
    {
      id: '4',
      name: 'Ямочный ремонт ул. Ленина',
      status: 'completed',
      priority: 'low',
      budget: 1800000,
      progress: 100,
      startDate: '2025-09-15',
      endDate: '2025-11-10',
      contractor: 'ООО "АсфальтСервис"'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      planned: { label: 'Запланирован', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      in_progress: { label: 'В работе', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      completed: { label: 'Завершён', className: 'bg-green-100 text-green-800 hover:bg-green-100' }
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Планирование ремонтов</h3>
          <p className="text-muted-foreground mt-1">Цифровое планирование и контроль исполнения дорожных работ</p>
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Новый проект
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего проектов</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Icon name="Construction" className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">В работе</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="Wallet" className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Бюджет 2026</p>
                <p className="text-2xl font-bold">₽450М</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Завершено</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(project.status)}
                    {getPriorityBadge(project.priority)}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Бюджет</p>
                  <p className="font-semibold text-foreground mt-1">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Подрядчик</p>
                  <p className="font-semibold text-foreground mt-1">{project.contractor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Начало работ</p>
                  <p className="font-semibold text-foreground mt-1">
                    {new Date(project.startDate).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Завершение</p>
                  <p className="font-semibold text-foreground mt-1">
                    {new Date(project.endDate).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Прогресс выполнения</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Eye" size={14} className="mr-2" />
                  Подробнее
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="FileText" size={14} className="mr-2" />
                  Отчёт
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanningSection;
