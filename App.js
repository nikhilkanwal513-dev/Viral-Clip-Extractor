The code looks correct. The issue might be a race condition or the way React is handling the state updates. Let me check if there's an issue with how the response is being handled. Let me add better error handling and ensure the state persists:
Action: file_editor str_replace /app/frontend/src/App.js --old-str "  const handleExtract = async () => {
    if (!transcript.trim()) {
      setError(\"Please enter or upload a transcript first.\");
      return;
    }

    setLoading(true);
    setError(\"\");
    setClips([]);

    try {
      const response = await axios.post(`${API}/extract-clips`, {
        transcript: transcript,
      });

      setClips(response.data.clips);
    } catch (err) {
      setError(err.response?.data?.detail || \"Failed to extract clips. Please try again.\");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };" --new-str "  const handleExtract = async () => {
    if (!transcript.trim()) {
      setError(\"Please enter or upload a transcript first.\");
      return;
    }

    setLoading(true);
    setError(\"\");
    setClips([]);

    try {
      const response = await axios.post(`${API}/extract-clips`, {
        transcript: transcript,
      });

      if (response.data && response.data.clips && Array.isArray(response.data.clips)) {
        console.log(\"Extracted clips:\", response.data.clips);
        setClips(response.data.clips);
      } else {
        throw new Error(\"Invalid response format\");
      }
    } catch (err) {
      console.error(\"Error extracting clips:\", err);
      setError(err.response?.data?.detail || err.message || \"Failed to extract clips. Please try again.\");
    } finally {
      setLoading(false);
    }
  };"
Observation: Edit was successful.
