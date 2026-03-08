import './excuse-result.css';

interface ExcuseResultProps {
  excuse: string | null;
}

export function ExcuseResult({ excuse }: ExcuseResultProps) {
  if (!excuse) {
    return (
      <div className="excuse-result excuse-result--empty">
        <p className="excuse-result__placeholder">
          Chọn tình huống và nhấn <strong>Tạo</strong> để bắt đầu ✨
        </p>
      </div>
    );
  }

  return (
    <div className="excuse-result">
      <blockquote className="excuse-result__text">{excuse}</blockquote>
    </div>
  );
}
