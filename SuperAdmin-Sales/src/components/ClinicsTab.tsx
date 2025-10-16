import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Clinic {
  id: string;
  clinic_code: string;
  clinic_name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  is_active: boolean;
  created_at: string;
  contact_person?: string;
  license_number?: string;
  registration_date?: string;
  subscription_status?: string;
  total_patients?: number;
  billing_address?: string;
  tax_id?: string;
  timezone?: string;
  country?: string;
  state?: string;
  city?: string;
  postal_code?: string;
}

interface ClinicsTabProps {
  onStatsUpdate: () => void;
}

const ClinicsTab: React.FC<ClinicsTabProps> = ({ onStatsUpdate }) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [viewingClinic, setViewingClinic] = useState<Clinic | null>(null);
  const [formData, setFormData] = useState({
    clinic_code: '',
    clinic_name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    contact_person: '',
    license_number: '',
    registration_date: new Date().toISOString().split('T')[0],
    subscription_status: 'trial',
    total_patients: 0,
    billing_address: '',
    tax_id: '',
    timezone: 'Asia/Kolkata',
    country: 'India',
    state: '',
    city: '',
    postal_code: ''
  });

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const { data, error } = await supabase
        .from('clinics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClinics(data || []);
      onStatsUpdate();
    } catch (error: any) {
      toast.error('Error fetching clinics');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingClinic) {
        const { error } = await supabase
          .from('clinics')
          .update(formData)
          .eq('id', editingClinic.id);
        if (error) throw error;
        toast.success('Clinic updated successfully');
      } else {
        const { error } = await supabase
          .from('clinics')
          .insert([formData]);
        if (error) throw error;
        toast.success('Clinic created successfully');
      }
      
      setShowModal(false);
      setEditingClinic(null);
      setFormData({
        clinic_code: '',
        clinic_name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        contact_person: '',
        license_number: '',
        registration_date: new Date().toISOString().split('T')[0],
        subscription_status: 'trial',
        total_patients: 0,
        billing_address: '',
        tax_id: '',
        timezone: 'Asia/Kolkata',
        country: 'India',
        state: '',
        city: '',
        postal_code: ''
      });
      fetchClinics();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (clinic: Clinic) => {
    setEditingClinic(clinic);
    setFormData({
      clinic_code: clinic.clinic_code,
      clinic_name: clinic.clinic_name,
      address: clinic.address || '',
      phone: clinic.phone || '',
      email: clinic.email || '',
      website: clinic.website || '',
      contact_person: (clinic as any).contact_person || '',
      license_number: (clinic as any).license_number || '',
      registration_date: (clinic as any).registration_date || new Date().toISOString().split('T')[0],
      subscription_status: (clinic as any).subscription_status || 'trial',
      total_patients: (clinic as any).total_patients || 0,
      billing_address: (clinic as any).billing_address || '',
      tax_id: (clinic as any).tax_id || '',
      timezone: (clinic as any).timezone || 'Asia/Kolkata',
      country: (clinic as any).country || 'India',
      state: (clinic as any).state || '',
      city: (clinic as any).city || '',
      postal_code: (clinic as any).postal_code || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this clinic?')) return;

    try {
      const { error } = await supabase
        .from('clinics')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Clinic deleted successfully');
      fetchClinics();
    } catch (error: any) {
      toast.error('Error deleting clinic');
    }
  };

  const filteredClinics = clinics.filter(clinic =>
    clinic.clinic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.clinic_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && clinics.length === 0) {
    return <div className="text-center py-8">Loading clinics...</div>;
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
              placeholder="Search clinics..."
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
          Add Clinic
        </button>
      </div>

      {/* Clinics Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clinic Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clinic Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {clinic.clinic_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {clinic.clinic_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    {clinic.email && <div>{clinic.email}</div>}
                    {clinic.phone && <div>{clinic.phone}</div>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    clinic.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {clinic.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setViewingClinic(clinic)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(clinic)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(clinic.id)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {editingClinic ? 'Edit Clinic' : 'Add New Clinic'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Clinic Code</label>
                <input
                  type="text"
                  required
                  value={formData.clinic_code}
                  onChange={(e) => setFormData({...formData, clinic_code: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Clinic Name</label>
                <input
                  type="text"
                  required
                  value={formData.clinic_name}
                  onChange={(e) => setFormData({...formData, clinic_name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input
                  type="text"
                  value={formData.contact_person}
                  onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                <input
                  type="text"
                  value={formData.license_number}
                  onChange={(e) => setFormData({...formData, license_number: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subscription Status</label>
                <select
                  value={formData.subscription_status}
                  onChange={(e) => setFormData({...formData, subscription_status: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="trial">Trial</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingClinic(null);
                    setFormData({
                      clinic_code: '',
                      clinic_name: '',
                      address: '',
                      phone: '',
                      email: '',
                      website: '',
                      contact_person: '',
                      license_number: '',
                      registration_date: new Date().toISOString().split('T')[0],
                      subscription_status: 'trial',
                      total_patients: 0,
                      billing_address: '',
                      tax_id: '',
                      timezone: 'Asia/Kolkata',
                      country: 'India',
                      state: '',
                      city: '',
                      postal_code: ''
                    });
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
                  {loading ? 'Saving...' : editingClinic ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Clinic Modal */}
      {viewingClinic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {viewingClinic.clinic_name}
              </h3>
              <button
                onClick={() => setViewingClinic(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b pb-2">Basic Information</h4>
                <div>
                  <label className="text-sm font-medium text-gray-500">Clinic Code</label>
                  <p className="text-gray-900">{viewingClinic.clinic_code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Clinic Name</label>
                  <p className="text-gray-900">{viewingClinic.clinic_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{viewingClinic.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{viewingClinic.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <p className="text-gray-900">{viewingClinic.website || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                  <p className="text-gray-900">{(viewingClinic as any).contact_person || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">License Number</label>
                  <p className="text-gray-900">{(viewingClinic as any).license_number || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b pb-2">Location & Business</h4>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{viewingClinic.address || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">City</label>
                  <p className="text-gray-900">{(viewingClinic as any).city || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">State</label>
                  <p className="text-gray-900">{(viewingClinic as any).state || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Country</label>
                  <p className="text-gray-900">{(viewingClinic as any).country || 'India'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Registration Date</label>
                  <p className="text-gray-900">
                    {(viewingClinic as any).registration_date 
                      ? new Date((viewingClinic as any).registration_date).toLocaleDateString()
                      : 'Not provided'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subscription Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    (viewingClinic as any).subscription_status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : (viewingClinic as any).subscription_status === 'trial'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {(viewingClinic as any).subscription_status || 'trial'}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Patients</label>
                  <p className="text-gray-900">{(viewingClinic as any).total_patients || 0}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    viewingClinic.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {viewingClinic.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setViewingClinic(null);
                  handleEdit(viewingClinic);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-3"
              >
                Edit Clinic
              </button>
              <button
                onClick={() => setViewingClinic(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicsTab;