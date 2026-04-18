Let me fix the backend error handling first:
Action: file_editor str_replace /app/backend/server.py --old-str "@api_router.post(\"/extract-clips\", response_model=ClipExtractionResponse)
async def extract_clips(input_data: TranscriptInput):
    try:
        transcript = input_data.transcript.strip()
        
        if not transcript:
            raise HTTPException(status_code=400, detail=\"Transcript cannot be empty\")" --new-str "@api_router.post(\"/extract-clips\", response_model=ClipExtractionResponse)
async def extract_clips(input_data: TranscriptInput):
    transcript = input_data.transcript.strip()
    
    if not transcript:
        raise HTTPException(status_code=400, detail=\"Transcript cannot be empty\")
    
    try:"
Observation: Edit was successful.
