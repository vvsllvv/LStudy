import {DownloadDoc, UploadDoc, DeleteDoc} from "./features";
const DocumentManager = ({ themeId }) => {
  const [documents, setDocuments] = useState([]);

  return (
    <div>
      {documents.map(doc => (
        <div key={doc.id}>
          <span>{doc.title}</span>
          <DownloadDoc documentId={doc.id} />
          <DeleteDoc documentId={doc.id}/>
        </div>
      ))}

      <UploadDoc themeId={themeId}/>
    </div>
  );
};