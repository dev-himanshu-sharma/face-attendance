import { useEffect, useState } from 'react';
import api from '../../api/client';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import toast from 'react-hot-toast';
import { IT_DEPARTMENTS } from '../../utils/validation';

export default function AttendanceReport() {
  const [data, setData] = useState({ records: [], page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    department: '',
    status: 'present',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const load = (page = 1) => {
    // Validate dates before fetching
    if (filters.from && filters.to) {
      const fromDate = new Date(filters.from);
      const toDate = new Date(filters.to);
      
      if (fromDate > toDate) {
        setErrors({ date: 'From date cannot be after To date' });
        toast.error('From date cannot be after To date');
        return;
      }
      
      // Check if dates are not in future
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (fromDate > today) {
        setErrors({ date: 'From date cannot be in the future' });
        toast.error('From date cannot be in the future');
        return;
      }
    }
    
    setErrors({});
    setLoading(true);
    
    const params = new URLSearchParams({ page, limit: 20 });
    if (filters.from) params.append('from', filters.from);
    if (filters.to) params.append('to', filters.to);
    if (filters.department) params.append('department', filters.department);
    if (filters.status) params.append('status', filters.status);
    
    api.get(`/admin/attendance/report?${params}`)
      .then((r) => {
        setData({
          records: r.data.records || [],
          page: r.data.page,
          pages: r.data.pages,
          total: r.data.total,
        });
      })
      .catch((err) => {
        console.error('Failed to load report:', err);
        toast.error('Failed to load attendance report');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setErrors({});
  };

  const handleApply = () => {
    load(1);
  };

  const handleReset = () => {
    setFilters({
      from: '',
      to: '',
      department: '',
      status: 'present',
    });
    setErrors({});
    load(1);
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.from) params.append('from', filters.from);
      if (filters.to) params.append('to', filters.to);
      
      const res = await api.get(`/admin/attendance/export?${params}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Report exported successfully');
    } catch (err) {
      toast.error('Failed to export report');
    }
  };

  const columns = [
    { 
      key: 'user', 
      label: 'Employee', 
      render: (r) => (
        <div>
          <div className="font-medium">{r.user?.name}</div>
          <div className="text-xs text-slate-500">{r.user?.employeeId}</div>
        </div>
      ) 
    },
    { 
      key: 'department', 
      label: 'Department',
      render: (r) => r.user?.department || 'N/A'
    },
    { 
      key: 'date', 
      label: 'Date', 
      render: (r) => new Date(r.date).toLocaleDateString('en-IN') 
    },
    { 
      key: 'checkIn', 
      label: 'Check In', 
      render: (r) => r.checkIn 
        ? new Date(r.checkIn).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : '—'
    },
    { 
      key: 'checkOut', 
      label: 'Check Out', 
      render: (r) => r.checkOut 
        ? new Date(r.checkOut).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : '—'
    },
    {
      key: 'hours', 
      label: 'Working Hours',
      render: (r) => {
        if (!r.workingSeconds && r.workingSeconds !== 0) return '—';
        const h = Math.floor(r.workingSeconds / 3600);
        const m = Math.floor((r.workingSeconds % 3600) / 60);
        const s = r.workingSeconds % 60;
        return `${h}h ${m}m ${s}s`;
      }
    },
    {
      key: 'status', 
      label: 'Status',
      render: (r) => {
        const colors = {
          present: 'bg-green-100 text-green-700',
          late: 'bg-yellow-100 text-yellow-700',
          absent: 'bg-red-100 text-red-700',
          'half-day': 'bg-blue-100 text-blue-700',
          'on-leave': 'bg-purple-100 text-purple-700',
        };
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${colors[r.status] || 'bg-slate-100'}`}>
            {r.status?.toUpperCase()}
          </span>
        );
      },
    },
  ];

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Report</h1>
        {/* <button onClick={handleExport} className="btn-secondary flex items-center gap-2">
           Export CSV
        </button> */}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* From Date */}
          <div>
            <label className="text-xs font-medium text-slate-500">From Date</label>
            <input
              type="date"
              name="from"
              value={filters.from}
              onChange={handleFilterChange}
              max={filters.to || today}
              className="input mt-1"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="text-xs font-medium text-slate-500">To Date</label>
            <input
              type="date"
              name="to"
              value={filters.to}
              onChange={handleFilterChange}
              min={filters.from}
              max={today}
              className="input mt-1"
            />
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="text-xs font-medium text-slate-500">Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="input mt-1"
            >
              <option value="">All Departments</option>
              {IT_DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="text-xs font-medium text-slate-500">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="input mt-1"
            >
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
              <option value="half-day">Half Day</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <button onClick={handleApply} className="btn-primary flex-1">
              Apply
            </button>
            <button onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>
        </div>

        {/* Date Validation Error */}
        {errors.date && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
          {errors.date}
          </div>
        )}
      </div>

      {/* Results Info */}
      {data.total > 0 && (
        <div className="text-sm text-slate-500">
          Showing {data.records.length} of {data.total} records
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <Table columns={columns} data={data.records} emptyText="No attendance records found" />
      )}

      {/* Pagination */}
      {data.pages > 1 && (
        <Pagination page={data.page} pages={data.pages} onChange={load} />
      )}
    </div>
  );
}