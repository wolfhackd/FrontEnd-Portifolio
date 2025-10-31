import * as filestack from 'filestack-js';

const client = filestack.init('SUA_API_KEY');

export function FileUploader() {
  const handleUpload = async () => {
    const result = await client.picker({
      onUploadDone: (res) => console.log('Arquivos:', res),
    });
    result.open();
  };

  return (
    <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
      Enviar arquivo
    </button>
  );
}
export default FileUploader;
