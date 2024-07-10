import { CSVLink } from "react-csv";
import csvHeaders from "../../../constants/csvHeaders";
interface IExportCSVProps {
  csvData: Array<{}>;
  isDownloadReady: boolean;
  setIsDownloadReady: React.Dispatch<React.SetStateAction<boolean>>;
  filename: string;
}
const ExportCSV = ({
  isDownloadReady,
  setIsDownloadReady,
  csvData,
  filename,
}: IExportCSVProps) => {
  return (
    isDownloadReady && (
      <CSVLink
        onClick={() => setIsDownloadReady(false)}
        headers={csvHeaders}
        data={csvData}
        filename={filename}
        target="_blank"
      >
        Download me
      </CSVLink>
    )
  );
};

export default ExportCSV;
