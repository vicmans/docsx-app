import { useState } from 'react'
import axios from 'axios';

export function Upload() {
  const [file, setFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('');
    setUploadProgress(false);
    setCompleted(false);
    if (!file) {
      alert('Please, add a file');
      return;
    }
    const url = 'http://localhost:3000/api/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    formData.append('filesize', file.size);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: function(progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (percentCompleted == 100) setCompleted(true);
        setUploadProgress(percentCompleted);
      }
    };
    axios.post(url, formData, config).then((response) => {
      setCompleted(true);
    }).catch(error => {
      setUploadProgress(false);
      setCompleted(false);
      setErrorMessage(error.message)
    });
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" name='file' onChange={handleChange} disabled={completed} accept=".docx" data-testid="upload" />
          <button type="submit" data-testid="upload-button" disabled={completed}>Upload</button>
          <progress value={uploadProgress} max="100"></progress>
        </form>
        {completed ? <div data-testid="results">
          Uploaded successfully, go to Home page
        </div> : ''}
        {errorMessage ?? <div>
          {errorMessage}
        </div>}
      </div>
    </>
  )
}
