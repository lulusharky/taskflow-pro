import { useState, useEffect } from 'react';
import { Project } from '../types';
import { projectService } from '../services/projects';
import Header from '../components/Layout/Header';
import ProjectSidebar from '../components/Dashboard/ProjectSidebar';
import FilterBar from '../components/Dashboard/FilterBar';
import TaskList from '../components/Dashboard/TaskList';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getFilterCompleted = () => {
    switch (filter) {
      case 'pending':
        return false;
      case 'completed':
        return true;
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username="User" />
      
      <div className="flex">
        <ProjectSidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          onProjectsChange={fetchProjects}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedProject
                  ? projects.find(p => p.id === selectedProject)?.name || 'Project'
                  : 'All Tasks'
                }
              </h2>
              <FilterBar filter={filter} onFilterChange={setFilter} />
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <TaskList
                projectId={selectedProject || undefined}
                filterCompleted={getFilterCompleted()}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
