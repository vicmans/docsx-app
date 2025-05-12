import { useEffect, useState } from 'react';
import useFiles from '../hooks/useFiles'
import useUpdateFile from '../hooks/useUpdateFile'
import { formatDate } from '../utils/format'

export function Dashboard() {
  const [files, fetchFiles] = useFiles();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, updateStatus] = useUpdateFile();

  const changeStatus = async (id, status) => {
    if (!confirm('Are you sure?')) return;
    await updateStatus(id, status);
    fetchFiles(selectedStatus);
  }

  useEffect(() => {
    fetchFiles(selectedStatus);
  }, [selectedStatus])

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <div>
        <div className='filters'>
          Filters
          <label htmlFor="filter">Status</label>
          <select name="filter" id="filter" value={selectedStatus} onChange={handleChange}>
            <option value="">Select one</option>
            <option value="uploaded">Uploaded</option>
            <option value="accepted">Acepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col" style={{maxWidth: '100px'}}>Filename</th>
            <th scope="col">Size (KB)</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody date-testid="filelist">
          {files.map(file => <tr key={file.id}>
            <th scope="row">{file.filename}</th>
            <td>{file.filesize}</td>
            <td>{formatDate(file.timestamps)}</td>
            <td>{file.status}</td>
            <td>
              <button style={{margin: '1rem'}} onClick={() => changeStatus(file.id, 'accepted')} disabled={loading}>Accept</button>
              <button onClick={() => changeStatus(file.id, 'rejected')} disabled={loading}>Reject</button>
            </td>
            </tr>
          )}
          {files?.length == 0 ? <tr>
            <td colSpan={5} style={{textAlign: 'center'}}>
              No data
            </td>
          </tr> : ''}
        </tbody>
      </table>
    </>
  )
}
