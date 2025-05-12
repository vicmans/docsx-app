import { httpClient } from "../http";
import { useEffect, useState } from "react";

async function updateFile(id, data) {
  const resp = await httpClient.put(`/files/${id}/status`, data);
  return resp.data;
}

function useUpdateFile() {
  const [loading, setLoading] = useState(false);

  async function updateStatus(id, status) {
    setLoading(true);
    try {
      await updateFile(id, {status});
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }

  return [
    loading, updateStatus,
  ]
}

export default useUpdateFile