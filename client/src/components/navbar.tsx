export default function Navbar(props: {
  currentAnnotation: number;
  setCurrentAnnotation: (page: number) => void;
  savedAnnotationSet: Set<number>;
  totalAnnotations: number;
}) {
  const {
    currentAnnotation,
    setCurrentAnnotation,
    savedAnnotationSet,
    totalAnnotations,
  } = props;

  return (
    <div
      className="navbar"
      style={{
        textAlign: "left",
        backgroundColor: "#fafafa",
        padding: "10px",
      }}
    >
      <h3>Pages</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {[...Array(totalAnnotations)].map((_, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              padding: "4px",
              cursor: "pointer",
              backgroundColor: currentAnnotation === index ? "#bcbcbc" : "#eee",
              color: currentAnnotation === index ? "#fff" : "#000",
            }}
          >
            <a
              href="#"
              onClick={() => setCurrentAnnotation(index)}
              style={{ textDecoration: "none" }}
            >
              {`Page ${index + 1}`}
              {savedAnnotationSet.has(index + 1) && (
                <span style={{ color: "green", marginLeft: "5px" }}>
                  &#10003;
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
