import { CSVLink } from "react-csv";
import csvHeaders from "../../../constants/csvHeaders";
import { Button } from "../../../components/ui/button";
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
      <Button>
        <CSVLink
          onClick={() => setIsDownloadReady(false)}
          headers={csvHeaders}
          data={csvData}
          filename={filename}
          target="_blank"
        >
          Download me
        </CSVLink>
      </Button>
    )
  );
};

export default ExportCSV;
