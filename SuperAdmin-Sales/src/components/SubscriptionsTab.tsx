import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface Subscription {
  id: string;
  hospital_id: string;
  plan_name: string;
  status: string;
  monthly_price: number;
  yearly_price: number;
  billing_cycle: string;
  start_date: string;
  end_date: string | null;
  auto_renew: boolean;
  created_at: string;
  hospitals?: {
    hospital_name: string;
    hospital_code: string;
  };
}

interface Hospital {
  id: string;
  hospital_name: string;
  hospital_code: string;
}

interface Template {
  id: string;
  name: string;
  plan_key: string;
  monthly_price: number;
  yearly_price: number;
  features: string[];
  is_active: boolean;
}

const SubscriptionsTab: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [formData, setFormData] = useState({
    hospital_id: '',
    plan_name: '',
    status: 'active',
    billing_cycle: 'monthly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    auto_renew: true
  });

  useEffect(() => {
    fetchSubscriptions();
    fetchHospitals();
    fetchTemplates();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          hospitals (
            hospital_name,
            hospital_code
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error: any) {
      toast.error('Error fetching subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('id, hospital_name, hospital_code')
        .eq('is_active', true);

      if (error) throw error;
      setHospitals(data || []);
    } catch (error: any) {
      toast.error('Error fetching hospitals');
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_templates')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setTemplates(data || []);
      if (data && data.length > 0 && !formData.plan_name) {
        setFormData(prev => ({ ...prev, plan_name: data[0].plan_key }));
      }
    } catch (error: any) {
      toast.error('Error fetching templates');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const template = templates.find(t => t.plan_key === formData.plan_name);
      if (!template) throw new Error('Template not found');
      
      const subscriptionData = {
        ...formData,
        monthly_price: template.monthly_price,
        yearly_price: template.yearly_price,
        end_date: formData.end_date || null
      };

      if (editingSubscription) {
        const { error } = await supabase
          .from('subscriptions')
          .update(subscriptionData)
          .eq('id', editingSubscription.id);
        if (error) throw error;
        toast.success('Subscription updated successfully');
      } else {
        const { error } = await supabase
          .from('subscriptions')
          .insert([subscriptionData]);
        if (error) throw error;
        toast.success('Subscription assigned successfully');
      }
      
      setShowModal(false);
      setEditingSubscription(null);
      resetForm();
      fetchSubscriptions();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      hospital_id: '',
      plan_name: templates.length > 0 ? templates[0].plan_key : '',
      status: 'active',
      billing_cycle: 'monthly',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      auto_renew: true
    });
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      hospital_id: subscription.hospital_id,
      plan_name: subscription.plan_name,
      status: subscription.status,
      billing_cycle: subscription.billing_cycle,
      start_date: subscription.start_date,
      end_date: subscription.end_date || '',
      auto_renew: subscription.auto_renew
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Subscription deleted successfully');
      fetchSubscriptions();
    } catch (error: any) {
      toast.error('Error deleting subscription');
    }
  };



  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.hospitals?.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.hospitals?.hospital_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.plan_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && subscriptions.length === 0) {
    return <div className="text-center py-8">Loading subscriptions...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Assign Subscription
        </button>
      </div>

      {/* Subscriptions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Billing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{subscription.hospitals?.hospital_name}</div>
                    <div className="text-gray-500">{subscription.hospitals?.hospital_code}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="capitalize font-medium">{subscription.plan_name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>₹{subscription.billing_cycle === 'monthly' ? subscription.monthly_price : subscription.yearly_price}</div>
                    <div className="text-gray-500 capitalize">{subscription.billing_cycle}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : subscription.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>Start: {new Date(subscription.start_date).toLocaleDateString()}</div>
                    {subscription.end_date && (
                      <div>End: {new Date(subscription.end_date).toLocaleDateString()}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(subscription)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(subscription.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {editingSubscription ? 'Edit Subscription' : 'Assign Subscription Template'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital</label>
                <select
                  required
                  value={formData.hospital_id}
                  onChange={(e) => setFormData({...formData, hospital_id: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.hospital_name} ({hospital.hospital_code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subscription Template</label>
                <select
                  value={formData.plan_name}
                  onChange={(e) => setFormData({...formData, plan_name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.plan_key}>
                      {template.name} - ₹{template.monthly_price}/month
                    </option>
                  ))}
                </select>
                {formData.plan_name && (() => {
                  const selectedTemplate = templates.find(t => t.plan_key === formData.plan_name);
                  return selectedTemplate ? (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {selectedTemplate.name} Features:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedTemplate.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null;
                })()}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Billing Cycle</label>
                <select
                  value={formData.billing_cycle}
                  onChange={(e) => setFormData({...formData, billing_cycle: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingSubscription(null);
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
                  {loading ? 'Saving...' : editingSubscription ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTab;