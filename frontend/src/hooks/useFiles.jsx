import { httpClient } from "../http";
import { useEffect, useState } from "react";

async function getFiles(status = '') {
  let opt = {};
  if (status) {
    opt = {
      params: {
        status
      }
    }
  }
  const resp = await httpClient.get('files', opt);
  return resp.data;
}

function useFiles() {
  const [files, setFiles] = useState([]);

  async function fetchFiles(status = '') {
    const results = await getFiles(status);
    setFiles(results.files)
  }

  useEffect(() => {
    fetchFiles();
  }, []);
  return [
    files, fetchFiles
  ]
}

export default useFiles