import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Template {
  id: string;
  name: string;
  plan_key: string;
  monthly_price: number;
  yearly_price: number;
  features: string[];
  is_active: boolean;
  created_at: string;
}

const TemplatesTab: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    plan_key: '',
    monthly_price: 0,
    yearly_price: 0,
    features: [''],
    is_active: true
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast.error('Error fetching templates');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };

      if (editingTemplate) {
        const { error } = await supabase
          .from('subscription_templates')
          .update(templateData)
          .eq('id', editingTemplate.id);
        if (error) throw error;
        toast.success('Template updated successfully');
      } else {
        const { error } = await supabase
          .from('subscription_templates')
          .insert([templateData]);
        if (error) throw error;
        toast.success('Template created successfully');
      }
      
      setShowModal(false);
      setEditingTemplate(null);
      resetForm();
      fetchTemplates();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      plan_key: '',
      monthly_price: 0,
      yearly_price: 0,
      features: [''],
      is_active: true
    });
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      plan_key: template.plan_key,
      monthly_price: template.monthly_price,
      yearly_price: template.yearly_price,
      features: template.features.length > 0 ? template.features : [''],
      is_active: template.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const { error } = await supabase
        .from('subscription_templates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Template deleted successfully');
      fetchTemplates();
    } catch (error: any) {
      toast.error('Error deleting template');
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : ['']
    });
  };

  if (loading && templates.length === 0) {
    return <div className="text-center py-8">Loading templates...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Subscription Templates</h2>
          <p className="text-sm text-gray-500">Manage subscription plan templates</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.plan_key}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(template)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-gray-900">₹{template.monthly_price}</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <div className="text-sm text-gray-500">
                ₹{template.yearly_price}/year (Save ₹{(template.monthly_price * 12) - template.yearly_price})
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {template.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                template.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {template.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {editingTemplate ? 'Edit Template' : 'Add New Template'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Template Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Professional Plan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Plan Key</label>
                <input
                  type="text"
                  required
                  value={formData.plan_key}
                  onChange={(e) => setFormData({...formData, plan_key: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., professional"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Price</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.monthly_price}
                    onChange={(e) => setFormData({...formData, monthly_price: parseFloat(e.target.value)})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Yearly Price</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.yearly_price}
                    onChange={(e) => setFormData({...formData, yearly_price: parseFloat(e.target.value)})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  + Add Feature
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active Template
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTemplate(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingTemplate ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesTab;