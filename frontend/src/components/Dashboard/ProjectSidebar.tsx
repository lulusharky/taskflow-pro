import { useState } from 'react';
import { Project, ProjectCreate } from '../../types';
import { projectService } from '../../services/projects';
import { Folder, Plus, Edit2, Trash2 } from 'lucide-react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';

interface ProjectSidebarProps {
  projects: Project[];
  selectedProject: number | null;
  onSelectProject: (projectId: number | null) => void;
  onProjectsChange: () => void;
}

export default function ProjectSidebar({ projects, selectedProject, onSelectProject, onProjectsChange }: ProjectSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('#3B82F6');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const projectData: ProjectCreate = {
      name: newProjectName,
      description: newProjectDescription || undefined,
      color: newProjectColor,
    };

    try {
      await projectService.createProject(projectData);
      setNewProjectName('');
      setNewProjectDescription('');
      setNewProjectColor('#3B82F6');
      setIsModalOpen(false);
      onProjectsChange();
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!confirm('Are you sure you want to delete this project? All tasks will be deleted.')) return;

    try {
      await projectService.deleteProject(projectId);
      if (selectedProject === projectId) {
        onSelectProject(null);
      }
      onProjectsChange();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onSelectProject(null)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
            selectedProject === null
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>All Tasks</span>
        </button>

        {projects.map(project => (
          <div
            key={project.id}
            className="group relative"
          >
            <button
              onClick={() => onSelectProject(project.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedProject === project.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="flex-1 truncate">{project.name}</span>
            </button>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input
            label="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Enter project name"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder="Enter project description (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'].map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewProjectColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    newProjectColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
