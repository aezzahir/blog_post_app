import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  return (
    <div className="content">
      <ReactQuill value={value} onChange={onChange} />
    </div>
  );
}
