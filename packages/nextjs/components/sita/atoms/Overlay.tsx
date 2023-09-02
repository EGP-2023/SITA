type OverlayProps = {
  onClick: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

export default Overlay;
