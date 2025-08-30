
from fastapi import APIRouter
from schema import AssistantQuery
from ai_assistant.assistant import answer

router = APIRouter(tags=["assistant"])

@router.post("/ask")
def ask(payload: AssistantQuery):
    text = answer(payload.question, payload.lang)
    return {"answer": text}
