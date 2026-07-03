import "./Drawer.css";

const Drawer = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>{title}</h3>

          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="drawer-body">{children}</div>
      </aside>
    </div>
  );
};

export default Drawer;
