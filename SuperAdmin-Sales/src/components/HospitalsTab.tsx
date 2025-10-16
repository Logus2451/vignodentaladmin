import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronDown, ChevronRight, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Hospital {
  id: string;
  hospital_name: string;
  hospital_code: string;
  address: string;
  phone: string;
  email: string;
  contact_person: string;
  is_active: boolean;
  created_at: string;
}

interface Clinic {
  id: string;
  clinic_name: string;
  clinic_code: string;
  address: string;
  phone: string;
  email: string;
  is_active: boolean;
  hospital_id: string;
  subscription_status: string;
  total_patients: number;
}

interface HospitalsTabProps {
  onStatsUpdate: () => void;
}

const HospitalsTab: React.FC<HospitalsTabProps> = ({ onStatsUpdate }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [clinics, setClinics] = useState<{ [key: string]: Clinic[] }>({});
  const [expandedHospitals, setExpandedHospitals] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  
  // Hospital modal states
  const [hospitalModal, setHospitalModal] = useState({ show: false, mode: '', hospital: null as Hospital | null });
  const [hospitalForm, setHospitalForm] = useState({
    hospital_name: '', hospital_code: '', address: '', phone: '', email: '', contact_person: '', is_active: true
  });
  
  // Clinic modal states
  const [clinicModal, setClinicModal] = useState({ show: false, mode: '', clinic: null as Clinic | null, hospitalId: '' });
  const [clinicForm, setClinicForm] = useState({
    clinic_name: '', clinic_code: '', address: '', phone: '', email: '', is_active: true
  });

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const { data: hospitalsData, error } = await supabase
        .from('hospitals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        toast.error(`Database error: ${error.message}`);
        return;
      }

      if (hospitalsData) {
        setHospitals(hospitalsData);
        
        // Fetch clinics for each hospital
        const clinicsData: { [key: string]: Clinic[] } = {};
        for (const hospital of hospitalsData) {
          const { data: hospitalClinics } = await supabase
            .from('clinics')
            .select('*')
            .eq('hospital_id', hospital.id);
          
          clinicsData[hospital.id] = hospitalClinics || [];
        }
        setClinics(clinicsData);
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      toast.error('Failed to fetch hospitals');
    } finally {
      setLoading(false);
    }
  };

  const toggleHospitalExpansion = (hospitalId: string) => {
    const newExpanded = new Set(expandedHospitals);
    if (newExpanded.has(hospitalId)) {
      newExpanded.delete(hospitalId);
    } else {
      newExpanded.add(hospitalId);
    }
    setExpandedHospitals(newExpanded);
  };

  // Hospital CRUD functions
  const openHospitalModal = (mode: string, hospital: Hospital | null = null) => {
    setHospitalModal({ show: true, mode, hospital });
    if (hospital) {
      setHospitalForm({
        hospital_name: hospital.hospital_name,
        hospital_code: hospital.hospital_code,
        address: hospital.address || '',
        phone: hospital.phone || '',
        email: hospital.email || '',
        contact_person: hospital.contact_person || '',
        is_active: hospital.is_active
      });
    } else {
      setHospitalForm({ hospital_name: '', hospital_code: '', address: '', phone: '', email: '', contact_person: '', is_active: true });
    }
  };

  const handleHospitalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (hospitalModal.mode === 'add') {
        const { error } = await supabase.from('hospitals').insert([hospitalForm]);
        if (error) throw error;
        toast.success('Hospital added successfully');
      } else if (hospitalModal.mode === 'edit') {
        const { error } = await supabase.from('hospitals').update(hospitalForm).eq('id', hospitalModal.hospital!.id);
        if (error) throw error;
        toast.success('Hospital updated successfully');
      }
      setHospitalModal({ show: false, mode: '', hospital: null });
      fetchHospitals();
      onStatsUpdate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalDelete = async (hospital: Hospital) => {
    if (!confirm(`Delete ${hospital.hospital_name}? This will also delete all related clinics.`)) return;
    try {
      const { error } = await supabase.from('hospitals').delete().eq('id', hospital.id);
      if (error) throw error;
      toast.success('Hospital deleted successfully');
      fetchHospitals();
      onStatsUpdate();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Clinic CRUD functions
  const openClinicModal = (mode: string, hospitalId: string, clinic: Clinic | null = null) => {
    setClinicModal({ show: true, mode, clinic, hospitalId });
    if (clinic) {
      setClinicForm({
        clinic_name: clinic.clinic_name,
        clinic_code: clinic.clinic_code,
        address: clinic.address || '',
        phone: clinic.phone || '',
        email: clinic.email || '',
        is_active: clinic.is_active
      });
    } else {
      setClinicForm({ clinic_name: '', clinic_code: '', address: '', phone: '', email: '', is_active: true });
    }
  };

  const handleClinicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const clinicData = { ...clinicForm, hospital_id: clinicModal.hospitalId };
      if (clinicModal.mode === 'add') {
        const { error } = await supabase.from('clinics').insert([clinicData]);
        if (error) throw error;
        toast.success('Clinic added successfully');
      } else if (clinicModal.mode === 'edit') {
        const { error } = await supabase.from('clinics').update(clinicForm).eq('id', clinicModal.clinic!.id);
        if (error) throw error;
        toast.success('Clinic updated successfully');
      }
      setClinicModal({ show: false, mode: '', clinic: null, hospitalId: '' });
      fetchHospitals();
      onStatsUpdate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClinicDelete = async (clinic: Clinic) => {
    if (!confirm(`Delete ${clinic.clinic_name}?`)) return;
    try {
      const { error } = await supabase.from('clinics').delete().eq('id', clinic.id);
      if (error) throw error;
      toast.success('Clinic deleted successfully');
      fetchHospitals();
      onStatsUpdate();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Hospital Management
        </h2>
        <button 
          onClick={() => openHospitalModal('add')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Hospital
        </button>
      </div>

      {hospitals.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hospitals found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get started by adding your first hospital.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              {/* Hospital Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleHospitalExpansion(hospital.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      {expandedHospitals.has(hospital.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {hospital.hospital_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {hospital.hospital_code} • {clinics[hospital.id]?.length || 0} clinics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      hospital.is_active
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {hospital.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <button 
                      onClick={() => openHospitalModal('view', hospital)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => openHospitalModal('edit', hospital)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleHospitalDelete(hospital)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Clinics */}
              {expandedHospitals.has(hospital.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-600 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Clinics ({clinics[hospital.id]?.length || 0})
                    </h4>
                    <button 
                      onClick={() => openClinicModal('add', hospital.id)}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Clinic
                    </button>
                  </div>

                  {clinics[hospital.id]?.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No clinics found for this hospital
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {clinics[hospital.id]?.map((clinic) => (
                        <div
                          key={clinic.id}
                          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">
                                {clinic.clinic_name}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {clinic.clinic_code}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              clinic.subscription_status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : clinic.subscription_status === 'trial'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {clinic.subscription_status}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>Patients: {clinic.total_patients}</p>
                            {clinic.phone && <p>Phone: {clinic.phone}</p>}
                            {clinic.email && <p>Email: {clinic.email}</p>}
                          </div>
                          <div className="flex items-center justify-end space-x-2 mt-3">
                            <button 
                              onClick={() => openClinicModal('view', hospital.id, clinic)}
                              className="p-1 text-gray-400 hover:text-blue-600 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => openClinicModal('edit', hospital.id, clinic)}
                              className="p-1 text-gray-400 hover:text-blue-600 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleClinicDelete(clinic)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Hospital Modal */}
      {hospitalModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              {hospitalModal.mode === 'add' ? 'Add Hospital' : hospitalModal.mode === 'edit' ? 'Edit Hospital' : 'Hospital Details'}
            </h3>
            {hospitalModal.mode === 'view' ? (
              <div className="space-y-3">
                <div><strong>Name:</strong> {hospitalModal.hospital?.hospital_name}</div>
                <div><strong>Code:</strong> {hospitalModal.hospital?.hospital_code}</div>
                <div><strong>Address:</strong> {hospitalModal.hospital?.address}</div>
                <div><strong>Phone:</strong> {hospitalModal.hospital?.phone}</div>
                <div><strong>Email:</strong> {hospitalModal.hospital?.email}</div>
                <div><strong>Contact Person:</strong> {hospitalModal.hospital?.contact_person}</div>
                <div><strong>Status:</strong> {hospitalModal.hospital?.is_active ? 'Active' : 'Inactive'}</div>
              </div>
            ) : (
              <form onSubmit={handleHospitalSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Hospital Name"
                  value={hospitalForm.hospital_name}
                  onChange={(e) => setHospitalForm({...hospitalForm, hospital_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Hospital Code"
                  value={hospitalForm.hospital_code}
                  onChange={(e) => setHospitalForm({...hospitalForm, hospital_code: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={hospitalForm.address}
                  onChange={(e) => setHospitalForm({...hospitalForm, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={hospitalForm.phone}
                  onChange={(e) => setHospitalForm({...hospitalForm, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={hospitalForm.email}
                  onChange={(e) => setHospitalForm({...hospitalForm, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Contact Person"
                  value={hospitalForm.contact_person}
                  onChange={(e) => setHospitalForm({...hospitalForm, contact_person: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hospitalForm.is_active}
                    onChange={(e) => setHospitalForm({...hospitalForm, is_active: e.target.checked})}
                    className="mr-2"
                  />
                  Active
                </label>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setHospitalModal({ show: false, mode: '', hospital: null })}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : hospitalModal.mode === 'add' ? 'Add' : 'Update'}
                  </button>
                </div>
              </form>
            )}
            {hospitalModal.mode === 'view' && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setHospitalModal({ show: false, mode: '', hospital: null })}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Clinic Modal */}
      {clinicModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              {clinicModal.mode === 'add' ? 'Add Clinic' : clinicModal.mode === 'edit' ? 'Edit Clinic' : 'Clinic Details'}
            </h3>
            {clinicModal.mode === 'view' ? (
              <div className="space-y-3">
                <div><strong>Name:</strong> {clinicModal.clinic?.clinic_name}</div>
                <div><strong>Code:</strong> {clinicModal.clinic?.clinic_code}</div>
                <div><strong>Address:</strong> {clinicModal.clinic?.address}</div>
                <div><strong>Phone:</strong> {clinicModal.clinic?.phone}</div>
                <div><strong>Email:</strong> {clinicModal.clinic?.email}</div>
                <div><strong>Status:</strong> {clinicModal.clinic?.is_active ? 'Active' : 'Inactive'}</div>
                <div><strong>Patients:</strong> {clinicModal.clinic?.total_patients}</div>
              </div>
            ) : (
              <form onSubmit={handleClinicSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Clinic Name"
                  value={clinicForm.clinic_name}
                  onChange={(e) => setClinicForm({...clinicForm, clinic_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Clinic Code"
                  value={clinicForm.clinic_code}
                  onChange={(e) => setClinicForm({...clinicForm, clinic_code: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={clinicForm.address}
                  onChange={(e) => setClinicForm({...clinicForm, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={clinicForm.phone}
                  onChange={(e) => setClinicForm({...clinicForm, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={clinicForm.email}
                  onChange={(e) => setClinicForm({...clinicForm, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={clinicForm.is_active}
                    onChange={(e) => setClinicForm({...clinicForm, is_active: e.target.checked})}
                    className="mr-2"
                  />
                  Active
                </label>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setClinicModal({ show: false, mode: '', clinic: null, hospitalId: '' })}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : clinicModal.mode === 'add' ? 'Add' : 'Update'}
                  </button>
                </div>
              </form>
            )}
            {clinicModal.mode === 'view' && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setClinicModal({ show: false, mode: '', clinic: null, hospitalId: '' })}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalsTab;