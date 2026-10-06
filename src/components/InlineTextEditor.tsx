import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface TextEditItem {
  id: string;
  originalText: string;
  newText: string;
  tagName: string;
  timestamp: number;
}

const STORAGE_KEY = 'caution_inline_text_edits';

export const InlineTextEditor: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [edits, setEdits] = useState<TextEditItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);

  // 저장 함수
  const saveEdits = useCallback((newEdits: TextEditItem[]) => {
    setEdits(newEdits);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEdits));
    } catch (e) {
      console.error('Failed to save inline edits', e);
    }
  }, []);

  // 토스트 메시지
  const triggerToast = (msg: string) => {
    setCopiedToast(msg);
    setTimeout(() => {
      setCopiedToast((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // 단축키 (Alt + E 또는 Ctrl + Shift + E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'e') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e')) {
        e.preventDefault();
        setIsEditMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 새로고침 시 저장된 문구 자동 적용
  useEffect(() => {
    if (edits.length === 0) return;

    const editMap = new Map<string, string>();
    edits.forEach((item) => {
      const orig = item.originalText.trim();
      editMap.set(orig, item.newText);
      // 공백 정규화된 형태도 매핑
      editMap.set(orig.replace(/\s+/g, ' '), item.newText);
    });

    const replaceTextInDOM = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const rawText = node.textContent || '';
        const trimmed = rawText.trim();
        const normalized = trimmed.replace(/\s+/g, ' ');

        let matchedKey: string | null = null;
        if (editMap.has(trimmed)) matchedKey = trimmed;
        else if (editMap.has(normalized)) matchedKey = normalized;
        else if (editMap.has(rawText)) matchedKey = rawText;

        if (matchedKey) {
          const replacement = editMap.get(matchedKey);
          if (replacement && node.textContent !== replacement) {
            node.textContent = node.textContent!.replace(matchedKey, replacement);
            if (node.parentElement) {
              node.parentElement.dataset.originalText = matchedKey;
              if (replacement.includes('\n')) {
                node.parentElement.style.whiteSpace = 'pre-line';
                node.parentElement.classList.add('inline-text-has-breaks');
              }
            }
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        // 에디터 자체 UI는 제외
        if (el.closest('#inline-text-editor-root')) return;
        node.childNodes.forEach(replaceTextInDOM);
      }
    };

    // 초기 적용
    replaceTextInDOM(document.body);

    // 동적 생성 요소 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mut) => {
        mut.addedNodes.forEach(replaceTextInDOM);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [edits]);

  // 편집 모드 활성화 시 이벤트 리스너 (DOM 직접 편집)
  useEffect(() => {
    if (!isEditMode) {
      if (activeElementRef.current) {
        activeElementRef.current.contentEditable = 'false';
        activeElementRef.current.classList.remove('inline-editing-active');
        activeElementRef.current = null;
      }
      return;
    }

    const isEditorUI = (target: EventTarget | null) => {
      return (target as HTMLElement)?.closest('#inline-text-editor-root') !== null;
    };

    const isCandidateElement = (el: HTMLElement) => {
      if (isEditorUI(el)) return false;
      const tag = el.tagName.toLowerCase();
      // 텍스트를 담을 수 있는 주요 태그
      const allowedTags = [
        'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
        'li', 'button', 'a', 'strong', 'em', 'small', 'b', 'i', 'label', 'div'
      ];
      if (!allowedTags.includes(tag)) return false;

      // 자식 요소 중 다른 블록 태그가 너무 많지 않고 실제 텍스트가 있는 경우
      const directText = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent?.trim())
        .join('');
      
      const fullText = el.innerText?.trim();
      return (directText.length > 0 || (el.children.length <= 2 && fullText.length > 0 && fullText.length < 500));
    };

    // 마우스 호버 효과
    const handleMouseOver = (e: MouseEvent) => {
      if (isEditorUI(e.target)) return;
      const target = e.target as HTMLElement;
      if (isCandidateElement(target) && target !== activeElementRef.current) {
        target.classList.add('inline-editable-hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove('inline-editable-hover');
    };

    // 클릭 시 편집 시작
    const handleClick = (e: MouseEvent) => {
      if (isEditorUI(e.target)) return;
      const target = e.target as HTMLElement;
      if (!isCandidateElement(target)) return;

      // 이미 편집 중인 요소를 다시 클릭한 경우:
      // 브라우저의 기본 커서 위치 지정(클릭한 글자 사이에 커서 놓기)과 텍스트 선택을 방해하지 않음
      if (target === activeElementRef.current) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // 이전 요소 정리
      if (activeElementRef.current && activeElementRef.current !== target) {
        activeElementRef.current.blur();
      }

      // 기존 텍스트 원본 기록 (이전에 수정된 항목인지 확인하여 원본 유지)
      const currentText = target.innerText.trim();
      const existingEdit = edits.find((item) => item.newText.trim() === currentText);

      if (existingEdit) {
        target.dataset.originalText = existingEdit.originalText;
      } else if (!target.dataset.originalText) {
        target.dataset.originalText = currentText;
      }

      target.contentEditable = 'true';
      target.spellcheck = false;
      target.classList.remove('inline-editable-hover');
      target.classList.add('inline-editing-active');
      target.style.whiteSpace = 'pre-wrap';
      activeElementRef.current = target;
      target.focus();

      // 마우스로 클릭한 바로 그 글자 사이에 커서 배치!
      let rangeSet = false;
      const doc = document as any;
      if (doc.caretRangeFromPoint) {
        const range = doc.caretRangeFromPoint(e.clientX, e.clientY);
        if (range && target.contains(range.startContainer)) {
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          rangeSet = true;
        }
      } else if (doc.caretPositionFromPoint) {
        const pos = doc.caretPositionFromPoint(e.clientX, e.clientY);
        if (pos && target.contains(pos.offsetNode)) {
          const range = document.createRange();
          range.setStart(pos.offsetNode, pos.offset);
          range.collapse(true);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          rangeSet = true;
        }
      }

      if (!rangeSet) {
        const range = document.createRange();
        range.selectNodeContents(target);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    };

    // 포커스 아웃 시 변경사항 저장
    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.isContentEditable) return;

      target.contentEditable = 'false';
      target.classList.remove('inline-editing-active');
      activeElementRef.current = null;

      const original = (target.dataset.originalText || '').trim();
      const current = target.innerText.trim();

      // 줄바꿈이 있는 경우 영구적으로 두 줄로 표시되도록 스타일 유지
      if (current.includes('\n') || target.querySelector('br')) {
        target.style.whiteSpace = 'pre-line';
        target.classList.add('inline-text-has-breaks');
      }

      if (original && current && original !== current) {
        // 기존 편집 목록 업데이트
        setEdits((prev) => {
          const filtered = prev.filter((item) => item.originalText !== original);
          const updated = [
            ...filtered,
            {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              originalText: original,
              newText: current,
              tagName: target.tagName.toLowerCase(),
              timestamp: Date.now()
            }
          ];
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch {}
          return updated;
        });

        const shortOrig = original.substring(0, 15).replace(/\n/g, ' ↵ ');
        const shortCurr = current.substring(0, 15).replace(/\n/g, ' ↵ ');
        triggerToast(`✏️ 수정 완료: "${shortOrig}..." ➔ "${shortCurr}..."`);
      }
    };

    // Enter 키 누르면 줄바꿈(두 줄) 삽입, Ctrl+Enter / Esc 시 완료
    const handleKeyDownInEditable = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeElementRef.current) {
          activeElementRef.current.blur();
        }
      } else if (e.key === 'Enter') {
        // Ctrl + Enter 또는 Cmd + Enter: 편집 완료 및 포커스 아웃
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          if (activeElementRef.current) {
            activeElementRef.current.blur();
          }
          return;
        }

        // 일반 Enter 또는 Shift + Enter: 줄바꿈(두 줄 만들기) 삽입
        e.preventDefault();
        const target = activeElementRef.current;
        if (!target) return;

        // 즉시 두 줄로 줄바꿈 표시되도록 white-space pre-line 적용
        target.style.whiteSpace = 'pre-line';
        target.classList.add('inline-text-has-breaks');

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();

          const br = document.createElement('br');
          range.insertNode(br);

          // 만약 요소 맨 끝에 <br>이 삽입된 경우 (뒤에 텍스트가 없는 경우)
          // 브라우저에서 빈 다음 줄을 렌더링하기 위해 trailing <br>이 하나 더 필요함
          if (!br.nextSibling || (br.nextSibling.nodeType === Node.TEXT_NODE && !br.nextSibling.textContent)) {
            const extraBr = document.createElement('br');
            br.parentNode?.appendChild(extraBr);
          }

          // 커서를 첫 번째 <br> 바로 다음으로 설정
          range.setStartAfter(br);
          range.setEndAfter(br);
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          try {
            document.execCommand('insertLineBreak');
          } catch {
            try {
              document.execCommand('insertText', false, '\n');
            } catch {}
          }
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('blur', handleBlur, true);
    document.addEventListener('keydown', handleKeyDownInEditable);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('blur', handleBlur, true);
      document.removeEventListener('keydown', handleKeyDownInEditable);
    };
  }, [isEditMode, saveEdits]);

  // AI에게 복사할 프롬프트 생성
  const handleCopyForAI = () => {
    if (edits.length === 0) {
      triggerToast('⚠️ 아직 수정한 문구가 없습니다! 글씨를 클릭해 수정해 보세요.');
      return;
    }

    const lines = [
      '### [사이트 문구 수정 요청 목록]',
      '아래 수정된 문구들을 프로젝트 코드에 영구 반영해줘 (두 줄/줄바꿈 포함):\n'
    ];

    edits.forEach((item, index) => {
      if (item.newText.includes('\n')) {
        lines.push(`${index + 1}. [두 줄/줄바꿈 적용]`);
        lines.push(`   - 기존: "${item.originalText}"`);
        lines.push(`   - 변경:`);
        lines.push('   ```');
        lines.push(item.newText);
        lines.push('   ```');
      } else {
        lines.push(`${index + 1}. "${item.originalText}" ➔ "${item.newText}"`);
      }
    });

    const textToCopy = lines.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      triggerToast(`📋 총 ${edits.length}건의 수정 목록이 복사되었습니다! 채팅창에 Ctrl+V로 붙여넣어 주세요.`);
    });
  };

  // 특정 항목 삭제 / 원복
  const handleRemoveEdit = (id: string) => {
    const target = edits.find((item) => item.id === id);
    if (!target) return;

    // DOM에서 원본으로 복구 시도
    const replaceInDOM = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent?.includes(target.newText)) {
          node.textContent = node.textContent.replace(target.newText, target.originalText);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if ((node as HTMLElement).closest('#inline-text-editor-root')) return;
        node.childNodes.forEach(replaceInDOM);
      }
    };
    replaceInDOM(document.body);

    const updated = edits.filter((item) => item.id !== id);
    saveEdits(updated);
    triggerToast('복구되었습니다.');
  };

  // 전체 초기화
  const handleClearAll = () => {
    if (!window.confirm('수정한 모든 문구를 초기화하시겠습니까? (새로고침하면 원본 코드로 돌아갑니다)')) return;
    saveEdits([]);
    window.location.reload();
  };

  return (
    <div id="inline-text-editor-root" className="select-none font-sans print:hidden">
      {/* ── 인라인 편집 전용 스타일 주입 ── */}
      <style>{`
        .inline-editable-hover {
          outline: 2px dashed #ef4444 !important;
          outline-offset: 2px !important;
          background-color: rgba(239, 68, 68, 0.08) !important;
          cursor: text !important;
          border-radius: 4px !important;
          position: relative !important;
        }
        .inline-editing-active {
          white-space: pre-wrap !important;
          word-break: break-word !important;
          outline: 2px solid #ef4444 !important;
          outline-offset: 2px !important;
          background-color: rgba(239, 68, 68, 0.15) !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2) !important;
          border-radius: 4px !important;
          cursor: text !important;
        }
        .inline-text-has-breaks {
          white-space: pre-line !important;
          word-break: break-word !important;
        }
      `}</style>

      {/* ── 상단 편집 모드 안내 배너 (편집 모드 켜졌을 때) ── */}
      {isEditMode && (
        <div className="fixed top-0 inset-x-0 z-[9999] bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-xl px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-bold animate-fade-in border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>
              ✏️ <strong>실시간 문구 편집 ON</strong>: 글씨를 클릭해 타이핑하세요! (<strong>Enter 키: 다음 줄로 줄바꿈</strong> / 완료: 바깥 클릭 또는 Ctrl+Enter)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-white/80 font-normal">
              (자동 저장됨)
            </span>
            <button
              onClick={() => setIsEditMode(false)}
              className="px-2.5 py-1 bg-black/30 hover:bg-black/50 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              편집 모드 종료 ✕
            </button>
          </div>
        </div>
      )}

      {/* ── 하단 플로팅 컨트롤 바 ── */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-2">
        {/* 토스트 피드백 */}
        {copiedToast && (
          <div className="bg-slate-950/95 text-white border border-red-500/40 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce backdrop-blur-md">
            <span>{copiedToast}</span>
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-xl border border-white/15 p-1.5 rounded-full shadow-2xl text-white">
          {/* 1. 편집 모드 토글 스위치 */}
          <button
            onClick={() => setIsEditMode((prev) => !prev)}
            className={`px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
              isEditMode
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white ring-2 ring-red-400/50 shadow-red-600/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 text-gray-200'
            }`}
            title="문구 편집 모드 켜기/끄기 (단축키: Alt + E)"
          >
            <i className={isEditMode ? 'ri-edit-2-fill text-white' : 'ri-edit-line text-red-400'} />
            <span>{isEditMode ? '문구 편집 중 (ON)' : '문구 직접 수정하기'}</span>
            {isEditMode && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
          </button>

          {/* 2. 수정된 개수 배지 및 내역 열기 */}
          {edits.length > 0 && (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="수정된 목록 확인하기"
              >
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                  {edits.length}
                </span>
                <span className="hidden sm:inline">건 수정됨</span>
              </button>

              {/* 3. AI 전송용 복사 버튼 (원클릭) */}
              <button
                onClick={handleCopyForAI}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
                title="AI 채팅창에 복사해서 전달할 목록 생성"
              >
                <i className="ri-clipboard-line text-sm" />
                <span>수정 목록 복사 (AI 전달용)</span>
              </button>
            </>
          )}

          {/* 단축키 힌트 */}
          <span className="hidden lg:inline-block px-2 text-[10px] text-gray-400 font-mono">
            Alt+E
          </span>
        </div>
      </div>

      {/* ── 수정 내역 상세 확인 모달 ── */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden text-gray-900 border border-gray-100">
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <i className="ri-file-list-3-line text-red-500" />
                  <span>수정한 문구 목록 ({edits.length}건)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  화면에서 직접 타이핑하여 수정한 내역입니다. 아래 [AI 전달용 목록 복사]를 눌러 채팅창에 붙여넣어 주세요!
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              {edits.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  아직 수정한 문구가 없습니다. 화면의 글씨를 마우스로 클릭해 변경해 보세요!
                </div>
              ) : (
                edits.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2 hover:border-red-200 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                      <span className="font-bold text-gray-700">#{index + 1} &lt;{item.tagName}&gt;</span>
                      <button
                        onClick={() => handleRemoveEdit(item.id)}
                        className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                        title="이 수정 취소"
                      >
                        <i className="ri-delete-bin-line" />
                        <span>원복</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-red-800">
                        <span className="text-[10px] font-bold text-red-500 block mb-1">수정 전 (원본)</span>
                        <p className="line-through opacity-80 break-words whitespace-pre-line">{item.originalText}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 font-bold">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-emerald-600">수정 후 (새 문구)</span>
                          {item.newText.includes('\n') && (
                            <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                              줄바꿈(두 줄) 적용
                            </span>
                          )}
                        </div>
                        <p className="break-words whitespace-pre-line">{item.newText}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleClearAll}
                className="text-xs text-gray-500 hover:text-red-600 font-bold px-3 py-2 cursor-pointer transition-colors"
              >
                전체 초기화 (원본으로 되돌리기)
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold cursor-pointer"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    handleCopyForAI();
                    setShowModal(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <i className="ri-clipboard-fill" />
                  <span>AI 전달용 목록 복사</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
