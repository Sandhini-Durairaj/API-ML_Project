import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';

interface MyDropzoneProps {
  onFileDrop: (data: Record<string, string>[]) => void; // JSON output
}

const MyDropzone: FC<MyDropzoneProps> = ({ onFileDrop }) => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && file.type === 'text/csv') {
      const reader = new FileReader();

      reader.onload = () => {
        const text = reader.result as string;
        const json = csvToJson(text);
        onFileDrop(json);
      };

      reader.readAsText(file);
    } else {
      alert('Please upload a valid CSV file');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  });

  return (
    <div className=" max-w-2xl mx-auto p-6 relative">
      <div
        className="w-full border-2 py-5 border-green-200 border-dashed mt-3 flex justify-center items-center rounded"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex justify-center">
          <div className="text-center mt-3">
            <center><img src="/icons/dropzone.svg" className="h-16 w-16" alt="dropzone" /></center><br />
            <p className="text-green-400 -mt-1">Only CSV files (Max: 50kb)</p>
            {isDragActive ? (
              <p>Drop the CSV file here ...</p>
            ) : (
              <p>or Drag and Drop a .csv file here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to convert CSV string to JSON
function csvToJson(csv: string): Record<string, string>[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i]?.trim() ?? '';
    });
    return obj;
  });
}

export default MyDropzone;
