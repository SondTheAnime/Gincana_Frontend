import { Plus, Calendar, Trophy, Users, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AddGame from './Games/AddGame';
import ManageCalendar from './Calendar/ManageCalendar';
import ManageScore from './Score/ManageScore';
import ManageTeams from './Teams/ManageTeams';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState<'calendar' | 'score' | 'teams' | null>(null);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'calendar':
        return <ManageCalendar />;
      case 'score':
        return <ManageScore />;
      case 'teams':
        return <ManageTeams />;
      default:
        return null;
    }
  };

  const cards = [
    {
      id: 'add-game',
      icon: <Plus className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />,
      title: 'Adicionar Novo Jogo',
      subtitle: 'Criar nova partida',
      action: 'Adicionar jogo',
      onClick: () => setIsAddGameModalOpen(true)
    },
    {
      id: 'calendar',
      icon: <Calendar className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />,
      title: 'Gerenciar Calendário',
      subtitle: 'Organizar jogos',
      action: 'Ver calendário',
      onClick: () => setActiveComponent('calendar')
    },
    {
      id: 'score',
      icon: <Trophy className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />,
      title: 'Gerenciar Placar',
      subtitle: 'Atualizar resultados',
      action: 'Atualizar placar',
      onClick: () => setActiveComponent('score')
    },
    {
      id: 'teams',
      icon: <Users className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />,
      title: 'Gerenciar Times',
      subtitle: 'Administrar equipes',
      action: 'Gerenciar times',
      onClick: () => setActiveComponent('teams')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Painel Administrativo
            </h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cards.map((card) => (
              <div 
                key={card.id}
                className={`bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                  activeComponent === card.id ? 'ring-2 ring-green-500 dark:ring-green-400' : ''
                }`}
                onClick={card.onClick}
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {card.icon}
                    </div>
                    <div className="ml-4 w-0 flex-1">
                      <dl>
                        <dt className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {card.title}
                        </dt>
                        <dd>
                          <div className="text-base md:text-lg font-medium text-gray-900 dark:text-white">
                            {card.subtitle}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 md:px-5 py-2 md:py-3">
                  <div className="text-xs md:text-sm">
                    <span className="font-medium text-green-700 dark:text-green-400">
                      {card.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="mt-6 md:mt-8">
            {renderContent()}
          </div>

          {/* Add Game Modal */}
          <AddGame 
            isOpen={isAddGameModalOpen}
            onClose={() => setIsAddGameModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 