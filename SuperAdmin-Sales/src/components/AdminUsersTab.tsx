import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  hospital_id: string;
  hospital_name?: string;
  created_at: string;
}

interface Hospital {
  id: string;
  hospital_name: string;
}

const AdminUsersTab: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    hospital_id: '',
    is_active: true
  });

  useEffect(() => {
    fetchAdminUsers();
    fetchHospitals();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select(`
          *,
          hospitals!admin_users_hospital_id_fkey(hospital_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const usersWithHospitalNames = data?.map(user => ({
        ...user,
        hospital_name: user.hospitals?.hospital_name
      })) || [];
      
      setAdminUsers(usersWithHospitalNames);
    } catch (error: any) {
      toast.error('Error fetching admin users');
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('id, hospital_name')
        .eq('is_active', true)
        .order('hospital_name');

      if (error) throw error;
      setHospitals(data || []);
    } catch (error: any) {
      toast.error('Error fetching hospitals');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        const { error } = await supabase
          .from('admin_users')
          .update({
            email: formData.email,
            full_name: formData.full_name,
            hospital_id: formData.hospital_id,
            is_active: formData.is_active
          })
          .eq('id', editingUser.id);
        if (error) throw error;
        toast.success('Admin user updated successfully');
      } else {
        const { error } = await supabase
          .from('admin_users')
          .insert([{
            email: formData.email,
            full_name: formData.full_name,
            hospital_id: formData.hospital_id,
            is_active: formData.is_active,
            role: 'admin'
          }]);
        if (error) throw error;
        toast.success('Admin user created successfully');
      }
      
      setShowModal(false);
      setEditingUser(null);
      resetForm();
      fetchAdminUsers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      full_name: '',
      hospital_id: '',
      is_active: true
    });
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      full_name: user.full_name,
      hospital_id: user.hospital_id,
      is_active: user.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin user?')) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Admin user deleted successfully');
      fetchAdminUsers();
    } catch (error: any) {
      toast.error('Error deleting admin user');
    }
  };

  if (loading && adminUsers.length === 0) {
    return <div className="text-center py-8">Loading admin users...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Admin User Management</h2>
          <p className="text-sm text-gray-500">Manage admin users and assign them to hospitals</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Admin User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminUsers.map((user) => (
          <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.full_name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Hospital:</span> {user.hospital_name || 'Not assigned'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                user.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {editingUser ? 'Edit Admin User' : 'Add New Admin User'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                      {hospital.hospital_name}
                    </option>
                  ))}
                </select>
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
                  Active User
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
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
                  {loading ? 'Saving...' : editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersTab;